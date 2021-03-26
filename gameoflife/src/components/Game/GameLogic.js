import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { WidthContext } from "../contexts/WidthContext";
import { clone } from "ramda";
import {
  checkAliveN,
  checkAliveNE,
  checkAliveE,
  checkAliveSE,
  checkAliveS,
  checkAliveSW,
  checkAliveW,
  checkAliveNW,
} from "./HelperFunctions/Utils.js";

function GameLogic(props) {
  const { gridWidth } = useContext(WidthContext);

  // This adjusts isAlive but only for grid2
  const adjustNextGrid = (aliveCount, row, col) => {
    // To get the correct index from a 1 dimensional array
    // use this formula: col + width * row
    let index = row * gridWidth + col;
    if (
      aliveCount >= 2 &&
      aliveCount <= 3 &&
      props.grid1[index].isAlive === 1
    ) {
      props.grid2[index].isAlive = 1;
    } else if (aliveCount === 3 && props.grid1[index].isAlive === 0) {
      props.grid2[index].isAlive = 1;
    } else {
      props.grid2[index].isAlive = 0;
    }
    return 0;
  };

  // Function to find num of neighbors who are alive, to determine if current node should live or die
  const findNeighborsAlive = (grid, row, col) => {
    let aliveCount = 0;

    if (row > 0 && checkAliveN(grid, row, col, gridWidth)) {
      aliveCount += 1;
    }
    if (
      row > 0 &&
      col < gridWidth - 1 &&
      checkAliveNE(grid, row, col, gridWidth)
    ) {
      aliveCount += 1;
    }
    if (col < gridWidth - 1 && checkAliveE(grid, row, col, gridWidth)) {
      aliveCount += 1;
    }
    if (
      row < gridWidth - 1 &&
      col < gridWidth - 1 &&
      checkAliveSE(grid, row, col, gridWidth)
    ) {
      aliveCount += 1;
    }
    if (row < gridWidth - 1 && checkAliveS(grid, row, col, gridWidth)) {
      aliveCount += 1;
    }
    if (
      row < gridWidth - 1 &&
      col > 0 &&
      checkAliveSW(grid, row, col, gridWidth)
    ) {
      aliveCount += 1;
    }
    if (col > 0 && checkAliveW(grid, row, col, gridWidth)) {
      aliveCount += 1;
    }
    if (row > 0 && col > 0 && checkAliveNW(grid, row, col, gridWidth)) {
      aliveCount += 1;
    }

    console.log("aliveCount", aliveCount);
    return aliveCount;
  };

  // Function to get indices of dead nodes around the one alive node
  const findIndicesOfDead = (grid, row, col) => {
    let deadIndices = [];
    if (row > 0 && !checkAliveN(grid, row, col, gridWidth)) {
      deadIndices.push({ row: row - 1, col: col });
    }
    if (
      row > 0 &&
      col < gridWidth - 1 &&
      !checkAliveNE(grid, row, col, gridWidth)
    ) {
      deadIndices.push({ row: row - 1, col: col + 1 });
    }
    if (col < gridWidth - 1 && !checkAliveE(grid, row, col, gridWidth)) {
      deadIndices.push({ row: row, col: col + 1 });
    }
    if (
      row < gridWidth - 1 &&
      col < gridWidth - 1 &&
      !checkAliveSE(grid, row, col, gridWidth)
    ) {
      deadIndices.push({ row: row + 1, col: col + 1 });
    }
    if (row < gridWidth - 1 && !checkAliveS(grid, row, col, gridWidth)) {
      deadIndices.push({ row: row + 1, col: col });
    }
    if (
      row < gridWidth - 1 &&
      col > 0 &&
      !checkAliveSW(grid, row, col, gridWidth)
    ) {
      deadIndices.push({ row: row + 1, col: col - 1 });
    }
    if (col > 0 && !checkAliveW(grid, row, col, gridWidth)) {
      deadIndices.push({ row: row, col: col - 1 });
    }
    if (row > 0 && col > 0 && !checkAliveNW(grid, row, col, gridWidth)) {
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

  function handleNext(e) {
    e.preventDefault();
    props.setStartingGrid(clone(props.grid2));
  }
  function handleClear(e) {
    e.preventDefault();
    props.setStartingGrid(props.gridReset);
  }
  const handleRun = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h5>Test GameLogic Page</h5>
      <button onClick={handleNext}>Next</button>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleRun}>Run</button>
    </>
  );
}

export default GameLogic;
