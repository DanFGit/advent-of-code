const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

const loadInput = (name = "input") => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  const [drawing, instructions] = data.split("\n\n");

  return [drawing.split("\n"), instructions.split("\n")];
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const crateMatcher = /.(.).(?:.|$)/gi;

const createInitialStacks = (drawing) => {
  const stacks = [];

  // loop from the bottom up of the drawing, ignoring the first line
  for (let i = drawing.length - 2; i >= 0; i -= 1) {
    let current = crateMatcher.exec(drawing[i]);

    // loop over each stack in the row
    while (current !== null) {
      const crate = current[1];
      const stack = current.index / 4;

      // check if there's a crate in this stack
      if (crate !== " ") {
        if (!stacks[stack]) stacks[stack] = [];

        stacks[stack].push(crate);
      }

      // get the next crate
      current = crateMatcher.exec(drawing[i]);
    }
  }

  return stacks;
};

// Part 1
const moveCratesOneByOne = (stacks, instructions) => {
  // loop over each instruction
  instructions.forEach((instruction) => {
    const instructionMatcher = /move (\d+) from (\d+) to (\d+)/gi;
    const [_, count, from, to] = instructionMatcher.exec(instruction);

    for (let i = 0; i < Number(count); i += 1) {
      // remove crate from it's current stack
      const crate = stacks[from - 1].pop();

      // add it to it's new stack
      stacks[to - 1].push(crate);
    }
  });
};

// Part 2
const moveCratesInGroups = (stacks, instructions) => {
  // loop over each instruction
  instructions.forEach((instruction) => {
    const instructionMatcher = /move (\d+) from (\d+) to (\d+)/gi;
    const [_, count, from, to] = instructionMatcher.exec(instruction);

    const crates = [];
    for (let i = 0; i < Number(count); i += 1) {
      // remove crate from it's current stack
      const crate = stacks[from - 1].pop();

      // add it to a temporary stack
      crates.unshift(crate);
    }

    // move all crates from the temporary stack to new stack
    crates.forEach((crate) => {
      stacks[to - 1].push(crate);
    });
  });
};

const findContainersOnTop9000 = ([drawing, instructions]) => {
  const stacks = createInitialStacks(drawing);

  // mutating an array?!
  moveCratesOneByOne(stacks, instructions);

  // get the crate on top of each stack
  return stacks.reduce(
    (string, stack) => (string += stack[stack.length - 1]),
    ""
  );
};

const findContainersOnTop9001 = ([drawing, instructions]) => {
  const stacks = createInitialStacks(drawing);

  // mutating an array?!
  moveCratesInGroups(stacks, instructions);

  // get the crate on top of each stack
  return stacks.reduce(
    (string, stack) => (string += stack[stack.length - 1]),
    ""
  );
};

module.exports = {
  input,
  example,
  findContainersOnTop9000,
  findContainersOnTop9001,
};
