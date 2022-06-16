package config

import (
	"io/ioutil"
	"log"
	"time"

	"gopkg.in/yaml.v3"
)

type Config struct {
	Host          string        `yaml:"HOST"`
	Port          int           `yaml:"PORT"`
	Username      string        `yaml:"USERNAME"`
	Password      string        `yaml:"PASSWORD"`
	KeepAlive     time.Duration `yaml:"KEEPALIVE"`
	WriteTimeout  time.Duration `yaml:"WRITE_TIMEOUT"`
	Autoreconnect bool          `yaml:"AUTO_RECONNECT"`
}

func Cfg() Config {
	yamlFile, err := ioutil.ReadFile("conf.yaml")
	if err != nil {
		log.Printf("yamlFile.Get err   #%v ", err)
	}

	c := Config{}
	err = yaml.Unmarshal(yamlFile, &c)
	if err != nil {
		log.Fatalf("Unmarshal failed error: %v", err)
	}

	log.Printf("Using config: %+v", c)
	return c
}
