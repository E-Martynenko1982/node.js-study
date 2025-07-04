const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const users = require("./public/util/users");
const mimeTypes = require("./public/util/extensions");

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

function parseCookies(req) {
  const list = {};
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach(function (cookie) {
    let parts = cookie.split('=');
    list[parts[0].trim()] = decodeURIComponent(parts[1]);
  });
  return list;
}

function setCookie(res, name, value, options = {}) {
  let cookie = `${name}=${encodeURIComponent(value)}`;
  if (options.maxAge) cookie += `; Max-Age=${options.maxAge}`;
  if (options.path) cookie += `; Path=${options.path}`;
  res.setHeader('Set-Cookie', cookie);
}

function clearCookie(res, name) {
  res.setHeader('Set-Cookie', `${name}=; Max-Age=0; Path=/`);
}

function redirect(res, location) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.end();
}

http.createServer(function (req, res) {
  let parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  const cookies = parseCookies(req);

  switch (pathname) {
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
    case "/admin": {
      // Доступ лише для авторизованих користувачів (будь-який користувач)
      const userId = cookies.userId;
      if (userId && users[userId]) {
        staticFile(res, "/html/admin.html", ".html");
      } else {
        redirect(res, "/not-admin");
      }
      break;
    }
    case "/cabinet": {
      // Якщо login+password у query — логін, інакше перевірка cookie
      const { login, password } = parsedUrl.query;
      if (login && password) {
        // Перевірка користувача
        let foundId = null;
        for (const [id, user] of Object.entries(users)) {
          if (user.name === login && user.pass === password) {
            foundId = id;
            break;
          }
        }
        if (foundId) {
          setCookie(res, "userId", foundId, { path: "/", maxAge: 3600 });
          redirect(res, "/cabinet");
        } else {
          redirect(res, "/not-admin");
        }
      } else {
        // Якщо є cookie — показати кабінет
        const userId = cookies.userId;
        if (userId && users[userId]) {
          staticFile(res, "/html/cabinet.html", ".html");
        } else {
          redirect(res, "/not-admin");
        }
      }
      break;
    }
    case "/login":
      console.log("login page");
      staticFile(res, "/html/login.html", ".html");
      break;
    case "/not-admin":
      staticFile(res, "/html/not-admin.html", ".html");
      break;
    case "/exit":
      clearCookie(res, "userId");
      redirect(res, "/login");
      break;
    default: {
      const extname = String(path.extname(pathname)).toLowerCase();
      if (extname in mimeTypes) staticFile(res, pathname, extname);
      else {
        res.statusCode = 404;
        res.end();
      }
      break;
    }
  }
}).listen(3500);
