export function moveRocks(prevDish, direction = 0, cycle) {
  const dish = [...prevDish];
  const directions = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
  ];
  const currentDirection = directions[direction];
  let moved = false;
  //console.log({ direction });

  for (let i = 0; i < dish.length; i++) {
    for (let j = 0; j < dish[i].length; j++) {
      if (
        dish[i][j] === "O" &&
        dish[i + currentDirection[1]] &&
        dish[i + currentDirection[1]][j + currentDirection[0]] &&
        dish[i + currentDirection[1]][j + currentDirection[0]] === "."
      ) {
        dish[i] = dish[i].substring(0, j) + "." + dish[i].substring(j + 1);
        dish[i + currentDirection[1]] =
          dish[i + currentDirection[1]].substring(0, j + currentDirection[0]) +
          "O" +
          dish[i + currentDirection[1]].substring(j + currentDirection[0] + 1);
        moved = true;
      }
    }
  }
  if (moved) {
    return moveRocks(dish, direction, cycle);
  } else if (cycle && direction < 3) {
    return moveRocks(dish, direction + 1, cycle);
  } else {
    return dish;
  }
}

export function sumRockLoad(dish) {
  const dishNorth = moveRocks(dish);
  return dishNorth.reduce((acc, cur, ind) => {
    const rocksInRow = cur.replace(/[^O]/g, "").length;
    return acc + (dish.length - ind) * rocksInRow;
  }, 0);
}

export function summarizeRockPositions(dish) {
  const result = [];
  for (let i = 0; i < dish.length; i++) {
    const line = [];
    for (let j = 0; j < dish[i].length; j++) {
      if (dish[i][j] === "O") line.push(j);
    }
    result.push(line.join(","));
  }
  return result.join(":");
}

export function findCyclesRepeating(dish) {
  let repeating;
  let memo = new Map();
  let i = 0;
  let newDish = dish;
  while (!repeating) {
    // make a cycle
    newDish = moveRocks(newDish, 0, true);
    // save result
    const summary = summarizeRockPositions(newDish);
    if (memo.has(summary)) {
      repeating = [memo.get(summary), i - memo.get(summary)];
    } else {
      memo.set(summary, i);
    }
    i++;
  }
  return repeating;
}

export function findLoadAfterCycles(dish, cycles) {
  const [firstRepeating, cycleLength] = findCyclesRepeating(dish);
  const restAfterCycles = (cycles - firstRepeating) % cycleLength;
  const cyclesToRun = firstRepeating + restAfterCycles;
  let newDish = [...dish];
  for (let i = 0; i < cyclesToRun; i++) {
    newDish = moveRocks(newDish, 0, true);
  }
  return newDish.reduce((acc, cur, ind) => {
    const rocksInRow = cur.replace(/[^O]/g, "").length;
    return acc + (dish.length - ind) * rocksInRow;
  }, 0);
}
