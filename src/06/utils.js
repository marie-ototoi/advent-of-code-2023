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

export function multiplyCountOfPossibleStrategies(input) {
  const game = inputToRaces(input);
  return game.reduce((acc, cur) => {
    return acc * countPossibleStrategies(...cur);
  }, 1);
}
