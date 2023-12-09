import readFile from "../getInput.js";
import { getTotalWinnings } from "./utils.js";

console.log(getTotalWinnings(readFile("./input-a.txt")));
