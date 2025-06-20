///// Javascript logic in components: line 71

// index.js naming convention is mandatory because the module bundler webpack expects the entry point to be index.js
import React from "react";
import ReactDOM from "react-dom/client";

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
    <div>
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
      <h2>Pizza Spinaci</h2>
      <p>Tomato, mozarella, spinach, and ricotta cheese</p>
    </div>
  );
}

function Header() {
  return <h1>Fast Pizza Co.</h1>;
}

function Menu() {
  return (
    <div>
      <Pizza />
      <Pizza />
      <Pizza />
    </div>
  );
}

function Footer() {
  // return React.createElement("Footer", null, "We are currently open.");
  return (
    <footer>{new Date().toLocaleTimeString()}. We are currently Open.</footer>
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
// </React.StrictMode> is a react component rendered twice to find bugs and also to check if we are using outdated things of react.
