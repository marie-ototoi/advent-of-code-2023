import readFile from "../getInput.js";
import { addPossibleGameIds } from "./utils.js";

const content = { red: 12, green: 13, blue: 14 };

console.log(addPossibleGameIds(readFile("./input-a.txt"), content));
