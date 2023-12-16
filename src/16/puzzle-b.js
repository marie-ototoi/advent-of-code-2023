import readFile from "../getInput.js";
import { findMaxEnergizedTiles } from "./utils.js";

console.log(findMaxEnergizedTiles(readFile("./input-a.txt")));
