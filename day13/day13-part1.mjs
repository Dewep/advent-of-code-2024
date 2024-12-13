#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()

const machines = raw.split('\n\n').filter(l => l).map(rawMachine => {
  const [a, b, p] = rawMachine.split('\n').filter(l => l)
    .map(line => line.match(/X.([0-9]+), Y.([0-9]+)$/))
    .map(match => [+match[1], +match[2]])
  return { a, b, p }
})

let total = 0
for (const machine of machines) {
  total += findCheapestTokens(machine) || 0
}
console.log(total)

function findCheapestTokens ({ a, b, p }) {
  let min = null
  for (let aNb = 0; aNb <= 100; aNb++) {
    for (let bNb = 0; bNb <= 100; bNb++) {
      if (p[0] === a[0] * aNb + b[0] * bNb && p[1] === a[1] * aNb + b[1] * bNb) {
        const tokens = 3 * aNb + bNb
        if (!min || min > tokens) {
          min = tokens
        } else {
          return min
        }
      }
    }
  }
  return min
}
