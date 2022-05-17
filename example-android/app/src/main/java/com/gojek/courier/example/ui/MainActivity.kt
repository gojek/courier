package com.gojek.courier.example.ui

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.gojek.courier.Message
import com.gojek.courier.QoS
import com.gojek.courier.example.MyApplication
import com.gojek.courier.example.R
import com.gojek.mqtt.client.MqttClient
import com.gojek.mqtt.model.KeepAlive
import com.gojek.mqtt.model.MqttConnectOptions
import com.gojek.mqtt.model.ServerUri
import kotlinx.android.synthetic.main.activity_main.brokerIP
import kotlinx.android.synthetic.main.activity_main.brokerPort
import kotlinx.android.synthetic.main.activity_main.clientId
import kotlinx.android.synthetic.main.activity_main.connect
import kotlinx.android.synthetic.main.activity_main.disconnect
import kotlinx.android.synthetic.main.activity_main.password
import kotlinx.android.synthetic.main.activity_main.roomCode
import kotlinx.android.synthetic.main.activity_main.username
import java.util.UUID
import javax.inject.Inject

class MainActivity : AppCompatActivity() {

    @Inject
    internal lateinit var mqttClient: MqttClient

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        (applicationContext as MyApplication).courierComponent.inject(this)

        connect.setOnClickListener {
            var clientId = clientId.text.toString()
            if(clientId.isEmpty()) {
                clientId = UUID.randomUUID().toString()
            }
            var username = username.text.toString()
            if(username.isEmpty()) {
                username = UUID.randomUUID().toString()
            }
            val password = password.text.toString()
            var brokerIP = brokerIP.text.toString()
            if(brokerIP.isEmpty()) {
                brokerIP = "broker.mqttdashboard.com"
            }
            var port = 1883
            if(brokerPort.text.toString().isNotEmpty()) {
                port = Integer.parseInt(brokerPort.text.toString())
            }
            connectMqtt(clientId, username, password, brokerIP, port)
            startConversationActivity(username, roomCode.text.toString())
        }

        disconnect.setOnClickListener {
            mqttClient.disconnect()
        }
    }

    private fun connectMqtt(clientId: String, username: String, password: String, ip: String, port: Int) {
        val connectOptions = MqttConnectOptions(
            serverUris = listOf(ServerUri(ip, port, if (port == 443) "ssl" else "tcp")),
            clientId = clientId,
            username = username,
            keepAlive = KeepAlive(
                timeSeconds = 30
            ),
            isCleanSession = false,
            password = password
        )

        mqttClient.connect(connectOptions)
    }

    private fun startConversationActivity(username: String, roomCode: String) {
        val intent = Intent(this, ConversationActivity::class.java)
        intent.putExtra("username", username)
        intent.putExtra("roomCode", roomCode)
        startActivity(intent)
    }
}