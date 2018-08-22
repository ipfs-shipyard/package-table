#! /usr/bin/env node
'use strict'

const yargs = require('yargs')
const path = require('path')
const argv = yargs.argv

if (!argv.data) {
  console.log('Need to pass --data=<file with data')
  process.exit()
}

const data = require(path.join(process.cwd(), argv.data))

const isItemPackage = (item) => Array.isArray(item)

const packageBadges = {
  'Package': (gh, npm) => `[\`${npm}\`](//github.com/${gh})`,
  'Version': (gh, npm) => `[![npm](https://img.shields.io/npm/v/${npm}.svg?maxAge=86400&style=flat-square)](//github.com/${gh}/releases)`,
  'Deps': (gh, npm) => `[![Deps](https://david-dm.org/${gh}.svg?style=flat-square)](https://david-dm.org/${gh})`,
  'CI': (gh, npm) => {
    // Need to fix the path for jenkins links, as jenkins adds `/job/` between everything
    const jenkinsPath = gh.split('/').join('/job/')
    return `[![jenkins](https://ci.ipfs.team/buildStatus/icon?job=${gh}/master)](https://ci.ipfs.team/job/${jenkinsPath}/job/master/)`
  },
  'Coverage': (gh, npm) => `[![codecov](https://codecov.io/gh/${gh}/branch/master/graph/badge.svg)](https://codecov.io/gh/${gh})`
}

// Creates the table row for a package
const generatePackageRow = (item) => {
  const row = data.columns.map(col => {
    // First string is GitHub path, second is npm package name
    return packageBadges[col](item[0], item[1])
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
