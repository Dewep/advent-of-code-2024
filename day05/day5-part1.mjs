#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()

const before = {}
const lists = []

for (const line of raw.split('\n')) {
  if (line.includes('|')) {
    const [a, b] = line.split('|').map(val => +val)
    if (!before[a]) {
      before[a] = []
    }
    before[a].push(b)
  } else if (line.includes(',')) {
    lists.push(line.split(',').map(val => +val))
  }
}

let total = 0

for (const list of lists) {
  if (isCorrectlyOrdered(list)) {
    total += list[Math.floor(list.length / 2)]
  }
}

console.log(total)

function isCorrectlyOrdered (list) {
  for (let index = 0; index < list.length; index++) {
    for (let beforeIndex = 0; beforeIndex < index; beforeIndex++) {
      if (before[list[index]] && before[list[index]].includes(list[beforeIndex])) {
        return false
      }
    }

    for (let afterIndex = index + 1; afterIndex < list.length; afterIndex++) {
      if (before[list[afterIndex]] && before[list[afterIndex]].includes(list[index])) {
        return false
      }
    }
  }

  return true
}
