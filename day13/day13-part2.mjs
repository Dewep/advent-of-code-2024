#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()

const machines = raw.split('\n\n').filter(l => l).map(rawMachine => {
  const [a, b, p] = rawMachine.split('\n').filter(l => l)
    .map(line => line.match(/X.([0-9]+), Y.([0-9]+)$/))
    .map(match => [+match[1], +match[2]])
  return { a, b, p: [p[0] + 10000000000000, p[1] + 10000000000000] }
})

let total = 0
for (const machine of machines) {
  total += cramer(machine) || 0
}
console.log(total)

// https://calculis.net/systeme-equation
function cramer ({ a, b, p }) {
  const determinant = a[0] * b[1] - a[1] * b[0]
  // Only working because "determinant" is never equals to 0 in the input
  // When it's equal to 0, there are multiple possible solutions
  // Meaning we would need to find them all & compare them to have the chepeast one
  const aNb = (p[0] * b[1] - p[1] * b[0]) / determinant
  const bNb = (p[1] * a[0] - p[0] * a[1]) / determinant
  if (Math.floor(aNb) !== aNb || Math.floor(bNb) !== bNb) {
    return 0
  }
  return aNb * 3 + bNb
}
