#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()

const map = []
const guard = { y: 0, x: 0, direction: 0 }
const directions = [
  { y: -1, x: 0 },
  { y: 0, x: 1 },
  { y: 1, x: 0 },
  { y: 0, x: -1 },
]

for (const line of raw.split('\n')) {
  if (!line) {
    continue
  }
  const cols = line.split('')
  const guardIndex = cols.indexOf('^')
  if (guardIndex !== -1) {
    guard.y = map.length
    guard.x = guardIndex
  }
  map.push(cols)
}

let done = false
while (!done) {
  map[guard.y][guard.x] = 'X'

  do {
    const newY = guard.y + directions[guard.direction].y
    const newX = guard.x + directions[guard.direction].x

    if (newY < 0 || newY >= map.length || newX < 0 || newX >= map[0].length) {
      done = true
      break
    }

    if (map[newY][newX] !== '#') {
      guard.y = newY
      guard.x = newX
      break
    }

    guard.direction += 1
    if (guard.direction >= directions.length) {
      guard.direction = 0
    }
  } while (true)
}

let counter = 0
for (const line of map) {
  for (const col of line) {
    if (col === 'X') {
      counter += 1
    }
  }
}

console.log(counter)
