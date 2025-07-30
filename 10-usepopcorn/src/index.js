import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./App";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarRating maxRating={5} />
    <StarRating color="red" size={20} className="test" />
    <StarRating />
  </React.StrictMode>
);
