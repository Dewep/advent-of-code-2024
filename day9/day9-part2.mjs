#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()

const input = raw.split('\n').shift().split('').map(val => +val)

const map = input
  .map((nb, i) => [[], Array(nb).fill(i % 2 ? '.' : Math.floor(i / 2))])
  .flat()

for (let i = map.length - 1; i > 0; i--) {
  if (!map[i].length || map[i][0] === '.') {
    continue
  }

  for (let j = 0; j < i; j++) {
    if (map[j].length && map[j][0] === '.' && map[i].length <= map[j].length) {
      map[j] = Array(map[j].length - map[i].length).fill('.')
      map[j - 1].push(...map[i])
      map[i] = map[i].map(_ => '.')
      break
    }
  }
}

const result = map
  .flat()
  .reduce((acc, nb, index) => acc + index * (nb === '.' ? 0 : nb), 0)

console.log(result)
