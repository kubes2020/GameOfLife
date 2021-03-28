import React, { Component } from "react";
import "../Styles/Grid.css";
import { WidthContext } from "./contexts/WidthContext.js";
import GameLogic from "./Game/GameLogic.js";
import { clone } from "ramda";

// let width = 10;
// let height = 10;

class Grid extends Component {
  constructor(props) {
    super(props);
    this.width = 10;
    this.height = 10;
    this.state = {
      gridBlank: Array(this.width * this.height).fill({}),
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
    this.setState({ gridBlank: startBlank });
  };

  playButton = () => {
    let intervalId = "";
    clearInterval(intervalId);
    intervalId = setInterval(this.setStartingGrid(), 2000); //this needs grid2 for setStartingGrid(?)
  };

  componentDidMount() {
    this.gridReset();
    // this.playButton();
  }
  setStartingGrid = (newArray) => {
    this.setState({
      gridBlank: newArray,
    });
  };

  // To get the correct index from a 1 dimensional array
  // use this formula: col + width * row
  handleClick = (e, item) => {
    e.preventDefault();
    let index = item.row * this.width + item.col;
    let myRef = this.state.gridBlank;
    myRef[index] =
      item.isAlive === 1 ? { ...item, isAlive: 0 } : { ...item, isAlive: 1 };
    this.setState({
      gridBlank: myRef,
    });
    console.log("this is item:", item);
  };

  render() {
    console.log(this.state.gridBlank);

    return (
      <>
        <h1>test me</h1>
        <GameLogic
          grid1={this.state.gridBlank}
          gridWidth={this.width}
          // grid2={grid2}
          setStartingGrid={this.setStartingGrid}
          gridReset={this.gridReset}
        />
        <div className="box-container">
          {this.state.gridBlank.map((item, index) => {
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
