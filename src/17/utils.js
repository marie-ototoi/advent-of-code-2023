export function isValid(col, row, input) {
  if (row < 0 || row >= input.length) return false;
  if (col < 0 || col >= input[0].length) return false;
  return true;
}
const top = [0, -1];
const right = [1, 0];
const bottom = [0, 1];
const left = [-1, 0];
const directions = [top, right, bottom, left];
export function getNextPointsAndDirections(
  currentPoint,
  currentDirection,
  step,
  input
) {
  const results = [];
  for (const direction of directions) {
    const nextPoint = [
      currentPoint[0] + direction[0],
      currentPoint[1] + direction[1],
    ];
    const sameDirection = currentDirection.join(",") === direction.join(",");
    const oppositeDirection =
      (direction[0] !== 0 && direction[0] === currentDirection[0] * -1) ||
      (direction[1] !== 0 && direction[1] === currentDirection[1] * -1);

    if (
      isValid(nextPoint[0], nextPoint[1], input) &&
      // no opposite direction
      !oppositeDirection &&
      // same direction only if step less than 3
      (!sameDirection || step < 3)
    ) {
      results.push([nextPoint, direction, sameDirection ? step + 1 : 1]);
    }
  }
  return results;
}

export function getMinimumLoss(input) {
  const seen = new Map();
  let minLoad = Number.POSITIVE_INFINITY;
  let queue = [[[0, 0], right, 0, -1 * input[0][0]]];

  while (queue.length) {
    let nextQueue = [];

    for (let i = 0; i < queue.length; i++) {
      let [currentPoint, currentDirection, currentSteps, previousTotal] =
        queue[i];
      const currentTotal =
        previousTotal + parseInt(input[currentPoint[1]][currentPoint[0]]);

      const stored = seen.get(
        `${currentPoint[0]},${currentPoint[1]},${currentDirection[0]},${currentDirection[1]},${currentSteps}`
      );

      if (!stored || stored > currentTotal) {
        seen.set(
          `${currentPoint[0]},${currentPoint[1]},${currentDirection[0]},${currentDirection[1]},${currentSteps}`,
          currentTotal
        );
        const endPoint = [input[0].length - 1, input.length - 1];
        if (
          currentTotal < minLoad &&
          currentTotal +
            Math.abs(endPoint[0] - currentPoint[0]) +
            Math.abs(endPoint[1] - currentPoint[1]) <
            minLoad
        ) {
          if (
            currentPoint[0] === endPoint[0] &&
            currentPoint[1] === endPoint[1]
          ) {
            minLoad = Math.min(minLoad, currentTotal);
          } else {
            const next = getNextPointsAndDirections(
              currentPoint,
              currentDirection,
              currentSteps,
              input
            );

            for (const [nextPoint, nextDirection, nextSteps] of next) {
              nextQueue.push([
                nextPoint,
                nextDirection,
                nextSteps,
                currentTotal,
              ]);
            }
          }
        }
      }
    }
    queue = nextQueue;
  }
  return minLoad;
}
