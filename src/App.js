//App.js
//This component will render everything about our application.
import React, { useState } from "react";

//This project was designed to interpret a single page application. For this reason the react-router-dom library is used.
//It will allow us to "navigate" in the different paths of the application.
import { Route, BrowserRouter as Router } from "react-router-dom";

//Importing all containers built.
import GettingInformation from "./containers/GettingInformation";
import GameOfLife from "./containers/GameOfLife";

//InitialState is a global state that we will need in both containers. So just created the context and then pass it at App's childs.
export const InitialState = React.createContext();

const App = () => {
  const [initialState, setInitialState] = useState();
  return (
    <>
      <Router>
        <InitialState.Provider value={{ initialState, setInitialState }}>
          <Route path="/" exact component={GettingInformation} />
          <Route path="/GameOfLife" exact component={GameOfLife} />
        </InitialState.Provider>
      </Router>
    </>
  );
};

export default App;
