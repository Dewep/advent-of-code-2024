#!/usr/bin/env zx

import { readAndParseNumbers } from '../utils/parse.mjs'

const numbers = await readAndParseNumbers()

let safe = 0

for (const levels of numbers) {
  const index = notSafeIndex(levels)

  if (index !== -1 && !isSafeTolerate(levels, index)) {
    continue
  }

  safe += 1
}

console.log(safe)

function isSafeTolerate (levels, indexError) {
  const indexes = [0, 1] // 0 & 1 to change increase/decrease
  if (!indexes.includes(indexError)) { // current index removal
    indexes.push(indexError)
  }
  if (!indexes.includes(indexError - 1)) { // trying to remove the previous one
    indexes.push(indexError - 1)
  }

  for (const withoutIndex of indexes) {
    const newLevels = [...levels]
    newLevels.splice(withoutIndex, 1)

    if (notSafeIndex(newLevels) === -1) {
      return true
    }
  }

  return false
}

function notSafeIndex (levels) {
  if (levels[0] === levels[1]) {
    return 0
  }

  const isIncreasing = levels[0] < levels[1]

  for (let index = 1; index < levels.length; index++) {
    const diff = levels[index] - levels[index - 1]
    const currentIsIncreasing = diff > 0

    if (diff === 0 || Math.abs(diff) > 3) {
      return index
    }

    if (isIncreasing !== currentIsIncreasing) {
      return index
    }
  }

  return -1
}
