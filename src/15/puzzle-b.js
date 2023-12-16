import readFile from "../getInput.js";
import { operateBoxesAndSumPower } from "./utils.js";

console.log(operateBoxesAndSumPower(readFile("./input-a.txt")[0]));
