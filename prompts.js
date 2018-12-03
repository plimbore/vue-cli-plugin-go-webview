module.exports = [
  {
    name: 'goBuildDir',
    // make sure your prompt only shows up if user has picked your feature
    // when: answers => answers.features.include('go-webview'),
    message: 'go build directory path (Must be different from vue build dir (dist)',
    type: 'input',
    default: 'build'
  }
]

