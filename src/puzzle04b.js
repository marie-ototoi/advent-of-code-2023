import readFile from "./getInput.js";
import { countScratchcards } from "./puzzle04-utils.js";

console.log(countScratchcards(readFile("./puzzle04a.txt")));
