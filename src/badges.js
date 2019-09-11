const request = require('request')

const badgeExists = url => new Promise(resolve => {
  request.head(url, (error, res) => {
    resolve(!error && res.statusCode !== 404)
  })
})

const name = (gh, pkg) => {
  return `[\`${pkg}\`](//github.com/${gh})`
}

const npmVersion = (gh, pkg) => {
  return `[![npm](https://img.shields.io/npm/v/${pkg}.svg?maxAge=86400&style=flat-square)](//github.com/${gh}/releases)`
}

const deps = (gh) => {
  return `[![Deps](https://david-dm.org/${gh}.svg?style=flat-square)](https://david-dm.org/${gh})`
}

const ciTravis = async (gh) => {
  const url = `https://flat.badgen.net/travis/${gh}.svg?branch=master`

  if (await badgeExists(url)) {
    return `[![Travis CI](${url})](https://travis-ci.com/${gh})`
  } else {
    return 'N/A'
  }
}

const coverage = (gh) => {
  return `[![codecov](https://codecov.io/gh/${gh}/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/${gh})`
}

const leadMaintainer = (_, pkg) => new Promise(resolve => {
  request.get(`https://unpkg.com/${pkg}/package.json`, (error, res, body) => {
    if (error || res.statusCode >= 400) {
      return resolve('N/A')
    }

    let lead = JSON.parse(body).leadMaintainer

    if (lead) {
      lead = lead.match(/(.*) <(.+\@.+\..*)>/)
      const name = lead[1].trim()
      const mail = lead[2].trim()
      return resolve(`[${name}](mailto:${mail})`)
    }

    resolve('N/A')
  })
})

const description = (gh, pkg, desc) => desc

module.exports = {
  Package: name,
  Name: name,
  Version: npmVersion,
  Deps: deps,
  CI: ciTravis,
  'CI/Travis': ciTravis,
  'Lead Maintainer': leadMaintainer,
  Coverage: coverage,
  Description: description
}
