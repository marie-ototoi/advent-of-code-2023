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

export function unfoldLine(line) {
  const read = line.split(" ");
  const pattern = read[0];
  const groups = read[1].split(",").map((n) => parseInt(n));
  return [
    [pattern, pattern, pattern, pattern, pattern].join("?"),
    [...groups, ...groups, ...groups, ...groups, ...groups],
  ];
}

const memo = new Map();

export function countPossibleUnfoldedArrangements(pattern, groups) {
  if (memo.has(`${pattern},${groups.join(":")}`))
    return memo.get(`${pattern},${groups.join(":")}`);

  // if pattern and groups finish at the same time
  if (pattern.length === 0 && groups.length === 0) {
    return 1;
  }
  // else if pattern finishes before groups => impossible
  if (pattern.length === 0 && groups.length > 0) {
    return 0;
  }
  // if groups are finished
  if (groups.length === 0) {
    // if there are # left in the following => impossible
    if (pattern.includes("#")) {
      return 0;
    } else {
      return 1;
    }
  }

  // not enough chars left
  if (
    pattern.length <
    groups.reduce((acc, cur) => acc + cur, 0) + groups.length - 1
  ) {
    return 0;
  }

  if (pattern[0] === ".") {
    const count = countPossibleUnfoldedArrangements(pattern.slice(1), groups);
    memo.set(`${pattern},${groups.join(":")}`, count);
    return count;
  }

  if (pattern[0] === "#") {
    const [currentGroupLength, ...remainingGroups] = groups;
    // if not only # in the groups => impossible
    if (pattern.substring(0, currentGroupLength).includes(".")) return 0;

    // groups not followed by a . => impossible
    if (pattern[currentGroupLength] === "#") return 0;

    const count = countPossibleUnfoldedArrangements(
      pattern.slice(currentGroupLength + 1),
      remainingGroups
    );
    memo.set(`${pattern},${groups.join(":")}`, count);
    return count;
  }

  // if current is ?, try both # and .
  const count =
    countPossibleUnfoldedArrangements("#" + pattern.slice(1), groups) +
    countPossibleUnfoldedArrangements("." + pattern.slice(1), groups);
  memo.set(`${pattern},${groups.join(":")}`, count);
  return count;
}

export function sumPossibleUnfoldedArrangements(input) {
  return input.reduce((acc, cur) => {
    const arr = countPossibleUnfoldedArrangements(...unfoldLine(cur));
    return acc + arr;
  }, 0);
}
