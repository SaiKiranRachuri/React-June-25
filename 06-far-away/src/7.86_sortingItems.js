//// Sorting Items: line 99, 128

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

  function handleClearList() {
    const confirmed = window.confirm("");
    setItems([]);
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
        onClearList={handleClearList}
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

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  // sort method mutates the original array to slice is used to copy original

  if (sortBy === "status")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            obj={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {/* value={"description"} is a default field */}
          <option value={"input"}>Sort By Input Order</option>
          <option value={"description"}>Sort By Description</option>
          <option value={"status"}>Sort By Packed Status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
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
