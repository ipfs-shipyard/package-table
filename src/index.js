#! /usr/bin/env node
'use strict'

const { parseArgs } = require('node:util')
const path = require('path')
const packageBadges = require('./badges')

const argv = parseArgs({
  options: {
    data: {
      type: 'string'
    }
  }
})

if (!argv.values.data) {
  console.log('Need to pass --data=<file with data>') // eslint-disable-line no-console
  process.exit()
}

let data

if (path.isAbsolute(argv.values.data)) {
  data = require(argv.values.data)
} else {
  data = require(path.join(process.cwd(), argv.values.data))
}

// Creates the table row for a package
const generatePackageRow = async item => {
  const promises = data.columns.map(col => packageBadges[col](...item))
  const vals = await Promise.all(promises)

  return `| ${vals.join(' | ')} |`
}

// Generates a row for the table, depending if it's a package or a heading
const generateRow = item => {
  if (Array.isArray(item)) {
    return generatePackageRow(item)
  } else {
    return `| **${item}** |`
  }
}

(async () => {
  const header = `| ${data.columns.join(' | ')} |`
  const hr = `| ${data.columns.map(() => '---------').join('|')} |`
  const promises = data.rows.map(row => generateRow(row))
  const rows = (await Promise.all(promises)).join('\n')

  console.log([header, hr, rows].join('\n')) // eslint-disable-line no-console
})()
