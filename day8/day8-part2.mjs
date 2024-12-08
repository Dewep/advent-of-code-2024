#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()

const map = []
const antennas = {}
for (const line of raw.split('\n')) {
  if (!line) {
    break
  }
  const points = line.split('')
  for (let x = 0; x < points.length; x++) {
    if (points[x] === '.') {
      continue
    }
    if (!antennas[points[x]]) {
      antennas[points[x]] = []
    }
    antennas[points[x]].push([map.length, x])
  }
  map.push(points)
}

for (const key of Object.keys(antennas)) {
  const antenna = antennas[key]
  for (let i = 0; i < antenna.length; i++) {
    for (let j = i + 1; j < antenna.length; j++) {
      const diffY = antenna[j][0] - antenna[i][0]
      const diffX = antenna[j][1] - antenna[i][1]

      let newY = antenna[i][0]
      let newX = antenna[i][1]
      while (setAntinode(newY, newX)) {
        newY -= diffY
        newX -= diffX
      }

      newY = antenna[j][0]
      newX = antenna[j][1]
      while (setAntinode(newY, newX)) {
        newY += diffY
        newX += diffX
      }
    }
  }
}

let counter = 0
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === '#') {
      counter += 1
    }
  }
}

// console.log(map.map(l => l.join('')).join('\n'))
console.log(counter)

function setAntinode (y, x) {
  if (y < 0 || y >= map.length) {
    return false
  }
  if (x < 0 || x >= map[y].length) {
    return false
  }
  map[y][x] = '#'
  return true
}
