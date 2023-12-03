export function addPartNumbers(grid) {
  let row = 0;
  let result = 0;
  while (row < grid.length) {
    let currentNumber;
    let isAdjacent;
    for (let col = 0; col < grid[row].length; col++) {
      const cur = grid[row][col];
      if (getType(cur) === "number") {
        if (!currentNumber) {
          currentNumber = cur;
          // check previous col
          if (hasSymbolAboveOrUnder(row, col - 1, grid)) isAdjacent = true;
        } else {
          currentNumber += cur;
        }
        // check this col
        if (hasSymbolAboveOrUnder(row, col, grid)) isAdjacent = true;

        // if this col is last, reset
        if (col === grid[row].length - 1) {
          if (isAdjacent) result += parseInt(currentNumber);
          currentNumber = null;
          isAdjacent = false;
        }
      } else {
        // check this col (after last number)
        if (hasSymbolAboveOrUnder(row, col, grid)) isAdjacent = true;
        // add number
        if (currentNumber && isAdjacent) result += parseInt(currentNumber);
        // console.log({ col, row, currentNumber, isAdjacent });
        // reset currentNumber
        currentNumber = null;
        isAdjacent = false;
      }
    }
    row++;
  }
  return result;
}

export function hasSymbolAboveOrUnder(row, col, grid) {
  if (grid[row - 1] && getType(grid[row - 1][col]) === "symbol") return true;
  if (getType(grid[row][col]) === "symbol") return true;
  if (grid[row + 1] && getType(grid[row + 1][col]) === "symbol") return true;
  return false;
}

export function getType(input) {
  if (!input) return "stop";
  if (!isNaN(parseInt(input))) return "number";
  if (input === ".") return "stop";
  return "symbol";
}
