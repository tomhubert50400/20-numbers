import React from "react";
import styled from "styled-components";

const StyledNumberListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
  @media (min-width: 768px) {
    align-items: center;
  }
  @media (min-width: 1024px) {
    height: 50%;
    flex-wrap: wrap;
  }
`;

const StyledNumberList = styled.button`
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  border: none;
  flex-wrap: wrap;
  border-radius: 5px;
  display: flex;
  width: 80px;
  text-align: center;
  margin-bottom: 1rem;
  height: 20px;
  &:disabled {
    color: white;
    background-color: #045c0b;
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 1024px) {
    width: 150px;
    height: 40px;
    margin-top: 15px;
    font-size: 1.5rem;
    margin-right: 3rem;
  }
`;

const NumberButtonP = styled.p`
  margin: 0;
  padding: 0;
  align-self: center;
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
          <NumberButtonP>
            {index + 1}: {number !== null ? number : ""}{" "}
          </NumberButtonP>
          {/* Affiche le numéro ou '---' si vide */}
        </StyledNumberList>
      ))}
    </StyledNumberListContainer>
  );
}

export default NumberList;
