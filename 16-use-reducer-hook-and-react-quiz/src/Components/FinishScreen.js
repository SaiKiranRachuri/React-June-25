function FinishScreen({ points, maxPoints, highScore }) {
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "💥";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🫡";
  if (percentage < 50) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        {emoji} You scored {points} out of {maxPoints} ({Math.ceil(percentage)}
        )%.
      </p>
      <p className="highscore">Highscore : {highScore} points</p>
    </>
  );
}

export default FinishScreen;
