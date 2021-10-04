//GridLogic.js
//This component keeps track of all the logic necessary for the grid to work.

import React, { useEffect, useContext } from "react";
//Importing a custom useEffect that will allow to render after a certain period
import useInterval from "../../helpers/hooks/useInterval";

//Importing useContext from GameOfLife.js
import {
  IsRunning,
  Generation,
  PopulationState,
  SizeGrid,
  InitializeGrid,
  SetGrid,
} from "../../containers/GameOfLife";
//Importing constants from an external mock up
import { operations } from "../../helpers/constants";
//Importing graphic component
import GridComponent from "./GridComponent";

const Grid = () => {
  //setting up states
  const { rows, columns } = useContext(SizeGrid);
  const { grid, setGrid } = useContext(SetGrid);
  const { running } = useContext(IsRunning);
  const { initializeGrid } = useContext(InitializeGrid);
  const { generazione, setGenerazione } = useContext(Generation);
  const { setPopulation } = useContext(PopulationState);

  //useEffect that will be running at the first rendering and create an empty grid with default size (20x20)
  useEffect(() => {
    initializeGrid();
  }, [rows, columns]);

  //this is the function that allow to run Conway's Game of Life and where we are applying game's of life rules.
  const runSimulation = () => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        let neighbours = 0;
        operations.forEach(([x, y]) => {
          const newRowIndex = rowIndex + x;
          const newColumnIndex = columnIndex + y;
          if (
            newRowIndex >= 0 &&
            newRowIndex < rows &&
            newColumnIndex >= 0 &&
            newColumnIndex < columns
          ) {
            neighbours += grid[newRowIndex][newColumnIndex];
          }
        });
        //With these conditions we are going to establish the rules of the game.
        //Any live cell with fewer than 2 or more than 3 will die.
        //Any dead cell with exactly three live neighbours becomes a live cell.
        if (neighbours < 2 || neighbours > 3) {
          newGrid[rowIndex][columnIndex] = 0;
        } else if (grid[rowIndex][columnIndex] === 0 && neighbours === 3) {
          newGrid[rowIndex][columnIndex] = 1;
        }
      }
    }
    return setGrid(newGrid);
  };

  //This function will allows to calculate how many cells are alive
  const checkPopulation = () => {
    let counter = 0;
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        if (grid[rowIndex][columnIndex] === 1) {
          counter++;
        }
      }
    }
    setPopulation(counter);
  };

  //This custom useEffect will allows to set a timeout and call the sSimulation" function again to proceed with the game.
  //It will works only if running is set as true.
  //It will also update grid, population and generation.
  useInterval(() => {
    if (!running) {
      return;
    }
    checkPopulation();
    runSimulation();
    setGenerazione(generazione + 1);
  }, 1000);

  //This function will allows to set custom cells by user click.
  //Every click will update the grid and also population state.
  const deadOrAlive = (columnIndex, rowIndex) => {
    const newGrid = grid.slice();
    newGrid[columnIndex][rowIndex] = newGrid[columnIndex][rowIndex] ? 0 : 1;
    setGrid(newGrid);
    checkPopulation();
  };

  //returning graphic component that will build the grid.
  return (
    <GridComponent deadOrAlive={(column, row) => deadOrAlive(column, row)} />
  );
};

export default Grid;
