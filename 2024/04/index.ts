const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

const loadInput = (name = "input"): string[][] => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  return data.split("\n").map((report) => {
    return report.split("");
  });
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const findXMAS = (wordsearch: string[][]) => {
  let total = 0;
  let isPartOfXmas: boolean[][] = [];

  // initialise isPartOfXmas (this is just for debugging)
  wordsearch.forEach((row, y) => {
    isPartOfXmas[y] = [];
    row.forEach((cell, x) => {
      isPartOfXmas[y][x] = false;
    });
  });

  wordsearch.forEach((row, y) => {
    row.forEach((cell, x) => {
      const current = wordsearch[y][x];

      if (current !== "X") {
        return;
      }

      const lookUp = y >= 3;
      const lookLeft = x >= 3;
      const lookRight = x <= row.length - 4;
      const lookDown = y <= wordsearch.length - 4;

      // N
      if (lookUp) {
        if (
          wordsearch[y - 1][x] === "M" &&
          wordsearch[y - 2][x] === "A" &&
          wordsearch[y - 3][x] === "S"
        ) {
          total += 1;
          isPartOfXmas[y][x] = true;
          isPartOfXmas[y - 1][x] = true;
          isPartOfXmas[y - 2][x] = true;
          isPartOfXmas[y - 3][x] = true;
        }
      }

      // NE
      if (lookUp && lookRight) {
        if (
          wordsearch[y - 1][x + 1] === "M" &&
          wordsearch[y - 2][x + 2] === "A" &&
          wordsearch[y - 3][x + 3] === "S"
        ) {
          total += 1;
          isPartOfXmas[y][x] = true;
          isPartOfXmas[y - 1][x + 1] = true;
          isPartOfXmas[y - 2][x + 2] = true;
          isPartOfXmas[y - 3][x + 3] = true;
        }
      }

      // E
      if (lookRight) {
        if (
          wordsearch[y][x + 1] === "M" &&
          wordsearch[y][x + 2] === "A" &&
          wordsearch[y][x + 3] === "S"
        ) {
          total += 1;
          isPartOfXmas[y][x] = true;
          isPartOfXmas[y][x + 1] = true;
          isPartOfXmas[y][x + 2] = true;
          isPartOfXmas[y][x + 3] = true;
        }
      }

      // SE
      if (lookDown && lookRight) {
        if (
          wordsearch[y + 1][x + 1] === "M" &&
          wordsearch[y + 2][x + 2] === "A" &&
          wordsearch[y + 3][x + 3] === "S"
        ) {
          total += 1;
          isPartOfXmas[y][x] = true;
          isPartOfXmas[y + 1][x + 1] = true;
          isPartOfXmas[y + 2][x + 2] = true;
          isPartOfXmas[y + 3][x + 3] = true;
        }
      }

      // S
      if (lookDown) {
        if (
          wordsearch[y + 1][x] === "M" &&
          wordsearch[y + 2][x] === "A" &&
          wordsearch[y + 3][x] === "S"
        ) {
          total += 1;
          isPartOfXmas[y][x] = true;
          isPartOfXmas[y + 1][x] = true;
          isPartOfXmas[y + 2][x] = true;
          isPartOfXmas[y + 3][x] = true;
        }
      }

      // SW
      if (lookDown && lookLeft) {
        if (
          wordsearch[y + 1][x - 1] === "M" &&
          wordsearch[y + 2][x - 2] === "A" &&
          wordsearch[y + 3][x - 3] === "S"
        ) {
          total += 1;
          isPartOfXmas[y][x] = true;
          isPartOfXmas[y + 1][x - 1] = true;
          isPartOfXmas[y + 2][x - 2] = true;
          isPartOfXmas[y + 3][x - 3] = true;
        }
      }

      // W
      if (lookLeft) {
        if (
          wordsearch[y][x - 1] === "M" &&
          wordsearch[y][x - 2] === "A" &&
          wordsearch[y][x - 3] === "S"
        ) {
          total += 1;
          isPartOfXmas[y][x] = true;
          isPartOfXmas[y][x - 1] = true;
          isPartOfXmas[y][x - 2] = true;
          isPartOfXmas[y][x - 3] = true;
        }
      }

      // NW
      if (lookUp && lookLeft) {
        if (
          wordsearch[y - 1][x - 1] === "M" &&
          wordsearch[y - 2][x - 2] === "A" &&
          wordsearch[y - 3][x - 3] === "S"
        ) {
          total += 1;
          isPartOfXmas[y][x] = true;
          isPartOfXmas[y - 1][x - 1] = true;
          isPartOfXmas[y - 2][x - 2] = true;
          isPartOfXmas[y - 3][x - 3] = true;
        }
      }
    });
  });

  let debug = "";
  wordsearch.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (isPartOfXmas[y][x]) {
        if (wordsearch[y][x] === "X") {
          debug += "\x1b[31m" + wordsearch[y][x] + "\x1b[0m";
        } else {
          debug += wordsearch[y][x];
        }
      } else {
        debug += ".";
      }
    });
    debug += "\n";
  });

  // console.log(debug);

  return total;
};

const findXesOfMAS = (wordsearch: string[][]) => {
  let total = 0;
  let isInMASCross: boolean[][] = [];

  // initialise isInMASCross (this is just for debugging)
  wordsearch.forEach((row, y) => {
    isInMASCross[y] = [];
    row.forEach((cell, x) => {
      isInMASCross[y][x] = false;
    });
  });

  wordsearch.forEach((row, y) => {
    row.forEach((cell, x) => {
      const current = wordsearch[y][x];

      if (current !== "A") {
        return;
      }

      const lookUp = y >= 1;
      const lookLeft = x >= 1;
      const lookRight = x <= row.length - 2;
      const lookDown = y <= wordsearch.length - 2;

      if (!lookUp) return;
      if (!lookLeft) return;
      if (!lookRight) return;
      if (!lookDown) return;

      // M . M
      // . A .
      // S . S
      if (
        wordsearch[y - 1][x - 1] === "M" &&
        wordsearch[y - 1][x + 1] === "M" &&
        wordsearch[y + 1][x - 1] === "S" &&
        wordsearch[y + 1][x + 1] === "S"
      ) {
        total += 1;
        isInMASCross[y][x] = true;
        isInMASCross[y - 1][x - 1] = true;
        isInMASCross[y - 1][x + 1] = true;
        isInMASCross[y + 1][x - 1] = true;
        isInMASCross[y + 1][x + 1] = true;
      }

      // M . S
      // . A .
      // M . S
      if (
        wordsearch[y - 1][x - 1] === "M" &&
        wordsearch[y - 1][x + 1] === "S" &&
        wordsearch[y + 1][x - 1] === "M" &&
        wordsearch[y + 1][x + 1] === "S"
      ) {
        total += 1;
        isInMASCross[y][x] = true;
        isInMASCross[y - 1][x - 1] = true;
        isInMASCross[y - 1][x + 1] = true;
        isInMASCross[y + 1][x - 1] = true;
        isInMASCross[y + 1][x + 1] = true;
      }

      // S . S
      // . A .
      // M . M
      if (
        wordsearch[y - 1][x - 1] === "S" &&
        wordsearch[y - 1][x + 1] === "S" &&
        wordsearch[y + 1][x - 1] === "M" &&
        wordsearch[y + 1][x + 1] === "M"
      ) {
        total += 1;
        isInMASCross[y][x] = true;
        isInMASCross[y - 1][x - 1] = true;
        isInMASCross[y - 1][x + 1] = true;
        isInMASCross[y + 1][x - 1] = true;
        isInMASCross[y + 1][x + 1] = true;
      }

      // S . M
      // . A .
      // S . M
      if (
        wordsearch[y - 1][x - 1] === "S" &&
        wordsearch[y - 1][x + 1] === "M" &&
        wordsearch[y + 1][x - 1] === "S" &&
        wordsearch[y + 1][x + 1] === "M"
      ) {
        total += 1;
        isInMASCross[y][x] = true;
        isInMASCross[y - 1][x - 1] = true;
        isInMASCross[y - 1][x + 1] = true;
        isInMASCross[y + 1][x - 1] = true;
        isInMASCross[y + 1][x + 1] = true;
      }
    });
  });

  let debug = "";

  wordsearch.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (isInMASCross[y][x]) {
        if (wordsearch[y][x] === "A") {
          debug += "\x1b[31m" + wordsearch[y][x] + "\x1b[0m";
        } else {
          debug += wordsearch[y][x];
        }
      } else {
        debug += ".";
      }
    });
    debug += "\n";
  });

  // console.log(debug);

  return total;
};

export { input, example, findXMAS, findXesOfMAS };
