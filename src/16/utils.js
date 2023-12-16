export function isValid(col, row, input) {
  if (row < 0 || row >= input.length) return false;
  if (col < 0 || col >= input[0].length) return false;
  return true;
}
const top = [0, -1];
const right = [1, 0];
const bottom = [0, 1];
const left = [-1, 0];
export function getNextPointsAndDirections(
  currentPoint,
  currentDirection,
  input
) {
  const nextPoint = [
    currentPoint[0] + currentDirection[0],
    currentPoint[1] + currentDirection[1],
  ];
  const [nextCol, nextRow] = nextPoint;
  const nextSymbol = input[nextRow] && input[nextRow][nextCol];

  if (!nextSymbol || nextSymbol === ".") {
    // nothing
    return [[nextPoint, currentDirection]];
  } else if (nextSymbol === "/") {
    if (currentDirection[0] === 1) {
      // from left
      return [[nextPoint, top]];
    } else if (currentDirection[1] === 1) {
      // from top
      return [[nextPoint, left]];
    } else if (currentDirection[0] === -1) {
      // from right
      return [[nextPoint, bottom]];
    } else if (currentDirection[1] === -1) {
      //from bottom
      return [[nextPoint, right]];
    }
  } else if (nextSymbol === "|") {
    // from left or right: split
    if (currentDirection[0] === 1 || currentDirection[0] === -1) {
      return [
        [nextPoint, top],
        [nextPoint, bottom],
      ];
    } else if (currentDirection[1] === 1) {
      // continue to bottom
      return [[nextPoint, bottom]];
    } else if (currentDirection[1] === -1) {
      // continue to top
      return [[nextPoint, top]];
    }
  } else if (nextSymbol === "-") {
    // from top or bottom: split
    if (currentDirection[1] === 1 || currentDirection[1] === -1) {
      return [
        [nextPoint, left],
        [nextPoint, right],
      ];
    } else if (currentDirection[0] === 1) {
      // continue to right
      return [[nextPoint, right]];
    } else if (currentDirection[0] === -1) {
      // continue to left
      return [[nextPoint, left]];
    }
  } else {
    // backslash \
    if (currentDirection[0] === 1) {
      // from left
      return [[nextPoint, bottom]];
    } else if (currentDirection[1] === 1) {
      // from top
      return [[nextPoint, right]];
    } else if (currentDirection[0] === -1) {
      // from right
      return [[nextPoint, top]];
    } else if (currentDirection[1] === -1) {
      //from bottom
      return [[nextPoint, left]];
    }
  }
}

export function countEnergizedTiles(startPoint, startDirection, input) {
  const energized = new Map();
  const seen = new Map();
  let queue = getNextPointsAndDirections(startPoint, startDirection, input);

  while (queue.length) {
    let nextQueue = [];

    for (let i = 0; i < queue.length; i++) {
      let [currentPoint, currentDirection] = queue[i];
      seen.set(
        `${currentPoint[0]},${currentPoint[1]},${currentDirection[0]},${currentDirection[1]}`,
        true
      );
      energized.set(`${currentPoint[0]},${currentPoint[1]}`, true);
      const next = getNextPointsAndDirections(
        currentPoint,
        currentDirection,
        input
      );
      for (const [nextPoint, nextDirection] of next) {
        if (
          isValid(nextPoint[0], nextPoint[1], input) &&
          !seen.has(
            `${nextPoint[0]},${nextPoint[1]},${nextDirection[0]},${nextDirection[1]}`
          )
        ) {
          nextQueue.push([nextPoint, nextDirection]);
        }
      }
    }
    queue = nextQueue;
  }
  return energized.size;
}
