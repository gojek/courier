package com.gojek.courier.example.di

import android.content.Context
import com.gojek.courier.Courier
import com.gojek.courier.example.ui.ConversationActivity
import com.gojek.courier.example.ui.MainActivity
import com.gojek.mqtt.client.MqttClient
import dagger.BindsInstance
import dagger.Component
import javax.inject.Singleton

@Singleton
@Component(modules = [CourierModule::class])
interface CourierComponent {
    fun courier(): Courier
    fun mqttClient(): MqttClient

    fun inject(activity: MainActivity)
    fun inject(activity: ConversationActivity)

    @Component.Builder
    interface Builder {
        @BindsInstance
        fun context(context: Context): Builder

        fun build(): CourierComponent
    }
}