export function checkAliveN(grid, row, col) {
  let index = (row - 1).toString() + col.toString();
  return grid[parseInt(index)].isAlive === 1;
}
export function checkAliveNE(grid, row, col) {
  let index = (row - 1).toString() + (col + 1).toString();
  return grid[parseInt(index)].isAlive === 1;
}
export function checkAliveE(grid, row, col) {
  let index = row.toString() + (col + 1).toString();
  return grid[parseInt(index)].isAlive === 1;
}
export function checkAliveSE(grid, row, col) {
  let index = (row + 1).toString() + (col + 1).toString();
  return grid[parseInt(index)].isAlive === 1;
}
export function checkAliveS(grid, row, col) {
  let index = (row + 1).toString() + col.toString();
  return grid[parseInt(index)].isAlive === 1;
}
export function checkAliveSW(grid, row, col) {
  let index = (row + 1).toString() + (col - 1).toString();
  return grid[parseInt(index)].isAlive === 1;
}
export function checkAliveW(grid, row, col) {
  let index = row.toString() + (col - 1).toString();
  return grid[parseInt(index)].isAlive === 1;
}
export function checkAliveNW(grid, row, col) {
  let index = (row - 1).toString() + (col - 1).toString();
  return grid[parseInt(index)].isAlive === 1;
}
