import readFile from "../getInput.js";
import { sumHashes } from "./utils.js";

console.log(sumHashes(readFile("./input-a.txt")[0]));
