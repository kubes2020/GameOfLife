import React, { useContext, useEffect, useCallback, useState } from "react";
import "../Styles/Grid.css";
import GridSquare from "./GridSquare.js";
import { GridContext } from "./contexts/GridContext.js";
import GameLogic from "./GameLogic.js";
import { clone } from "ramda";

function Grid() {
  // const { startingGrid, setStartingGrid } = useContext(GridContext);

  let grid1 = [];
  let row = 0;
  let col = 0;

  while (row < 10) {
    for (col = 0; col < 10; col++) {
      if (
        (row === 4 && col === 5) ||
        (row === 5 && col === 5) ||
        (row === 6 && col === 5)
      ) {
        grid1.push({
          row: row,
          col: col,
          isAlive: 1,
        });
      } else {
        grid1.push({
          row: row,
          col: col,
          isAlive: 0,
        });
      }

      // grid1.push(<div className="box">{col}</div>);
    }
    row += 1;
  }
  const [startingGrid, setStartingGrid] = useState(grid1);

  const grid2 = clone(grid1);

  // const makeGrid = useCallback((startingGrid) => {
  //   if (startingGrid !== null) {
  //     setStartingGrid(grid1);
  //   }
  // }, []);

  return (
    <>
      <h1>Test Grid Page</h1>
      <GameLogic
        grid1={startingGrid}
        grid2={grid2}
        setStartingGrid={setStartingGrid}
      />

      <div className="box-container"></div>
    </>
  );
}

export default Grid;
