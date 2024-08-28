import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NumberList from "./components/NumberList";
import NumberInput from "./components/NumberInput";
import GameOverModal from "./components/GameOverModal";

const StyledAppWrapper = styled.div`
  position: relative;
`;

const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2rem;
  filter: ${({ gameOver }) => (gameOver ? "blur(10px)" : "none")};
`;

const StyledLeftContainer = styled.div`
  flex: 1;
  margin-right: 2rem;
`;

const StyledRightContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #a5a5a5;
  text-align: center;
`;

const Title = styled.h1``;

function App() {
  const [numbers, setNumbers] = useState(Array(20).fill(null)); // Liste de 20 emplacements, initialisés à null
  const [currentNumber, setCurrentNumber] = useState(generateRandomNumber());
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false); // Nouvel état pour suivre si l'utilisateur a gagné
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    // Charger le meilleur score depuis le local storage
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 1001);
  }

  function handlePlaceNumber(index) {
    if (gameOver) return; // Empêcher les interactions si le jeu est terminé

    const newNumbers = [...numbers];

    // Vérification que le placement est valide
    if (
      (index === 0 ||
        newNumbers[index - 1] === null ||
        newNumbers[index - 1] < currentNumber) &&
      (index === newNumbers.length - 1 ||
        newNumbers[index + 1] === null ||
        newNumbers[index + 1] > currentNumber)
    ) {
      newNumbers[index] = currentNumber;
      setNumbers(newNumbers);
      setScore(score + 1); // Incrémenter le score à chaque placement correct

      // Vérifie si le jeu est terminé (tous les emplacements sont remplis)
      if (newNumbers.every((num) => num !== null)) {
        setIsWinner(true);
        setGameOver(true);
        updateHighScore(score + 1);
      } else {
        setCurrentNumber(generateRandomNumber());
      }
    } else {
      setIsWinner(false);
      setGameOver(true); // Défaite si le placement est incorrect
      updateHighScore(score);
    }
  }

  function updateHighScore(currentScore) {
    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem("highScore", currentScore);
    }
  }

  function resetGame() {
    setNumbers(Array(20).fill(null));
    setCurrentNumber(generateRandomNumber());
    setGameOver(false);
    setIsWinner(false);
    setScore(0);
  }

  return (
    <StyledAppWrapper>
      <StyledAppContainer gameOver={gameOver}>
        <StyledLeftContainer>
          <NumberList
            numbers={numbers}
            onPlaceNumber={handlePlaceNumber}
            gameOver={gameOver}
          />
        </StyledLeftContainer>
        <StyledRightContainer>
          <Title>20 Numbers Challenge</Title>
          <h2>Highest Score: {highScore}</h2>
          <NumberInput number={currentNumber} />
        </StyledRightContainer>
      </StyledAppContainer>
      {gameOver && <GameOverModal onReset={resetGame} isWinner={isWinner} />}
    </StyledAppWrapper>
  );
}

export default App;
