const Progress = ({
  index,
  numberOfQuestions,
  points,
  totalPoints,
  answer,
}) => {
  return (
    <header className="progress">
      {/* progress bar must be empty first && checking if the answer is right or wrong to change the progress accordingly*/}
      <progress max={totalPoints} value={index + Number(answer !== null)} />
      <p>
        {/* add one because indeces are zero based */}
        Question <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
};

export default Progress;
