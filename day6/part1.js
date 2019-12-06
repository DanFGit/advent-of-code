const input = require('./input.json')

class Thing {
  constructor() {
    this.children = []
  }

  addChild(child) {
    this.children.push(child)
  }

  get orbits() {
    return this.children.reduce((total, child) => total + child.orbits + 1, 0)
  }

  get directOrbits() {
    return this.children.length
  }

  get indirectOrbits() {
    return this.orbits - this.directOrbits
  }
}

const things = {}

input.forEach((relationship) => {
  const [thingOne, thingTwo] = relationship.split(')')

  if (!things[thingOne]) things[thingOne] = new Thing(thingOne)
  if (!things[thingTwo]) things[thingTwo] = new Thing(thingTwo)

  things[thingTwo].addChild(things[thingOne])
})

const sumDirectOrbits = Object.keys(things).reduce((total, thing) => total + things[thing].directOrbits, 0)
const sumIndirectOrbits = Object.keys(things).reduce((total, thing) => total + things[thing].indirectOrbits, 0)

console.log(`Direct Orbits:   ${sumDirectOrbits}`)
console.log(`Indirect Orbits: ${sumIndirectOrbits}`)
console.log(`Total:           ${sumDirectOrbits + sumIndirectOrbits}`)