import { useState } from "react";

export default function App() {
  const [feedbackPercentage, setFeedbackPercentage] = useState("satisfied");
  const [bill, setBill] = useState(null);
  const [totalBill, setTotalBill] = useState(0);
  let percentage;
  // console.log("Percentage:", percentage);

  function calcPercentage(value) {
    return setFeedbackPercentage(value === "satisfied" ? 30 : 10);
  }

  return (
    <div>
      <Bill
        totalBill={totalBill}
        setTotalBill={setTotalBill}
        percentage={percentage}
      />
      <Feedback
        feedbackPercentage={feedbackPercentage}
        setFeedbackPercentage={setFeedbackPercentage}
        totalBill={totalBill}
        setTotalBill={setTotalBill}
        percentage={percentage}
        calcPercentage={calcPercentage}
      />
      <TotalMessage
        feedbackPercentage={feedbackPercentage}
        setFeedbackPercentage={setFeedbackPercentage}
        bill={bill}
        setBill={setBill}
        totalBill={totalBill}
        setTotalBill={setTotalBill}
      />
      <ResetButton />
    </div>
  );
}

function Bill({ setTotalBill, percentage }) {
  const [bill, setBill] = useState("");
  return (
    <div>
      <p>How much was the bill?</p>
      <input
        type="number"
        value={bill}
        onChange={(e) => {
          setBill(+e.target.value);
          setTotalBill(() => bill + (bill * percentage) / 100);
        }}
      ></input>
      {console.log(bill)}
    </div>
  );
}

function Feedback({
  feedbackPercentage,
  setFeedbackPercentage,
  setTotalBill,
  bill,
  percentage,
  calcPercentage,
}) {
  return (
    <div>
      <p>How did you like the service?</p>
      <select
        value={feedbackPercentage}
        onChange={(e) => {
          calcPercentage(e.target.value);
          // setFeedbackPercentage(+e.target.value);
          // console.log("e.target.value:", e.target.value);
          setTotalBill(() => bill + (bill * percentage) / 100);
        }}
      >
        <option value="satisfied">Satisfied(30%)</option>
        <option value="dissatisfied">Dissatisfied(10%)</option>
        {/* {console.log(feedbackPercentage)} */}
      </select>
    </div>
  );
}

function TotalMessage({
  feedbackPercentage,
  setFeedbackPercentage,
  bill,
  setBill,
  totalBill,
}) {
  console.log("Total bill:", totalBill);

  return (
    <div>
      <p>You pay ${totalBill}.</p>
    </div>
  );
}

function ResetButton() {
  return (
    <div>
      <button>Reset</button>
    </div>
  );
}
