const name = (gh, pkg) => {
  return `[\`${pkg}\`](//github.com/${gh})`
}

const version = (gh, pkg) => {
  return `[![npm](https://img.shields.io/npm/v/${pkg}.svg?maxAge=86400&style=flat-square)](//github.com/${gh}/releases)`
}

const deps = ({gh}) => {
  return `[![Deps](https://david-dm.org/${gh}.svg?style=flat-square)](https://david-dm.org/${gh})`
}

const ciTravis = (gh) => {
  return `[![Travis CI](https://travis-ci.org/${gh}.svg?branch=master)](https://travis-ci.org/${gh})`
}

const ciJenkins = (gh) => {
  // Need to fix the path for jenkins links, as jenkins adds `/job/` between everything
  const jenkinsPath = gh.split('/').join('/job/')
  return `[![jenkins](https://ci.ipfs.team/buildStatus/icon?job=${gh}/master)](https://ci.ipfs.team/job/${jenkinsPath}/job/master/)`
}

const coverage = (gh) => {
  return `[![codecov](https://codecov.io/gh/${gh}/branch/master/graph/badge.svg)](https://codecov.io/gh/${gh})`
}

module.exports = {
  Package: name,
  Name: name,
  Version: version,
  Deps: deps,
  CI: ciJenkins,
  'CI/Jenkins': ciJenkins,
  'CI/Travis': ciTravis,
  Coverage: coverage
}
