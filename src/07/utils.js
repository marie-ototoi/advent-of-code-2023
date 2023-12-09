const cardValues = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
};
const cardJokerValues = {
  A: 13,
  K: 12,
  Q: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1,
};
export function getHandStrength(line) {
  const hand = line.split(" ");
  const cardNumbersMap = hand[0].split("").reduce((acc, cur) => {
    if (acc.has(cur)) {
      acc.set(cur, acc.get(cur) + 1);
    } else {
      acc.set(cur, 1);
    }
    return acc;
  }, new Map());
  const cardNumbers = Array.from(cardNumbersMap.values());
  let handType;
  if (cardNumbers.includes(5)) {
    handType = 7;
  } else if (cardNumbers.includes(4)) {
    handType = 6;
  } else if (cardNumbers.includes(3) && cardNumbers.includes(2)) {
    handType = 5;
  } else if (cardNumbers.includes(3)) {
    handType = 4;
  } else if (
    (cardNumbers[0] === 2 && cardNumbers[1] === 2) ||
    (cardNumbers[1] === 2 && cardNumbers[2] === 2) ||
    (cardNumbers[0] === 2 && cardNumbers[2] === 2)
  ) {
    handType = 3;
  } else if (cardNumbers.includes(2)) {
    handType = 2;
  } else {
    handType = 1;
  }
  const handValue =
    cardValues[hand[0][0]] * 100000000 +
    cardValues[hand[0][1]] * 1000000 +
    cardValues[hand[0][2]] * 10000 +
    cardValues[hand[0][3]] * 100 +
    cardValues[hand[0][4]];
  return [hand[0], handType, handValue, parseInt(hand[1])];
}

export function getTotalWinnings(input) {
  const values = input.map((line) => getHandStrength(line));
  values.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[2] - b[2];
    } else {
      return a[1] - b[1];
    }
  });
  return values.reduce((acc, cur, ind) => {
    //console.log({ cur, ind }, cur[3] * (ind + 1));
    return acc + cur[3] * (ind + 1);
  }, 0);
}

export function getHandJokerStrength(line) {
  const hand = line.split(" ");
  const cardNumbersMap = hand[0].split("").reduce((acc, cur) => {
    if (cur !== "J") {
      if (acc.has(cur)) {
        acc.set(cur, acc.get(cur) + 1);
      } else {
        acc.set(cur, 1);
      }
    }
    return acc;
  }, new Map());

  const cardNumbers = Array.from(cardNumbersMap.values());
  const countJokers = hand[0].replace(/[^J]/g, "").length;
  if (countJokers > 0) {
    cardNumbers.sort((a, b) => b - a);
    cardNumbers[0] += countJokers;
  }
  if (countJokers === 5) {
    console.log(cardNumbers);
    console.log("joker");
    cardNumbers[0] = 5);
    console.log(cardNumbers);
  }
  let handType;
  if (cardNumbers.includes(5)) {
    handType = 7;
  } else if (cardNumbers.includes(4)) {
    handType = 6;
  } else if (cardNumbers.includes(3) && cardNumbers.includes(2)) {
    handType = 5;
  } else if (cardNumbers.includes(3)) {
    handType = 4;
  } else if (
    (cardNumbers[0] === 2 && cardNumbers[1] === 2) ||
    (cardNumbers[1] === 2 && cardNumbers[2] === 2) ||
    (cardNumbers[0] === 2 && cardNumbers[2] === 2)
  ) {
    handType = 3;
  } else if (cardNumbers.includes(2)) {
    handType = 2;
  } else {
    handType = 1;
  }

  const handValue =
    cardJokerValues[hand[0][0]] * 100000000 +
    cardJokerValues[hand[0][1]] * 1000000 +
    cardJokerValues[hand[0][2]] * 10000 +
    cardJokerValues[hand[0][3]] * 100 +
    cardJokerValues[hand[0][4]];
  return [hand[0], handType, handValue, parseInt(hand[1])];
}

export function getTotalJokerWinnings(input) {
  const values = input.map((line) => getHandJokerStrength(line));
  values.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[2] - b[2];
    } else {
      return a[1] - b[1];
    }
  });
  return values.reduce((acc, cur, ind) => {
    //console.log({ cur, ind }, cur[3] * (ind + 1));
    return acc + cur[3] * (ind + 1);
  }, 0);
}
