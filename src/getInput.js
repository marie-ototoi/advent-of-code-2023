import fs from "fs";

export default function readFile(filepath) {
  const allFileContents = fs.readFileSync(filepath, "utf-8");
  const lines = [];
  allFileContents.split(/\r?\n/).forEach((line, i) => {
    lines.push(line);
  });
  return lines;
}
