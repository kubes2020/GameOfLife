import React, { useContext, useEffect } from "react";
import "../Styles/Grid.css";
import GridSquare from "./GridSquare.js";
import { GridContext } from "./contexts/GridContext.js";

function Grid() {
  const { setStartingGrid } = useContext(GridContext);
  // for (let row = 0; row < 25; row++ ){
  //     for (let col = 0; col < 25; col++){
  //         return
  //     }
  // }

  let items = [];
  let row = 0;
  let col = 0;

  while (row < 25) {
    for (col = 0; col < 25; col++) {
      items.push({
        row: row,
        col: col,
        isAlive: false,
      });

      //   items.push(<div className="box">{col}</div>);
      // console.log("this is row, col:", row, col);
    }
    row += 1;
  }

  useEffect(() => {
    console.log("I ran!!!");
    setStartingGrid(items);
  }, []);

  return (
    <>
      <h1>Test Grid Page</h1>
      <GridSquare />
      {/* <div className="box-container">
        {items.map((item) => (
          <GridSquare row={item.row} col={item.col} isAlive={item.isAlive} />
        ))}
      </div> */}
    </>
  );
}

export default Grid;
