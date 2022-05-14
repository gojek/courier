package com.gojek.courier.example.ui

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.gojek.courier.example.MyApplication
import com.gojek.courier.example.R
import com.gojek.courier.example.data.ChatService
import com.gojek.courier.example.data.model.ChatMessage
import com.gojek.courier.example.ui.adapter.ConversationAdapter
import io.reactivex.disposables.Disposable
import kotlinx.android.synthetic.main.activity_conversation.conversation
import kotlinx.android.synthetic.main.activity_conversation.messageText
import kotlinx.android.synthetic.main.activity_conversation.send
import javax.inject.Inject

class ConversationActivity : AppCompatActivity() {

    @Inject
    internal lateinit var chatService: ChatService

    private lateinit var disposable: Disposable

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_conversation)
        (applicationContext as MyApplication).courierComponent.inject(this)

        val conversationAdapter = ConversationAdapter()
        conversation.adapter = conversationAdapter
        conversation.layoutManager = LinearLayoutManager(this)

        val username = intent.getStringExtra("username")!!
        val roomCode = intent.getStringExtra("roomCode")!!

        send.setOnClickListener {
            val message = ChatMessage(username, roomCode, messageText.text.toString())
            conversationAdapter.updateMessageList(message)
            chatService.send(username, message)
            messageText.text = null
        }

        disposable = chatService.receive(roomCode).subscribe { message ->
            conversationAdapter.updateMessageList(message)
        }
    }

    override fun onDestroy() {
        disposable.dispose()
        super.onDestroy()
    }
}