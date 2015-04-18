export const E = 'E';
export const X = 'X';
export const O = 'O';
export function emptyRow() {
  return [E,E,E];
}
export function emptyBoard() {
  return [emptyRow(), emptyRow(), emptyRow()];
}
export function emptySuperRow() {
  return [emptyBoard(), emptyBoard(), emptyBoard()];
}
export function emptySuperBoard() {
  return [emptySuperRow(), emptySuperRow(), emptySuperRow()];
}
