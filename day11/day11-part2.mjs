#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()
const stones = raw.split(' ').map(nb => +nb)

const cacheNewStones = { // [nb] = [nb1, nb2?]
  0: [1], // first rule
}
function getNewStones (nb) { // second & third rules
  if (!cacheNewStones[nb]) {
    const str = nb.toString()
    if (str.length % 2 === 0) {
      cacheNewStones[nb] = [+str.slice(0, str.length / 2), +str.slice(str.length / 2)]
    } else {
      cacheNewStones[nb] = [nb * 2024]
    }
  }
  return cacheNewStones[nb]
}

const cacheCount = {} // [nb][blinks] = count
function countStones (nb, blinks) { // recursive function to count for all remaining blinks
  if (!cacheCount[nb]) {
    cacheCount[nb] = {}
  }
  if (!cacheCount[nb][blinks]) {
    cacheCount[nb][blinks] = !blinks
      ? getNewStones(nb).length
      : countAllStones(getNewStones(nb), blinks)
  }
  return cacheCount[nb][blinks]
}

function countAllStones (nbs, blinks) { // from array, with remaining blinks
  let total = 0
  for (const nb of nbs) {
    total += countStones(nb, blinks - 1)
  }
  return total
}

console.log(countAllStones(stones, 75))
