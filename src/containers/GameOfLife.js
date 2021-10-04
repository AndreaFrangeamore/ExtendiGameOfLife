//GameOfLije.js
//This component is a container that will render all components which concern a specific section.
import React, { useState, useContext, useEffect } from "react";

//This component has a double check, if the user has not entered the initial status, he will be redirected to the homepage. For this we use useHistory.
import { useHistory } from "react-router-dom";

//Importing all containers of components
import OutputInitialState from "../components/OutputIntialState";
import Grid from "../components/Grid";
import HandlerState from "../components/HandlerState";
import RenderUserOutput from "../components/RenderUserOutput";

//Importing context from App.js
import { InitialState } from "../App";

//creating Context that will be used in all GameOfLife's childs
export const IsRunning = React.createContext();
export const SizeGrid = React.createContext();
export const SetGrid = React.createContext();
export const Generation = React.createContext();
export const PopulationState = React.createContext();
export const InitializeGrid = React.createContext();
export const RandomGrid = React.createContext();
export const ResetButton = React.createContext();
export const DataFromUser = React.createContext();

const GameOfLife = () => {
  //setting up states
  const [rows, setRows] = useState();
  const [grid, setGrid] = useState([]);
  const [columns, setColumns] = useState();
  const [generazione, setGenerazione] = useState(0);
  const [population, setPopulation] = useState(0);
  const [populationState, setPopulationState] = useState([]);
  const [dataFromUser, setDataFromUser] = useState(false);
  const [running, setRunning] = useState(false);
  const { initialState, setInitialState } = useContext(InitialState);
  const history = useHistory();

  //This function is used to verify the insertion of the initial state, modulate it as dynamically as possible and set the different states that will be used later. It also redirects the user to the home if necessary.
  useEffect(() => {
    if (initialState) {
      setInitialState(
        initialState.replace(/\s/g, "").replace(/[.]/g, 0).replace(/[*]/g, 1)
      );
      let handleInitialState = initialState;
      let generationUser = handleInitialState
        .split("Generation")[1]
        .split(":")[0];
      let rowsUser = handleInitialState.split(":")[1].slice(0, 1);
      let columnsUser = handleInitialState.split(`${rowsUser}`)[1].slice(0, 1);
      let populationState = [...handleInitialState.split(`${columnsUser}`)[1]];
      console.log(populationState, "populationState");
      setPopulationState(populationState);
      setRows(rowsUser);
      setColumns(columnsUser);
      setGenerazione(parseInt(generationUser));
      setDataFromUser(true);
    }
    //To avoid problems or incorrect renderings, if the user refreshes the gameoflife page, he will be brought back to the home page waiting for him to enter an initial status.
    else return history.push("/");
  }, [initialState]);

  //This function allows you to create a grid that is requested by the user or simply empty ready to be customized.
  //If the data comes from the user, the number of live cells will also count.
  const initializeGrid = () => {
    const grid = [];
    let counter = 0;
    let aliveCounter = 0;
    for (let rowIndex = 0; rowIndex < rows && rows; rowIndex++) {
      grid[rowIndex] = [];
      for (
        let columnIndex = 0;
        columnIndex < columns && columns;
        columnIndex++
      ) {
        if (dataFromUser) {
          grid[rowIndex][columnIndex] = parseInt(populationState[counter]);
          counter++;
          if (grid[rowIndex][columnIndex] === 1) {
            aliveCounter++;
          }
        } else grid[rowIndex][columnIndex] = 0;
      }
    }
    setGrid(grid);
    if (dataFromUser) {
      setPopulation(aliveCounter);
      setDataFromUser(false);
    }
  };

  //function that will erase states, stop running and rebuild user's input
  const resetButton = () => {
    setRunning(false);
    initializeGrid();
    setGenerazione(0);
  };

  //function that will create a new grid with random cells alive, erase all previous states and count new population
  const randomGrid = () => {
    const newGrid = [];
    let counter = 0;
    for (let rowIndex = 0; rowIndex < rows && rows; rowIndex++) {
      newGrid[rowIndex] = [];
      for (
        let columnIndex = 0;
        columnIndex < columns && columns;
        columnIndex++
      ) {
        newGrid[rowIndex][columnIndex] = Math.random() > 0.6 ? 1 : 0;
        if (newGrid[rowIndex][columnIndex] === 1) {
          counter++;
        }
      }
    }
    setRunning(false);
    setPopulation(counter);
    setGenerazione(0);
    setGrid(newGrid);
  };

  //This return will wrapp components inside Provider to allow useContext
  return (
    <>
      <IsRunning.Provider value={{ running, setRunning }}>
        <SizeGrid.Provider value={{ rows, columns, setRows, setColumns }}>
          <Generation.Provider value={{ generazione, setGenerazione }}>
            <PopulationState.Provider value={{ population, setPopulation }}>
              <OutputInitialState />
              <InitializeGrid.Provider value={{ initializeGrid }}>
                <RandomGrid.Provider value={{ randomGrid }}>
                  <ResetButton.Provider value={{ resetButton }}>
                    <SetGrid.Provider value={{ grid, setGrid }}>
                      <DataFromUser.Provider value={{ dataFromUser, setDataFromUser }}>
                        <Grid />
                        <HandlerState />
                        <RenderUserOutput />
                      </DataFromUser.Provider>
                    </SetGrid.Provider>
                  </ResetButton.Provider>
                </RandomGrid.Provider>
              </InitializeGrid.Provider>
            </PopulationState.Provider>
          </Generation.Provider>
        </SizeGrid.Provider>
      </IsRunning.Provider>
    </>
  );
};

export default GameOfLife;
