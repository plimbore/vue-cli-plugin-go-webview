const os = require('os')
const spawn = require('cross-spawn')

module.exports = (api, options) => {
  
  // go-webview run platform
  const goBuild = (platform) => {
    let goBuildDir = 'build'
    console.log('Project Directory:', api.resolve(''))
    console.log('Binding vue build at:', api.resolve(`${options.outputDir}`))
    spawn.sync('go-bindata-assetfs', [
      '-o',
      `go-src/${api.service.pkg.name}-bindata.go`,
      `${options.outputDir}/...`
    ], {
      cwd: api.resolve(''),
      env: process.env,
      stdio: 'inherit', // pipe to console
      encoding: 'utf-8'
    })
    
    if (api.service.pkg["go-webview"]) {
       goBuildDir = api.service.pkg["go-webview"].goBuildDir ?
         api.service.pkg["go-webview"].goBuildDir :
         goBuildDir
    }
    let buildArgs = ['build']
    // console.log(options)
    switch(platform) {
      case 'Linux':
        return spawn.sync('go', [
          'build',
          '-o',
          api.resolve(`${goBuildDir}/${api.service.pkg.name}-${api.service.pkg.version}`)
        ], {
          cwd: './go-src',
          env: process.env,
          stdio: 'inherit', // pipe to console
          encoding: 'utf-8'
        })
      
      case 'Darwin':
        spawn.sync('mkdir', [
          '-p',
          api.resolve(`${goBuildDir}/${api.service.pkg.name}.app/Contents/MacOS`)
          // 'example.app/Contents/MacOS'
        ], {
          cwd: './',
          env: process.env,
          stdio: 'inherit', // pipe to console
          encoding: 'utf-8'
        })
        return spawn.sync('go', [
          'build',
          '-o',
          api.resolve(`${goBuildDir}/${api.service.pkg.name}.app/Contents/MacOS/${api.service.pkg.name}`)
        ], {
          cwd: './go-src',
          env: process.env,
          stdio: 'inherit', // pipe to console
          encoding: 'utf-8'
        })
      
      case 'Windows_NT':
        return spawn.sync('go', [
          'build',
          '-ldflags="-H windowsgui"',
          '-o',
          api.resolve(`${goBuildDir}/${api.service.pkg.name}.exe`)
        ], {
          cwd: './go-src',
          env: process.env,
          stdio: 'inherit', // pipe to console
          encoding: 'utf-8'
        })
      
      default:
        console.log('OS not supported:', platform)
    }
  }
  
  const runBuild = async (platform, args) => {
    // build
    await api.service.run('build', args)
    // go build --release (if you want a build debug build, use goBuild(platform, false)
    await goBuild(platform)
  }
  
  api.registerCommand('go-build', async args => {
    return await runBuild(os.type(), args)
  })
}

// make sure to specify the default mode for correct env variables
module.exports.defaultModes = {
  'go-build': 'production'
}
