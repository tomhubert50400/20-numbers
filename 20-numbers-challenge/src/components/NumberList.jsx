import React from "react";

function NumberList({ numbers, onPlaceNumber }) {
  return (
    <div className="number-list">
      {numbers.map((number, index) => (
        <button key={index} onClick={() => onPlaceNumber(index)}>
          {number}
        </button>
      ))}
      <button onClick={() => onPlaceNumber(numbers.length)}>
        Place at End
      </button>
    </div>
  );
}

export default NumberList;
