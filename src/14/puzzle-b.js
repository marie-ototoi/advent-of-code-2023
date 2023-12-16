import readFile from "../getInput.js";
import { findLoadAfterCycles } from "./utils.js";

console.log(findLoadAfterCycles(readFile("./input-a.txt"), 1000000000));
