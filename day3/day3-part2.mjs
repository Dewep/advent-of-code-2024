#!/usr/bin/env zx

import { read } from '../utils/parse.mjs'

const raw = await read()
const content = raw
  .split('\n')
  .join(' ')
  .replace(/don't\(\)(.*?)($|do\(\))/g, '') // .*? to not be greedy

const matches = content.match(/mul\([0-9]+,[0-9]+\)/g)

let total = 0

for (const match of matches) {
  const parts = match.split(',')

  const a = parts[0].slice(4)
  const b = parts[1].slice(0, parts[1].length - 1)

  total += a * b
}

console.log(total)
