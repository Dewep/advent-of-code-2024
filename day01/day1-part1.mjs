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

let total = 0
for (let index = 0; index < left.length; index++) {
  const a = left[index]
  const b = right[index]

  const diff = Math.abs(a - b)
  total += diff
}

console.log(total)
