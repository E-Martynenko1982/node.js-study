const fs = require("fs");

//read file

const pathToFile = 'd02/info.txt';
const data = fs.readFileSync(pathToFile, { encoding: "utf8", flag: "r" });
let dataArr = data.split("\r\n");
dataArr = dataArr.filter(index => index.trim() !== "");
console.log(dataArr)


