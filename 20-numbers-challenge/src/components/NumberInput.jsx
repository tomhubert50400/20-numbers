import React from "react";
import styled from "styled-components";

const NumberInputContainer = styled.div`
  margin-top: 1rem;
`;

const CurrentNumber = styled.p`
  font-size: 4rem;
  margin-top: 3rem;
`;

function NumberInput({ number }) {
  return (
    <NumberInputContainer>
      <h2>Current Number:</h2>
      <CurrentNumber>{number}</CurrentNumber>
    </NumberInputContainer>
  );
}

export default NumberInput;
