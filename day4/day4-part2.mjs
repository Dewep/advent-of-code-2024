#!/usr/bin/env zx

import { readAndParseMap } from '../utils/parse.mjs'

const map = await readAndParseMap()

let found = 0

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] !== 'A') {
      continue
    }

    if (matchXOnMap(y, x)) {
      found += 1
    }
  }
}

console.log(found)

function matchXOnMap (y, x) {
  const a1 = matchOnMap('M', [y, x], [-1, -1]) && matchOnMap('S', [y, x], [1, 1])
  const a2 = matchOnMap('S', [y, x], [-1, -1]) && matchOnMap('M', [y, x], [1, 1])
  const b1 = matchOnMap('M', [y, x], [-1, 1]) && matchOnMap('S', [y, x], [1, -1])
  const b2 = matchOnMap('S', [y, x], [-1, 1]) && matchOnMap('M', [y, x], [1, -1])

  return (a1 || a2) && (b1 || b2)
}

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
