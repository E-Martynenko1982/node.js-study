const fs = require("fs");

//read json file

const data = fs.readFileSync("./j_01.json", "utf8");
let dataObj = JSON.parse(data);
console.log(dataObj);
