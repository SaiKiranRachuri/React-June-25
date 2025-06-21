export default function Item({ obj, onDeleteItem, onToggleItem }) {
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
