import readFile from "../getInput.js";
import { countEnergizedTiles } from "./utils.js";

console.log(countEnergizedTiles([-1, 0], [1, 0], readFile("./input-a.txt")));
