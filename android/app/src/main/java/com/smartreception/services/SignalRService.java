package com.smartreception.services;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.IBinder;
import android.os.PowerManager;
import android.preference.PreferenceManager;
import android.util.Log;
import android.widget.Toast;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutionException;

import de.greenrobot.event.EventBus;
import microsoft.aspnet.signalr.client.Action;
import microsoft.aspnet.signalr.client.SignalRFuture;
import microsoft.aspnet.signalr.client.hubs.HubConnection;
import microsoft.aspnet.signalr.client.hubs.HubProxy;
import microsoft.aspnet.signalr.client.hubs.SubscriptionHandler;
import microsoft.aspnet.signalr.client.hubs.SubscriptionHandler1;
public class SignalRService extends Service {

    android.os.Handler handler = new android.os.Handler() {
    };

    public String _msg;

    private EventBus bus = EventBus.getDefault();


    @Override
    public void onCreate() {
        super.onCreate();

        mSharedPreferences = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());

        Log.d("service", "Service created....");
    }

    private SharedPreferences mSharedPreferences;

    @SuppressWarnings("deprecation")
    @Override
    public void onStart(Intent intent, int startId) {


        super.onStart(intent, startId);


        Log.d("service", "Service start....");
        Toast.makeText(this, "Service Start", Toast.LENGTH_LONG).show();

        final String server = "http://192.168.4.77/SmartReception.Service/";
        HubConnection connection = null;
        try{
            //String server = "http://webservices.egovservice.com/Feedback/";
            connection = new HubConnection(server);
        }catch (Exception ex) {
            ex.printStackTrace();
        }


        HubProxy proxy = connection.createHubProxy("SmartReceptionHub");

        Log.d("service", "proxy created");

        SignalRFuture<Void> awaitConnection = connection.start();
        try {

            awaitConnection.get();

            //proxy.invoke("Send", "Android", "Hello world!").get();
            proxy.invoke("Connect", "1");

            Log.d("service", "invoked");

        } catch (InterruptedException e) {
            // TODO Auto-generated catch block

            Log.d("qqq", e.toString());
            e.printStackTrace();
        } catch (ExecutionException e) {
            // TODO Auto-generated catch block
            Log.d("qqq", e.toString());
            e.printStackTrace();
        }

        final SignalRService service = this;



    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent arg0) {
        Toast.makeText(this.getApplicationContext(), "Msg recived" + _msg, Toast.LENGTH_LONG).show();
        return null;
    }

    public void DisplayToast() {
        Toast.makeText(this.getApplicationContext(), "Msg recived" + _msg, Toast.LENGTH_LONG).show();

    }

    private Runnable toast = new Runnable() {
        public void run() {
            DisplayToast();
            stopSelf();
        }
    };

    private void unlock() {
        PowerManager powermanager = ((PowerManager) getApplicationContext().getSystemService(Context.POWER_SERVICE));
        PowerManager.WakeLock wakeLock = powermanager.newWakeLock(PowerManager.SCREEN_BRIGHT_WAKE_LOCK | PowerManager.ACQUIRE_CAUSES_WAKEUP, "tag");
        wakeLock.acquire();
    }
}
