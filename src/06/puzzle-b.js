import readFile from "../getInput.js";
import { getCountOfPossibleStrategies } from "./utils.js";

console.log(getCountOfPossibleStrategies(readFile("./input-a.txt")));
