import React, { Component } from "react";
import "../Styles/Grid.css";
// import GameLogic from "./Game/GameLogic.js";
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

class Grid extends Component {
  constructor(props) {
    super(props);
    this.width = 10;
    this.height = 10;
    this.grid2 = [];
    this.state = {
      grid1: Array(this.width * this.height).fill({}),
    };
  }

  gridReset = () => {
    let startBlank = [];
    let col = 0;
    let row = 0;
    while (row < this.width) {
      for (col = 0; col < this.height; col++) {
        startBlank.push({
          row: row,
          col: col,
          // isAlive: Math.floor(Math.random() * 4) === 1 ? 1 : 0,
          isAlive: 0,
        });
      }
      row += 1;
    }
    this.setState({ grid1: startBlank });
  };

  componentDidMount() {
    this.gridReset();
    // this.playContinuous();
  }

  // ***   Game Logic Functions  ***

  // This adjusts isAlive but only for grid2
  adjustNextGrid = (aliveCount, row, col, grid2) => {
    // To get the correct index from a 1 dimensional array
    // use this formula: col + width * row
    let index = row * this.width + col;
    if (
      aliveCount >= 2 &&
      aliveCount <= 3 &&
      this.state.grid1[index].isAlive === 1
    ) {
      grid2[index] = { ...grid2[index], isAlive: 1 };
    } else if (aliveCount === 3 && this.state.grid1[index].isAlive === 0) {
      grid2[index] = { ...grid2[index], isAlive: 1 };
    } else {
      grid2[index] = { ...grid2[index], isAlive: 0 };
    }
    return 0;
  };

  // Function to find num of neighbors who are alive, to determine if current node should live or die
  findNeighborsAlive = (grid, row, col) => {
    let aliveCount = 0;
    if (row > 0 && checkAliveN(grid, row, col, this.width)) {
      aliveCount += 1;
    }
    if (
      row > 0 &&
      col < this.width - 1 &&
      checkAliveNE(grid, row, col, this.width)
    ) {
      aliveCount += 1;
    }
    if (col < this.width - 1 && checkAliveE(grid, row, col, this.width)) {
      aliveCount += 1;
    }
    if (
      row < this.width - 1 &&
      col < this.width - 1 &&
      checkAliveSE(grid, row, col, this.width)
    ) {
      aliveCount += 1;
    }
    if (row < this.width - 1 && checkAliveS(grid, row, col, this.width)) {
      aliveCount += 1;
    }
    if (
      row < this.width - 1 &&
      col > 0 &&
      checkAliveSW(grid, row, col, this.width)
    ) {
      aliveCount += 1;
    }
    if (col > 0 && checkAliveW(grid, row, col, this.width)) {
      aliveCount += 1;
    }
    if (row > 0 && col > 0 && checkAliveNW(grid, row, col, this.width)) {
      aliveCount += 1;
    }
    console.log("aliveCount", aliveCount);
    return aliveCount;
  };

  // Function to get indices of dead nodes around the one alive node
  findIndicesOfDead = (grid, row, col) => {
    let deadIndices = [];
    if (row > 0 && !checkAliveN(grid, row, col, this.width)) {
      deadIndices.push({ row: row - 1, col: col });
    }
    if (
      row > 0 &&
      col < this.width - 1 &&
      !checkAliveNE(grid, row, col, this.width)
    ) {
      deadIndices.push({ row: row - 1, col: col + 1 });
    }
    if (col < this.width - 1 && !checkAliveE(grid, row, col, this.width)) {
      deadIndices.push({ row: row, col: col + 1 });
    }
    if (
      row < this.width - 1 &&
      col < this.width - 1 &&
      !checkAliveSE(grid, row, col, this.width)
    ) {
      deadIndices.push({ row: row + 1, col: col + 1 });
    }
    if (row < this.width - 1 && !checkAliveS(grid, row, col, this.width)) {
      deadIndices.push({ row: row + 1, col: col });
    }
    if (
      row < this.width - 1 &&
      col > 0 &&
      !checkAliveSW(grid, row, col, this.width)
    ) {
      deadIndices.push({ row: row + 1, col: col - 1 });
    }
    if (col > 0 && !checkAliveW(grid, row, col, this.width)) {
      deadIndices.push({ row: row, col: col - 1 });
    }
    if (row > 0 && col > 0 && !checkAliveNW(grid, row, col, this.width)) {
      deadIndices.push({ row: row - 1, col: col - 1 });
    }
    console.log("deadIndices:", deadIndices);
    return deadIndices;
  };

  // *** Main Game Logic ***

  runProgram = (e) => {
    // e.preventDefault();
    console.log("runProgram just triggered!");
    // Create deep copy of grid1
    let grid2 = clone(this.state.grid1);

    // (1) Iterate through grid1 array
    // (2) Check how many neighbors are alive
    // (3) Adjust grid2 based on that number

    this.state.grid1.map((item) => {
      // This function returns number of neighbors alive
      let numAlive = this.findNeighborsAlive(
        this.state.grid1,
        item.row,
        item.col
      );
      this.adjustNextGrid(numAlive, item.row, item.col, grid2);
      // rerender page with updated grid
      this.setState({
        grid1: grid2,
      });

      return 0;
    });
  };

  // *** onClick Functions ***

  // To get the correct index from a 1 dimensional array
  // use this formula: col + width * row
  handleClick = (e, item) => {
    e.preventDefault();
    let index = item.row * this.width + item.col;
    let updateGrid = this.state.grid1;
    updateGrid[index] =
      item.isAlive === 1 ? { ...item, isAlive: 0 } : { ...item, isAlive: 1 };
    this.setState({
      grid1: updateGrid,
    });
    // console.log("this is item clicked:", item);
  };

  playContinuous = (e) => {
    // e.preventDefault();
    let intervalId = "";
    clearInterval(intervalId);
    intervalId = setInterval(this.runProgram(e), 2000);
  };

  render() {
    console.log("from render grid1", this.state.grid1);

    return (
      <>
        <h1>test me</h1>
        <button onClick={this.runProgram}>Next</button>
        <button onClick={this.gridReset}>Clear</button>
        <button onClick={this.playContinuous}>Start</button>

        <div className="box-container">
          {this.state.grid1.map((item, index) => {
            return (
              <button
                onClick={(e) => this.handleClick(e, item)}
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
}

export default Grid;

// runProgram = (e) => {
//   // e.preventDefault();
//   console.log("componentWillUpdate just ran!");
//   // Create deep copy of grid1
//   let grid2 = clone(this.state.grid1);

//   // (1) Iterate through grid1 array, stop at isAlive === 1
//   // (2) Check how many neighbors are alive, adjust grid2 based on that number
//   // (3) Find the immediate neighbors who are currently dead, then repeat step (2) with these new indices
//   this.state.grid1.map((item) => {
//     let deadList = [];
//     if (item.isAlive === 1) {
//       console.log("Alive Node!!!", item.row, item.col);
//       // This function returns number of neighbors alive
//       let numAlive = this.findNeighborsAlive(
//         this.state.grid1,
//         item.row,
//         item.col
//       );
//       this.adjustNextGrid(numAlive, item.row, item.col, grid2);
//       // Find indices of all dead nodes, that surround this alive node
//       deadList = this.findIndicesOfDead(this.state.grid1, item.row, item.col);
//       // Iterate through the deadList to pass row/col into findNeighborsAlive function
//       deadList.map((dead) => {
//         // console.log("dead row/col", dead.row, dead.col);
//         let numAliveDeadList = this.findNeighborsAlive(
//           this.state.grid1,
//           dead.row,
//           dead.col
//         );
//         this.adjustNextGrid(numAliveDeadList, dead.row, dead.col, grid2);
//         return 0;
//       });
//       // rerender page with updated grid
//       this.setState({
//         grid1: grid2,
//       });
//     }
//     return 0;
//   });
// };

// function Grid() {
// this is to pass gridWidth via context api
// const [gridWidth] = useState(width);

// let gridBlank = [];
// let row = 0;
// let col = 0;

// while (row < width) {
//   for (col = 0; col < height; col++) {
//     gridBlank.push({
//       row: row,
//       col: col,
//       isAlive: Math.floor(Math.random() * 4) === 1 ? 1 : 0,
//     });
//   }
//   row += 1;
// }

//   const [startingGrid, setStartingGrid] = useState(gridBlank);
//   const grid2 = clone(startingGrid);

//   const handleClick = (e, item) => {
//     console.log("this is item", item);

//     setStartingGrid(
//       startingGrid.map((gridItem) => {
//         return gridItem.row === item.row && gridItem.col === item.col
//           ? { ...gridItem, isAlive: gridItem.isAlive ? 0 : 1 }
//           : gridItem;
//       })
//     );
//   };

//   return (
//     <>
//       <WidthContext.Provider value={{ gridWidth }}>
//         <h1>Test Grid Page</h1>
//         <GameLogic
//           grid1={startingGrid}
//           grid2={grid2}
//           setStartingGrid={setStartingGrid}
//           gridReset={gridBlank}
//         />
//       </WidthContext.Provider>

//       <div className="box-container">
//         {startingGrid.map((item, index) => {
//           return (
//             <button
//               onClick={(e) => handleClick(e, item)}
//               key={index}
//               className={item.isAlive ? "box-alive" : "box"}
//             >
//               {item.isAlive}
//             </button>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default Grid;
