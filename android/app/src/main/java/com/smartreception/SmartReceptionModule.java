package com.smartreception;

import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Vibrator;
import android.support.v4.app.NotificationCompat;

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
    private NotificationManager mNotifyManager;
    private NotificationCompat.Builder mBuilder;
    private int id = 1;

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

    @ReactMethod
    public void startMeetingProgress() {
        mNotifyManager = (NotificationManager) mReactContext.getSystemService(Context.NOTIFICATION_SERVICE);
        mBuilder = new NotificationCompat.Builder(mReactContext);
        mBuilder.setContentTitle("Ongoing Meeting")
                .setContentText("Meeting in progress")
                .setSmallIcon(R.drawable.ic_launcher);

        new MeetingProgress().execute();
    }


    @ReactMethod
    public  void createNotification(String title, String message) {
        mNotifyManager = (NotificationManager) mReactContext.getSystemService(Context.NOTIFICATION_SERVICE);
        mBuilder = new NotificationCompat.Builder(mReactContext);
        mBuilder.setContentTitle(title)
                .setContentText(message)
                .setSmallIcon(R.drawable.ic_launcher);

        mNotifyManager.notify(100, mBuilder.build());
    }

    @ReactMethod
    public void notifySound() {
        try {
            Uri notification = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            Ringtone r = RingtoneManager.getRingtone(mReactContext, notification);
            r.play();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @ReactMethod
    public void vibrate(int milliseconds) {
        ((Vibrator)mReactContext.getSystemService(Context.VIBRATOR_SERVICE)).vibrate(milliseconds);
    }

    private class MeetingProgress extends AsyncTask<Void, Integer, Integer> {

        @Override
        protected void onPreExecute() {
            super.onPreExecute();

            // Displays the progress bar for the first time.
            mBuilder.setProgress(100, 0, false);
            mNotifyManager.notify(id, mBuilder.build());
        }

        @Override
        protected void onProgressUpdate(Integer... values) {
            // Update progress
            mBuilder.setProgress(100, values[0], false);
            mNotifyManager.notify(id, mBuilder.build());
            super.onProgressUpdate(values);
        }

        @Override
        protected Integer doInBackground(Void... params) {
            int i;
            for (i = 0; i <= 100; i += 5) {
                // Sets the progress indicator completion percentage
                publishProgress(Math.min(i, 100));
                try {
                    // Sleep for 5 seconds
                    Thread.sleep(2 * 1000);
                } catch (InterruptedException e) {
                }
            }
            return null;
        }

        @Override
        protected void onPostExecute(Integer result) {
            super.onPostExecute(result);
            mBuilder.setContentText("Download complete");
            // Removes the progress bar
            mBuilder.setProgress(0, 0, false);
            mNotifyManager.notify(id, mBuilder.build());
        }
    }


}
