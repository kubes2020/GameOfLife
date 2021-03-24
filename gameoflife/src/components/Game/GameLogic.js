import React, { useState, useEffect } from "react";
import {
  checkAliveN,
  checkAliveNE,
  checkAliveE,
  checkAliveSE,
  checkAliveS,
  checkAliveSW,
  checkAliveW,
  checkAliveNW,
} from "./HelperFunctions/utils.js";

function GameLogic(props) {
  const gridLength = props.grid1.length ** 0.5;

  // This adjusts isAlive but only for grid2
  const adjustNextGrid = (aliveCount, row, col) => {
    let index = row.toString() + col.toString();
    if (
      aliveCount >= 2 &&
      aliveCount <= 3 &&
      props.grid1[parseInt(index)].isAlive === 1
    ) {
      props.grid2[parseInt(index)].isAlive = 1;
    } else if (aliveCount === 3 && props.grid1[parseInt(index)].isAlive === 0) {
      props.grid2[parseInt(index)].isAlive = 1;
    } else {
      props.grid2[parseInt(index)].isAlive = 0;
    }
    return 0;
  };

  // Function to find num of neighbors who are alive, to determine if current node should live or die
  const findNeighborsAlive = (grid, row, col) => {
    let aliveCount = 0;

    if (row > 0 && checkAliveN(grid, row, col)) {
      aliveCount += 1;
    }
    if (row > 0 && col < gridLength - 1 && checkAliveNE(grid, row, col)) {
      aliveCount += 1;
    }
    if (col < gridLength - 1 && checkAliveE(grid, row, col)) {
      aliveCount += 1;
    }
    if (
      row < gridLength - 1 &&
      col < gridLength - 1 &&
      checkAliveSE(grid, row, col)
    ) {
      aliveCount += 1;
    }
    if (row < gridLength - 1 && checkAliveS(grid, row, col)) {
      aliveCount += 1;
    }
    if (row < gridLength - 1 && col > 0 && checkAliveSW(grid, row, col)) {
      aliveCount += 1;
    }
    if (col > 0 && checkAliveW(grid, row, col)) {
      aliveCount += 1;
    }
    if (row > 0 && col > 0 && checkAliveNW(grid, row, col)) {
      aliveCount += 1;
    }

    console.log("aliveCount", aliveCount);
    return aliveCount;
  };

  // Function to get indices of dead nodes around the one alive node
  const findIndicesOfDead = (grid, row, col) => {
    let deadIndices = [];
    if (row > 0 && !checkAliveN(grid, row, col)) {
      deadIndices.push({ row: row - 1, col: col });
    }
    if (row > 0 && col < gridLength - 1 && !checkAliveNE(grid, row, col)) {
      deadIndices.push({ row: row - 1, col: col + 1 });
    }
    if (col < gridLength - 1 && !checkAliveE(grid, row, col)) {
      deadIndices.push({ row: row, col: col + 1 });
    }
    if (
      row < gridLength - 1 &&
      col < gridLength - 1 &&
      !checkAliveSE(grid, row, col)
    ) {
      deadIndices.push({ row: row + 1, col: col + 1 });
    }
    if (row < gridLength - 1 && !checkAliveS(grid, row, col)) {
      deadIndices.push({ row: row + 1, col: col });
    }
    if (row < gridLength - 1 && col > 0 && !checkAliveSW(grid, row, col)) {
      deadIndices.push({ row: row + 1, col: col - 1 });
    }
    if (col > 0 && !checkAliveW(grid, row, col)) {
      deadIndices.push({ row: row, col: col - 1 });
    }
    if (row > 0 && col > 0 && !checkAliveNW(grid, row, col)) {
      deadIndices.push({ row: row - 1, col: col - 1 });
    }
    console.log("deadIndices:", deadIndices);
    return deadIndices;
  };

  // (1) Iterate through grid1 array, stop at isAlive === 1
  // (2) Check how many neighbors are alive, adjust grid2 based on that number
  // (3) Find the immediate neighbors who are currently dead, then repeat step (2) with these new indices
  props.grid1.map((item) => {
    let deadList = [];
    if (item.isAlive === 1) {
      console.log("Alive Node!!!", item.row, item.col);
      // This function returns number of neighbors alive
      let numAlive = findNeighborsAlive(props.grid1, item.row, item.col);
      adjustNextGrid(numAlive, item.row, item.col);
      // Find indices of all dead nodes, that surround this alive node
      deadList = findIndicesOfDead(props.grid1, item.row, item.col);
      // Iterate through the deadList to pass row/col into findNeighborsAlive function
      deadList.map((dead) => {
        // console.log("dead row/col", dead.row, dead.col);
        let numAliveDeadList = findNeighborsAlive(
          props.grid1,
          dead.row,
          dead.col
        );
        adjustNextGrid(numAliveDeadList, dead.row, dead.col);
        return 0;
      });
    }
    return 0;
  });

  console.log("this is props.grid2", props.grid2);

  function handleClick(e) {
    e.preventDefault();
    props.setStartingGrid(props.grid2);
  }

  return (
    <>
      <h5>Test GameLogic Page</h5>
      <p>{props.grid1[55].isAlive}</p>
      <button onClick={handleClick}>Run Graph</button>
    </>
  );
}

export default GameLogic;
