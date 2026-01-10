function Questions({ question, dispatch, answer }) {
  console.log(question);
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      <h4>{question.question}</h4>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Questions;
