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

export function findSumOfFirstAndLastDigits(inputs) {
  return inputs.reduce((acc, cur) => acc + findFirstAndLastDigits(cur), 0);
}
