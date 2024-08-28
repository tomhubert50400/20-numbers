import React from "react";
import styled from "styled-components";

const NumberInputContainer = styled.div`
  margin-top: 1rem;
`;

const NumberInputText = styled.p`
  font-size: 2rem;
`;
const CurrentNumber = styled.p`
  font-size: 4rem;
  margin-top: 3rem;
`;

function NumberInput({ number }) {
  return (
    <NumberInputContainer>
      <NumberInputText>Current Number:</NumberInputText>
      <CurrentNumber>{number}</CurrentNumber>
    </NumberInputContainer>
  );
}

export default NumberInput;
