# vue-cli-plugin-go-webview

go-webview Plugin for [Vue CLI 3.x](https://github.com/vuejs/vue-cli)

## Prerequisite

- [Vue CLI 3.x](https://github.com/vuejs/vue-cli)
- [go](https://golang.org/)
- [go webview](https://github.com/zserge/webview)
- [go-bindata-assetfs](https://github.com/elazarl/go-bindata-assetfs)

## Install

```sh
$ vue add go-webview
```

## Changes after installation (templates)

- go-src: Directory for golang files
- go-src/main.go: main function
- go-src/listen_echo_server.go: Listen and serve using echo server
- go-src/listen_net_http_server.go: Listen and serve using net/http server
- package.json:
    -- Key 'go-webview' with plugin configuration values
    -- Script 'go-build'
- .gitignore: Ignore go build directory, binaries, bindata go file 

## Invoke

```sh
# Using npm
$ npm run go-build
# Using yarn
$ yarn run go-build
```

## Actions after invoke

- Runs vue-cli build script (production)
- Runs go-bindata-assetfs and packs all files from vue build outputDir (default: 'dist')
- Builds executable (as per native os) in go build directory (name in package.json go-webview configuration)

## Roadmap

- [ ] Prompt http server type
- [ ] Ignore files from binding in binary
- [ ] Update listen server templates code for random ephemeral port to listen
- [ ] Add Database template
- [ ] Add Api template

## License

MIT

