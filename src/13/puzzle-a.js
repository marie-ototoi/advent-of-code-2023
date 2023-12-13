import readFile from "../getInput.js";
import { summarizeNotes } from "./utils.js";

console.log(summarizeNotes(readFile("./input-a.txt")));
