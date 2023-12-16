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
