function Progress({ index, numQuestions, points, maxPoints }) {
  return (
    <header className="progress">
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        Points {points}/{maxPoints}
      </p>
    </header>
  );
}

export default Progress;
