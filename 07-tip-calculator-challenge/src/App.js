//// For input element use empty string as default
//// For select element use 0 as default

import { use, useState } from "react";

export default function App() {
  return (
    <div>
      <InputTest />
      <SelectTest />
    </div>
  );
}

function InputTest() {
  const [inputValue, setInputValue] = useState("50");
  // Can be a number or a string as default value
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(+e.target.value)}
      ></input>
    </div>
  );
}

function SelectTest() {
  const [optionValue, setOptionValue] = useState("");
  // Can be a text or number as default
  return (
    <div>
      <select
        value={optionValue}
        onChange={(e) => setOptionValue(+e.target.value)}
      >
        <option value="0">test option 1</option>
        <option value="1">test option 2</option>
      </select>
    </div>
  );
}
