import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "../Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";

const initialState = {
  questions: [],
  // loading, error,ready,active, finished
  status: "loading",
  // we need to know the index of the current question
  index: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
const App = () => {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numberOfQuestions = questions.length;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
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
        {status === "active" && <Questions question={questions[index]} />}
      </Main>
    </div>
  );
};

export default App;
