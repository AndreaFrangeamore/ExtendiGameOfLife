//OutputIntialState/index.js
//This component should contain all unstructured OutputInitialState components and allow rendering different blocks.
//In this case we have just few inputs so I decided to build these components directly here.
//So this component creates all the output interfaces graphically present above the gri
import React, { useContext } from "react";
//Importing useContext from GameOfLife.js
import {
  Generation,
  PopulationState,
  SizeGrid,
} from "../../containers/GameOfLife";
//Importing styled-components that I used for this project to style components.
import styled from "styled-components";

//Applying style to different html tag
const MainDiv = styled.div`
  width: 100%;
  text-align: center;
  margin: 2em 0em 2em 0em;
`;

//Applying style to different html tag
const Input = styled.input`
  font-size: 15px;
  width: 100px;
  padding: 10px;
  margin: 10px;
  border-radius: 3px;
  border: solid 2px black;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 4px black;
  }
`;

const DivTitle = styled.div`
  display: flex;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 15px;
  width: 104px;
  padding: 10px 10px 0px;
  margin: 10px 10px 0px; ;
`;

const Textfields = () => {
  //setting up states
  const { rows, columns } = useContext(SizeGrid);
  const { generazione } = useContext(Generation);
  const { population } = useContext(PopulationState);

  //Return graphic components that will display information about state in application.
  return (
    <MainDiv>
      <DivTitle>
        <Text>Current generation</Text>
      </DivTitle>
      <DivTitle>
        <Text>Generation</Text>
        <Text>Rows</Text>
        <Text>Columns</Text>
        <Text>Population</Text>
      </DivTitle>
      <Input
        type="number"
        value={generazione && generazione}
        // onChange={(e) => setGenerazione(parseInt(e.target.value))}
        placeholder="Generazione"
        disabled
      />
      <Input
        type="number"
        value={rows && rows}
        // onChange={(e) => setRows(e.target.value)}
        placeholder="Rows"
        disabled
      />
      <Input
        type="number"
        value={columns && columns}
        // onChange={(e) => setColumns(e.target.value)}
        placeholder="Columns"
        disabled
      />
      <Input
        type="number"
        value={population && population}
        placeholder="Popolazione"
        disabled
      />
    </MainDiv>
  );
};

export default Textfields;
