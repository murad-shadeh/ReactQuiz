const FinishScreen = ({ totalPoints, points, highestScore }) => {
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
    </>
  );
};

export default FinishScreen;
