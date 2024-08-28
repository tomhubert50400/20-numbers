import React from "react";
import styled from "styled-components";

const StyledGameOverModal = styled.div`
  color: #a5a5a5;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #002a1e;
  border: 2px solid black;
  border-radius: 5px;
  text-align: center;
  z-index: 1000;
`;

const RestartButton = styled.button`
  padding: 10px 20px;
  background-color: #045c0b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #024e0a;
  }
`;

function GameOverModal({ onReset, isWinner }) {
  return (
    <StyledGameOverModal>
      <h2>
        {isWinner ? "Congratulations! You Win!" : "Game Over ! You Lost."}
      </h2>
      <RestartButton onClick={onReset}>Restart</RestartButton>
    </StyledGameOverModal>
  );
}

export default GameOverModal;
