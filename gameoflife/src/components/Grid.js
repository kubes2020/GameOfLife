import React, { useState } from "react";
import "../Styles/Grid.css";
import { WidthContext } from "./contexts/WidthContext.js";
import GameLogic from "./Game/GameLogic.js";
import { clone } from "ramda";

let width = 10;
let height = 10;

function Grid() {
  // this is to pass gridWidth via context api
  const [gridWidth] = useState(width);

  let gridBlank = [];
  let row = 0;
  let col = 0;

  while (row < width) {
    for (col = 0; col < height; col++) {
      gridBlank.push({
        row: row,
        col: col,
        isAlive: Math.floor(Math.random() * 4) === 1 ? 1 : 0,
      });
    }
    row += 1;
  }

  const [startingGrid, setStartingGrid] = useState(gridBlank);
  const grid2 = clone(startingGrid);

  const handleClick = (e, item) => {
    console.log("this is item", item);

    setStartingGrid(
      startingGrid.map((gridItem) => {
        return gridItem.row === item.row && gridItem.col === item.col
          ? { ...gridItem, isAlive: gridItem.isAlive ? 0 : 1 }
          : gridItem;
      })
    );
  };

  return (
    <>
      <WidthContext.Provider value={{ gridWidth }}>
        <h1>Test Grid Page</h1>
        <GameLogic
          grid1={startingGrid}
          grid2={grid2}
          setStartingGrid={setStartingGrid}
          gridReset={gridBlank}
        />
      </WidthContext.Provider>

      <div className="box-container">
        {startingGrid.map((item, index) => {
          return (
            <button
              onClick={(e) => handleClick(e, item)}
              key={index}
              className={item.isAlive ? "box-alive" : "box"}
            >
              {item.isAlive}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Grid;
