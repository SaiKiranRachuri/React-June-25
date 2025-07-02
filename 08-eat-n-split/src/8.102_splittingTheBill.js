// Splitting the bill: line 196, 185 to 193
// 1) Prevent default
// 2) Guard clause if there is no bill or expense
// 3) Receives the balance to updated on selected friend from variable "value"

// Handling split bill: line 52 to 62
// 1) Take all friends data and update balance of current friend
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

  const [friends, setFriends] = useState(initialFriends);

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowForm() {
    setShowAddForm((showFriendForm) => !showFriendForm);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddForm(false);
  }

  function handleSelection(curFriend) {
    // setSelectedFriend(curFriend);
    setSelectedFriend(selectedFriend?.id === curFriend.id ? null : curFriend); // Set state to null if click is done on already displayed friend.
    setShowAddForm(false); // Ensuring add friend form is closed when split bill is opened
  }

  function handleSplitBill(value) {
    // console.log(value);

    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }

  return (
    <div className="app">
      <FriendsList
        friends={friends}
        onSelection={handleSelection}
        selectedFriend={selectedFriend}
      />

      {showAddForm && <FormAddFriend onAddFriend={handleAddFriend} />}

      <Button onClick={handleShowForm}>
        {showAddForm ? "Close" : "Add Friend"}
      </Button>

      <div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id; // To toggle b/w open and close on select friends list
  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !imageUrl) return;

    const id = crypto.randomUUID();

    const newFriend = {
      name,
      imageUrl: `${imageUrl}?u=${id}`,
      balance: 0,
      id: id,
    };
    // console.log(newFriend.imageUrl);
    onAddFriend(newFriend);

    setName("");
    setImageUrl("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend Name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Image URL </label>
      <input type="text" value={imageUrl} />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [option, setOption] = useState("user");
  const paidByFriend = bill - paidByUser;

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    // onSplitBill(-50);
    onSplitBill(option === "user" ? paidByFriend : -paidByUser);
    // If user pays: User owes from friend
    // If friend pays: User lends to friend.
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>
      <label>💵 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>🕴️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => {
          // setPaidByUser(+e.target.value);
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : +e.target.value
          );
          // Sets only when user expense is less than bill. If user expense entered is greater than the bill then set the user expense before to it.
        }}
      />

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select value={option} onChange={(e) => setOption(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
