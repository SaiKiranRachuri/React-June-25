//// Child to parent comms. Delete item line: 18, 107, 99, 92 ,86.

import { useState } from "react";

const initialItems = [
  { id: 1, description: "Wallet", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState([initialItems]);

  function handleAddItems(item) {
    console.log("handleAddItems function:", item);
    setItems((items) => [...items, item]);
    // Creating new array React is about immutability, we create a new array.
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    console.log(items);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1> 🌴 FAR AWAY 🧳 </h1>
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);

    // Resetting fields after submitting
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {/* + converts the select field to number */}
        {/* <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option> */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="text..."
        value={description}
        onChange={(e) => {
          // console.log(e.target.value);
          setDescription(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem }) {
  console.log("New Array:", items);
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item obj={item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ obj, onDeleteItem }) {
  // console.log(obj);
  return (
    <li>
      <span style={obj.packed ? { textDecoration: "line-through" } : {}}>
        {obj.quantity}
        {" " + obj.description}
      </span>
      <button onClick={() => onDeleteItem(obj.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list and you have already packed X(X%).</em>
    </footer>
  );
}
