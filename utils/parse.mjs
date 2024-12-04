#!/usr/bin/env zx

export async function read (file = 'input.txt') {
  const content = await fs.readFile(file, { encoding: 'utf-8' })

  return content
}

export async function readAndParseMap (file = 'input.txt', splitter = '', transformer = null) {
  const content = await read(file)

  const input = []

  for (const line of content.split('\n')) {
    if (!line) {
      continue
    }

    const parsedLine = line
      .split(splitter)
      .map(value => transformer ? transformer(value) : value)

    input.push(parsedLine)
  }

  return input
}

export async function readAndParseNumbers (file = 'input.txt') {
  return readAndParseMap(file, /\s+/, nb => +nb)
}
