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
