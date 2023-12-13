import readFile from "../getInput.js";
import { countEnclosedTiles } from "./utils.js";

console.log(countEnclosedTiles(readFile("./input-a.txt")));
