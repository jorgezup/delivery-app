const fs = require("fs");

// TO-DO:Validar importacao
const readFile = () =>
  fs.readFileSync("./jwt.evaluation.key", {
    encoding: "utf-8",
  });

module.exports = readFile;
