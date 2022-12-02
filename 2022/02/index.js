const fs = require("fs");

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

const Outcomes = {
  LOSE: "X",
  DRAW: "Y",
  WIN: "Z",
};

const Opp = {
  ROCK: "A",
  PAPER: "B",
  SCISSORS: "C",
};

const Me = {
  ROCK: "X",
  PAPER: "Y",
  SCISSORS: "Z",
};

const calculateRoundScore = (opponent, me) => {
  let roundScore = 0;

  // you get points just for choosing a shape
  if (me === Me.ROCK) roundScore += 1;
  if (me === Me.PAPER) roundScore += 2;
  if (me === Me.SCISSORS) roundScore += 3;

  // ties
  if (
    (me === Me.ROCK && opponent === Opp.ROCK) ||
    (me === Me.PAPER && opponent === Opp.PAPER) ||
    (me === Me.SCISSORS && opponent === Opp.SCISSORS)
  ) {
    roundScore += 3;
  }

  // wins
  if (
    (me === Me.ROCK && opponent === Opp.SCISSORS) ||
    (me === Me.PAPER && opponent === Opp.ROCK) ||
    (me === Me.SCISSORS && opponent === Opp.PAPER)
  ) {
    roundScore += 6;
  }

  return roundScore;
};

const calculateTotalScore = (values) => {
  let totalScore = 0;

  values.forEach((choices) => {
    const [opponent, me] = choices.split(" ");

    totalScore += calculateRoundScore(opponent, me);
  });

  return totalScore;
};

const calculateMovesAndTotalScore = (values) => {
  let totalScore = 0;

  values.forEach((choices) => {
    const [opponent, outcome] = choices.split(" ");

    let me;

    if (outcome === Outcomes.LOSE) {
      if (opponent === Opp.ROCK) me = Me.SCISSORS;
      if (opponent === Opp.PAPER) me = Me.ROCK;
      if (opponent === Opp.SCISSORS) me = Me.PAPER;
    }

    if (outcome === Outcomes.DRAW) {
      if (opponent === Opp.ROCK) me = Me.ROCK;
      if (opponent === Opp.PAPER) me = Me.PAPER;
      if (opponent === Opp.SCISSORS) me = Me.SCISSORS;
    }

    if (outcome === Outcomes.WIN) {
      if (opponent === Opp.ROCK) me = Me.PAPER;
      if (opponent === Opp.PAPER) me = Me.SCISSORS;
      if (opponent === Opp.SCISSORS) me = Me.ROCK;
    }

    totalScore += calculateRoundScore(opponent, me);
  });

  return totalScore;
};

module.exports = {
  input,
  example,
  calculateTotalScore,
  calculateMovesAndTotalScore,
};
