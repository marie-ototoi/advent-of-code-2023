import readFile from "../getInput.js";
import { addPartNumbers } from "./utils.js";

console.log(addPartNumbers(readFile("./input-a.txt")));
