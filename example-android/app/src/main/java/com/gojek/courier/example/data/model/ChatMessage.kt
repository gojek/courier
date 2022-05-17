package com.gojek.courier.example.data.model

import androidx.annotation.Keep

@Keep
data class ChatMessage(val from: String, val to: String, val message: String)
