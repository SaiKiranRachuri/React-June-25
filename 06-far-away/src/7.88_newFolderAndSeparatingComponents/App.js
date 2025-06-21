//// Clearing list: line 23, 144

import { useState } from "react";
import Stats from "./Stats";
import PackingList from "./PackingList";
import Form from "./Form";
import Logo from "./Logo";

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
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
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
