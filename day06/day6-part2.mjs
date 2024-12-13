#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()

const map = []
const guardInitial = { y: 0, x: 0, direction: 0 }
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
    guardInitial.y = map.length
    guardInitial.x = guardIndex
  }
  map.push(cols)
}

let counter = 0

for (let oY = 0; oY < map.length; oY++) {
  for (let oX = 0; oX < map[0].length; oX++) {
    const guard = { ...guardInitial }
    const previous = []
    let done = false

    while (!done) {
      const id = [guard.y, guard.x, guard.direction].join(',')
      if (previous.includes(id)) {
        counter += 1
        break
      }
      previous.push(id)

      do {
        const newY = guard.y + directions[guard.direction].y
        const newX = guard.x + directions[guard.direction].x

        if (newY < 0 || newY >= map.length || newX < 0 || newX >= map[0].length) {
          done = true
          break
        }

        if (map[newY][newX] !== '#' && !(newY === oY && newX === oX)) {
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
  }
}

console.log(counter)
