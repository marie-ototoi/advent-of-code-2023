import readFile from "../getInput.js";
import { sumShortestPaths } from "./utils.js";

console.log(sumShortestPaths(readFile("./input-a.txt")));
