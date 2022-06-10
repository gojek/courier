package main

import (
	"bufio"
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"os/signal"
	"strings"

	"github.com/gojek/courier-go"

	"example-go/config"
	"example-go/decoder"
)

var subscriptionTopic string
var publishTopic string
var cfg config.Config

func init() {
	cfg = config.Cfg()

	flag.StringVar(&subscriptionTopic, "s", cfg.SubscribeTopic, "Subscription topic")
	flag.StringVar(&publishTopic, "p", cfg.PublishTopic, "Publish topic")
}

func main() {
	flag.Parse()

	opts := []courier.ClientOption{
		courier.WithTCPAddress(cfg.Host, uint16(cfg.Port)),
		courier.WithUsername(cfg.Username),
		courier.WithPassword(cfg.Password),
		courier.WithKeepAlive(cfg.KeepAlive),
		courier.WithWriteTimeout(cfg.WriteTimeout),
		courier.WithAutoReconnect(cfg.Autoreconnect),
		courier.WithCustomDecoder(decoder.DecoderFunc),
	}

	client, err := courier.NewClient(opts...)
	if err != nil {
		log.Fatal(err)
	}

	if err = client.Start(); err != nil {
		log.Fatal(err)
	}

	if err := client.Subscribe(context.Background(), subscriptionTopic, subscribeHandler); err != nil {
		log.Fatal(err)
	}
	go publishLoop(client)

	ch := make(chan os.Signal)
	signal.Notify(ch, os.Interrupt, os.Kill)

	<-ch
}

func publishLoop(c *courier.Client) {
	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Print("-> ")
		text, _ := reader.ReadString('\n')
		// convert CRLF to LF
		text = strings.Replace(text, "\n", "", -1)
		if err := c.Publish(context.Background(), publishTopic, text); err != nil {
			log.Println(err)
		}

	}
}

func subscribeHandler(_ context.Context, _ courier.PubSub, message *courier.Message) {
	var msg string
	if err := message.DecodePayload(&msg); err != nil {
		log.Println(err)
	}
	fmt.Printf("Message received: %v\n", msg)
}
