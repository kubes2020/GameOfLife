import React, { useState, useEffect } from "react";

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

  // These functions check in all directions to see if neighbors are alive === true
  const checkAliveN = (grid, row, col) => {
    let index = (row - 1).toString() + col.toString();
    return grid[parseInt(index)].isAlive === 1;
  };
  const checkAliveNE = (grid, row, col) => {
    let index = (row - 1).toString() + (col + 1).toString();
    return grid[parseInt(index)].isAlive === 1;
  };
  const checkAliveE = (grid, row, col) => {
    let index = row.toString() + (col + 1).toString();
    return grid[parseInt(index)].isAlive === 1;
  };
  const checkAliveSE = (grid, row, col) => {
    let index = (row + 1).toString() + (col + 1).toString();
    return grid[parseInt(index)].isAlive === 1;
  };
  const checkAliveS = (grid, row, col) => {
    let index = (row + 1).toString() + col.toString();
    return grid[parseInt(index)].isAlive === 1;
  };
  const checkAliveSW = (grid, row, col) => {
    let index = (row + 1).toString() + (col - 1).toString();
    return grid[parseInt(index)].isAlive === 1;
  };
  const checkAliveW = (grid, row, col) => {
    let index = row.toString() + (col - 1).toString();
    return grid[parseInt(index)].isAlive === 1;
  };
  const checkAliveNW = (grid, row, col) => {
    let index = (row - 1).toString() + (col - 1).toString();
    return grid[parseInt(index)].isAlive === 1;
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
    adjustNextGrid(aliveCount, row, col);

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

  // Iterate through grid1 array, stop at isAlive === 1, then check neighbors
  props.grid1.map((item) => {
    let deadList = [];
    if (item.isAlive === 1) {
      console.log("Alive Node!!!", item.row, item.col);
      findNeighborsAlive(props.grid1, item.row, item.col);
      // Find indices of all dead nodes, that surround this alive node
      deadList = findIndicesOfDead(props.grid1, item.row, item.col);
      // Iterate through the deadList to pass row/col into findNeighborsAlive function
      deadList.map((dead) => {
        // console.log("dead row/col", dead.row, dead.col);
        findNeighborsAlive(props.grid1, dead.row, dead.col);
        return 0;
      });
    }
    return 0;
  });

  console.log("this is props.grid2", props.grid2);

  // props.grid2.map((item) => {
  //   if (item.isAlive === 1) {
  //     console.log("It's alive in Grid2!", item.row, item.col);
  //   } else {
  //     console.log("nothing is alive in Grid2");
  //   }
  //   return 0;
  // });

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
