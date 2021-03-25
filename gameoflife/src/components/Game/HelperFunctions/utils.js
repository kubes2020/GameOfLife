// To get the correct index from a 1 dimensional array
// use this formula: col + width * row
let width = 10;
export function checkAliveN(grid, row, col) {
  let index = (row - 1) * width + col;
  return grid[index].isAlive === 1;
}
export function checkAliveNE(grid, row, col) {
  let index = (row - 1) * width + (col + 1);
  return grid[index].isAlive === 1;
}
export function checkAliveE(grid, row, col) {
  let index = row * width + (col + 1);
  return grid[index].isAlive === 1;
}
export function checkAliveSE(grid, row, col) {
  let index = (row + 1) * width + (col + 1);
  return grid[index].isAlive === 1;
}
export function checkAliveS(grid, row, col) {
  let index = (row + 1) * width + col;
  return grid[index].isAlive === 1;
}
export function checkAliveSW(grid, row, col) {
  let index = (row + 1) * width + (col - 1);
  return grid[index].isAlive === 1;
}
export function checkAliveW(grid, row, col) {
  let index = row * width + (col - 1);
  return grid[index].isAlive === 1;
}
export function checkAliveNW(grid, row, col) {
  let index = (row - 1) * width + (col - 1);
  return grid[index].isAlive === 1;
}
