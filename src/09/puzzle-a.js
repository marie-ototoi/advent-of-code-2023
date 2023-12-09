import readFile from "../getInput.js";
import { addNextValues } from "./utils.js";

console.log(addNextValues(readFile("./input-a.txt")));
