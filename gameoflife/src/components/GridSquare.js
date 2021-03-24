import React, { useContext, useEffect, useState, useCallback } from "react";
import { GridContext } from "./contexts/GridContext.js";

function GridSqaure(props) {
  // const { startingGrid } = useContext(GridContext);
  // const [display, setDisplay] = useState("no data yet");
  const { row, col, isAlive } = props;

  return <></>;
}

// function GridSqaure() {
//   const { startingGrid } = useContext(GridContext);
//   const [display, setDisplay] = useState("no data yet");
//   useEffect(() => {
//     try {
//       if (startingGrid.length > 0) {
//         console.log(
//           "there is data coming into gridsquare",
//           startingGrid[0].row
//         );
//         setDisplay = startingGrid[0].row;
//       }
//     } catch {
//       console.log("no data!");
//     }
//   }, [startingGrid]);
//   return (
//     <>
//       <div>
//         <h6>{display}</h6>
//       </div>
//     </>
//   );
// }

// function GridSqaure() {
//   const { startingGrid } = useContext(GridContext);
//   const [display, setDisplay] = useState("no data yet");

//   const mydata = useCallback((startingGrid) => {
//     if (startingGrid.length > 0) {
//       setDisplay(startingGrid[0].row);
//     }
//   }, []);

//   return (
//     <>
//       <div>
//         <h6>{display}</h6>
//       </div>
//     </>
//   );
// }
export default GridSqaure;
