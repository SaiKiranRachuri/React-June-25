////19.245 Optimatization technique leveraging the children prop
// Component Tree <Test><Counter><SlowComponent>
// 1) Below SlowComponent renders everytime when there is a state update in parent component Test
// 2) In App.js and List function, add the Test component to render words
// 3) Solution: SlowComponent is already been created and cannot be rendered due to state update in Test component and is leveraged by using children prop. Profiler tool - check SlowComponent that it don't rerender.

import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

export function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function Test() {
  return (
    <div>
      <Counter>
        <SlowComponent />
      </Counter>
    </div>
  );
}
