export function findFirstAndLastDigits(input) {
  let first, last;
  for (let i = 0, j = input.length; i < input.length, j >= 0; i++, j--) {
    let curI = Number(input[i]);
    let curJ = Number(input[j]);
    if (!first && !isNaN(curI)) first = curI;
    if (!last && !isNaN(curJ)) last = curJ;
  }
  return first * 10 + last;
}

export function findFirstAndLastDigitsWithLetters(input) {
  const dict = new Map();
  dict.set("one", 1);
  dict.set("two", 2);
  dict.set("three", 3);
  dict.set("four", 4);
  dict.set("five", 5);
  dict.set("six", 6);
  dict.set("seven", 7);
  dict.set("eight", 8);
  dict.set("nine", 9);
  const pattern = /[0-9]|one|two|three|four|five|six|seven|eight|nine/g;
  let matches = [];
  let res;
  while ((res = pattern.exec(input))) {
    matches.push(res);
    if (["one", "two", "three", "five", "eight", "nine"].includes(res[0]))
      pattern.lastIndex--;
  }
  const first = !isNaN(Number(matches[0][0]))
    ? Number(matches[0][0])
    : dict.get(matches[0][0]);
  const last = !isNaN(Number(matches.at(-1)[0]))
    ? Number(matches.at(-1)[0])
    : dict.get(matches.at(-1)[0]);
  return first * 10 + last;
}

export function findSumOfFirstAndLastDigits(inputs) {
  return inputs.reduce((acc, cur) => acc + findFirstAndLastDigits(cur), 0);
}

export function findSumOfFirstAndLastDigitsWithLetters(inputs) {
  return inputs.reduce((acc, cur) => {
    console.log(cur, findFirstAndLastDigitsWithLetters(cur));
    return acc + findFirstAndLastDigitsWithLetters(cur);
  }, 0);
}
