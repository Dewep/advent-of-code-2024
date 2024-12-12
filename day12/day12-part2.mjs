#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()
const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
const map = raw.split('\n').filter(l => l).map(l => l.split(''))
const done = map.map(l => l.map(_ => false))

let total = 0
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (done[y][x]) {
      continue
    }

    const plant = map[y][x]
    const garden = findGarden(y, x)
    let sides = 0
    for (const key of Object.keys(garden.perimiters)) {
      while (garden.perimiters[key].length) {
        const point = garden.perimiters[key].pop()
        sides += 1
        for (const [yDir, xDir] of directions) {
          let newY = point[0]
          let newX = point[1]
          while (true) {
            newY += yDir
            newX += xDir
            const previousLength = garden.perimiters[key].length
            garden.perimiters[key] = garden.perimiters[key].filter(p => p[0] !== newY || p[1] !== newX)
            if (previousLength === garden.perimiters[key].length) {
              break
            }
          }
        }
    }
    }
    total += garden.area * sides
  }
}

console.log(total)

function findGarden (y, x, stats = { area: 0, perimiters: {} }) {
  const plant = map[y][x]
  done[y][x] = true
  stats.area += 1
  for (const [yDir, xDir] of directions) {
    const newY = y + yDir
    const newX = x + xDir
    if (newY >= 0 && newY < map.length && newX >= 0 && newX < map[y].length && plant === map[newY][newX]) {
      if (!done[newY][newX]) {
        findGarden(newY, newX, stats)
      }
    } else {
      const key = `${yDir}${xDir}`
      if (!stats.perimiters[key]) {
        stats.perimiters[key] = []
      }
      if (!stats.perimiters[key].some(p => p[0] === newY && p[1] === newX)) {
        stats.perimiters[key].push([newY, newX])
      }
    }
  }
  return stats
}
