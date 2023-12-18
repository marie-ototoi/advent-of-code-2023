import readFile from "../getInput.js";
import { countTrenches } from "./utils.js";

console.log(countTrenches(readFile("./input-a.txt")));
