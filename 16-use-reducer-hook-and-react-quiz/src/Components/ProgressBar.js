function ProgressBar({ numQuestions, index, answer }) {
  return (
    <header>
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
    </header>
  );
}

export default ProgressBar;
