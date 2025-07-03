const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

//read of file csv

// const results = [];
// fs.createReadStream("example_01.csv")
//   .pipe(csv(""))
//   .on("data", (data) => results.push(data))
//   .on("end", () => {
//     console.log(results)
//   })

// write csv file

const csvWriter = createCsvWriter({
  path: 'example_02.csv',
  header: [
    { id: 'name', title: 'NAME' },
    { id: 'lang', title: 'LANGUAGE' }
  ]
});

const records = [
  { name: 'Bob', lang: 'French, English' },
  { name: 'Mary', lang: 'English' }
];

csvWriter.writeRecords(records)
  .then(() => {
    console.log("...Done");
  })