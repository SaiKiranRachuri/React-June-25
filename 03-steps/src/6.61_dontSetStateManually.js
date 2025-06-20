//// Setting the state manually: line 14, 15, 24
//// BAD practice: Mutating object: line 27, 18 as react is all about immutability

import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  // const arr = useState(1);
  // console.log(arr); // useState Retuns an array with default value and a function that updates state.

  // let [step] = useState(1);
  let [step, setStep] = useState(1);
  // All the react functions that start with use are called hooks. useState, useReducer.

  // let [test] = useState({ name: "Kiran" });
  let [test, setTest] = useState({ name: "Kiran" });

  function handlePrevious() {
    // if (step > 1) setStep(step - 1);
  }

  function handleNext() {
    if (step < 3) setStep(step + 1);
    // step = step + 1;
    // test.name = "Sai";
    setTest({ name: "Sai" });
  }

  // const step = 1;
  return (
    <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? "active" : " "}>1</div>
        <div className={step >= 2 ? "active" : " "}>2</div>
        <div className={step >= 3 ? "active" : " "}>3</div>
      </div>

      <p className="message">
        Step {step}: {messages[step - 1]}
        {test.name}
      </p>

      <div className="buttons">
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
