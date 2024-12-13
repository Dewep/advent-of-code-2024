#!/usr/bin/env zx

import { readAndParseNumbers } from '../utils/parse.mjs'

const numbers = await readAndParseNumbers()

let safe = 0

for (const levels of numbers) {
  if (isSafe(levels)) {
    safe += 1
  }
}

console.log(safe)

function isSafe (levels) {
  if (levels[0] === levels[1]) {
    return false
  }

  const isIncreasing = levels[0] < levels[1]

  for (let index = 1; index < levels.length; index++) {
    const diff = levels[index] - levels[index - 1]
    const currentIsIncreasing = diff > 0

    if (diff === 0 || Math.abs(diff) > 3) {
      return false
    }

    if (isIncreasing !== currentIsIncreasing) {
      return false
    }
  }

  return true
}
