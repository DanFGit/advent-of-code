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

/**
 * Resursive. Returns the size of the given directory plus an array with the
 * size of any child/grandchild/nth-child directories.
 */
const calculateDirSize = (dir) => {
  let totalSize = 0;
  let sizes = [];

  dir.nodes.forEach((node) => {
    if (node.size) totalSize += node.size;
    if (node.nodes.length > 0) {
      const calculated = calculateDirSize(node);

      totalSize += calculateDirSize(node).totalSize;
      sizes.push(...calculated.sizes);
    }
  });

  return {
    totalSize,
    sizes: [...sizes, totalSize],
  };
};

/**
 * Creates a tree where the nodes look like:
 *
 * type Node = {
 *   name: string
 *   nodes: Node[]
 *   parent?: Node         // root node doesn't have a parent
 *   size?: Number         // files have a size, directories don't
 * }
 */
const createTree = (commands) => {
  const tree = {
    name: "/",
    nodes: [],
  };

  let current = tree;

  commands.forEach((command) => {
    if (command.startsWith("$ cd")) {
      const target = command.slice(5);

      if (target === "/") current = tree;
      else if (target === "..") current = current.parent;
      else current = current.nodes.find((node) => node.name === target);

      return;
    }

    if (command === "$ ls") return;

    if (command.startsWith("dir")) {
      current.nodes.push({
        name: command.slice(4),
        nodes: [],
        parent: current,
      });

      return;
    }

    const [size, name] = command.split(" ");
    current.nodes.push({
      name,
      size: Number(size),
      nodes: [],
      parent: current,
    });
  });

  return tree;
};

const sumDirectorySize = (commands, limit) => {
  const tree = createTree(commands);

  const { sizes } = calculateDirSize(tree);

  return sizes
    .filter((size) => size <= limit)
    .reduce((sum, size) => (sum += size), 0);
};

const findDirectoryToDelete = (commands, totalDiskSize, updateSize) => {
  const tree = createTree(commands);

  const { totalSize, sizes } = calculateDirSize(tree);

  const remainingSpace = totalDiskSize - totalSize;
  const spaceNeeded = updateSize - remainingSpace;

  sizes.sort((a, b) => (a > b ? 1 : -1));

  return sizes.filter((size) => size >= spaceNeeded)[0];
};

module.exports = {
  input,
  example,
  sumDirectorySize,
  findDirectoryToDelete,
};
