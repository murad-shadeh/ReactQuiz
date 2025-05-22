const NextButton = ({ dispatch, answer, numberOfQuestions, index }) => {
  // edge case
  if (answer === null) return null;
  // if we are NOT at the last question we want to show the next button
  if (index < numberOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  // if we are at the last question we want to show the finish button
  if (index === numberOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Submit Answers
      </button>
    );
};

export default NextButton;
