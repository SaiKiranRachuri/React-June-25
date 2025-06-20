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
  return (
    <div className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
    </div>
  );
}

function PackingList() {
  return <div className="list">List</div>;
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list and you have already packed X(X%).</em>
    </footer>
  );
}
