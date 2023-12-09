import readFile from "../getInput.js";
import { countStepsFromAAAtoZZZ } from "./utils.js";

console.log(countStepsFromAAAtoZZZ(readFile("./input-a.txt")));
