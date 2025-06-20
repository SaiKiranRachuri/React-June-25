//// Building a form and handling submissions: line 38, 36
// Event listener can be added to Add button however, on adding it to form will aid in listening to the event on Enter press.
// line 32: prevent default prevents a brief page reload on click the enter to submit form. If not prevented it violates react concept of single page application.

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 2, description: "Shoe", quantity: 2, packed: false },
  { id: 2, description: "T-shirts", quantity: 2, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
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

function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select>
        {/* <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option> */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <input type="text" placeholder="text..."></input>
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item obj={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ obj }) {
  // console.log(obj);
  return (
    <li>
      <span style={obj.packed ? { textDecoration: "line-through" } : {}}>
        {obj.quantity}
        {" " + obj.description}
      </span>
      <button>❌</button>
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
