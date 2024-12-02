#!/usr/bin/env zx

export async function readAndParseNumbers (file = 'input.txt') {
  const content = await fs.readFile(file, { encoding: 'utf-8' })

  const input = []

  for (const line of content.split('\n')) {
    if (!line) {
      continue
    }

    input.push(line.split(/\s+/).map(nb => +nb))
  }

  return input
}
