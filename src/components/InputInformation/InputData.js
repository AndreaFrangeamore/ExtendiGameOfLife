//InputData.js
//This component should contain all unstructured InputData components and allow rendering different blocks.
//In this case we have just one textArea and a button so I decided to build these components directly here.
//This component creates the elements in charge of receiving the information from the user and verifies that they have been entered.

import React, { useContext } from "react";

//Since the application is on different paths we need to redirect it to the next "page" when the user performs a certain action.
import { useHistory } from "react-router-dom";

//Importing context from App.js
import { InitialState } from "../../App";

//Importing styled-components that I used for this project to style components.
import styled from "styled-components";

//Applying style to different html tag
const MainDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: absolute;
  top: 40%;
`;

const TextArea = styled.textarea`
  padding: 10px;
  max-width: 100%;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
`;

const Button = styled.button`
  display: inline-block;
  border-radius: 20px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 8rem;
  background: transparent;
  color: green;
  border: 2px solid black;
  height: 3em;
  margin-top: auto;
  margin-bottom: auto;
`;

const InputData = () => {
  const { initialState, setInitialState } = useContext(InitialState);
  const history = useHistory();

  //As previously mentioned, this component also takes care of verifying that the user has entered some input data before moving on to the next page
  const checkUserInput = () => {
    if (initialState) {
      history.push("GameOfLife");
    }
  };

  return (
    <MainDiv>
      <TextArea
        id="initialState"
        name="initialState"
        rows="6"
        cols="14"
        placeholder="Type initial state..."
        onChange={(e) => setInitialState(e.target.value)}
      />
      <Button onClick={() => checkUserInput()}>Run Game of Life</Button>
    </MainDiv>
  );
};

export default InputData;
