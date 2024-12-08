#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()

let result = 0

for (const line of raw.split('\n')) {
  if (!line) {
    break
  }

  const numbers = line.split(/:? /).map(val => +val)
  const sum = numbers.shift()

  if (canBeCalibrated(sum, numbers)) {
    result += sum
  }
}

console.log(result)

function canBeCalibrated (sum, numbers, value = 0) {
  if (!numbers.length) {
    return sum === value
  }

  const nextNumbers = [...numbers]
  const number = nextNumbers.shift()

  return canBeCalibrated(sum, nextNumbers, value + number) || canBeCalibrated(sum, nextNumbers, value * number)
}
