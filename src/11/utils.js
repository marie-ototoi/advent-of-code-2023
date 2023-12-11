export function expandGalaxy(galaxy) {
  const rows = Array.from({ length: galaxy.length }).fill(false);
  const cols = Array.from({ length: galaxy[0].length }).fill(false);

  for (let row = 0; row < galaxy.length; row++) {
    for (let col = 0; col < galaxy[row].length; col++) {
      if (galaxy[row][col] === "#") {
        rows[row] = true;
        cols[col] = true;
      }
    }
  }
  const points = [];
  return {
    expandedGalaxy: galaxy.reduce((accRows, curRow, indRow) => {
      const line = curRow
        .split("")
        .reduce((accCols, curCol, indCol) => {
          if (curCol !== ".") {
            points.push([accCols.length, accRows.length]);
          }
          accCols.push(curCol);
          if (cols[indCol] !== true) accCols.push(".");
          return accCols;
        }, [])
        .join("");
      accRows.push(line);
      if (rows[indRow] !== true) accRows.push(line);
      return accRows;
    }, []),
    points,
  };
}

export function isValid(col, row, input) {
  if (row < 0 || row >= input.length) return false;
  if (col < 0 || col >= input[0].length) return false;
  return true;
}

export function findShortestPath(galaxy, a, b) {
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
}

export function findAllPairs(items) {
  return items.reduce((acc, cur, ind) => {
    for (let i = ind + 1; i < items.length; i++) {
      acc.push([cur, items[i]]);
    }
    return acc;
  }, []);
}

export function sumShortestPaths(galaxy) {
  const { expandedGalaxy, points } = expandGalaxy(galaxy);
  console.log(expandedGalaxy);
  const allPairs = findAllPairs(points);

  return allPairs.reduce((acc, cur) => {
    return (acc += findShortestPath(expandedGalaxy, ...cur));
  }, 0);
}

export function sumShortestExpandedPaths(galaxy, factor) {
  const { rows, cols, points } = findEmptyRowsAndCols(galaxy);
  const allPairs = findAllPairs(points);
  return allPairs.reduce((acc, cur) => {
    let [a, b] = cur;
    let nonExpandedDistance = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    const [startCol, endCol] = a[0] < b[0] ? [a[0], b[0]] : [b[0], a[0]];
    for (let i = startCol; i <= endCol; i++) {
      if (cols.includes(i)) {
        nonExpandedDistance += factor - 1;
      }
    }
    const [startRow, endRow] = a[1] < b[1] ? [a[1], b[1]] : [b[1], a[1]];
    for (let i = startRow; i <= endRow; i++) {
      if (rows.includes(i)) {
        nonExpandedDistance += factor - 1;
      }
    }
    return acc + nonExpandedDistance;
  }, 0);
}

export function findEmptyRowsAndCols(galaxy) {
  const points = [];
  const rows = Array.from({ length: galaxy.length }).fill(false);
  const cols = Array.from({ length: galaxy[0].length }).fill(false);
  for (let row = 0; row < galaxy.length; row++) {
    for (let col = 0; col < galaxy[row].length; col++) {
      if (galaxy[row][col] === "#") {
        rows[row] = true;
        cols[col] = true;
        points.push([col, row]);
      }
    }
  }
  return {
    rows: rows.reduce((acc, cur, ind) => {
      if (!cur) acc.push(ind);
      return acc;
    }, []),
    cols: cols.reduce((acc, cur, ind) => {
      if (!cur) acc.push(ind);
      return acc;
    }, []),
    points,
  };
}
