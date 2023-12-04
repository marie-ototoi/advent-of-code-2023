import readFile from "../getInput.js";
import { sumScratchcardsValues } from "./utils.js";

console.log(sumScratchcardsValues(readFile("./input-a.txt")));
