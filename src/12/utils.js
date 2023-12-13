export function sumPossibleArrangements(input) {
  return input.reduce((acc, cur) => {
    return acc + countPossibleArrangements(...readLine(cur));
  }, 0);
}

export function isValid(pattern, groups) {
  const currentGroups = pattern.split(".").filter((g) => g !== "");
  if (currentGroups.length !== groups.length) return false;
  return currentGroups.reduce((acc, cur, ind) => {
    if (cur.length !== groups[ind]) return false;
    return acc;
  }, true);
}

export function isPossible(pattern, groups) {
  /*const spaces = pattern.replace(/[\.]/g, "");
  const needed = groups.reduce((acc, cur) => acc + cur, 0);
  if (spaces.length < needed) return false;*/
  const start = pattern.split("?");
  const currentGroups = start[0].split(".").filter((g) => g !== "");
  return currentGroups.reduce((acc, cur, ind) => {
    if (ind === currentGroups.length - 1) {
      if (cur.length > groups[ind]) return false;
    } else {
      if (cur.length !== groups[ind]) return false;
    }
    return acc;
  }, true);
}

export function countPossibleArrangements(
  initialPattern,
  initialGroups,
  expand
) {
  const [pattern, groups] = expand
    ? unfoldLine(initialPattern, initialGroups)
    : [initialPattern, initialGroups];
  //0123456

  let results = [];
  function replaceCar(res, sign, indexes, maxIndexesLength) {
    const nextIndex = indexes[0];
    if (indexes.length === 0) {
      if (!results.includes(res) && isValid(res, groups)) {
        results.push(res);
      }
      return;
    }
    res = res.substring(0, nextIndex) + sign + res.substring(nextIndex + 1);

    if (isPossible(res, groups)) {
      const remainingIndexes = indexes.slice(1);
      replaceCar(res, "#", remainingIndexes, maxIndexesLength);
      replaceCar(res, ".", remainingIndexes, maxIndexesLength);
    }
  }
  const findMatches = pattern.matchAll(/[?]/g);
  const indexes = Array.from(findMatches).map((m) => m.index);
  replaceCar(pattern, "#", indexes, indexes.length);
  replaceCar(pattern, ".", indexes, indexes.length);

  return results.length;
}

export function readLine(line) {
  const read = line.split(" ");
  return [read[0], read[1].split(",").map((n) => parseInt(n))];
}
