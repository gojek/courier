package com.gojek.courier.example.ui.adapter

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.RecyclerView.ViewHolder
import com.gojek.courier.example.R
import com.gojek.courier.example.data.model.ChatMessage

class ConversationAdapter : RecyclerView.Adapter<ConversationViewHolder>() {
    private val messageList = mutableListOf<ChatMessage>()
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ConversationViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_chat_message, parent, false)
        return ConversationViewHolder(view)
    }

    override fun onBindViewHolder(holder: ConversationViewHolder, position: Int) {
        holder.bind(messageList[position])
    }

    override fun getItemCount(): Int {
        return messageList.size
    }

    fun updateMessageList(message: ChatMessage) {
        messageList.add(message)
        notifyDataSetChanged()
    }
}

class ConversationViewHolder(private val view: View) : ViewHolder(view) {
    fun bind(message: ChatMessage) {
        view.findViewById<TextView>(R.id.message).text = "${message.from}: ${message.message}"
    }
}