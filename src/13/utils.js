export function readNotes(input) {
  return input.reduce(
    (acc, cur) => {
      if (cur === "") {
        acc.push([]);
      } else {
        acc.at(-1).push(cur);
      }
      return acc;
    },
    [[]]
  );
}

export function findReflections(note, ignoreCol, ignoreRow) {
  let startRow = null;
  let cols = note[0].split("").map(() => "");
  for (let i = 0; i < note.length; i++) {
    if (startRow) {
      const diff = i - startRow;
      if (note[i - diff * 2] && note[i] !== note[i - diff * 2]) {
        startRow = null;
      }
    }
    if (!startRow) {
      if (i > 0 && note[i] === note[i - 1] && (!ignoreRow || i !== ignoreRow)) {
        startRow = i - 0.5;
      }
    }
    for (let j = 0; j < note[i].length; j++) {
      cols[j] += note[i][j];
    }
  }
  let startCol = null;
  for (let i = 0; i < cols.length; i++) {
    if (startCol) {
      const diff = i - startCol;
      if (cols[i - diff * 2] && cols[i] !== cols[i - diff * 2]) {
        startCol = null;
      }
    }
    if (!startCol) {
      if (i > 0 && cols[i] === cols[i - 1] && (!ignoreCol || i !== ignoreCol)) {
        startCol = i - 0.5;
      }
    }
  }
  return [startCol ? startCol + 0.5 : 0, startRow ? startRow + 0.5 : 0];
}
export function summarizeNotes(input) {
  const notes = readNotes(input);
  return notes.reduce((acc, cur) => {
    const [col, row] = findReflections(cur);
    return acc + col + row * 100;
  }, 0);
}

export function findSmudge(note) {
  const [initialCol, initialRow] = findReflections(note);
  const inverse = { "#": ".", ".": "#" };
  for (let i = 0; i < note.length; i++) {
    for (let j = 0; j < note[i].length; j++) {
      const tryNote = [...note];
      const line = note[i];
      tryNote[i] =
        line.substring(0, j) + inverse[note[i][j]] + line.substring(j + 1);
      const [col, row] = findReflections(tryNote, initialCol, initialRow);
      if (row !== 0 && row !== initialRow) {
        return [0, row];
      } else if (col !== 0 && col !== initialCol) {
        return [col, 0];
      }
    }
  }
  return [0, 0];
}

export function summarizeSmudgeNotes(input) {
  const notes = readNotes(input);
  return notes.reduce((acc, cur) => {
    const [col, row] = findSmudge(cur);
    return acc + col + row * 100;
  }, 0);
}
