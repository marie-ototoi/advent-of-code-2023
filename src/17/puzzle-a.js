import readFile from "../getInput.js";
import { getMinimumLoss } from "./utils.js";

console.log(getMinimumLoss(readFile("./input-a.txt")));
