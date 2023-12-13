import readFile from "../getInput.js";
import { summarizeSmudgeNotes } from "./utils.js";

console.log(summarizeSmudgeNotes(readFile("./input-a.txt"), true));
