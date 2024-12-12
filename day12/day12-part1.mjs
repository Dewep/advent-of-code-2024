#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()
const map = raw.split('\n').filter(l => l).map(l => l.split(''))
const done = map.map(l => l.map(_ => false))

let total = 0
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (done[y][x]) {
      continue
    }

    const garden = findGarden(y, x)
    total += garden.area * garden.perimiter
  }
}

console.log(total)

function findGarden (y, x, stats = { area: 0, perimiter: 0 }) {
  const plant = map[y][x]
  done[y][x] = true
  stats.area += 1
  for (const [yDir, xDir] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
    const newY = y + yDir
    const newX = x + xDir
    if (newY >= 0 && newY < map.length && newX >= 0 && newX < map[y].length && plant === map[newY][newX]) {
      if (!done[newY][newX]) {
        findGarden(newY, newX, stats)
      }
    } else {
      stats.perimiter += 1
    }
  }
  return stats
}
