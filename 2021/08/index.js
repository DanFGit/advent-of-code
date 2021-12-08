const fs = require("fs");

/************************
 * LOAD AND FORMAT DATA *
 ************************/

const loadInput = (name = "input") => {
  const data = fs.readFileSync(`${__dirname}/${name}.txt`, "utf-8");

  const lines = data.split("\n");

  return lines.map((line) => {
    const [signals, output] = line.split(" | ");

    return {
      signals: signals.split(" "),
      output: output.split(" "),
    };
  });
};

const input = loadInput("input");
const example = loadInput("example");

/**********************
 * PUZZLE STARTS HERE *
 **********************/

//  aaaa            aaaa    aaaa             aaaa    aaaa    aaaa    aaaa    aaaa
// b    c       c       c       c  b    c   b       b            c  b    c  b    c
// b    c       c       c       c  b    c   b       b            c  b    c  b    c
//                  dddd    dddd    dddd     dddd    dddd            dddd    dddd
// e    f       f  e            f       f        f  e    f       f  e    f       f
// e    f       f  e            f       f        f  e    f       f  e    f       f
//  gggg            gggg    gggg             gggg    gggg            gggg    gggg

const countDigitsWithUniqueSegments = (values) => {
  let count = 0;

  values.forEach((value) => {
    value.output.forEach((digits) => {
      switch (digits.length) {
        case 2:
        case 4:
        case 3:
        case 7:
          count += 1;
      }
    });
  });

  return count;
};

/**
 * Segment E appears in four of the digits: 0, 2, 6 and 8. No other segment
 * appears in four of the digits. Using this, we can immediately find out which
 * of the scrambled segments is actually segment E, because that segment will
 * appear in four of the ten input signals. We can also do this for segments B
 * and F.
 *
 * Segments A and C both appear in 8 of the digits. This means we can quickly
 * narrow down which of the two scrambled segments could correspond to either A
 * or C. We can also do this for segments D and G.
 */
const SEGMENT_FREQUENCY = {
  a: 8,
  b: 6, // unique
  c: 8,
  d: 7,
  e: 4, // unique
  f: 9, // unique
  g: 7,
};

const calculateSumOfOutputValues = (values) => {
  let sum = 0;

  values.forEach((value) => {
    /**
     * STEP 1
     * In the ten scrambled input signals, count the frequency of each segment
     */
    const segmentCount = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 };

    value.signals.forEach((signal) => {
      signal.split("").forEach((letter) => {
        segmentCount[letter] += 1;
      });
    });

    /**
     * STEP 2
     * Using the frequency of each scrambled segment, we can narrow each one
     * down to either 1 or 2 possibilities.
     */
    const segmentMap = { a: [], b: [], c: [], d: [], e: [], f: [], g: [] };

    Object.keys(segmentCount).forEach((scrambledSegment) => {
      switch (segmentCount[scrambledSegment]) {
        case SEGMENT_FREQUENCY.e:
          segmentMap.e.push(scrambledSegment);
          break;
        case SEGMENT_FREQUENCY.b:
          segmentMap.b.push(scrambledSegment);
          break;
        case SEGMENT_FREQUENCY.f:
          segmentMap.f.push(scrambledSegment);
          break;
        case SEGMENT_FREQUENCY.a:
        case SEGMENT_FREQUENCY.c:
          segmentMap.a.push(scrambledSegment);
          segmentMap.c.push(scrambledSegment);
          break;
        case SEGMENT_FREQUENCY.d:
        case SEGMENT_FREQUENCY.g:
          segmentMap.d.push(scrambledSegment);
          segmentMap.g.push(scrambledSegment);
          break;
      }
    });

    // At this point, we've already decoded three of the segments (B, E and F),
    // and which of the remaining four are either A/C or D/G.

    /**
     * STEP 3
     * Figure out segments A and C. We know that "1" is the only digit which
     * contains two segments - C and F, and because we've already decoded F,
     * we can figure out C. Once we know C, we know A.
     */
    value.signals.forEach((signal) => {
      if (signal.length === 2) {
        const [f] = segmentMap.f;

        const [c] = signal.split("").filter((segment) => segment != f);

        segmentMap.c = segmentMap.c.filter((segment) => segment === c);
        segmentMap.a = segmentMap.a.filter((segment) => segment !== c);
      }
    });

    // Now, we know every segment except D and G.

    /**
     * STEP 4
     * Figure out segments D and G. To do this, we need to use a digit which
     * contains only one of the two segments. We'll use "4", as it contains
     * segment D but not segment G, and it's easy to find because it's the only
     * digit with four segements.
     */
    value.signals.forEach((signal) => {
      if (signal.length === 4) {
        const [b] = segmentMap.b;
        const [c] = segmentMap.c;
        const [f] = segmentMap.f;

        const [d] = signal
          .split("")
          .filter((segment) => ![b, c, f].includes(segment));

        segmentMap.d = segmentMap.d.filter((segment) => segment === d);
        segmentMap.g = segmentMap.g.filter((segment) => segment !== d);
      }
    });

    // Finally, we know which segment is which.

    /**
     * STEP 5
     * Figure out which signal is which digit.
     */
    const {
      a: [a],
      b: [b],
      c: [c],
      d: [d],
      e: [e],
      f: [f],
      g: [g],
    } = segmentMap;

    // I know you're judging me, I'm judging myself...
    const digitsMap = {
      [`${a}${b}${c}${e}${f}${g}`.split("").sort().join("")]: 0,
      [`${c}${f}`.split("").sort().join("")]: 1,
      [`${a}${c}${d}${e}${g}`.split("").sort().join("")]: 2,
      [`${a}${c}${d}${f}${g}`.split("").sort().join("")]: 3,
      [`${b}${c}${d}${f}`.split("").sort().join("")]: 4,
      [`${a}${b}${d}${f}${g}`.split("").sort().join("")]: 5,
      [`${a}${b}${d}${e}${f}${g}`.split("").sort().join("")]: 6,
      [`${a}${c}${f}`.split("").sort().join("")]: 7,
      [`${a}${b}${c}${d}${e}${f}${g}`.split("").sort().join("")]: 8,
      [`${a}${b}${c}${d}${f}${g}`.split("").sort().join("")]: 9,
    };

    let output = "";
    value.output.forEach((digit) => {
      const sorted = digit.split("").sort().join("");

      output += digitsMap[sorted];
    });

    sum += Number(output);
  });

  return sum;
};

console.log("Part 1 - Example:", countDigitsWithUniqueSegments(example));
console.log("Part 1 - Actual: ", countDigitsWithUniqueSegments(input));

console.log("Part 2 - Example:", calculateSumOfOutputValues(example));
console.log("Part 2 - Actual: ", calculateSumOfOutputValues(input));

module.exports = {
  input,
  example,
  countDigitsWithUniqueSegments,
  calculateSumOfOutputValues,
};
