import readFile from "../getInput.js";
import { sumShortestExpandedPaths } from "./utils.js";

console.log(sumShortestExpandedPaths(readFile("./input-a.txt"), 1000000));
