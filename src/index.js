#! /usr/bin/env node
'use strict'

const yargs = require('yargs')
const path = require('path')
const packageBadges = require('./badges')
const argv = yargs.argv

if (!argv.data) {
  console.log('Need to pass --data=<file with data')
  process.exit()
}

const data = require(path.join(process.cwd(), argv.data))
const isItemPackage = Array.isArray

// Creates the table row for a package
const generatePackageRow = (item) => {
  const row = data.columns.map(col => {
    // First string is GitHub path, second is the package name
    return packageBadges[col](...item)
  }).join(' | ')

  const fullRow = `| ${row} |`
  return fullRow
}

// Generates a row for the table, depending if it's a package or a heading
const generateRow = (item) => {
  if (isItemPackage(item)) {
    return generatePackageRow(item)
  } else {
    return `| **${item}** |`
  }
}

const header = `| ${data.columns.join(' | ')} |`
const hr = `| ${data.columns.map(() => '---------').join('|')} |`

const toPrint = [
  header,
  hr,
  data.rows.map((row) => generateRow(row)).join('\n')
]

toPrint.forEach((t) => console.log(t))
