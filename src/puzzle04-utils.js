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
