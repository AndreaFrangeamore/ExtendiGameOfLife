//GridComponent.js
//this GridComponent will build the grid.

import React, { useContext } from "react";

//Importing styled-components that I used for this project to style components.
import styled from "styled-components";

//Importing useContext from GameOfLife.js
import { SetGrid, SizeGrid } from "../../containers/GameOfLife";

//Applying style to different html tag
const MainDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: ${({ $columns }) =>
    $columns ? `repeat(${$columns}, 20px)` : undefined};
`;

const DivCells = styled.div`
  width: 20px;
  height: 20px;
  border: solid 1px black;
  background-color: ${({ alive }) => (alive ? "red" : undefined)};
`;

//Initializing props coming from container.
//deadOrAlive is a function that is coming from the parent: GridLogic.js
const GridComponent = ({ deadOrAlive }) => {
  //setting up states
  const { columns } = useContext(SizeGrid);
  const { grid } = useContext(SetGrid);

  //Return a map which creates a grid dynamically based on the props received
  return (
    <>
      <MainDiv $columns={columns}>
        {grid.map((rows, columnIndex) => {
          return rows.map((cellState, rowIndex) => {
            return (
              <DivCells
                key={`${columnIndex}_${rowIndex}`}
                onClick={() => deadOrAlive(columnIndex, rowIndex)}
                alive={grid[columnIndex][rowIndex]}
              />
            );
          });
        })}
      </MainDiv>
    </>
  );
};

export default GridComponent;
