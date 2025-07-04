const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3500;

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".txt": "text/plain",
  ".json": "application/json",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".zip": "application/zip",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".bin": "application/octet-stream",
};

const handleNotFound = (res) => {
  res.statusCode = 404;
  res.end('Not Found');
};


function staticFile(res, filePath, ext) {
  res.setHeader("Content-type", mimeTypes[ext]);
  fs.readFile("./public" + filePath, (err, data) => {
    if (err) {
      handleNotFound(res);
      return
    }
    res.end(data);
  })
}

http.createServer(function (req, res) {
  const url = req.url;
  console.log(url);

  switch (url) {
    case "/contact":
      console.log("Contact page");
      staticFile(res, "/contact.html", ".html")
      break;
    case "/about":
      console.log("Contact page");
      staticFile(res, "/about.html", ".html")
      break;
    default:
      const extname = String(path.extname(url)).toLowerCase();
      if (extname in mimeTypes) {
        staticFile(res, url, extname)
      } else {
        handleNotFound(res)
      }
  }

}).listen(PORT)
