///// Styling React applications: Styling can be done using inline or external or using Tailwind: Line 88, 5

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  const time = new Date().toLocaleTimeString();
  return (
    <div className="container">
      {/* <h1>Hello React! It's {time}.</h1> */}
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Pizza() {
  const hour = new Date().getHours();
  // console.log(hour);
  const openHour = 12;
  const closeHour = 21;
  const isOpen = hour >= openHour && hour <= closeHour;

  //   if (isOpen) {
  //     alert("We are open.");
  //   } else {
  //     alert("We are currently closed.");
  //   }
  // The alert executes twice due to strict mode. In strict mode our components are usually rendered twice.

  return (
    <div>
      <img src="Pizzas/spinaci.jpg" alt="Pizza spinaci"></img>
      <h3>Pizza Spinaci</h3>
      <p>Tomato, mozarella, spinach, and ricotta cheese</p>
    </div>
  );
}

function Header() {
  const style = {
    color: "orange",
    fontSize: "48px",
    textTransform: "uppercase",
  };
  return (
    // <h1
    //   style={{ color: "orange", fontSize: "48px", textTransform: "uppercase" }}
    // >
    //   Fast Pizza Co.
    // </h1>
    <header className="header">
      <h1 style={style}>Fast Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <Pizza />
      <Pizza />
      <Pizza />
    </main>
  );
}

function Footer() {
  // return React.createElement("Footer", null, "We are currently open.");
  return (
    <footer className="footer">
      {new Date().toLocaleTimeString()}. We are currently Open.
    </footer>
  );
}

// React version 18
const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
