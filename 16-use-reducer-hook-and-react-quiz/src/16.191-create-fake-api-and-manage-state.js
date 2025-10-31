// 1) Creating FAKE API
//    npm i json-server
// 2) Have the questions.json file in a folder
// 3) Create a script for json server in package.json file with a port
//    "server": "json-server --watch data/questions.json --port 9000"
// 4) npm run server on a different terminal
// 5) Open the endpoing

// 6) Load the questions data on mount: useEffect

import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],

  status: "ready",
  // loading, error, ready, active, finished
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    // fetch("http://localhost:9000/questions")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error("Error"));

    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
