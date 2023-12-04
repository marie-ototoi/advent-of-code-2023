export function lineToJson(line) {
  const card = line.split(":");
  const parts = card[1].split("|");
  const id = parseInt(card[0].replace(/[^0-9]/g, ""));
  const winning = parts[0].split(" ").reduce((acc, cur) => {
    if (!isNaN(parseInt(cur))) acc.push(parseInt(cur));
    return acc;
  }, []);
  const draw = parts[1].split(" ").reduce((acc, cur) => {
    if (!isNaN(parseInt(cur))) acc.push(parseInt(cur));
    return acc;
  }, []);
  return {
    id,
    winning,
    draw,
  };
}

export function countWinningNumbers(winning, draw) {
  return draw.reduce((acc, cur) => acc + (winning.includes(cur) ? 1 : 0), 0);
}

export function getScratchcardValue(card) {
  const { winning, draw } = lineToJson(card);
  const countNumbers = countWinningNumbers(winning, draw);
  return countNumbers > 0 ? 2 ** (countNumbers - 1) : 0;
}

export function sumScratchcardsValues(cards) {
  return cards.reduce((acc, cur) => {
    return acc + getScratchcardValue(cur);
  }, 0);
}

export function countScratchcards(cards) {
  let wonCards = new Map();
  let i = 0;
  while (i < cards.length) {
    const { id, winning, draw } = lineToJson(cards[i]);
    const currentCardNumber = wonCards.has(id) ? wonCards.get(id) + 1 : 1;
    wonCards.set(id, currentCardNumber);
    const countNumbers = countWinningNumbers(winning, draw);
    for (let i = 1; i <= currentCardNumber; i++) {
      for (let j = 1; j <= countNumbers; j++) {
        const wonId = id + j;
        const wonCardNumber = wonCards.has(wonId) ? wonCards.get(wonId) + 1 : 1;
        wonCards.set(wonId, wonCardNumber);
      }
    }
    i++;
  }
  return Array.from(wonCards.values()).reduce((acc, cur) => acc + cur, 0);
}
