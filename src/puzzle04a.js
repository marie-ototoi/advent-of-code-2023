import readFile from "./getInput.js";
import { sumScratchcardsValues } from "./puzzle04-utils.js";

console.log(sumScratchcardsValues(readFile("./puzzle04a.txt")));
