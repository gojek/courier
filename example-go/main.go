package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"os/signal"

	"github.com/gojek/courier-go"

	"example-go/config"
	imsg "example-go/message"
)

const (
	subscriptionTopic = "chat/+/send"
	publishTopicFmt   = "chat/%s/receive"
)

var (
	brokerHost string
	brokerPort int

	cfg config.Config
)

func init() {
	cfg = config.Cfg()

	flag.StringVar(&brokerHost, "h", cfg.Host, "Broker Host")
	flag.IntVar(&brokerPort, "p", cfg.Port, "Broker Port")
}

func main() {
	flag.Parse()

	opts := []courier.ClientOption{
		courier.WithTCPAddress(brokerHost, uint16(brokerPort)),
		courier.WithUsername(cfg.Username),
		courier.WithPassword(cfg.Password),
		courier.WithKeepAlive(cfg.KeepAlive),
		courier.WithWriteTimeout(cfg.WriteTimeout),
		courier.WithAutoReconnect(cfg.Autoreconnect),
	}

	client, err := courier.NewClient(opts...)
	if err != nil {
		log.Fatal(err)
	}

	if err = client.Start(); err != nil {
		log.Fatal(err)
	}

	if err := client.Subscribe(context.Background(), subscriptionTopic, subscribeHandler, courier.QOSOne); err != nil {
		log.Fatal(err)
	}

	ch := make(chan os.Signal)
	signal.Notify(ch, os.Interrupt, os.Kill)

	<-ch
}

func subscribeHandler(ctx context.Context, c courier.PubSub, message *courier.Message) {
	var msg imsg.Message
	if err := message.DecodePayload(&msg); err != nil {
		log.Println(err)
		return
	}

	log.Printf("Message received: %+v\n", msg)

	go publishMessage(ctx, c, msg)
}

func publishMessage(ctx context.Context, c courier.PubSub, msg imsg.Message) {
	if err := c.Publish(ctx, fmt.Sprintf(publishTopicFmt, msg.To), msg, courier.QOSOne); err != nil {
		log.Printf("Failed to publish message: %+v", msg)
		return
	}
	log.Printf("Successfully published message: %+v", msg)
}
