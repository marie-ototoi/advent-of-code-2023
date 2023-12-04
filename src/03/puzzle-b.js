import readFile from "../getInput.js";
import { addGearNumbers } from "./utils.js";

console.log(addGearNumbers(readFile("./input-a.txt")));
