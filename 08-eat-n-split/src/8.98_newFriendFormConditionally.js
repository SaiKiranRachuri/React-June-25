//// Display add friend form conditionally: line 34, 35, 36, 37, 80.

import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  function handleShowForm() {
    setShowAddForm((showFriendForm) => !showFriendForm);
  }
  return (
    <div className="app">
      <FriendsList />
      {showAddForm && <FormAddFriend />}
      <Button onClick={handleShowForm}>
        {showAddForm ? "Close" : "Add Friend"}
      </Button>
      <div>
        <FormSplitBill />
      </div>
    </div>
  );
}

function FriendsList() {
  return (
    <div className="sidebar">
      <ul>
        {initialFriends.map((friend) => (
          <Friend friend={friend} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${friend.balance}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          ${friend.name} owes you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🧑‍🤝‍🧑Friend Name </label>
      <input type="text" />

      <label>🖼️ Image URL </label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH X</h2>
      <label>💵 Bill Value</label>
      <input type="text" />

      <label>🕴️ Your expense</label>
      <input type="text" />

      <label>🧑‍🤝‍🧑 X's Expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
