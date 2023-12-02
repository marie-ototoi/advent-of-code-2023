import readFile from "./getInput.js";
import { addPossibleGameIds } from "./puzzle02-utils.js";

const content = { red: 12, green: 13, blue: 14 };

console.log(addPossibleGameIds(readFile("./puzzle02a.txt"), content));
