package com.gojek.courier.example.data

import com.gojek.courier.QoS
import com.gojek.courier.annotation.Data
import com.gojek.courier.annotation.Path
import com.gojek.courier.annotation.Send
import com.gojek.courier.annotation.Subscribe
import com.gojek.courier.example.data.model.ChatMessage
import io.reactivex.Observable

interface ChatService {
    @Send(topic = "chat/{id}/send")
    fun send(@Path("id") id: String, @Data message: ChatMessage)

    @Subscribe(topic = "chat/{id}/receive", qos = QoS.ZERO)
    fun receive(@Path("id") id: String) : Observable<ChatMessage>
}