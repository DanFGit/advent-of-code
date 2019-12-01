// Input
const input = require('./input.json')

// Part 1
// const sum = input.reduce((total, mass) => total + Math.floor(mass / 3) - 2, 0)

// Part 2
const calculateFuelAndMass = (mass, i = 0) => {
  const fuel = Math.floor(mass / 3) - 2;

  return fuel <= 0 ? 0 : fuel + calculateFuelAndMass(fuel, i + 1)
};

const sum = input.reduce((total, mass) => total + calculateFuelAndMass(mass), 0)

console.log(`The total fuel required is: ${sum}`)
