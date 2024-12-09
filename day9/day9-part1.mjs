#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()

const input = raw.split('\n').shift().split('').map(val => +val)

let result = 0
let position = 0
let maxIndex = input.length
let remainingN = 0

for (let i = 0; i <= maxIndex; i++) {
  for (let n = 0; n < input[i]; n++) {
    if (i === maxIndex && remainingN-- <= 0) {
      break
    } else if (i % 2 === 0) { // used
      result += position++ * Math.floor(i / 2)
    } else { // free
      while (!remainingN) {
        maxIndex -= maxIndex % 2 === 0 ? 2 : 1
        remainingN = input[maxIndex]
      }
      remainingN -= 1
      result += position++ * Math.floor(maxIndex / 2)
    }
  }
}

console.log(result)
