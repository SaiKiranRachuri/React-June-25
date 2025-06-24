//// Reusability using children prop: line 40, 61

import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);

  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  }

  return (
    // <div>
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : " "}>1</div>
            <div className={step >= 2 ? "active" : " "}>2</div>
            <div className={step >= 3 ? "active" : " "}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button bgColor="#7950f2" color="#fff" onClick={handlePrevious}>
              <span>👈</span>Previous
            </Button>

            <Button bgColor="#7950f2" color="#fff" onClick={handleNext}>
              Next<span>👉</span>
            </Button>
          </div>
        </div>
      )}
      {/* </div> */}
      <div>
        <StepMessage step={step}>{messages[step - 1]}</StepMessage>
      </div>
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div>
      <p className="message">
        Step {step}: {children}
      </p>
    </div>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <div>
      <button
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
