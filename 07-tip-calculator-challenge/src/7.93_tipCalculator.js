import { useState } from "react";

export default function App() {
  return (
    <div>
      <Bill />
      <Feedback />
      <Message />
      <ResetButton />
    </div>
  );
}

function Bill() {
  const [bill, setBill] = useState();
  return (
    <div>
      <input
        type="number"
        placeholder="Input bill...."
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      ></input>
    </div>
  );
}

function Feedback() {
  const [percentage, setPercentage] = useState("30");
  return (
    <div>
      <label>How likely the service is: </label>
      <select
        value={percentage}
        onChange={(e) => {
          setPercentage(+e.target.value);
          console.log(percentage);
        }}
      >
        <option value="30">Satisfied(30%)</option>
        <option value="10">Disatisfied(10%)</option>
      </select>
    </div>
  );
}

function Message() {
  return (
    <div>
      <p></p>
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
