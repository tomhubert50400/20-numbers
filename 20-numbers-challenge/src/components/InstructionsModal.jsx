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

const StyledInstructionsModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(26, 31, 58, 0.95) 100%);
  border: 2px solid rgba(0, 255, 255, 0.4);
  border-radius: 20px;
  text-align: left;
  z-index: 1000;
  backdrop-filter: blur(20px);
  animation: ${modalAppear} 0.3s ease-out,
             ${glowPulse} 3s ease-in-out infinite;
  max-width: 90%;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  
  @media (min-width: 768px) {
    width: 600px;
    padding: 3rem;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #00ffff, #0099cc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.3);
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

const InstructionsContent = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.6;
  
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const InstructionSection = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  color: #00ffff;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.3);
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const InstructionText = styled.p`
  margin: 0.5rem 0;
  color: rgba(255, 255, 255, 0.8);
`;

const CloseButton = styled.button`
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(255, 0, 255, 0.15) 100%);
  border: 2px solid rgba(0, 255, 255, 0.35);
  border-radius: 12px;
  color: #00ffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  width: 100%;
  margin-top: 1.5rem;
  
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

function InstructionsModal({ onClose }) {
  return (
    <StyledInstructionsModal>
      <ModalTitle>How to Play</ModalTitle>
      <InstructionsContent>
        <InstructionSection>
          <SectionTitle>Objective</SectionTitle>
          <InstructionText>
            Place 20 numbers in ascending order from smallest to largest.
          </InstructionText>
        </InstructionSection>
        
        <InstructionSection>
          <SectionTitle>Gameplay</SectionTitle>
          <InstructionText>
            • A random number appears at the top of the screen
          </InstructionText>
          <InstructionText>
            • Click on an empty slot to place the number
          </InstructionText>
          <InstructionText>
            • Numbers must be placed in ascending order (smallest to largest)
          </InstructionText>
          <InstructionText>
            • If you place a number incorrectly, the game ends
          </InstructionText>
        </InstructionSection>
        
        <InstructionSection>
          <SectionTitle>Rules</SectionTitle>
          <InstructionText>
            • All numbers to the left must be smaller
          </InstructionText>
          <InstructionText>
            • All numbers to the right must be larger
          </InstructionText>
          <InstructionText>
            • Complete all 20 slots to win!
          </InstructionText>
        </InstructionSection>
      </InstructionsContent>
      <CloseButton onClick={onClose}>Got it</CloseButton>
    </StyledInstructionsModal>
  );
}

export default InstructionsModal;


