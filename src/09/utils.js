export function findNextValue(line) {
  const numbers = line.split(" ").map((n) => parseInt(n));
  const steps = [numbers];
  while (String(steps.at(-1)).replace(/[0,]/g, "").length > 0) {
    const newStep = steps.at(-1).reduce((acc, cur, ind) => {
      if (ind > 0) acc.push(cur - steps.at(-1).at(ind - 1));
      return acc;
    }, []);
    steps.push(newStep);
  }
  console.log(steps.at(-1));
  // add 0
  steps.at(-1).push(0);
  // extrapolate
  for (let i = steps.length - 2; i >= 0; i--) {
    steps.at(i).push(steps.at(i).at(-1) + steps.at(i + 1).at(-1));
  }
  //console.log("after", steps);
  return steps.at(0).at(-1);
}

export function addNextValues(input) {
  return input.reduce((acc, cur) => {
    return acc + findNextValue(cur);
  }, 0);
}

export function findPreviousValue(line) {
  const numbers = line.split(" ").map((n) => parseInt(n));
  const steps = [numbers];
  while (String(steps.at(-1)).replace(/[0,]/g, "").length > 0) {
    const newStep = steps.at(-1).reduce((acc, cur, ind) => {
      if (ind > 0) acc.push(cur - steps.at(-1).at(ind - 1));
      return acc;
    }, []);
    steps.push(newStep);
  }
  //console.log(steps);
  // add 0
  steps.at(-1).splice(0, 0, 0);
  // extrapolate
  for (let i = steps.length - 2; i >= 0; i--) {
    steps.at(i).splice(0, 0, steps.at(i).at(0) - steps.at(i + 1).at(0));
  }
  //console.log("after", steps);
  return steps.at(0).at(0);
}

export function addPreviousValues(input) {
  return input.reduce((acc, cur) => {
    return acc + findPreviousValue(cur);
  }, 0);
}
