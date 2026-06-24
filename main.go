package main

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"os"

	webview "github.com/webview/webview_go"
)

//go:generate goversioninfo -icon=public/icon.ico
//go:embed dist/*

var distFiles embed.FS

const url string = "http://localhost:8080"

var server *http.Server = &http.Server{
	Addr:    ":8080",
	Handler: http.DefaultServeMux,
}

func main() {
	sub, err := fs.Sub(distFiles, "dist")

	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}

	http.Handle("/", http.FileServerFS(sub))

	go func() {
		fmt.Println("Serving at http://localhost:8080")
		err := server.ListenAndServe()
		if err != nil && err != http.ErrServerClosed {
			fmt.Println("Error:", err)
		}
	}()

	window := webview.New(true)
	defer window.Destroy()

	window.SetTitle("Zephyr Dashboard")
	window.SetSize(1280, 720, webview.HintNone)
	window.Navigate(url)

	window.Run()

	server.Close()
}
