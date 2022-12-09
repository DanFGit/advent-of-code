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

const print = (head, tail) => {
  process.stdout.write(`\n`);
  process.stdout.write(`== ==`);
  process.stdout.write(`\n`);
  process.stdout.write(`\n`);

  for (let y = 0; y < 5; y += 1) {
    for (let x = 0; x < 6; x += 1) {
      if (head.x === x && head.y === y) process.stdout.write(`H`);
      else if (tail.x === x && tail.y === y) process.stdout.write(`T`);
      else if (x === 0 && y === 5) process.stdout.write(`s`);
      else process.stdout.write(`.`);
    }

    process.stdout.write(`\n`);
  }
};

const pullTail = (head, tail) => {
  const xDis = head.x - tail.x;
  const yDis = head.y - tail.y;

  // if they are touching, don't move the tail
  if (Math.abs(xDis) < 2 && Math.abs(yDis) < 2) return "touching";

  if (yDis === 0 && xDis < 0) {
    tail.x -= 1; // left
    return "left";
  } else if (yDis === 0 && xDis > 0) {
    tail.x += 1; // right
    return "right";
  } else if (xDis === 0 && yDis < 0) {
    tail.y -= 1; // up
    return "up";
  } else if (xDis === 0 && yDis > 0) {
    tail.y += 1; // down
    return "down";
  }

  console.log(head, tail, xDis, yDis);
  if (yDis <= 1 && xDis <= 1) {
    tail.x -= 1; // left
    tail.y -= 1; // up
    return "nw";
  } else if (yDis <= 1 && xDis >= 1) {
    tail.x += 1; // right
    tail.y -= 1; // up
    return "ne";
  } else if (yDis >= 1 && xDis >= 1) {
    tail.x += 1; // right
    tail.y += 1; // down
    return "se";
  } else if (yDis >= 1 && xDis <= 1) {
    tail.x -= 1; // left
    tail.y += 1; // down
    return "sw";
  }

  return tail;
};

// .1.2.
// 8...3
// ..T..
// 7...4
// .6.5.
// console.log(pullTail({ x: -1, y: -2 }, { x: 0, y: 0 }));
// console.log(pullTail({ x: 1, y: -2 }, { x: 0, y: 0 }));
// console.log(pullTail({ x: 2, y: -1 }, { x: 0, y: 0 }));
// console.log(pullTail({ x: 2, y: 1 }, { x: 0, y: 0 }));
// console.log(pullTail({ x: 1, y: 2 }, { x: 0, y: 0 }));
// console.log(pullTail({ x: -1, y: 2 }, { x: 0, y: 0 }));
// console.log(pullTail({ x: -2, y: 1 }, { x: 0, y: 0 }));
// console.log(pullTail({ x: -2, y: -1 }, { x: 0, y: 0 }));

const findTailVisits = (motions) => {
  let visited = {
    "0,5": 1, // tail starts in the center
  };

  const head = { x: 0, y: 4 };
  const tail = { x: 0, y: 4 };

  print(head, tail);

  motions.forEach((motion) => {
    const dir = motion.split(" ")[0];
    const steps = Number(motion.split(" ")[1]);

    // console.log(`\n\ngo ${steps} ${dir}`);

    for (let i = 0; i < steps; i += 1) {
      if (dir === "L") head.x -= 1;
      if (dir === "R") head.x += 1;
      if (dir === "U") head.y -= 1;
      if (dir === "D") head.y += 1;

      print(head, tail);
      // console.log(head);
    }
  });

  return 0;
};

const findHighestScenicScore = (motions) => {
  let highest = 0;

  return highest;
};

module.exports = {
  input,
  example,
  findTailVisits,
  findHighestScenicScore,
};

// console.log("\n\nPart 1 - Example:", findTailVisits(example));
// console.log("Part 1 - Actual: ", calculatePosition(input));
