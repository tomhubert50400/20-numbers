const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { ServerStyleSheet } = require('styled-components');
const PropTypes = require('prop-types');

// Compile the actual JSX through Vite while keeping one shared React runtime.
test('game component regressions', async (t) => {
  const { transformWithEsbuild } = await import('vite');
  const names = ['App', 'components/NumberInput', 'components/NumberList',
    'components/GameOverModal', 'components/InstructionsModal'];
  const compiled = new Map(await Promise.all(names.map(async (name) => {
    const file = path.resolve(__dirname, '../src', `${name}.jsx`);
    const result = await transformWithEsbuild(fs.readFileSync(file, 'utf8'), file,
      { jsx: 'automatic', format: 'cjs' });
    return [file, result.code];
  })));
  const originalLoader = require.extensions['.jsx'];
  require.extensions['.jsx'] = (module, file) => module._compile(compiled.get(file), file);
  const originalError = console.error;
  const originalWarn = console.warn;
  const diagnostics = [];
  console.error = console.warn = (...args) => diagnostics.push(args);
  const noop = () => {};

  try {
    const components = Object.fromEntries([...compiled.keys()].map((file) =>
      [path.basename(file, '.jsx'), require(file).default]));
    const { NumberInput, NumberList, GameOverModal, InstructionsModal } = components;
    const cases = [
      ['App', {}, /20 Numbers Challenge/],
      ['NumberInput', { number: 0 }, />0</],
      ['NumberInput', { number: 1000, mobile: true }, />1000</],
      ['NumberList', { numbers: Array(20).fill(null), onPlaceNumber: noop, gameOver: false }, /#20/],
      ['NumberList', { numbers: [0, null, 1000], onPlaceNumber: noop, gameOver: true }, />1000</],
      ['GameOverModal', { onReset: noop, isWinner: false, score: 0 }, /Game Over/],
      ['GameOverModal', { onReset: noop, isWinner: true, score: 20 }, /Victory!/],
      ['InstructionsModal', { onClose: noop }, /Got it/],
    ];

    await t.test('valid renders preserve content and styles without DOM prop leaks or warnings', () => {
      for (const [name, props, content] of cases) {
        const sheet = new ServerStyleSheet();
        try {
          const html = renderToStaticMarkup(sheet.collectStyles(React.createElement(components[name], props)));
          assert.match(html, content, name);
          assert.doesNotMatch(html, /\s(?:\$\w+|gameover|iswinner|mobile)=/i, name);
          const css = sheet.getStyleTags();
          assert.match(css, /data-styled/, name);
          if (name === 'NumberInput' && props.mobile) assert.match(css, /font-size:2rem/);
          if (name === 'GameOverModal') assert.match(css, props.isWinner ? /rgba\(0, 255, 150, 0\.4\)/ : /rgba\(0, 255, 255, 0\.4\)/);
          if (name === 'NumberList') {
            assert.equal((html.match(/<button /g) || []).length, props.numbers.length);
            assert.equal((html.match(/disabled=""/g) || []).length, props.gameOver ? props.numbers.length : 0);
          }
        } finally {
          sheet.seal();
        }
      }
      assert.deepEqual(diagnostics, []);
    });

    await t.test('placement, replay and close callbacks remain connected', () => {
      let placedIndex;
      const list = NumberList({ numbers: [0, null, 1000], gameOver: false,
        onPlaceNumber: (index) => { placedIndex = index; } });
      assert.deepEqual(list.props.children.map((slot) => slot.props.disabled), [true, false, true]);
      list.props.children[1].props.onClick();
      assert.equal(placedIndex, 1);
      let resets = 0;
      GameOverModal({ onReset: () => { resets++; }, isWinner: false, score: 0 })
        .props.children.at(-1).props.onClick();
      assert.equal(resets, 1);
      let closes = 0;
      InstructionsModal({ onClose: () => { closes++; } }).props.children.at(-1).props.onClick();
      assert.equal(closes, 1);
      assert.equal(NumberInput({ number: 0 }).props.$mobile, false);
    });

    await t.test('PropTypes accept empty slots and optional mobile while rejecting invalid props', () => {
      const checks = [
        ['NumberInput', { number: 0 }, 0],
        ['NumberInput', { number: 1000, mobile: true }, 0],
        ['NumberInput', { number: '123', mobile: 'yes' }, 2],
        ['NumberInput', {}, 1],
        ['NumberList', { numbers: [0, null, 1000], onPlaceNumber: noop, gameOver: false }, 0],
        ['NumberList', { numbers: ['bad'], onPlaceNumber: noop, gameOver: false }, 1],
        ['NumberList', {}, 3],
        ['GameOverModal', { onReset: noop, isWinner: true, score: 20 }, 0],
        ['GameOverModal', {}, 3],
        ['InstructionsModal', { onClose: noop }, 0],
        ['InstructionsModal', {}, 1],
      ];
      for (const [name, props, expected] of checks) {
        diagnostics.length = 0;
        PropTypes.resetWarningCache();
        PropTypes.checkPropTypes(components[name].propTypes, props, 'prop', name);
        assert.equal(diagnostics.length, expected, name);
      }
    });
  } finally {
    console.error = originalError;
    console.warn = originalWarn;
    if (originalLoader) require.extensions['.jsx'] = originalLoader;
    else delete require.extensions['.jsx'];
  }
});
