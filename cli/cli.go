package cli

import (
	"flag"
	"fmt"
	"log"
	"os/exec"
	"strings"
)

type Commands struct {
	BasePath       string
	ConfigFile     string
	Files          []string
	WhiteListExt   []string
	WhiteListInt   []string
	BlackList      []string
	Timeout		   int
	ReguestTimes   int8
	IgnoreExternal bool
	IgnoreInternal bool
	Verbose        bool
}

func ParseCommands() Commands {
	basePath := flag.String("base-path", "", "The root source directories used to search for files")
	configFile := flag.String("config-file", "milv.config.yaml", "The config file for bot")
	whiteListExt := flag.String("white-list-ext", "", "The white list external links")
	whiteListInt := flag.String("white-list-int", "", "The white list internal links")
	blackList := flag.String("black-list", "", "The files black list")
	timeout := flag.Int("timeout", 0, "Timeout for http.get reguest")
	reguestTimes := flag.Int("reguest-times", 0, "Times reguest failuring links")
	ignoreInternal := flag.Bool("ignore-internal", false, "Ignore internal links")
	ignoreExternal := flag.Bool("ignore-external", false, "Ignore external links")
	verbose := flag.Bool("v", false, "Enable verbose logging")

	flag.Parse()
	files := flag.Args()

	if *basePath != "" {
		*configFile = fmt.Sprintf("%s/%s", *basePath, *configFile)
	}
	if len(files) == 0 {
		out := runCmd("find . -name \"*.md\"", true)
		files = strings.Split(string(out), "\n")
		if len(files) > 0 {
			files = files[:len(files)-1]
		}
	}

	return Commands{
		BasePath:       *basePath,
		ConfigFile:     *configFile,
		Files:          files,
		WhiteListExt:   strings.Split(*whiteListExt, ","),
		WhiteListInt:   strings.Split(*whiteListInt, ","),
		BlackList:      strings.Split(*blackList, ","),
		Timeout:		*timeout,
		ReguestTimes:   int8(*reguestTimes),
		IgnoreExternal: *ignoreExternal,
		IgnoreInternal: *ignoreInternal,
		Verbose:        *verbose,
	}
}

func runCmd(cmd string, shell bool) []byte {
	if shell {
		out, err := exec.Command("/bin/bash", "-c", cmd).Output()
		if err != nil {
			log.Fatal(err)
			panic("some error found")
		}
		return out
	}
	out, err := exec.Command(cmd).Output()
	if err != nil {
		log.Fatal(err)
	}
	return out
}
