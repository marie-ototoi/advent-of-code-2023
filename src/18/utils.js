const directions = { U: [0, -1], R: [1, 0], D: [0, 1], L: [-1, 0] };

export function isValid(col, row, cols, rows) {
  if (row < 0 || row >= rows - 1) return false;
  if (col < 0 || col >= cols - 1) return false;
  return true;
}

export function noteTrenches(instructions) {
  let row = 0,
    col = 0,
    maxCol = Number.NEGATIVE_INFINITY,
    maxRow = Number.NEGATIVE_INFINITY,
    minCol = Number.POSITIVE_INFINITY,
    minRow = Number.POSITIVE_INFINITY;
  const trenches = new Map();
  for (let i = 0; i < instructions.length; i++) {
    const [direction, length] = instructions[i].split(" ");
    for (let j = 0; j < length; j++) {
      row += directions[direction][1];
      col += directions[direction][0];
      maxCol = Math.max(maxCol, col);
      maxRow = Math.max(maxRow, row);
      minCol = Math.min(minCol, col);
      minRow = Math.min(minRow, row);
      trenches.set(`${col},${row}`);
    }
  }

  const { normalisedNotes, cols, rows } = normaliseNotes(trenches, {
    maxCol,
    maxRow,
    minCol,
    minRow,
  });
  return { trenches: normalisedNotes, rows, cols };
}

export function findStartingPoints(trenches, cols, rows) {
  const startingPoints = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (
        !trenches.has(`${j},${i}`) &&
        (i === 0 || i === rows - 1 || j === 0 || j === cols - 1)
      ) {
        startingPoints.push([j, i]);
      }
    }
  }
  return startingPoints;
}

export function normaliseNotes(notes, { maxCol, maxRow, minCol, minRow }) {
  const normalisedNotes = new Map();
  const cols = maxCol - minCol + 1;
  const rows = maxRow - minRow + 1;
  Array.from(notes.keys()).forEach((point) => {
    const [col, row] = point.split(",").map((i) => parseInt(i));
    normalisedNotes.set(`${col + -1 * minCol},${row + -1 * minRow}`);
  });

  return { normalisedNotes, cols, rows };
}

export function fillAndCountTrenches(trenches, cols, rows, startingPoints) {
  const emptyPoints = new Map();
  let pointsToCheck = [...startingPoints];
  let currentPoint;
  const queued = new Map();
  while (pointsToCheck.length) {
    [currentPoint, ...pointsToCheck] = pointsToCheck;
    let queue = emptyPoints.has(`${currentPoint[0]},${currentPoint[1]}`)
      ? []
      : [currentPoint];

    while (queue.length) {
      let nextQueue = [];

      for (let i = 0; i < queue.length; i++) {
        let [col, row] = queue[i];
        if (!emptyPoints.has(`${col},${row}`)) {
          emptyPoints.set(`${col},${row}`);
        }
        const dirs = Object.values(directions);

        for (const direction of dirs) {
          const nextCol = col + direction[0];
          const nextRow = row + direction[1];
          if (
            isValid(nextCol, nextRow, cols, rows) &&
            !trenches.has(`${nextCol},${nextRow}`) &&
            !emptyPoints.has(`${nextCol},${nextRow}`) &&
            !queued.has(`${nextCol},${nextRow}`)
          ) {
            queued.set(`${nextCol},${nextRow}`);
            nextQueue.push([nextCol, nextRow]);
          }
        }
      }
      queue = nextQueue;
    }
  }
  return rows * cols - emptyPoints.size;
}

export function countTrenches(instructions) {
  const { trenches, rows, cols } = noteTrenches(instructions);
  const startingPoints = findStartingPoints(trenches, cols, rows);
  return fillAndCountTrenches(trenches, cols, rows, startingPoints);
}
