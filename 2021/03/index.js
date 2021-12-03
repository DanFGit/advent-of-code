const input = require("./input");
const example = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

const countBits = (values) => {
  const zeros = [];
  const ones = [];

  values.forEach((value) => {
    const bits = value.split("");

    bits.forEach((bit, index) => {
      if (!Array.isArray(zeros[index])) {
        zeros[index] = [];
        ones[index] = [];
      }

      if (bit == 0) zeros[index].push(bit);
      if (bit == 1) ones[index].push(bit);
    });
  });

  return { zeros, ones };
};

const calculatePowerConsumption = (values) => {
  let gammaBits = []; // most common bit
  let epsilonBits = []; // least common bit

  const { zeros, ones } = countBits(values);

  zeros.forEach((_, index) => {
    if (zeros[index].length > ones[index].length) {
      gammaBits.push(0);
      epsilonBits.push(1);
    } else {
      gammaBits.push(1);
      epsilonBits.push(0);
    }
  });

  const gamma = parseInt(gammaBits.join(""), 2);
  const epsilon = parseInt(epsilonBits.join(""), 2);

  return gamma * epsilon;
};

const calculateOxygenGeneratorRating = (values, pos = 0) => {
  const { zeros, ones } = countBits(values);

  const filterOn = zeros[pos].length > ones[pos].length ? "0" : "1";
  const filtered = values.filter((value) => value[pos] === filterOn);

  if (filtered.length === 1) return filtered[0];

  return calculateOxygenGeneratorRating(filtered, pos + 1);
};

const calculateCarbonDioxideScrubberRating = (values, pos = 0) => {
  const { zeros, ones } = countBits(values);

  const filterOn = ones[pos].length >= zeros[pos].length ? "0" : "1";
  const filtered = values.filter((value) => value[pos] === filterOn);

  if (filtered.length === 1) return filtered[0];

  return calculateCarbonDioxideScrubberRating(filtered, pos + 1);
};

const calculateLifeSupportRating = (values) => {
  const oxygenGeneratorRating = calculateOxygenGeneratorRating(values);
  const carbonDioxideScrubberRating =
    calculateCarbonDioxideScrubberRating(values);

  return (
    parseInt(oxygenGeneratorRating, 2) *
    parseInt(carbonDioxideScrubberRating, 2)
  );
};

console.log("Part 1 - Example:", calculatePowerConsumption(example));
console.log("Part 1 - Actual: ", calculatePowerConsumption(input));

console.log("Part 2 - Example:", calculateLifeSupportRating(example));
console.log("Part 2 - Actual: ", calculateLifeSupportRating(input));

module.exports = {
  input,
  example,
  calculatePowerConsumption,
  calculateLifeSupportRating,
};
