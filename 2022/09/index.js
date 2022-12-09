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

const START_X = 0;
const START_Y = 0;

const pullTail = (head, tail) => {
  const xDis = head.x - tail.x; // -1
  const yDis = head.y - tail.y; // -2

  // if they are touching, don't move the tail
  if (Math.abs(xDis) < 2 && Math.abs(yDis) < 2) return;

  if (yDis === 0 && xDis < 0) tail.x -= 1; // left
  else if (yDis === 0 && xDis > 0) tail.x += 1; // right
  else if (xDis === 0 && yDis < 0) tail.y -= 1; // up
  else if (xDis === 0 && yDis > 0) tail.y += 1; // down
  else if (xDis <= 0 && yDis <= 0) {
    tail.x -= 1; // left
    tail.y -= 1; // up
  } else if (xDis >= 0 && yDis >= 0) {
    tail.x += 1; // right
    tail.y += 1; // down
  } else if (xDis >= 0 && yDis <= 0) {
    tail.x += 1; // right
    tail.y -= 1; // up
  } else if (xDis <= 0 && yDis >= 0) {
    tail.x -= 1; // left
    tail.y += 1; // down
  }
};

const findTailVisits = (motions) => {
  let visited = {
    [`${START_X},${START_Y}`]: 1,
  };

  const head = { x: START_X, y: START_Y };
  const tail = { x: START_X, y: START_Y };

  motions.forEach((motion) => {
    const dir = motion.split(" ")[0];
    const steps = Number(motion.split(" ")[1]);

    for (let i = 0; i < steps; i += 1) {
      if (dir === "L") head.x -= 1;
      if (dir === "R") head.x += 1;
      if (dir === "U") head.y -= 1;
      if (dir === "D") head.y += 1;

      pullTail(head, tail);

      if (!visited[`${tail.x},${tail.y}`]) visited[`${tail.x},${tail.y}`] = 1;
      else visited[`${tail.x},${tail.y}`] += 1;
    }
  });

  return Object.keys(visited).length;
};

const findNineTailVisits = (motions) => {
  let visited = {
    [`${START_X},${START_Y}`]: 1,
  };

  // couldn't be bothered making this dynamic...
  const head = { x: START_X, y: START_Y };
  const tail1 = { x: START_X, y: START_Y };
  const tail2 = { x: START_X, y: START_Y };
  const tail3 = { x: START_X, y: START_Y };
  const tail4 = { x: START_X, y: START_Y };
  const tail5 = { x: START_X, y: START_Y };
  const tail6 = { x: START_X, y: START_Y };
  const tail7 = { x: START_X, y: START_Y };
  const tail8 = { x: START_X, y: START_Y };
  const tail9 = { x: START_X, y: START_Y };

  motions.forEach((motion) => {
    const dir = motion.split(" ")[0];
    const steps = Number(motion.split(" ")[1]);

    for (let i = 0; i < steps; i += 1) {
      if (dir === "L") head.x -= 1;
      if (dir === "R") head.x += 1;
      if (dir === "U") head.y -= 1;
      if (dir === "D") head.y += 1;

      // didn't even need to change the pullTail function from part one
      pullTail(head, tail1);
      pullTail(tail1, tail2);
      pullTail(tail2, tail3);
      pullTail(tail3, tail4);
      pullTail(tail4, tail5);
      pullTail(tail5, tail6);
      pullTail(tail6, tail7);
      pullTail(tail7, tail8);
      pullTail(tail8, tail9);

      if (!visited[`${tail9.x},${tail9.y}`])
        visited[`${tail9.x},${tail9.y}`] = 1;
      else visited[`${tail9.x},${tail9.y}`] += 1;
    }
  });

  return Object.keys(visited).length;
};

module.exports = {
  input,
  example,
  findTailVisits,
  findNineTailVisits,
};
