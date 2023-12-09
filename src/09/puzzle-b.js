import readFile from "../getInput.js";
import { addPreviousValues } from "./utils.js";

console.log(addPreviousValues(readFile("./input-a.txt")));
