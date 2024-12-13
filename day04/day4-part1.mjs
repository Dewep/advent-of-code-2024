#!/usr/bin/env zx

import { readAndParseMap } from '../utils/parse.mjs'

const map = await readAndParseMap()

// Y/X modifiers to move from a point
const moveOffsets = []
for (let y = -1; y <= 1; y++) {
  for (let x = -1; x <= 1; x++) {
    moveOffsets.push([y, x])
  }
}

let found = 0

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] !== 'X') {
      continue
    }

    for (const move of moveOffsets) {
      if (matchOnMap('MAS', [y, x], move)) {
        found += 1
      }
    }
  }
}

console.log(found)

function matchOnMap (text, [y, x], [moveY, moveX]) {
  if (!text.length) {
    return true
  }

  const newY = y + moveY
  const newX = x + moveX

  if (newY < 0 || newY >= map.length || newX < 0 || newX >= map[newY].length) {
    return false
  }

  if (map[newY][newX] !== text[0]) {
    return false
  }

  return matchOnMap(text.slice(1), [newY, newX], [moveY, moveX])
}
