import React, { useState, useEffect } from "react";

function GameLogic(props) {
  const [theGrid, setTheGrid] = useState();

  useEffect(() => {
    setTheGrid(props.grid1);
  }, []);
  console.log("theGrid???", theGrid[55].isAlive);
  const gridLength = theGrid.length ** 0.5;

  // This adjust isAlive only for grid2
  const adjustNextGrid = (aliveCount, row, col) => {
    let index = row.toString() + col.toString();
    if (
      aliveCount >= 2 &&
      aliveCount <= 3 &&
      theGrid[parseInt(index)].isAlive === 1
    ) {
      props.grid2[parseInt(index)].isAlive = 1;
    } else if (aliveCount === 3 && theGrid[parseInt(index)].isAlive === 0) {
      props.grid2[parseInt(index)].isAlive = 1;
    } else {
      props.grid2[parseInt(index)].isAlive = 0;
    }
    return 0;
  };

  // iterate through grid1 to find isAlive = 1
  // Check in all directions to see if neighbors are alive === true
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

  // Iterate through array, stop at isAlive, then check neighbors
  theGrid.map((item) => {
    let deadList = [];
    if (item.isAlive === 1) {
      console.log("Alive Node!!!", item.row, item.col);
      findNeighborsAlive(theGrid, item.row, item.col);
      let index = item.row.toString() + item.col.toString();
      theGrid[index].isVisited = 1;
      // Find indices of all dead nodes, that surround this alive node
      deadList = findIndicesOfDead(theGrid, item.row, item.col);
      // Iterate through the deadList to pass row/col into findNeighborsAlive function
      deadList.map((dead) => {
        // console.log("dead row/col", dead.row, dead.col);
        findNeighborsAlive(theGrid, dead.row, dead.col);
        return 0;
      });
    }
    return 0;
  });

  props.grid2.map((item) => {
    if (item.isAlive === 1) {
      console.log("It's alive in Grid2!", item.row, item.col);
    } else {
      console.log("nothing is alive in Grid2");
    }
    return 0;
  });

  return (
    <>
      <h5>Test GameLogic Page</h5>
      <p>{theGrid[55].isAlive}</p>
    </>
  );
}

export default GameLogic;
