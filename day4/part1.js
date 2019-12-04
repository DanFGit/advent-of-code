const from = 125730
const to = 579381

// const from = 111110
// const to = 111130

const matched = []

const toArray = (number) => String(number).split('').map(Number)
const orderNumbers = (prev, current) => prev > current

const neverDecreases = (number) => toArray(number).sort(orderNumbers).join('') === String(number)

const hasDouble = (number) => {
  return toArray(number).reduce((acc, cur, index, arr) => {
    if (index !== 0 && cur === arr[index - 1]) return true
    return acc
  }, false)
}

for (let i = from; i <= to; i++) {
  if (neverDecreases(i) && hasDouble(i)) matched.push(i)
}

console.log(matched.length)