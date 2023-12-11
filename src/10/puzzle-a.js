import readFile from "../getInput.js";
import { findFurthestTile } from "./utils.js";

console.log(findFurthestTile(readFile("./input-a.txt")));
