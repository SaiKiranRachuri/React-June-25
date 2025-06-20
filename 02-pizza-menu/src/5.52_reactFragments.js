//// React fragment: line 75.
// line 77 is rendered even when the pizzas object is empty. To prevent it should be conditional. However, when added conditional, the element has to be wrapped under <div>. But when wrapped on <div> the formatting is incorrect.

// <></> doesn't group the elements. Elements inside these are treated as a separated elements unlike <div>. See DOM tree, our elements <p> and <ul> line 79 and 80 appear separtely.

// <> </> is shorter version of <React.Fragment> </React.Fragment>. Use <React.Fragment> </React.Fragment> when a key is required as attribute.

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

function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];

  const numPizzas = pizzas.length;
  console.log("Number of pizzas:", numPizzas);
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numPizzas > 0 ? (
        <>
          <p> This is an authentic cuisine with delicious pizzas.</p>
          <ul className="pizzas">
            {/* {pizzaData.map((pizza) => (
          <Pizza
          pizzaName={pizza.name}
          ingredients={pizza.ingredients}
          photoName={pizza.photoName}
          price={pizza.price}
          />
          ))} */}

            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
              // Key a property needs for optimization purposes in React
            ))}
          </ul>
        </>
      ) : (
        <p>We are working on our menu please comeback later.</p>
      )}
      {/* <Pizza
        pizzaName="Pizza spinaci"
        photoName="Pizzas/spinaci.jpg"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        // price="630"
        price={400}
      />

      <Pizza
        pizzaName="Pizza Funghi"
        photoName="pizzas/funghi.jpg"
        ingredients="Tomato, mozarella, mushrooms, and onion"
        // price="630"
        price={630}
      /> */}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  // const hour = new Date().getHours();
  // // console.log(hour);
  // const openHour = 12;
  // const closeHour = 21;
  // const isOpen = hour >= openHour && hour <= closeHour;

  //   if (isOpen) {
  //     alert("We are open.");
  //   } else {
  //     alert("We are currently closed.");
  //   }
  // The alert executes twice due to strict mode. In strict mode our components are usually rendered twice.

  if (pizzaObj.soldOut) return null;

  return (
    <li className="pizza">
      <img src={pizzaObj.photoName} alt={pizzaObj.pizzaName}></img>
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.price + 110}</span>
      </div>
    </li>
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

function Footer() {
  // return React.createElement("Footer", null, "We are currently open.");
  const hour = new Date().getHours();
  console.log(hour);
  const openHour = 12;
  const closeHour = 21;
  const isOpen = hour >= openHour && hour <= closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          We are happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
      {/* && Returns first falsy value or last value if all are true. */}
    </footer>
  );
}

function Order(props) {
  return (
    <div className="order">
      <p>
        We are currently open untill {props.closeHour}:00. Come visit us or
        place an order online.
      </p>
      <button className="btn">Order</button>
    </div>
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
