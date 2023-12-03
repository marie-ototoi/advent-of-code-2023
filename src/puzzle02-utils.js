export function isGamePossible(draws, content) {
  for (let draw of draws) {
    for (let color in draw) {
      if (draw[color] > content[color]) {
        return false;
      }
    }
  }
  return true;
}

export function lineToJson(line) {
  const game = line.split(":");
  const draws = game[1].split(";");
  return {
    id: parseInt(game[0].replace(/[^0-9]/g, "")),
    draws: draws.map((draw) => {
      const result = {};
      const colors = draw.split(",");
      for (let color of colors) {
        const number = parseInt(color.replace(/[^0-9]/g, ""));
        if (color.includes("blue")) {
          result.blue = number;
        } else if (color.includes("green")) {
          result.green = number;
        } else {
          result.red = number;
        }
      }
      return result;
    }),
  };
}

export function addPossibleGameIds(games, content) {
  return games.reduce((acc, cur) => {
    const game = lineToJson(cur);
    return acc + (isGamePossible(game.draws, content) ? game.id : 0);
  }, 0);
}

export function getMinimumSet(draws) {
  const result = { green: 0, red: 0, blue: 0 };
  for (let draw of draws) {
    for (let color in draw) {
      if (draw[color] > result[color]) {
        result[color] = draw[color];
      }
    }
  }
  return result;
}

export function getPower(draw) {
  return draw.green * draw.blue * draw.red;
}

export function addPowerOfMinimumSets(games) {
  return games.reduce((acc, cur) => {
    const game = lineToJson(cur);
    const minimumSet = getMinimumSet(game.draws);
    const power = getPower(minimumSet);
    return acc + power;
  }, 0);
}
