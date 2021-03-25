import React, { useContext, useEffect, useCallback, useState } from "react";
import "../Styles/Grid.css";
import GridSquare from "./GridSquare.js";
import { WidthContext } from "./contexts/WidthContext.js";
// import Utils from "./Game/HelperFunctions/Utils.js";
import GameLogic from "./Game/GameLogic.js";
import { clone } from "ramda";

// If width changes, must also change it in HelperFunctions/Utils
let width = 10;
let height = 10;

function Grid() {
  const [gridWidth] = useState(width);

  let grid1 = [];
  let row = 0;
  let col = 0;

  while (row < width) {
    for (col = 0; col < height; col++) {
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

  const handleClick = (e) => {
    console.log("this is click", e.target.id);
  };

  return (
    <>
      <WidthContext.Provider value={{ gridWidth }}>
        <h1>Test Grid Page</h1>
        <GameLogic
          grid1={startingGrid}
          grid2={grid2}
          setStartingGrid={setStartingGrid}
        />
      </WidthContext.Provider>

      <div className="box-container">
        {startingGrid.map((item) => {
          return (
            <button onClick={handleClick} id={item.id} className="box">
              {item.isAlive}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Grid;
