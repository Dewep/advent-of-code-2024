#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()

const map = raw.split('\n').filter(l => l).map(l => l.split('').map(nb => +nb))

let score = 0

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === 0) {
      const solutions = countTrailheads(y, x)
      score += Object.keys(solutions).length
    }
  }
}

console.log(score)

function countTrailheads (y, x, find = 0, solutions = {}) {
  if (y >= 0 && y < map.length && x >= 0 && x < map[y].length && map[y][x] === find) {
    if (find === 9) {
      solutions[`${y},${x}`] = true
    } else {
      countTrailheads(y - 1, x, find + 1, solutions)
      countTrailheads(y + 1, x, find + 1, solutions)
      countTrailheads(y, x - 1, find + 1, solutions)
      countTrailheads(y, x + 1, find + 1, solutions)
    }
  }
  return solutions
}
