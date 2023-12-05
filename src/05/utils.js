export function retrieveSeedsAndMaps(input) {
  const result = { maps: [] };
  let maxDecr = 0;
  let currentMap;
  let currentMaxDecr = Number.POSITIVE_INFINITY;
  for (const line of input) {
    const type = line.split(":");
    if (type[0] === "seeds") {
      result.seeds = type[1]
        .trim()
        .split(" ")
        .map((n) => parseInt(n));
    } else if (type[0].includes("map")) {
      currentMap = [];
    } else if (line === "") {
      if (currentMap) {
        result.maps.push(currentMap);
        maxDecr += currentMaxDecr;
      }
    } else {
      const pattern = line
        .trim()
        .split(" ")
        .map((n) => parseInt(n));
      const range0 = pattern[1];
      const range1 = pattern[1] + pattern[2] - 1;
      const transform = pattern[0] - pattern[1];
      if (transform < currentMaxDecr) currentMaxDecr = transform;
      currentMap.push({ range: [range0, range1], incr: transform });
    }
  }
  if (currentMap) {
    result.maps.push(currentMap);
    maxDecr += currentMaxDecr;
  }

  return { ...result, maxDecr };
}

export function transformSeed(seed, maps) {
  let transformed = seed;
  for (const map of maps) {
    for (const range of map) {
      if (transformed >= range.range[0] && transformed <= range.range[1]) {
        transformed += range.incr;
        break;
      }
    }
  }
  return transformed;
}

export function findMinimumTransformedSeed(input) {
  const { seeds, maps } = retrieveSeedsAndMaps(input);
  return Math.min(...seeds.map((seed) => transformSeed(seed, maps)));
}
