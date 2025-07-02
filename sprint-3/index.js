const fs = require("fs"); // module for work with file system
const path = require("path"); // module for fork with path

// is correct path to folder?
function f01() {
  const pathToDir = './test';
  if (fs.existsSync(pathToDir)) {
    console.log("yes");
  } else {
    console.log("no");
  }


}

// f01();

// is correct path to file?
function f02() {
  const pathToFile = './test/info.dat';
  if (fs.existsSync(pathToFile)) {
    console.log("yes");
  } else {
    console.log("no");
  }
}

//f02();

// size of file
function f03() {
  const pathToFile = './test/info.dat';
  const fileInfo = fs.statSync(pathToFile);
  console.log(fileInfo)

}

//f03();

//get files and folders in dir

function f04() {
  const pathToDir = "./test";
  const allFiles = fs.readdirSync(pathToDir);
  console.log(allFiles)

}

//f04()

// get relative path

const directoryPath = path.join(__dirname, "test");
console.log(directoryPath);

