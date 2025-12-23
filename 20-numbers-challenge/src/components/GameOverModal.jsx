import React from "react";
import styled, { keyframes } from "styled-components";

const modalAppear = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.25),
                0 0 30px rgba(0, 255, 255, 0.15),
                inset 0 0 20px rgba(0, 255, 255, 0.06);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.35),
                0 0 40px rgba(0, 255, 255, 0.2),
                inset 0 0 25px rgba(0, 255, 255, 0.1);
  }
`;

const winGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 255, 150, 0.35),
                0 0 40px rgba(0, 255, 150, 0.2),
                inset 0 0 25px rgba(0, 255, 150, 0.1);
  }
  50% {
    box-shadow: 0 0 25px rgba(0, 255, 150, 0.45),
                0 0 50px rgba(0, 255, 150, 0.3),
                inset 0 0 30px rgba(0, 255, 150, 0.15);
  }
`;

const StyledGameOverModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem;
  background: linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(26, 31, 58, 0.95) 100%);
  border: 2px solid ${({ isWinner }) => isWinner ? 'rgba(0, 255, 150, 0.4)' : 'rgba(0, 255, 255, 0.4)'};
  border-radius: 20px;
  text-align: center;
  z-index: 1000;
  backdrop-filter: blur(20px);
  animation: ${modalAppear} 0.3s ease-out,
             ${({ isWinner }) => isWinner ? winGlow : glowPulse} 3s ease-in-out infinite;
  max-width: 90%;
  width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    135deg,
    ${({ isWinner }) => isWinner ? '#00ff96, #00cc77' : '#00ffff, #0099cc'}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 8px ${({ isWinner }) => isWinner ? 'rgba(0, 255, 150, 0.3)' : 'rgba(0, 255, 255, 0.3)'};
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ScoreDisplay = styled.div`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  
  strong {
    color: #00ffff;
    font-size: 1.5rem;
    text-shadow: 0 0 6px rgba(0, 255, 255, 0.3);
  }
`;

const RestartButton = styled.button`
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(255, 0, 255, 0.15) 100%);
  border: 2px solid rgba(0, 255, 255, 0.35);
  border-radius: 12px;
  color: #00ffff;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 255, 255, 0.15),
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%);
    border-color: rgba(0, 255, 255, 0.5);
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.25),
                inset 0 0 15px rgba(0, 255, 255, 0.06);
    transform: translateY(-2px);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

function GameOverModal({ onReset, isWinner, score }) {
  return (
    <StyledGameOverModal isWinner={isWinner}>
      <ModalTitle isWinner={isWinner}>
        {isWinner ? "Victory!" : "Game Over"}
      </ModalTitle>
      <ScoreDisplay>
        Final Score: <strong>{score}</strong>
      </ScoreDisplay>
      <RestartButton onClick={onReset}>Play Again</RestartButton>
    </StyledGameOverModal>
  );
}

export default GameOverModal;
