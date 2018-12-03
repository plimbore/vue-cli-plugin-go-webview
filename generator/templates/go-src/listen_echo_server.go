package main

import (
  static "github.com/Code-Hex/echo-static"
  "github.com/labstack/echo"
  // "github.com/labstack/echo/engine/standard"
  "github.com/elazarl/go-bindata-assetfs"
)

func NewAssets(root string) *assetfs.AssetFS {
  return &assetfs.AssetFS{
    Asset:     Asset,
    AssetDir:  AssetDir,
    AssetInfo: AssetInfo,
    Prefix:    root,
  }
}

func ListenAndServeEcho() {
  e := echo.New()

  e.Use(static.ServeRoot("/", NewAssets("dist")))
  /*
  e.File("/", "public/index.html")
  e.GET("/tasks", handlers.GetTasks(db))
  e.PUT("/tasks", handlers.PutTask(db))
  e.DELETE("/tasks/:id", handlers.DeleteTask(db))
  */
  // changed
  // e.Run(standard.New(":8000"))
  // to
  e.Start(":8000")
}
