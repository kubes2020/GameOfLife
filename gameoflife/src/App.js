import React, { useState, useEffect } from "react";
import "./Styles/App.css";
import Grid from "./components/Grid.js";
import { GridContext } from "./components/contexts/GridContext.js";

function App() {
  // this is an array of objects with: row, col, isAlive
  const [startingGrid, setStartingGrid] = useState();

  useEffect(() => {
    console.log("this is starting grid from app.js", startingGrid);
  }, [startingGrid]);

  return (
    <GridContext.Provider value={{ startingGrid, setStartingGrid }}>
      <div>
        <Grid></Grid>
      </div>
    </GridContext.Provider>
  );
}

export default App;
