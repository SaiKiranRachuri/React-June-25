// //// Derived State: Derived state is computing a new state from existing state.
// //// If new useState hooks are created instead of deriving it increases number of lines of code, state has to be set and increases multiple renders. line 143, 144, 145.

import { useState } from "react";

const initialItems = [
  { id: 1, description: "Wallet", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    // console.log("handleAddItems function:", item);
    setItems((items) => [...items, item]);
    // Creating new array React is about immutability, we create a new array.
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    console.log(items);
  }

  function handleToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggle}
      />
      <Stats items={items} />
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
    // console.log(newItem);
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  // console.log("New Array:", items);
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            obj={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ obj, onDeleteItem, onToggleItem }) {
  // console.log(obj);

  return (
    <li>
      <input
        type="checkbox"
        value={obj.packed}
        onChange={() => onToggleItem(obj.id)}
      ></input>
      <span style={obj.packed ? { textDecoration: "line-through" } : {}}>
        {obj.quantity}
        {" " + obj.description}
      </span>
      <button onClick={() => onDeleteItem(obj.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  if (!numItems) {
    return (
      <p className="stats">
        <em>Start adding items to the packing list 🚀.</em>
      </p>
    );
  }
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You have packed everything and ready to go. ✈️."
          : `You have ${numItems} items on your list and you have already packed
        ${numPacked}(${percentage}%).`}
      </em>
    </footer>
  );
}
