package com.smartreception;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by itse4 on 11/23/2015.
 */
public class SmartReceptionModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mReactContext;

    private final BroadcastReceiver receiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            boolean isConnected = false;
            ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
            if (activeNetwork != null) {
                if (activeNetwork.getType() == ConnectivityManager.TYPE_WIFI)
                    isConnected = true;
                if (activeNetwork.getType() == ConnectivityManager.TYPE_MOBILE)
                    isConnected = true;
            }

            WritableMap params = Arguments.createMap();
            params.putBoolean("isConnected", isConnected);
            mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("connectionchanged", params);
        }
    };

    public SmartReceptionModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SmartReception";
    }

    @ReactMethod
    public void startNetworkMonitoring() {
        mReactContext.registerReceiver(receiver, new IntentFilter("android.net.conn.CONNECTIVITY_CHANGE"));
    }

    @ReactMethod
    public void stopNetworkMonitoring() {
        mReactContext.unregisterReceiver(receiver);
    }


}
