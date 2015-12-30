package com.smartreception.services;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutionException;

import microsoft.aspnet.signalr.client.Action;
import microsoft.aspnet.signalr.client.SignalRFuture;
import microsoft.aspnet.signalr.client.hubs.HubConnection;
import microsoft.aspnet.signalr.client.hubs.HubProxy;
import microsoft.aspnet.signalr.client.hubs.SubscriptionHandler;
import microsoft.aspnet.signalr.client.hubs.SubscriptionHandler1;


/**
 * Created by itse4 on 12/29/2015.
 */
public class SignalRService extends Service {

    private final String mEndPoint = "";
    private final String mHubName = "";
    private final String mGroupName = "";

    private HubConnection mConnection;
    private HubProxy mHubProxy;
    private SignalRFuture<Void> mAwaitConnection;

    private boolean mDisconnect = false;


    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        // initialize the hub
        mConnection = new HubConnection(mEndPoint);

        // create the proxy
        mHubProxy = mConnection.createHubProxy(mHubName);

        // Wait for 5 seconds, then start the connection
        new Timer(false).schedule(mConnectTask, 5000);

        // Deal with connection closed event, re-connect it after 5 seconds
        mConnection.closed(mConnectionClosed);

        // Register signalR server event
        mHubProxy.on("", mEventReceiver, String.class);
    }


    private SubscriptionHandler1<String> mEventReceiver = new SubscriptionHandler1<String>() {
        @Override
        public void run(String s) {

        }
    };

    /**
     * Runnable instance to work with connection closed events.
     *
     * @Runnable
     */
    private Runnable mConnectionClosed = new Runnable() {
        @Override
        public void run() {
            if (!mDisconnect)
                new Timer(false).schedule(mConnectTask, 5000);
        }
    };

    /**
     * Timer task intended to establish the connection to the SignalR server.
     *
     * @Runnable
     */
    private TimerTask mConnectTask = new TimerTask() {
        @Override
        public void run() {
            if (mConnection != null) {
                mConnection.start().done(new Action<Void>() {
                    @Override
                    public void run(Void aVoid) throws Exception {
                        registerConnection();
                    }
                });
            }
        }
    };

    /**
     * Register the client with SignalR hub.
     * Start mConnectTask to invoke this method.
     * Don't call this directly.
     *
     * @return {Void} null
     */
    private void registerConnection() {
        try {
            /**
             * Aquire the connection from server
             */
            mAwaitConnection.get();
            /**
             * Register the device into SignalR group
             */
            mHubProxy.invoke("RegisterClient", mGroupName);
        } catch (InterruptedException ex) {
            ex.printStackTrace();
        } catch (ExecutionException ex) {
            ex.printStackTrace();
        }
    }

    /**
     * Disconnect from the server
     * @return {Void} null
     */
    public void disconnect() {
        mConnection.disconnect();
    }

}
