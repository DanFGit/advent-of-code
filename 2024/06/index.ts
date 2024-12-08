const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

type Tile = "#" | ".";
type Map = Tile[][];
type Guard = {
  x: number;
  y: number;
  dir: "n" | "e" | "s" | "w";
};

type Input = {
  map: Map;
  guard: Guard;
};

const loadInput = (name = "input"): Input => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  let map: Tile[][] = [];
  let guard: Guard = { x: 0, y: 0, dir: "n" };

  data.split("\n").forEach((row, y) => {
    map[y] = [];

    row.split("").forEach((tile, x) => {
      if (tile === "^") {
        guard = { x, y, dir: "n" };
        map[y][x] = ".";
      } else {
        map[y][x] = tile;
      }
    });
  });

  return {
    map,
    guard,
  };
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const patrol = ({ map, guard: _guard }: Input) => {
  const guard: Guard = { ..._guard };

  let visited = {};
  let visitedWithDir = {}; // used to detect loops

  let isInMappedArea = true;
  let isInLoop = false;

  while (isInMappedArea && !isInLoop) {
    const current = `${guard.x},${guard.y} ${guard.dir}`;

    // detect if we've already been here
    if (visitedWithDir[current]) {
      isInLoop = true;
      continue;
    }

    // record visit
    visited[`${guard.x},${guard.y}`] = true;
    visitedWithDir[`${guard.x},${guard.y} ${guard.dir}`] = true;

    if (guard.dir === "n") {
      // guard has left the map
      if (guard.y === 0) {
        isInMappedArea = false;
        continue;
      }

      // guard has an obstruction, turn 90 degrees
      if (map[guard.y - 1][guard.x] === "#") {
        guard.dir = "e";
        continue;
      }

      // no obstruction, move forward
      guard.y = guard.y - 1;
      continue;
    }

    if (guard.dir === "e") {
      // guard has left the map
      if (guard.x === map[0].length - 1) {
        isInMappedArea = false;
        continue;
      }

      // guard has an obstruction, turn 90 degrees
      if (map[guard.y][guard.x + 1] === "#") {
        guard.dir = "s";
        continue;
      }

      // no obstruction, move forward
      guard.x = guard.x + 1;
      continue;
    }

    if (guard.dir === "s") {
      // guard has left the map
      if (guard.y === map.length - 1) {
        isInMappedArea = false;
        continue;
      }

      // guard has an obstruction, turn 90 degrees
      if (map[guard.y + 1][guard.x] === "#") {
        guard.dir = "w";
        continue;
      }

      // no obstruction, move forward
      guard.y = guard.y + 1;
      continue;
    }

    if (guard.dir === "w") {
      // guard has left the map
      if (guard.x === 0) {
        isInMappedArea = false;
        continue;
      }

      // guard has an obstruction, turn 90 degrees
      if (map[guard.y][guard.x - 1] === "#") {
        guard.dir = "n";
        continue;
      }

      // no obstruction, move forward
      guard.x = guard.x - 1;
      continue;
    }
  }

  return {
    visited,
    looped: isInLoop,
  };
};

const findVisitedPositions = ({ map, guard }: Input) => {
  const { visited } = patrol({ map, guard });

  return Object.keys(visited).length;
};

const findObstacleLocationsWhichCauseLoops = ({ map, guard }: Input) => {
  // find all positions the guard visits on original map
  const { visited } = patrol({ map, guard });

  let loops = 0;

  // for each position the guard visits
  Object.keys(visited).forEach((visit) => {
    const [x, y] = visit.split(",").map(Number);

    map[y][x] = "#"; // place an obstacle

    const { looped } = patrol({
      map,
      guard,
    });

    map[y][x] = "."; // remove the obstacle (because mutation is a thing)

    if (looped) loops += 1;
  });

  return loops;
};

export {
  input,
  example,
  findVisitedPositions,
  findObstacleLocationsWhichCauseLoops,
};
