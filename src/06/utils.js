export function countPossibleStrategies(time, record) {
  let i = Math.ceil(record / time);
  let currentRecord;
  let winningStrategies = [];
  while ((!currentRecord || currentRecord > record) && time - i > 0) {
    if ((time - i) * i > record) {
      currentRecord = (time - i) * i;
      winningStrategies.push(i);
    }
    i++;
  }
  return winningStrategies.length;
}

export function inputToRaces(input) {
  const time = input[0]
    .split("Time:")[1]
    .trim()
    .split(" ")
    .filter((n) => n !== " " && n !== "")
    .map((n) => parseInt(n));
  const distance = input[1]
    .split("Distance:")[1]
    .trim()
    .split(" ")
    .filter((n) => n !== " " && n !== "")
    .map((n) => parseInt(n));
  return time.reduce((acc, cur, i) => {
    acc.push([cur, distance[i]]);
    return acc;
  }, []);
}

export function inputToRace(input) {
  const time = parseInt(input[0].split("Time:")[1].replace(/\s/g, ""));
  const distance = parseInt(input[1].split("Distance:")[1].replace(/\s/g, ""));
  return [time, distance];
}

export function multiplyCountOfPossibleStrategies(input) {
  const game = inputToRaces(input);
  return game.reduce((acc, cur) => {
    return acc * countPossibleStrategies(...cur);
  }, 1);
}

export function getCountOfPossibleStrategies(input) {
  const race = inputToRace(input);
  return countPossibleStrategies(...race);
}
