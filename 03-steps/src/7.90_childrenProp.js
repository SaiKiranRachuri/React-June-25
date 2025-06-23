//// Children prop: The content that is enclosed in b/w opening and closing tags of a component are treated as the content in child component.
//// Regular prop: The properties that are defined inside the opening tag of a component.

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
      // setStep(step + 1);
      // setStep(step + 1);
      // This is a legit usecase that it should move forward twice. However, React doesn't do that. To make it work use a function to update state with a different variable.

      setStep((s) => s + 1);
      // setStep((s) => s + 1);
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

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

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
    </>
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
