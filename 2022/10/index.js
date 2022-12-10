const fs = require("fs");
const util = require("util");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

const loadInput = (name = "input") => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  return data.split("\n");
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const drawScreen = (pixels) => {
  console.clear();

  for (let y = 0; y < 6; y += 1) {
    for (let x = 0; x < 40; x += 1) {
      process.stdout.write(pixels[y * 40 + x] === true ? `█` : `.`);
    }

    process.stdout.write(`\n`);
  }
};

const shouldDrawPixel = (x, cycle) => {
  const row = Math.floor(cycle / 40);

  return Math.abs(cycle - row * 40 - x) <= 1;
};

const runClockCircuit = (signals) => {
  let x = 1;
  let cycle = 0;

  let strengths = [1];

  let pixels = [];

  for (const signal of signals) {
    // every signal takes at least one cycle to complete
    cycle += 1;

    // during the first cycle
    strengths.push(x);
    pixels.push(shouldDrawPixel(x, cycle - 1));

    if (signal.startsWith("addx")) {
      // addx commands take two cycles to complete
      cycle += 1;

      // during the second addx cycle
      strengths.push(x);
      pixels.push(shouldDrawPixel(x, cycle - 1));

      // after the second addx cycle
      x += Number(signal.split(" ")[1]);
    }
  }

  drawScreen(pixels);

  return {
    pixels,
    strength:
      20 * strengths[20] +
      60 * strengths[60] +
      100 * strengths[100] +
      140 * strengths[140] +
      180 * strengths[180] +
      220 * strengths[220],
  };
};

runClockCircuit(input);

module.exports = {
  input,
  example,
  runClockCircuit,
};
