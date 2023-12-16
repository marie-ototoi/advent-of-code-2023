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

export function operateBox(box, cmd) {
  const newBox = { ...box };
  const length = Object.keys(box).length;
  if (cmd.includes("=")) {
    const [label, value] = cmd.split("=");
    if (box[label]) {
      newBox[label] = [parseInt(value), box[label][1]];
    } else {
      newBox[label] = [parseInt(value), length + 1];
    }
  } else {
    const [label] = cmd.split("-");
    if (box[label]) {
      const currentIndex = box[label][1];
      delete newBox[label];
      for (const [key, value] of Object.entries(newBox)) {
        if (value[1] > currentIndex) newBox[key][1] = newBox[key][1] - 1;
      }
    }
  }
  return newBox;
}

export function operateBoxes(instructions) {
  const boxes = Array.from({ length: 256 }, () => ({}));
  instructions.split(",").forEach((instruction) => {
    let label = instruction.includes("=")
      ? instruction.split("=")[0]
      : instruction.split("-")[0];
    const boxIndex = runHash(label);
    const box = operateBox(boxes[boxIndex], instruction);
    boxes[boxIndex] = box;
  });
  return boxes;
}

export function sumFocusPower(boxes) {
  return boxes.reduce((acc, cur, index) => {
    let powersInBox = 0;
    Object.entries(cur).forEach((box) => {
      const [key, value] = box;
      powersInBox += (index + 1) * value[0] * value[1];
    });
    return acc + powersInBox;
  }, 0);
}

export function operateBoxesAndSumPower(instructions) {
  const boxes = operateBoxes(instructions);
  return sumFocusPower(boxes);
}
