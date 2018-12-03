package main

import (
  "github.com/zserge/webview"
)

func main() {
  // Use net/http server
  // go ListenAndServe()
  // Use echo server
  go ListenAndServeEcho()
  webview.Open("Vue go-webview app",
    "http://localhost:8000", 800, 600, true)
}

