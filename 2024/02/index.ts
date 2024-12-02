const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

type Report = number[];
type Reports = Report[];

const loadInput = (name = "input") => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  return data.split("\n").map((report) => {
    return report.split(" ").map(Number);
  });
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

const isSafeReport = (report) => {
  let dir: "desc" | "asc" | undefined;

  return report.every((level, index) => {
    // if we've reached the end of the report, it's safe!
    if (index + 1 === report.length) {
      return true;
    }

    // check levels are gradually changing
    if (
      Math.abs(level - report[index + 1]) > 0 &&
      Math.abs(level - report[index + 1]) <= 3
    ) {
      // safe
    } else {
      return false;
    }

    // check levels are all increasing or all decreasing
    if (!dir) dir = report[index] > report[index + 1] ? "desc" : "asc";
    if (dir === "desc" && report[index] < report[index + 1]) return false;
    if (dir === "asc" && report[index] > report[index + 1]) return false;

    return true;
  });
};

const calculateSafeReports = (reports: Reports) => {
  return reports.filter(isSafeReport).length;
};

const calculateSafeReportsWithinTolerance = (reports: Reports) => {
  const safe = reports.filter((report) => {
    if (isSafeReport(report)) {
      return true;
    }

    // try each combination of removing a level until one is safe
    for (let i = 0; i < report.length; i += 1) {
      const levelRemoved = report.toSpliced(i, 1);

      if (isSafeReport(levelRemoved)) {
        return true;
      }
    }
  });

  return safe.length;
};

export {
  input,
  example,
  calculateSafeReports,
  calculateSafeReportsWithinTolerance,
};
