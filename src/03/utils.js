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

export function addGearNumbers(grid) {
  let row = 0;
  let gears = new Map();
  while (row < grid.length) {
    let currentNumber;
    let adjacentGear;
    for (let col = 0; col < grid[row].length; col++) {
      const cur = grid[row][col];
      if (getType(cur) === "number") {
        if (!currentNumber) {
          currentNumber = cur;
          // check previous col
          const gear = getGear(row, col - 1, grid);
          if (gear) adjacentGear = gear;
        } else {
          currentNumber += cur;
        }
        // check this col
        const gear = getGear(row, col, grid);
        if (gear) adjacentGear = gear;

        // if this col is last, reset
        if (col === grid[row].length - 1) {
          if (adjacentGear) {
            if (gears.has(adjacentGear)) {
              gears.get(adjacentGear).push(parseInt(currentNumber));
            } else {
              gears.set(adjacentGear, [parseInt(currentNumber)]);
            }
          }
          currentNumber = null;
          adjacentGear = null;
        }
      } else {
        // check this col (after last number)
        const gear = getGear(row, col, grid);
        if (gear) adjacentGear = gear;
        // console.log({ currentNumber, gear, row, col });
        // add number
        if (currentNumber && adjacentGear) {
          if (gears.has(adjacentGear)) {
            gears.get(adjacentGear).push(parseInt(currentNumber));
          } else {
            gears.set(adjacentGear, [parseInt(currentNumber)]);
          }
        }
        // console.log({ col, row, currentNumber, adjacentGear });
        // reset currentNumber
        currentNumber = null;
        adjacentGear = null;
      }
    }
    row++;
  }
  let result = 0;
  for (const [key, value] of gears) {
    if (value.length > 1) {
      result += value[0] * value[1];
    }
  }
  return result;
}

export function hasSymbolAboveOrUnder(row, col, grid) {
  if (grid[row - 1] && getType(grid[row - 1][col]) === "symbol") return true;
  if (getType(grid[row][col]) === "symbol") return true;
  if (grid[row + 1] && getType(grid[row + 1][col]) === "symbol") return true;
  return false;
}

export function getGear(row, col, grid) {
  if (grid[row - 1] && grid[row - 1][col] === "*") return `${row - 1},${col}`;
  if (grid[row][col] === "*") return `${row},${col}`;
  if (grid[row + 1] && grid[row + 1][col] === "*") return `${row + 1},${col}`;
  return false;
}

export function getType(input) {
  if (!input) return "stop";
  if (!isNaN(parseInt(input))) return "number";
  if (input === ".") return "stop";
  return "symbol";
}
