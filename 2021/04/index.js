const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

const loadInput = (name = "input") => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  const [numbers, ...rest] = data.split("\n");
  const boards = [];

  for (let i = 0; i < rest.length; i += 6) {
    const oneDimBoard = rest.slice(i + 1, i + 6);

    const twoDimBoard = oneDimBoard.map((line) =>
      line.match(/.{1,3}/g).map(Number)
    );

    boards.push(twoDimBoard);
  }

  return {
    numbers: numbers.split(",").map(Number),
    boards,
  };
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const isBingo = (numbers, board) => {
  for (let i = 0; i < 5; i += 1) {
    const row = board[i];

    if (row.every((number) => numbers.includes(number))) {
      return true;
    }
  }

  for (let i = 0; i < 5; i += 1) {
    const column = [
      board[0][i],
      board[1][i],
      board[2][i],
      board[3][i],
      board[4][i],
    ];

    if (column.every((number) => numbers.includes(number))) {
      return true;
    }
  }

  return false;
};

const calculateScore = (numbers, board) => {
  // Find all the unmatched numbers
  const unmatchedNumbers = board
    .join(",")
    .split(",")
    .map(Number)
    .filter((number) => !numbers.includes(number));

  // Sum them up
  const sum = unmatchedNumbers.reduce((total, number) => (total += number), 0);

  // Multiply by the last number which was called
  return sum * numbers[numbers.length - 1];
};

const playBingo = (values) => {
  const { numbers, boards } = values;

  let score;

  // Loop through all boards, increasing the numbers each time, until one wins.
  // Starts at 5 as that's the minimum needed to win.
  for (let i = 5; i < numbers.length; i += 1) {
    const winningBoard = boards.find((board) =>
      isBingo(numbers.slice(0, i), board)
    );

    if (winningBoard) {
      score = calculateScore(numbers.slice(0, i), winningBoard);

      break;
    }
  }

  return score;
};

const playBingoToLose = (values) => {
  const { numbers, boards } = values;

  // For each board, find how many rounds it would take to win
  const roundsNeeded = boards.map((board, index) => {
    for (let i = 5; i < numbers.length; i += 1) {
      if (isBingo(numbers.slice(0, i), board)) {
        return i;
      }
    }
  });

  const slowestBoardTime = Math.max(...roundsNeeded);
  const slowestBoard = boards[roundsNeeded.indexOf(slowestBoardTime)];

  return calculateScore(numbers.slice(0, slowestBoardTime), slowestBoard);
};

console.log("Part 1 - Example:", playBingo(example));
console.log("Part 1 - Actual: ", playBingo(input));

console.log("Part 2 - Example:", playBingoToLose(example));
console.log("Part 2 - Actual: ", playBingoToLose(input));

module.exports = {
  input,
  example,
  playBingo,
  playBingoToLose,
};
