#!/usr/bin/env zx

export function insertIntoSortedArray (array, value) {
  let min = 0
  let max = array.length

  while (min < max) {
    let mid = (min + max) >>> 1
    if (array[mid] < value) {
      min = mid + 1
    } else {
      max = mid
    }
  }

  array.splice(min, 0, value)
}
