'use strict'

const badgeExists = async (url) => {
  const res = await fetch(url)

  return res.statusCode !== 404
}

const name = (gh, pkg, branch = 'main') => {
  return `[\`${pkg}\`](//github.com/${gh})`
}

const npmVersion = (gh, pkg, branch = 'main') => {
  return `[![npm](https://img.shields.io/npm/v/${encodeURIComponent(pkg)}.svg?maxAge=86400&style=flat-square)](//github.com/${gh}/releases)`
}

const deps = (gh, pkg, branch = 'main') => {
  return `[![Deps](https://img.shields.io/librariesio/release/npm/${encodeURIComponent(pkg)}?logo=Libraries.io&logoColor=white&style=flat-square)](//libraries.io/npm/${encodeURIComponent(pkg)})`
}

const ciTravis = async (gh, pkg, branch = 'main', ci = 'main.yml') => {
  const url = `https://flat.badgen.net/travis/${gh}/${branch}`

  if (await badgeExists(url)) {
    return `[![Travis CI](${url})](https://travis-ci.com/${gh})`
  } else {
    return 'N/A'
  }
}

const ciGitHub = async (gh, pkg, branch = 'main', ci = 'main.yml') => {
  const url = `https://img.shields.io/github/actions/workflow/status/${gh}/${ci}?branch=${branch}&label=ci&style=flat-square`

  if (await badgeExists(url)) {
    return `[![GitHub CI](${url})](//github.com/${gh}/actions?query=branch%3A${branch}+workflow%3Aci+)`
  } else {
    return 'N/A'
  }
}

const coverage = (gh, pkg, branch = 'main') => {
  return `[![codecov](https://codecov.io/gh/${gh}/branch/${branch}/graph/badge.svg?style=flat-square)](https://codecov.io/gh/${gh})`
}

const description = (gh, pkg, desc) => desc

module.exports = {
  Package: name,
  Name: name,
  Version: npmVersion,
  Deps: deps,
  CI: ciGitHub,
  'CI/Travis': ciTravis,
  Coverage: coverage,
  Description: description
}
