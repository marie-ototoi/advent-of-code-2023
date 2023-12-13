import readFile from "../getInput.js";
import { sumPossibleUnfoldedArrangements } from "./utils.js";

console.log(sumPossibleUnfoldedArrangements(readFile("./input-a.txt"), true));
