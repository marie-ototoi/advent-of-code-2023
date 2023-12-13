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

export function getPossibleInvalidDirections(row, col, input, seen, loop) {
  const shape = input[row][col];
  const top = [-1, 0],
    right = [0, 1],
    bottom = [1, 0],
    left = [0, -1];
  let possible = [];

  // top
  if (isInvalid(row - 1, col, input)) possible.push(top);
  // right
  if (isInvalid(row, col + 1, input)) possible.push(right);
  // bottom
  if (isInvalid(row + 1, col, input)) possible.push(bottom);
  // left
  if (isInvalid(row, col - 1, input)) possible.push(left);

  //console.log({ possible });
  return possible;
}

export function fillRight(shape, prevRow, prevCol, loop, nextShape) {
  if (
    (!loop || loop.has(`${prevRow},${prevCol}`)) &&
    ((shape === "S" &&
      (nextShape === "-" || nextShape === "7" || nextShape === "J")) ||
      shape === "-" ||
      shape === "L" ||
      shape === "F")
  )
    return "-";
  return "*";
}

export function fillBottom(shape, prevRow, prevCol, loop, nextShape) {
  if (
    (!loop || loop.has(`${prevRow},${prevCol}`)) &&
    ((shape === "S" &&
      (nextShape === "|" || nextShape === "J" || nextShape === "L")) ||
      shape === "|" ||
      shape === "F" ||
      shape === "7")
  )
    return "|";
  return "*";
}

export function doubleInput(input, loop) {
  const doubleLoop = new Map();
  // copy line
  const doubleGalaxy = input.reduce((accLines, curLine, indLine) => {
    const newLine = curLine
      .split("")
      .reduce((accCols, curCol, indCol) => {
        // get extension
        const res = fillRight(
          curCol,
          indLine,
          indCol,
          loop,
          curLine[indCol + 1]
        );
        // copy char
        if (loop.has(`${indLine},${indCol}`))
          doubleLoop.set(`${accLines.length},${accCols.length}`, res);
        accCols.push(curCol);
        // extends char
        if (res !== "*")
          doubleLoop.set(`${accLines.length},${accCols.length}`, res);
        accCols.push(res);
        //
        return accCols;
      }, [])
      .join("");
    accLines.push(newLine);
    // extends line
    const nextLine = newLine
      .split("")
      .map((col, indCol) => {
        const res = fillBottom(
          col,
          indLine,
          indCol / 2,
          loop,
          input[indLine + 1] && input[indLine + 1][indCol / 2]
        );
        console.log(
          "ICI",
          col,
          input[indLine + 1] && input[indLine + 1][indCol / 2]
        );
        if (res !== "*") doubleLoop.set(`${accLines.length},${indCol}`, res);
        return res;
      })
      .join("");
    accLines.push(nextLine);
    return accLines;
  }, []);
  return { doubleGalaxy, doubleLoop };
}

export function findLoop(input) {
  const start = getStartingPoint(input);
  let queue = [start];
  let steps = 0;
  let loop = new Map();
  loop.set(`${start[0]},${start[1]}`, true);

  while (queue.length) {
    let nextQueue = [];

    for (let i = 0; i < queue.length; i++) {
      let [row, col] = queue[i];
      const directions = getPossibleDirections(row, col, input);

      for (const [dx, dy] of directions) {
        let nextRow = row + dx,
          nextCol = col + dy;
        if (!loop.has(`${nextRow},${nextCol}`)) {
          loop.set(`${nextRow},${nextCol}`, steps);
          nextQueue.push([nextRow, nextCol]);
        }
      }
    }
    if (nextQueue.length) steps++;
    queue = nextQueue;
  }
  return { loop, steps };
}

export function countEnclosedTiles(input) {
  const { loop } = findLoop(input);

  const { doubleGalaxy, doubleLoop } = doubleInput(input, loop);

  let queueTransform = [];
  // start from all edges
  for (let row = 0; row < doubleGalaxy.length; row++) {
    for (let col = 0; col < doubleGalaxy[row].length; col++) {
      if (
        row === 0 ||
        col === 0 ||
        row === doubleGalaxy.length - 1 ||
        col === doubleGalaxy[row].length - 1
      ) {
        if (!doubleLoop.has(`${row},${col}`)) queueTransform.push([row, col]);
      }
    }
  }
  let seen = new Map();
  while (queueTransform.length) {
    let nextQueue = [];
    for (let i = 0; i < queueTransform.length; i++) {
      let [row, col] = queueTransform[i];
      if (!seen.has(`${row},${col}`)) {
        seen.set(`${row},${col}`, true);
        const directions = getPossibleInvalidDirections(row, col, doubleGalaxy);
        //console.log({ row, col, directions });
        for (const [dx, dy] of directions) {
          let nextRow = row + dx,
            nextCol = col + dy;
          if (!doubleLoop.has(`${nextRow},${nextCol}`)) {
            nextQueue.push([nextRow, nextCol]);
          }
        }
      }
    }
    queueTransform = nextQueue;
  }
  console.log("avant", input);
  console.log("avant", doubleGalaxy);

  for (let row = 0; row < doubleGalaxy.length; row++) {
    let line = "";
    for (let col = 0; col < doubleGalaxy[row].length; col++) {
      if (seen.has(`${row},${col}`) && !doubleLoop.has(`${row},${col}`)) {
        line += "O";
      } else {
        line += doubleGalaxy[row][col];
      }
    }
    doubleGalaxy[row] = line;
  }
  console.log("apres", doubleGalaxy);
  /*const reduced = doubleGalaxy
    .filter((_, row) => row % 2 === 0)
    .map((line) =>
      line
        .split("")
        .filter((_, col) => col % 2 === 0)
        .join("")
    );*/
  let res = 0;
  //console.log(doubleLoop);
  for (let row = 0; row < doubleGalaxy.length; row++) {
    for (let col = 0; col < doubleGalaxy[row].length; col++) {
      //console.log(row, col, reduced[row][col], !loop.has(`${row},${col}`));
      if (
        !doubleLoop.has(`${row},${col}`) &&
        doubleGalaxy[row][col] !== "*" &&
        doubleGalaxy[row][col] !== "O"
      )
        res++;
    }
  }
  //console.log("reduced", reduced);
  return res;
}
