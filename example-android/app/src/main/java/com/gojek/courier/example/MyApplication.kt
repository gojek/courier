package com.gojek.courier.example

import android.app.Application
import com.facebook.stetho.Stetho
import com.gojek.courier.example.di.CourierComponent
import com.gojek.courier.example.di.DaggerCourierComponent
import timber.log.Timber

class MyApplication: Application() {
    lateinit var courierComponent: CourierComponent

    override fun onCreate() {
        super.onCreate()

        Timber.plant(Timber.DebugTree())
        Stetho.initializeWithDefaults(this)
        initDependencies()
    }

    private fun initDependencies() {
        courierComponent = DaggerCourierComponent.builder()
            .context(applicationContext)
            .build()
    }
}