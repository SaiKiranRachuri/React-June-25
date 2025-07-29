//// Batching of multiple setState calls in event handlers
// Here below setAnswer, console.log, setSolved are not updated line by line. setAnser and setSolved are sent together as a batch and are updated.
// The value of answer in console.log is the current state value and NOT the updated value. Because in fiber tree the current state is stored and only fiber tree is updated after rerender is done.
// State updates are Asychronous.

// If we need to update state based on previous update then we use setState with a call back function.

// This automatic batching is done in Event handlers on React17 and React 18. However, in timeOuts, promises and native events(like addEventListener) in React17 auto batching is NOT done and state updates are done line by line.

// In situations where auto batching is problematic and to STOP it use
// wrap the state update in ReactDOM.flushSync()

import { useState } from "react";

export default function App() {
  const [answer, setAnswer] = useState("test");
  const [solved, setSolved] = useState("test");

  const reset = function () {
    setAnswer(" ");
    console.log(answer);
    setSolved(" ");
  };

  return (
    <div>
      <button onClick={reset}></button>
    </div>
  );
}
