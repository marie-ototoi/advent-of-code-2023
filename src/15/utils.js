export function runHash(sequence) {
  return sequence.split("").reduce((acc, cur) => {
    return ((acc + cur.charCodeAt(0)) * 17) % 256;
  }, 0);
}

export function sumHashes(input) {
  return input.split(",").reduce((acc, cur) => {
    return acc + runHash(cur);
  }, 0);
}
