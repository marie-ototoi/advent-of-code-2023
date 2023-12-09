import readFile from "../getInput.js";
import { getTotalJokerWinnings } from "./utils.js";

console.log(getTotalJokerWinnings(readFile("./input-a.txt")));
