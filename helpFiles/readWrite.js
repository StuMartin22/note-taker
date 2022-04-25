const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readIt = util.promisify(fs.readFile);
//write data to JSON file when given a destination and content.
const writeIt = (destination, content) =>
  fs.writeIt(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nWrote info to: ${destination}`)
  );
//read data from file and append it.
const readItAddIt = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const writtenData = JSON.parse(data);
      writtenData.push(content);
      writeIt(file, writtenData);
    }
  });
};

module.exports = { readIt, writeIt, readItAddIt };