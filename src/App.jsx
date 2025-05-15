import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  // loading, error,ready,active, finished
  status: "loading",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispactch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispactch({ type: "dataFailed" });
      }
    };

    fetchData();
  }, []);
  const [state, dispactch] = useReducer(reducer, initialState);
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
};

export default App;
