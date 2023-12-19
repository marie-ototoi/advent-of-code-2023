import readFile from "../getInput.js";
import { sumAcceptedPartsRatings } from "./utils.js";

console.log(sumAcceptedPartsRatings(readFile("./input-a.txt")));
