export function getStartingPoint(input) {
  for (let row = 0; row < input.length; row++) {
    const col = input[row].indexOf("S");
    if (col > -1) return [row, col];
  }
}

export function isValid(row, col, input) {
  if (row < 0 || row >= input.length) return false;
  if (col < 0 || col >= input[0].length) return false;
  if (input[row][col] === "O") return false;
  return true;
}
export function isInvalid(row, col, input) {
  if (row < 0 || row >= input.length) return false;
  if (col < 0 || col >= input[0].length) return false;
  return true;
}

export function getPossibleDirections(row, col, input) {
  const shape = input[row][col];
  const top = [-1, 0],
    right = [0, 1],
    bottom = [1, 0],
    left = [0, -1];
  let possible = [];
  // top
  if (
    (shape === "|" || shape === "J" || shape === "L" || shape === "S") &&
    isValid(row - 1, col, input) &&
    (input[row - 1][col] === "|" ||
      input[row - 1][col] === "7" ||
      input[row - 1][col] === "F")
  )
    possible.push(top);
  // right
  if (
    (shape === "-" || shape === "F" || shape === "L" || shape === "S") &&
    isValid(row, col + 1, input) &&
    (input[row][col + 1] === "-" ||
      input[row][col + 1] === "7" ||
      input[row][col + 1] === "J")
  )
    possible.push(right);
  // bottom
  if (
    (shape === "|" || shape === "F" || shape === "7" || shape === "S") &&
    isValid(row + 1, col, input) &&
    (input[row + 1][col] === "|" ||
      input[row + 1][col] === "L" ||
      input[row + 1][col] === "J")
  )
    possible.push(bottom);
  // left
  if (
    (shape === "-" || shape === "J" || shape === "7" || shape === "S") &&
    isValid(row, col - 1, input) &&
    (input[row][col - 1] === "-" ||
      input[row][col - 1] === "F" ||
      input[row][col - 1] === "L")
  )
    possible.push(left);
  //console.log({ possible });
  return possible;
}

export function findFurthestTile(input) {
  const start = getStartingPoint(input);
  let queue = [start];
  let steps = 0;
  let seen = new Map();
  seen.set(`${start[0]},${start[1]}`, true);

  while (queue.length) {
    let nextQueue = [];

    for (let i = 0; i < queue.length; i++) {
      let [row, col] = queue[i];
      const directions = getPossibleDirections(row, col, input);

      for (const [dx, dy] of directions) {
        let nextRow = row + dx,
          nextCol = col + dy;
        if (!seen.has(`${nextRow},${nextCol}`)) {
          //console.log("push", `${nextRow},${nextCol}`);
          seen.set(`${nextRow},${nextCol}`, true);
          nextQueue.push([nextRow, nextCol]);
        }
      }
    }

    if (nextQueue.length) steps++;
    //console.log({ nextQueue, steps });
    queue = nextQueue;
  }
  return steps;
}
