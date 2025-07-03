const http = require("http");

http.createServer(function (req, res) {
  console.log("Server work");
  res.end("200");
}).listen(3500)