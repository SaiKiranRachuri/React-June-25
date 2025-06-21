export default function Stats({ items }) {
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
