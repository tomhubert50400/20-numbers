import React from "react";
import styled, { keyframes } from "styled-components";

const gridPulse = keyframes`
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
`;

const StyledNumberListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
`;

const StyledNumberList = styled.button`
  position: relative;
  font-size: 1rem;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%);
  border: 2px solid rgba(0, 255, 255, 0.3);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  min-height: 80px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  overflow: hidden;
  
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
      rgba(0, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover:not(:disabled) {
    border-color: rgba(0, 255, 255, 0.5);
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(255, 0, 255, 0.15) 100%);
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.25),
                inset 0 0 15px rgba(0, 255, 255, 0.06);
    transform: translateY(-2px) scale(1.02);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(-1px) scale(1.02);
  }
  
  &:disabled {
    background: linear-gradient(135deg, rgba(0, 255, 150, 0.15) 0%, rgba(0, 200, 100, 0.15) 100%);
    border-color: rgba(0, 255, 150, 0.4);
    cursor: not-allowed;
    box-shadow: 0 0 10px rgba(0, 255, 150, 0.2),
                inset 0 0 12px rgba(0, 255, 150, 0.06);
    
    &::before {
      display: none;
    }
  }
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
    min-height: 100px;
  }
  
  @media (min-width: 1024px) {
    font-size: 1.5rem;
    min-height: 120px;
  }
`;

const NumberButtonP = styled.p`
  margin: 0;
  padding: 0;
  color: #ffffff;
  font-weight: bold;
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  ${StyledNumberList}:disabled & {
    color: #00ff96;
    text-shadow: 0 0 6px rgba(0, 255, 150, 0.3);
  }
  
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const IndexLabel = styled.span`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`;

const NumberValue = styled.span`
  font-size: 1.2rem;
  color: #00ffff;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.3);
  
  ${StyledNumberList}:disabled & {
    font-size: 1.5rem;
  }
  
  @media (min-width: 768px) {
    font-size: 1.4rem;
    
    ${StyledNumberList}:disabled & {
      font-size: 1.8rem;
    }
  }
  
  @media (min-width: 1024px) {
    font-size: 1.6rem;
    
    ${StyledNumberList}:disabled & {
      font-size: 2rem;
    }
  }
`;

function NumberList({ numbers, onPlaceNumber, gameOver }) {
  return (
    <StyledNumberListContainer>
      {numbers.map((number, index) => (
        <StyledNumberList
          key={index}
          onClick={() => onPlaceNumber(index)}
          disabled={number !== null || gameOver}
        >
          <NumberButtonP>
            <IndexLabel>#{index + 1}</IndexLabel>
            {number !== null ? (
              <NumberValue>{number}</NumberValue>
            ) : (
              <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.9rem' }}>—</span>
            )}
          </NumberButtonP>
        </StyledNumberList>
      ))}
    </StyledNumberListContainer>
  );
}

export default NumberList;
