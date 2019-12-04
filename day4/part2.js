const from = 125730
const to = 579381

const matched = []

const toArray = (number) => String(number).split('').map(Number)
const orderNumbers = (prev, current) => prev > current
const findGroups = (number) => /(\d)\1{1,1}/.exec(number)

const neverDecreases = (number) =>
  toArray(number).sort(orderNumbers).join('') === String(number)

const hasDouble = (number) => {
  const match = String(number).match(/(\d)\1{1,5}/g) || []
  return match.reduce((acc, cur) => cur.length === 2 ? true : acc, false)
}

for (let i = from; i <= to; i++) {
  if (neverDecreases(i) && hasDouble(i)) matched.push(i)
}

console.log(matched.length)