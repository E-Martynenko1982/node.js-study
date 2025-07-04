const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const users = require("./users");
const mimeTypes = require("./extensions");

const handleNotFound = (res) => {
  res.statusCode = 404;
  res.end("Not Found");
};

function staticFile(res, filePath, ext) {
  res.setHeader("Content-type", mimeTypes[ext]);
  fs.readFile("./public" + filePath, (err, data) => {
    if (err) {
      handleNotFound(res);
      return;
    }
    res.end(data);
  });
}

http.createServer(function (req, res) {
  let url = req.url;
  console.log(url);

  switch (url) {
    case "/":
      console.log("main page");
      staticFile(res, "/html/main.html", ".html");
      break;
    case "/about":
      console.log("about page");
      staticFile(res, "/html/about.html", ".html");
      break;
    case "/contact":
      console.log("contact page");
      staticFile(res, "/html/contact.html", ".html");
      break;
    case "/admin":
      console.log("admin page");
      staticFile(res, "/html/not-admin.html", ".html");
      break;
    case "/login":
      console.log("login page");
      staticFile(res, "/html/login.html", ".html");
      break;
    case "/cabinet":
      console.log("login page");

      break;
    default:
      const extname = String(path.extname(url)).toLowerCase();
      if (extname in mimeTypes) staticFile(res, url, extname);
      else {
        res.statusCode = 404;
        res.end();
      }
      break;
  }
}).listen(3500);
