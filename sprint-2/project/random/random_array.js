const randomInt = require("./random_int");

module.exports = function (len = 5) {
  const arr = Array(len).fill(0).map((_, i) => i + randomInt());
  return arr;
}