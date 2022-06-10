package decoder

import (
	"io"
	"io/ioutil"
	"reflect"

	"github.com/gojek/courier-go"
)

func DecoderFunc(r io.Reader) courier.Decoder {
	return &customDecoder{r: r}
}

type customDecoder struct {
	r io.Reader
}

func (cd *customDecoder) Decode(v interface{}) (err error) {
	buf, err := ioutil.ReadAll(cd.r)
	if err != nil {
		return err
	}

	val := reflect.ValueOf(v)
	val.Elem().Set(reflect.ValueOf(string(buf)))

	return
}
