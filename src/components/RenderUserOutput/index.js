//RenderUserOutput.js
//This component graphically renders an output concerning the next generation, in response to the user's input.

import React, { useContext, useEffect, useState } from "react";

import { InitialState } from "../../App";
import { DataFromUser, SetGrid } from "../../containers/GameOfLife";

import { operations } from "../../helpers/constants";
import styled from "styled-components";

//Applying style to different html tag
const MainDiv = styled.div`
  width: 100%;
  text-align: center;
`;

const TextAreaDiv = styled.div`
  width: 100%;
  justify-content: center;
`;

const TextArea = styled.textarea`
  padding: 10px;
  max-width: 100%;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
`;

const SpanTitle = styled.span`
  text-align: center;
  margin: 1em;
`;

const RenderUserOutput = () => {
  const { initialState } = useContext(InitialState);
  const { grid } = useContext(SetGrid);
  const { dataFromUser, setDataFromUser } = useContext(DataFromUser);
  const [nextGeneration, setNextGeneration] = useState("");

  //This function will manipulate the example string, received from the user, to perform the calculation of the next generation.
  useEffect(() => {
    if (grid.length > 1 && dataFromUser === false) {
      let handleInitialState = initialState;
      let generationUser = handleInitialState
        .split("Generation")[1]
        .split(":")[0];
      let rowsUser = handleInitialState.split(":")[1].slice(0, 1);
      let columnsUser = handleInitialState.split(`${rowsUser}`)[1].slice(0, 1);

      let populationUser;
      let newGrid = JSON.parse(JSON.stringify(grid));
      for (let rowIndex = 0; rowIndex < rowsUser; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnsUser; columnIndex++) {
          let neighbours = 0;
          operations.forEach(([x, y]) => {
            const newRowIndex = rowIndex + x;
            const newColumnIndex = columnIndex + y;
            if (
              newRowIndex >= 0 &&
              newRowIndex < rowsUser &&
              newColumnIndex >= 0 &&
              newColumnIndex < columnsUser
            ) {
              neighbours += grid[newRowIndex][newColumnIndex];
            }
          });
          if (neighbours < 2 || neighbours > 3) {
            newGrid[rowIndex][columnIndex] = 0;
          } else if (grid[rowIndex][columnIndex] === 0 && neighbours === 3) {
            newGrid[rowIndex][columnIndex] = 1;
          }
        }
      }
      populationUser = newGrid
        .toString()
        .replace(/0/g, ".")
        .replace(/1/g, "*")
        .replace(/,/g, "")
        .replace(/.{8}/g, "$&\n");
      let newGeneration = `Generation ${
        parseInt(generationUser) + 1
      }: ${rowsUser} ${columnsUser}\n${populationUser}`;
      setNextGeneration(newGeneration);
      setDataFromUser(true);
    }
  }, [grid]);

  return (
    <MainDiv>
      <SpanTitle>Output user's next generation</SpanTitle>
      <TextAreaDiv>
        <TextArea
          id="initialState"
          name="initialState"
          rows="6"
          cols="14"
          value={nextGeneration && nextGeneration}
          disabled
        />
      </TextAreaDiv>
    </MainDiv>
  );
};

export default RenderUserOutput;
