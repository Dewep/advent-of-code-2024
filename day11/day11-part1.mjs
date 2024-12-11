#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()
const stones = raw.split(' ').map(nb => +nb)

for (let blink = 0; blink < 25; blink++) {
  for (let i = 0; i < stones.length; i++) {
    const str = stones[i].toString()
    if (stones[i] === 0) {
      stones[i] = 1
    } else if (str.length % 2 === 0) {
      stones[i++] = +str.slice(0, str.length / 2)
      stones.splice(i, 0, +str.slice(str.length / 2))
    } else {
      stones[i] *= 2024
    }
  }
}

console.log(stones.length)
