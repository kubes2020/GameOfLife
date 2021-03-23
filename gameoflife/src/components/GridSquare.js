import React, { useContext, useEffect, useState } from "react";
import { GridContext } from "./contexts/GridContext.js";

function GridSqaure() {
  const { startingGrid } = useContext(GridContext);
  const [display, setDisplay] = useState();
  useEffect(() => {
    try {
      if (startingGrid.length > 0) {
        console.log(
          "there is data coming into gridsquare",
          startingGrid[0].row
        );
        setDisplay = startingGrid[0].row + ", " + startingGrid[0].col;
      }
    } catch {
      console.log("no data!");
    }
  }, [startingGrid]);
  return (
    <>
      <div>
        <h6>{display}</h6>
      </div>
    </>
  );
}

export default GridSqaure;
