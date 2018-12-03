module.exports = (api, options, rootOptions) => {
  const fs = require('file-system')

  // modify package.json fields
  api.extendPackage({
    scripts: {
      'go-build': 'vue-cli-service go-build'
    },
    'go-webview': {
      'goBuildDir': options.goBuildDir
    }
  })

  // copy and render all files in ./template with ejs
  api.render('./templates', options)
  
  api.onCreateComplete(() => {
    // .gitignore - Go build directory
    const ignorePath = api.resolve('.gitignore')
    const ignore = fs.existsSync(ignorePath)
      ? fs.readFileSync(ignorePath, 'utf-8')
      : ''
    fs.writeFileSync(
      ignorePath,
      ignore +
        '\n# Go build binaries\n' +
        options.goBuildDir +
        '\n*.exe\n*.dmg' +
        '\ngo-src/' + api.generator.pkg.name + '-bindata.go\n'
    )
  })

  /*
  if (options.foo) {
    // conditionally generate files
  }
  */
}
