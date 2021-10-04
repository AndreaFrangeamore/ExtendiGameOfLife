//Buttons.js
//This component is used to build the different buttons below the grid

import React, { useContext } from "react";

//Importing useContext from GameOfLife.js
import {
  IsRunning,
  ResetButton,
  RandomGrid,
} from "../../containers/GameOfLife";

//Importing styled-components that I used for this project to style components.
import styled from "styled-components";

//Applying style to different html tag
const MainDiv = styled.div`
  text-align: center;
  margin: 2em 0em 2em 0em;
`;

const Button = styled.button`
  display: inline-block;
  border-radius: 20px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 4rem;
  background: transparent;
  color: green;
  border: 2px solid black;
`;

const Buttons = () => {
  //setting up states
  const { running, setRunning } = useContext(IsRunning);
  const { resetButton } = useContext(ResetButton);
  const { randomGrid } = useContext(RandomGrid);

  //This will return all the different buttons and allow them to manage the state.
  //For example, start or stop the simulation, reset it or create a grid with random cells.
  return (
    <MainDiv>
      <Button
        onClick={() => {
          setRunning(!running);
        }}
      >
        {running ? "Stop" : "Start"}
      </Button>
      <Button onClick={() => resetButton()}>Reset</Button>
      <Button onClick={() => randomGrid()}>Random</Button>
    </MainDiv>
  );
};

export default Buttons;
