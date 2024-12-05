const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

type Update = number[];
type OrderingRule = [number, number];

type Input = {
  updates: Update[];
  rules: OrderingRule[];
};

const loadInput = (name = "input"): Input => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  let updates: Update[] = [];
  let rules: OrderingRule[] = [];

  data.split("\n").forEach((line) => {
    if (line === "") return;

    if (line.indexOf("|") !== -1) {
      rules.push(line.split("|").map(Number));
      return;
    }

    updates.push(line.split(",").map(Number));
  });

  return {
    updates,
    rules,
  };
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

/**
 * Returns a 2D array to lookup if a page must come before another.
 *
 * For example, `formattedRules[x][y]` means page `x` must be before page `y`.
 */
const formatRules = (rules: OrderingRule[]) => {
  let formattedRules = [];

  rules.forEach((rule) => {
    if (!Array.isArray(formattedRules[rule[0]])) formattedRules[rule[0]] = [];

    formattedRules[rule[0]][rule[1]] = true;
  });

  return formattedRules;
};

const findMiddlePageTotal = ({ rules, updates }: Input) => {
  let total = 0;
  let mustBeBefore = formatRules(rules);

  // loop through every update
  for (let i = 0; i < updates.length; i += 1) {
    const update = updates[i];
    let isValid = true;

    // loop through every page in an update
    for (let j = 0; j < update.length; j += 1) {
      const thisPage = update[j];

      // check it against the pages after it
      for (let k = j + 1; k < update.length; k += 1) {
        const nextPage = update[k];

        // could probably end the loop early once this happens
        if (mustBeBefore[nextPage]?.[thisPage]) isValid = false;
      }
    }

    if (isValid) {
      total += update[Math.round(update.length / 2) - 1];
    }
  }

  return total;
};

const findMiddlePageTotalOfInvalidUpdates = ({ rules, updates }: Input) => {
  let total = 0;
  let mustBeBefore = formatRules(rules);

  // loop through every update
  for (let i = 0; i < updates.length; i += 1) {
    const update = updates[i];
    let isValid = true;

    // loop through every page in an update
    for (let j = 0; j < update.length; j += 1) {
      const thisPage = update[j];

      // check it against the pages after it
      for (let k = j + 1; k < update.length; k += 1) {
        const nextPage = update[k];

        // could probably end the loop early once this happens
        if (mustBeBefore[nextPage]?.[thisPage]) isValid = false;
      }
    }

    if (!isValid) {
      // make it valid
      const validUpdate = update.toSorted((thisPage, nextPage) => {
        if (mustBeBefore[thisPage]?.[nextPage]) return -1;
        if (mustBeBefore[nextPage]?.[thisPage]) return 1;
        return 0;
      });

      // add up middle page
      total += validUpdate[Math.round(validUpdate.length / 2) - 1];
    }
  }

  return total;
};

export {
  input,
  example,
  findMiddlePageTotal,
  findMiddlePageTotalOfInvalidUpdates,
};
