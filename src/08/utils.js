export function getLeaves(line) {
  const mapping = line.split(" = ");
  const from = mapping[0];
  let [left, right] = mapping[1].replace(/[()]/g, "").split(", ");
  return [from, left, right];
}

export function buildTree(input) {
  let tree = new Map();
  for (const line of input) {
    let [from, left, right] = getLeaves(line);
    if (left === from) left = null;
    if (right === from) right = null;
    if (left || right) {
      tree.set(from, [left, right]);
    }
  }
  return tree;
}

export function countStepsFromAAAtoZZZ(input) {
  let directions = input[0];
  input.splice(0, 2);
  let tree = buildTree(input);

  return countSteps(tree, "AAA", directions);
}

export function countSteps(tree, start, directions) {
  let count = 0;
  let i = 0;
  let current = start;
  while (current !== "ZZZ") {
    const direction = directions[i];
    const node = tree.get(current);
    count++;
    current = direction === "L" ? node[0] : node[1];
    if (i < directions.length - 1) {
      i++;
    } else {
      i = 0;
    }
  }
  return count;
}

export function countStepsZ(tree, start, directions) {
  let count = 0;
  let i = 0;
  let current = start;
  while (current[2] !== "Z") {
    const direction = directions[i];
    const node = tree.get(current);
    count++;
    current = direction === "L" ? node[0] : node[1];
    if (i < directions.length - 1) {
      i++;
    } else {
      i = 0;
    }
  }
  return count;
}

export function findStartingNodes(nodes) {
  return nodes.filter((node) => node[2] === "A");
}

export function countStepsFromAllxxAtoxxZ(input) {
  let directions = input[0];
  input.splice(0, 2);
  let tree = buildTree(input);
  let current = findStartingNodes(Array.from(tree.keys()));
  //console.log(current);
  let counts = current.map((cur) => countStepsZ(tree, cur, directions));

  return findLowestCommonMultiple(counts, counts.length);
}

function greatestCommonDenominator(a, b) {
  if (b == 0) return a;
  return greatestCommonDenominator(b, a % b);
}

function findLowestCommonMultiple(elements, length) {
  let res = elements[0];
  for (let i = 1; i < length; i++)
    res = (elements[i] * res) / greatestCommonDenominator(elements[i], res);
  return res;
}
