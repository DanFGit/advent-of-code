const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

type List = {
  left: number[];
  right: number[];
};

const loadInput = (name = "input") => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  const list: List = {
    left: [],
    right: [],
  };

  data.split("\n").forEach((line) => {
    const [a, b] = line.split("   ");

    list.left.push(Number(a));
    list.right.push(Number(b));
  });

  return list;
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const totalDistanceBetweenLists = (list: List) => {
  const left = list.left.sort((a, b) => a - b);
  const right = list.right.sort((a, b) => a - b);

  let distance = 0;

  for (let i = 0; i < left.length; i++) {
    distance += Math.abs(left[i] - right[i]);
  }

  return distance;
};

const similarityScore = (list: List) => {
  const cache = {}; // turns out this was useless as all the numbers are unique

  let score = 0;

  list.left.forEach((left) => {
    if (cache[left]) {
      score += cache[left];
      return;
    }

    let appearsInRightList = 0;

    list.right.forEach((right) => {
      if (left === right) appearsInRightList += 1;
    });

    score += left * appearsInRightList;
    cache[left] = left * appearsInRightList;
  });

  return score;
};

export { input, example, totalDistanceBetweenLists, similarityScore };
