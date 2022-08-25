const fs = require('fs');

const readFile = () =>
  fs.readFileSync('./jwt.evaluation.key', {
    encoding: 'utf-8',
  }).toString();

module.exports = readFile;
