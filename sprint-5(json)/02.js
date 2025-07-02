const fs = require("fs");

//write JSON

const obj = {
  "course": "node.js 2024",
  "sprints": 12,
  "tasks": 165
}

fs.writeFileSync("./j_01.json", JSON.stringify(obj), { encoding: "utf8", flag: "w" });