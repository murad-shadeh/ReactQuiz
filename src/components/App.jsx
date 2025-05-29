import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Error from "./Error";
import Loader from "./Loader";
import Timer from "./Timer";
import Footer from "./Footer";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  // loading, error,ready,active, finished
  status: "loading",
  // we need to know the index of the current question
  index: 0,
  answer: null,
  points: 0,
  highestScore: 0,
  // will calculate the remaining seconds once the quiz starts
  remainingSeconds: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        // must check if the answer is correct first to add the points
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highestScore:
          state.points > state.highestScore ? state.points : state.highestScore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        remainingSeconds: null,
      };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        // checking if timer becomes 0
        status: state.remainingSeconds <= 0 ? "finished" : state.status,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
const App = () => {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highestScore,
      remainingSeconds,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numberOfQuestions = questions.length;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://quizserver-ay11.onrender.com/");
        const data = await res.json();
        // console.log(data.message);
        dispatch({ type: "dataReceived", payload: data.message });
      } catch (err) {
        console.log(err);
        dispatch({ type: "dataFailed" });
      }
    };

    fetchData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {/* the status here are used by order */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              totalPoints={totalPoints}
              points={points}
              index={index}
              numberOfQuestions={numberOfQuestions}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numberOfQuestions={numberOfQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            totalPoints={totalPoints}
            points={points}
            dispatch={dispatch}
            highestScore={highestScore}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
