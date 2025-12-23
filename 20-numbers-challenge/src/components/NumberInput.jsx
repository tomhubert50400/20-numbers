import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.25),
                0 0 24px rgba(0, 255, 255, 0.15),
                inset 0 0 15px rgba(0, 255, 255, 0.06);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 18px rgba(0, 255, 255, 0.35),
                0 0 36px rgba(0, 255, 255, 0.2),
                inset 0 0 20px rgba(0, 255, 255, 0.1);
  }
`;

const numberGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 8px rgba(0, 255, 255, 0.5),
                 0 0 16px rgba(0, 255, 255, 0.3);
  }
  50% {
    text-shadow: 0 0 12px rgba(0, 255, 255, 0.6),
                 0 0 24px rgba(0, 255, 255, 0.4);
  }
`;

const NumberInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
  
  ${({ mobile }) => mobile && `
    gap: 0.75rem;
    max-width: 100%;
    margin-top: 0;
  `}
`;

const NumberInputText = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 3px;
  text-align: center;
  
  ${({ mobile }) => mobile && `
    font-size: 0.7rem;
    letter-spacing: 1px;
    margin-bottom: 0;
  `}
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CurrentNumberContainer = styled.div`
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%);
  border: 2px solid rgba(0, 255, 255, 0.35);
  border-radius: 20px;
  padding: 2rem 3rem;
  backdrop-filter: blur(10px);
  animation: ${pulse} 3s ease-in-out infinite;
  position: relative;
  overflow: hidden;
  
  ${({ mobile }) => mobile && `
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    border-width: 2px;
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(0, 255, 255, 0.05),
      transparent
    );
    animation: shine 4s infinite;
  }
  
  @media (min-width: 768px) {
    padding: 2.5rem 4rem;
  }
`;

const shine = keyframes`
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
`;

const CurrentNumber = styled.p`
  font-size: 4rem;
  font-weight: bold;
  color: #00ffff;
  animation: ${numberGlow} 2s ease-in-out infinite;
  position: relative;
  z-index: 1;
  text-align: center;
  
  ${({ mobile }) => mobile && `
    font-size: 2rem;
    animation: none;
    text-shadow: 0 0 6px rgba(0, 255, 255, 0.3);
  `}
  
  @media (min-width: 768px) {
    font-size: 5rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 6rem;
  }
`;

function NumberInput({ number, mobile = false }) {
  return (
    <NumberInputContainer mobile={mobile}>
      <NumberInputText mobile={mobile}>Current Number</NumberInputText>
      <CurrentNumberContainer mobile={mobile}>
        <CurrentNumber mobile={mobile}>{number}</CurrentNumber>
      </CurrentNumberContainer>
    </NumberInputContainer>
  );
}

export default NumberInput;
