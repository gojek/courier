package message

type Message struct {
	From    string `json:"from"`
	Message string `json:"message"`
	To      string `json:"to"`
}
