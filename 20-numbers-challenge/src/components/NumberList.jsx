import React from "react";
import styled from "styled-components";

const StyledNumberListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
`;

const StyledNumberList = styled.button`
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 5px;
  display: flex;
  width: 80px;
  margin-bottom: 1rem;
  &:disabled {
    color: white;
    background-color: #045c0b;
  }
`;

function NumberList({ numbers, onPlaceNumber, gameOver }) {
  return (
    <StyledNumberListContainer>
      {numbers.map((number, index) => (
        <StyledNumberList
          key={index}
          onClick={() => onPlaceNumber(index)}
          disabled={number !== null || gameOver} // Désactiver si déjà placé ou si le jeu est terminé
        >
          {index + 1}: {number !== null ? number : ""}{" "}
          {/* Affiche le numéro ou '---' si vide */}
        </StyledNumberList>
      ))}
    </StyledNumberListContainer>
  );
}

export default NumberList;
