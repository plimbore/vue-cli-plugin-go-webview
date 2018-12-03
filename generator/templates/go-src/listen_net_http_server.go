package main

import (
  "log"
  "net/http"
  "github.com/elazarl/go-bindata-assetfs"
)

func ListenAndServe() {
  // Use binary asset FileServer
  http.Handle("/",
    http.FileServer(
      &assetfs.AssetFS{
        Asset: Asset,
        AssetDir: AssetDir,
        AssetInfo: AssetInfo,
        Prefix: "dist"}))

  log.Println("http server started on :8000")
  err := http.ListenAndServe(":8000", nil)
  if err != nil {
    log.Fatal("ListenAndServe: ", err)
  }
}
