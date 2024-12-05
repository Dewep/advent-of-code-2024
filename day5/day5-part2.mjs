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
  const orderedList = getCorrectOrder(list)

  if (list.join(',') !== orderedList.join(',')) {
    total += orderedList[Math.floor(orderedList.length / 2)]
  }
}

console.log(total)

function getCorrectOrder (list) {
  const orderedList = []

  for (const number of list) {
    let indexToAdd = orderedList.length

    for (let index = 0; index < orderedList.length; index++) {
      if (before[number] && before[number].includes(orderedList[index])) {
        indexToAdd = index
        break
      }
    }

    orderedList.splice(indexToAdd, 0, number)
  }

  return orderedList
}
