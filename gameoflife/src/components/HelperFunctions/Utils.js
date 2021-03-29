// To get the correct index from a 1 dimensional array
// use this formula: col + width * row

// export function checkAliveN(grid, row, col, gridWidth) {
//   let index = (row - 1) * gridWidth + col;
//   return grid[index].isAlive === 1;
// }
// export function checkAliveNE(grid, row, col, gridWidth) {
//   let index = (row - 1) * gridWidth + (col + 1);
//   return grid[index].isAlive === 1;
// }
// export function checkAliveE(grid, row, col, gridWidth) {
//   let index = row * gridWidth + (col + 1);
//   return grid[index].isAlive === 1;
// }
// export function checkAliveSE(grid, row, col, gridWidth) {
//   let index = (row + 1) * gridWidth + (col + 1);
//   return grid[index].isAlive === 1;
// }
// export function checkAliveS(grid, row, col, gridWidth) {
//   let index = (row + 1) * gridWidth + col;
//   return grid[index].isAlive === 1;
// }
// export function checkAliveSW(grid, row, col, gridWidth) {
//   let index = (row + 1) * gridWidth + (col - 1);
//   return grid[index].isAlive === 1;
// }
// export function checkAliveW(grid, row, col, gridWidth) {
//   let index = row * gridWidth + (col - 1);
//   return grid[index].isAlive === 1;
// }
// export function checkAliveNW(grid, row, col, gridWidth) {
//   let index = (row - 1) * gridWidth + (col - 1);
//   return grid[index].isAlive === 1;
// }
