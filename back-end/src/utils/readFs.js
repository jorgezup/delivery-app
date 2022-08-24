const fs = require("fs");

// TO-DO:Validar importacao
const readFile = () => fs.readFileSync("../../jwt.evaluation.key", "utf8");

module.exports = readFile;
