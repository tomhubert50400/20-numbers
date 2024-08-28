import React, { useState } from "react";
import NumberList from "./components/NumberList";
import NumberInput from "./components/NumberInput";
import GameOverModal from "./components/GameOverModal";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(generateRandomNumber());
  const [gameOver, setGameOver] = useState(false);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 1001);
  }

  function handlePlaceNumber(index) {
    if (
      (index === 0 || numbers[index - 1] < currentNumber) &&
      (index === numbers.length || numbers[index] > currentNumber)
    ) {
      const newNumbers = [...numbers];
      newNumbers.splice(index, 0, currentNumber);
      setNumbers(newNumbers);

      if (newNumbers.length === 20) {
        setGameOver(true);
      } else {
        setCurrentNumber(generateRandomNumber());
      }
    } else {
      setGameOver(true);
    }
  }

  function resetGame() {
    setNumbers([]);
    setCurrentNumber(generateRandomNumber());
    setGameOver(false);
  }

  return (
    <div className="app">
      <h1>20 Numbers Challenge</h1>
      <NumberList numbers={numbers} onPlaceNumber={handlePlaceNumber} />
      <NumberInput number={currentNumber} />
      {gameOver && <GameOverModal onReset={resetGame} />}
    </div>
  );
}

export default App;
