//GettingInformation.js
//This component is a container that will render all components which concern a specific section.
import React, { useState } from "react";

//Here we are going to import various elements into our container that can be defined as atoms, molecules or organism according to atomic design.
import InputInformation from "../components/InputInformation";

export const Generation = React.createContext();
export const GridSize = React.createContext();

const GettingInformation = () => {
  const [generation, setGeneration] = useState(0);
  const [gridSize, setGridSize] = useState(0);

  return (
    <Generation.Provider value={{ generation, setGeneration }}>
      <GridSize.Provider value={{ gridSize, setGridSize }}>
        <InputInformation />
      </GridSize.Provider>
    </Generation.Provider>
  );
};

export default GettingInformation;
