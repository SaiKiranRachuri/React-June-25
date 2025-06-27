//// For input element use empty string as default
//// For select element use 0 as default

import { use, useState } from "react";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(10);
  const [percentage2, setPercentage2] = useState(0);

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  const tip = (bill * (percentage1 + percentage2)) / 2 / 100;
  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <Feedback percentage={percentage1} onSelect={setPercentage1}>
        How did you like the service?:{" "}
      </Feedback>
      <Feedback percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the service?:{" "}
      </Feedback>

      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset handleReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Bill Input.."
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function Feedback({ children, percentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select value={percentage} onChange={(e) => onSelect(+e.target.value)}>
        <option value="0">Dissatisfied(0%)</option>
        <option value="10">It is Okay(10%)</option>
        <option value="30">Satisfied(30%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <div>
      <h3>
        You pay ${bill + tip} (${bill} + ${tip})
      </h3>
    </div>
  );
}

function Reset({ handleReset }) {
  return (
    <div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
