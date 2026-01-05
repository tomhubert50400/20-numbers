import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import NumberList from "./components/NumberList";
import NumberInput from "./components/NumberInput";
import GameOverModal from "./components/GameOverModal";
import InstructionsModal from "./components/InstructionsModal";

const glowAnimation = keyframes`
  0%, 100% {
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.3),
                 0 0 10px rgba(0, 255, 255, 0.2);
  }
  50% {
    text-shadow: 0 0 8px rgba(0, 255, 255, 0.4),
                 0 0 15px rgba(0, 255, 255, 0.25);
  }
`;

const StyledAppWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 2rem;
  z-index: 1;
`;

const MobileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const MobileTitle = styled.h1`
  font-size: 2rem;
  background: linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #00ff96 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${glowAnimation} 3s ease-in-out infinite;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Title = styled.h1`
  display: none;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #00ff96 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${glowAnimation} 3s ease-in-out infinite;
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  order: 2;
  margin: 0;

  @media (min-width: 1024px) {
    display: block;
    font-size: 4.5rem;
    margin-bottom: 2rem;
    order: 1;
  }
`;

const DesktopTitleWrapper = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  order: 2;

  @media (min-width: 1024px) {
    display: flex;
    order: 1;
  }
`;

const HelpButton = styled.button`
  background: linear-gradient(
    135deg,
    rgba(0, 255, 255, 0.15) 0%,
    rgba(255, 0, 255, 0.15) 100%
  );
  border: 2px solid rgba(0, 255, 255, 0.35);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ffff;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 255, 255, 0.2);
  flex-shrink: 0;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 255, 255, 0.25) 0%,
      rgba(255, 0, 255, 0.25) 100%
    );
    border-color: rgba(0, 255, 255, 0.5);
    box-shadow: 0 4px 12px rgba(0, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.4rem;
  }

  @media (min-width: 1024px) {
    width: 3rem;
    height: 3rem;
    font-size: 1.6rem;
  }
`;

const MobileScoresTop = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;

const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 1400px;
  margin: 0 auto;
  filter: ${({ gameOver }) => (gameOver ? "blur(8px)" : "none")};
  transition: filter 0.3s ease;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 3rem;
  }
`;

const StyledLeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  order: 2;
  width: 100%;

  @media (min-width: 1024px) {
    align-items: flex-start;
    order: 1;
  }
`;

const MobileNumberInputWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  margin-top: 0;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const StyledRightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  order: 1;

  @media (min-width: 1024px) {
    align-items: center;
    flex: 1.2;
    order: 2;
  }
`;

const NumberInputWrapper = styled.div`
  display: none;
  order: 1;

  @media (min-width: 1024px) {
    display: block;
    order: 2;
  }
`;

const ScoreContainerWrapper = styled.div`
  display: none;
  order: 3;

  @media (min-width: 1024px) {
    display: block;
    order: 3;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
  }
`;

const ScoreBox = styled.div`
  background: linear-gradient(
    135deg,
    rgba(0, 255, 255, 0.08) 0%,
    rgba(255, 0, 255, 0.08) 100%
  );
  border: 2px solid rgba(0, 255, 255, 0.25);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 255, 255, 0.08),
    inset 0 0 15px rgba(0, 255, 255, 0.03);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 255, 255, 0.4);
    box-shadow: 0 6px 20px rgba(0, 255, 255, 0.15),
      inset 0 0 20px rgba(0, 255, 255, 0.06);
    transform: translateY(-2px);
  }
`;

const MobileScoreBox = styled.div`
  background: linear-gradient(
    135deg,
    rgba(0, 255, 255, 0.08) 0%,
    rgba(255, 0, 255, 0.08) 100%
  );
  border: 2px solid rgba(0, 255, 255, 0.25);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 255, 255, 0.08),
    inset 0 0 10px rgba(0, 255, 255, 0.03);
`;

const ScoreLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
`;

const ScoreValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #00ffff;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.3);

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const MobileScoreLabel = styled.div`
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.25rem;
`;

const MobileScoreValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #00ffff;
  text-shadow: 0 0 4px rgba(0, 255, 255, 0.3);
`;

function App() {
  const [numbers, setNumbers] = useState(Array(20).fill(null));
  const [currentNumber, setCurrentNumber] = useState(generateRandomNumber());
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [usedNumbers, setUsedNumbers] = useState(new Set());

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  function generateRandomNumber(excludeNumbers = new Set()) {
    let newNumber;
    let attempts = 0;
    const maxAttempts = 10000;

    do {
      newNumber = Math.floor(Math.random() * 1001);
      attempts++;
      if (attempts > maxAttempts) {
        break;
      }
    } while (excludeNumbers.has(newNumber));

    return newNumber;
  }

  function updateHighScore(currentScore) {
    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem("highScore", currentScore);
    }
  }

  function handlePlaceNumber(index) {
    if (gameOver) return;

    const newNumbers = [...numbers];

    const canPlace = newNumbers.every((num, i) => {
      if (num === null) return true;
      if (i < index && num > currentNumber) return false;
      if (i > index && num < currentNumber) return false;
      return true;
    });

    if (canPlace) {
      newNumbers[index] = currentNumber;
      setNumbers(newNumbers);
      setScore(score + 1);

      const newUsedNumbers = new Set(usedNumbers);
      newUsedNumbers.add(currentNumber);
      setUsedNumbers(newUsedNumbers);

      if (newNumbers.every((num) => num !== null)) {
        setIsWinner(true);
        setGameOver(true);
        updateHighScore(score + 1);
      } else {
        setCurrentNumber(generateRandomNumber(newUsedNumbers));
      }
    } else {
      setIsWinner(false);
      setGameOver(true);
      updateHighScore(score);
    }
  }

  function resetGame() {
    setNumbers(Array(20).fill(null));
    setUsedNumbers(new Set());
    setCurrentNumber(generateRandomNumber());
    setGameOver(false);
    setIsWinner(false);
    setScore(0);
  }

  return (
    <StyledAppWrapper>
      <MobileHeader>
        <TitleWrapper>
          <MobileTitle>20 Numbers Challenge</MobileTitle>
          <HelpButton onClick={() => setShowInstructions(true)}>?</HelpButton>
        </TitleWrapper>
        <MobileScoresTop>
          <MobileScoreBox>
            <MobileScoreLabel>Score</MobileScoreLabel>
            <MobileScoreValue>{score}</MobileScoreValue>
          </MobileScoreBox>
          <MobileScoreBox>
            <MobileScoreLabel>Best</MobileScoreLabel>
            <MobileScoreValue>{highScore}</MobileScoreValue>
          </MobileScoreBox>
        </MobileScoresTop>
      </MobileHeader>
      <StyledAppContainer gameOver={gameOver}>
        <StyledLeftContainer>
          <MobileNumberInputWrapper>
            <NumberInput number={currentNumber} mobile={true} />
          </MobileNumberInputWrapper>
          <NumberList
            numbers={numbers}
            onPlaceNumber={handlePlaceNumber}
            gameOver={gameOver}
          />
        </StyledLeftContainer>
        <StyledRightContainer>
          <DesktopTitleWrapper>
            <Title>20 Numbers Challenge</Title>
            <HelpButton onClick={() => setShowInstructions(true)}>?</HelpButton>
          </DesktopTitleWrapper>
          <NumberInputWrapper>
            <NumberInput number={currentNumber} />
          </NumberInputWrapper>
          <ScoreContainerWrapper>
            <ScoreContainer>
              <ScoreBox>
                <ScoreLabel>Score</ScoreLabel>
                <ScoreValue>{score}</ScoreValue>
              </ScoreBox>
              <ScoreBox>
                <ScoreLabel>Best</ScoreLabel>
                <ScoreValue>{highScore}</ScoreValue>
              </ScoreBox>
            </ScoreContainer>
          </ScoreContainerWrapper>
        </StyledRightContainer>
      </StyledAppContainer>
      {gameOver && (
        <GameOverModal onReset={resetGame} isWinner={isWinner} score={score} />
      )}
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </StyledAppWrapper>
  );
}

export default App;
