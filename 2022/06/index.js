const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

const loadInput = (name = "input") => {
  return fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const allValuesUnique = (string) => {
  const set = new Set(string.split(""));

  // if the set is smaller than the string, the string had duplicate values
  return set.size === string.length;
};

const findStartOfPacketMarker = (datastream) => {
  for (let i = 0; i < datastream.length; i += 1) {
    if (allValuesUnique(datastream.slice(i, i + 4))) return i + 4;
  }
};

const findStartOfMsgMarker = (datastream) => {
  for (let i = 0; i < datastream.length; i += 1) {
    if (allValuesUnique(datastream.slice(i, i + 14))) return i + 14;
  }
};

module.exports = {
  input,
  example,
  findStartOfPacketMarker,
  findStartOfMsgMarker,
};
