import { useState } from "react";

export default function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

function Counter() {
  const [range, setRange] = useState(1);
  const [inputNumber, setInputNumber] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + inputNumber);

  function handleChange(e) {
    // console.log(e.target.value);
    setRange(+e.target.value);
  }

  return (
    <div align="center">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={range}
          onChange={handleChange}
        ></input>
        <span>{range}</span>
      </div>

      <div>
        <button onClick={() => setInputNumber((num) => num - range)}>-</button>
        <input
          type="number"
          value={inputNumber}
          onChange={(e) => setInputNumber(+e.target.value)}
        ></input>
        <button onClick={() => setInputNumber((num) => num + range)}>+</button>
      </div>

      <p>
        <span>
          {inputNumber === 0
            ? "Today is"
            : inputNumber > 0
            ? `${inputNumber} day(s) from today is `
            : `${Math.abs(inputNumber)} day(s) ago was`}
        </span>
        <span> {date.toDateString()}.</span>
      </p>

      {range !== 1 || inputNumber !== 0 ? (
        <div>
          <button
            onClick={() => {
              setRange(1);
              setInputNumber(0);
            }}
          >
            Reset
          </button>
        </div>
      ) : null}
    </div>
  );
}
