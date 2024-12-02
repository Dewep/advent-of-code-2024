#!/usr/bin/env zx

import { readAndParseNumbers } from '../utils/parse.mjs'
import { insertIntoSortedArray } from '../utils/array.mjs'

const input = await readAndParseNumbers()

const left = []
const right = []

for (const numbers of input) {
  insertIntoSortedArray(left, numbers[0])
  insertIntoSortedArray(right, numbers[1])
}

let similarityScore = 0
let indexRight = 0
for (let indexLeft = 0; indexLeft < left.length; indexLeft++) {
  while (indexRight < right.length && right[indexRight] < left[indexLeft]) {
    indexRight += 1
  }

  let appears = 0
  while (indexRight < right.length && right[indexRight] === left[indexLeft]) {
    appears += 1
    indexRight += 1
  }

  similarityScore += left[indexLeft] * appears
}

console.log(similarityScore)
