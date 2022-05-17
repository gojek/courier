package com.gojek.courier.example.di

import android.content.Context
import com.gojek.courier.Courier
import com.gojek.courier.example.data.ChatService
import com.gojek.courier.logging.ILogger
import com.gojek.courier.messageadapter.gson.GsonMessageAdapterFactory
import com.gojek.courier.streamadapter.rxjava2.RxJava2StreamAdapterFactory
import com.gojek.mqtt.auth.Authenticator
import com.gojek.mqtt.client.MqttClient
import com.gojek.mqtt.client.config.ExperimentConfigs
import com.gojek.mqtt.client.config.PersistenceOptions
import com.gojek.mqtt.client.config.v3.MqttV3Configuration
import com.gojek.mqtt.client.factory.MqttClientFactory
import com.gojek.mqtt.event.EventHandler
import com.gojek.mqtt.event.MqttEvent
import com.gojek.mqtt.model.AdaptiveKeepAliveConfig
import com.gojek.mqtt.model.MqttConnectOptions
import com.gojek.workmanager.pingsender.WorkManagerPingSenderConfig
import com.gojek.workmanager.pingsender.WorkPingSenderFactory
import dagger.Module
import dagger.Provides
import timber.log.Timber
import javax.inject.Singleton

@Module
class CourierModule {
    @Provides
    fun provideChatService(
        courier: Courier
    ): ChatService {
        return courier.create()
    }

    @Provides
    fun provideCourier(
        courierConfig: Courier.Configuration
    ): Courier {
        return Courier(courierConfig)
    }

    @Provides
    fun provideCourierConfiguration(
        mqttClient: MqttClient,
        courierLogger: ILogger
    ): Courier.Configuration {
        return Courier.Configuration(
            client = mqttClient,
            streamAdapterFactories = listOf(RxJava2StreamAdapterFactory()),
            messageAdapterFactories = listOf(GsonMessageAdapterFactory()),
            logger = courierLogger
        )
    }

    @Provides
    @Singleton
    fun provideMqttClient(
        context: Context,
        mqttConfiguration: MqttV3Configuration
    ): MqttClient {
        return MqttClientFactory.create(
            context = context,
            mqttConfiguration = mqttConfiguration
        )
    }

    @Provides
    fun provideMqttV3Configuration(
        context: Context,
        logger: ILogger,
        eventHandler: EventHandler,
        authenticator: Authenticator
    ): MqttV3Configuration {
        return MqttV3Configuration(
            socketFactory = null,
            logger = logger,
            eventHandler = eventHandler,
            authenticator = authenticator,
            mqttInterceptorList = emptyList(),
            persistenceOptions = PersistenceOptions.PahoPersistenceOptions(100, false),
            experimentConfigs = ExperimentConfigs(
                adaptiveKeepAliveConfig = AdaptiveKeepAliveConfig(
                    lowerBoundMinutes = 1,
                    upperBoundMinutes = 9,
                    stepMinutes = 2,
                    optimalKeepAliveResetLimit = 10,
                    pingSender = WorkPingSenderFactory.createAdaptiveMqttPingSender(context, WorkManagerPingSenderConfig())
                ),
                inactivityTimeoutSeconds = 45,
                activityCheckIntervalSeconds = 30,
                incomingMessagesTTLSecs = 60,
                incomingMessagesCleanupIntervalSecs = 10,
            ),
            pingSender = WorkPingSenderFactory.createMqttPingSender(context, WorkManagerPingSenderConfig())
        )
    }

    @Provides
    fun getLogger() = object : ILogger {
        override fun v(tag: String, msg: String) {
            Timber.tag("Courier").v(msg)
        }

        override fun v(tag: String, msg: String, tr: Throwable) {
            Timber.tag("Courier").v(tr, msg)
        }

        override fun d(tag: String, msg: String) {
            Timber.tag("Courier").d(msg)
        }

        override fun d(tag: String, msg: String, tr: Throwable) {
            Timber.tag("Courier").d(tr, msg)
        }

        override fun i(tag: String, msg: String) {
            Timber.tag("Courier").i(msg)
        }

        override fun i(tag: String, msg: String, tr: Throwable) {
            Timber.tag("Courier").i(tr, msg)
        }

        override fun w(tag: String, msg: String) {
            Timber.tag("Courier").w(msg)
        }

        override fun w(tag: String, msg: String, tr: Throwable) {
            Timber.tag("Courier").w(tr, msg)
        }

        override fun w(tag: String, tr: Throwable) {
            Timber.tag("Courier").d(tr)
        }

        override fun e(tag: String, msg: String) {
            Timber.tag("Courier").e(msg)
        }

        override fun e(tag: String, msg: String, tr: Throwable) {
            Timber.tag("Courier").e(tr, msg)
        }
    }

    @Provides
    fun provideEventHandler() = object : EventHandler {
        override fun onEvent(mqttEvent: MqttEvent) {
            Timber.tag("Courier").d("Received event: $mqttEvent")
        }
    }

    @Provides
    fun provideAuthenticator() = object : Authenticator {
        override fun authenticate(
            connectOptions: MqttConnectOptions,
            forceRefresh: Boolean
        ): MqttConnectOptions {
            return connectOptions
        }
    }
}