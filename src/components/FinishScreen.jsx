const FinishScreen = ({ totalPoints, points, highestScore, dispatch }) => {
  // Calculating the percentage of points scored
  const percentage = (points / totalPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> /{" "}
        <strong>
          {totalPoints} ({Math.ceil(percentage)}%)
        </strong>
        points.
      </p>
      <p className="highscore">(Highest score is: 😎 {highestScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        {" "}
        Retake Quiz{" "}
      </button>
    </>
  );
};

export default FinishScreen;
