const fs = require("fs");

const text = 'Скарга: 30 червня я стала жертвою агресії з боку таксиста. \r\nЗ самого початку поїздки водій поводився зневажливо: на прохання зачинити вікно через сильний протяг \r\n(я сиділа на задньому пасажирському сидінні) він відреагував з очевидною грубістю. Спочатку ігнор на прохання, а пізніше дозволяв собі некоректні висловлювання, відмовився йти \r\nназустріч. Мовляв, вікна не зачинить, бо на дворі спека  і йому жарко. \r\nІгнорував елементарні правила ввічливості та турботи про комфорт пасажира '
// write to file
const pathToFile = './d02/n_01.txt';
fs.writeFileSync(pathToFile, text, { encoding: "utf8", flag: "a" });

//write file from array

const text2 = [
  "30 червня я стала жертвою агресії",
  "дозволяв собі некоректні висловлювання",
  "бо на дворі спека  і йому жарко"
]

fs.writeFileSync('./d02/n_02.txt', text2.join('\r\n'), { encoding: "utf8", flag: "w" })