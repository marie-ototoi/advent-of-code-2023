import readFile from "../getInput.js";
import { countScratchcards } from "./utils.js";

console.log(countScratchcards(readFile("./input-a.txt")));
