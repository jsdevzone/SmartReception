package com.smartreception.eid;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.os.IBinder;
import android.smartcardio.TerminalFactory;
import android.smartcardio.ipc.CardService;
import android.smartcardio.ipc.IBackendIPC;
import android.smartcardio.ipc.ICardService;
import android.util.Log;

import java.util.List;

/**
 * Created by itse4 on 1/11/2016.
 */
public class CustomCardService implements ICardService {
    private static final String TAG = "HidglobalCardService";
    private final String intentAction = "com.hidglobal.cardreadermanager.backendipc";
    private boolean isAvailable;
    private Context parent;
    public IBackendIPC cardService;
    public CardServiceConnection cardConnection;
    private static ICardService service;

    public static ICardService getInstance(Context parent) {
        if (service == null) {
            service = new CustomCardService(parent);
        }

        return service;
    }

    private CustomCardService(Context parent) {
        this.parent = parent;
        this.bindToService();
    }



    public Intent convertToExplicitIntent(Intent intent, Context context) {
        PackageManager packageManager = context.getPackageManager();
        List<ResolveInfo> resolveInfoList = packageManager.queryIntentServices(intent, 0);
        if(resolveInfoList == null || resolveInfoList.size() != 1) {
            return null;
        }
        ResolveInfo serviceInfo = resolveInfoList.get(0);

        ComponentName componentName = new ComponentName(serviceInfo.serviceInfo.packageName, serviceInfo.serviceInfo.name);
        Intent explicit = new Intent(intent);
        explicit.setComponent(componentName);
        return explicit;
    }

    public void bindToService() {
        try {
            this.cardConnection = new CardServiceConnection();

            Intent implicit = new Intent();
            implicit.setAction("com.hidglobal.cardreadermanager.backendipc");
            Context context = parent.getApplicationContext();
            Intent intent = convertToExplicitIntent(implicit, context);

            //Intent intent = new Intent(parent, Class.forName("com.hidglobal.cardreadermanager.backendipc"));
            this.parent.startService(intent);
            this.isAvailable = this.parent.bindService(intent, this.cardConnection, 1);
            if (this.isAvailable) {
                Log.d("HidglobalCardService", "Bound to Service. Action:com.hidglobal.cardreadermanager.backendipc");
            } else {
                Log.e("HidglobalCardService", "Unable to bind to Service. Action:com.hidglobal.cardreadermanager.backendipc");
            }
        } catch (Exception ex) {
        }
    }

    public void releaseService() {
        if (this.cardConnection != null) {
            this.parent.unbindService(this.cardConnection);
            this.cardConnection = null;
        }

        Log.d("HidglobalCardService", "releaseService() unbound");
    }

    public TerminalFactory getTerminalFactory() throws Exception {
        TerminalFactory factory = null;
        if (!this.isAvailable) {
            Log.e("HidglobalCardService", "No connection to Hid Global Card Service");
            throw new Exception("No connection to Hid Global Card Service");
        } else {
            factory = TerminalFactory.getDefault();
            factory.setCardService(this.cardService);
            return factory;
        }
    }

    class CardServiceConnection implements ServiceConnection {
        CardServiceConnection() {
        }

        public void onServiceConnected(ComponentName className, IBinder binder) {
            CustomCardService.this.cardService = IBackendIPC.Stub.asInterface(binder);
            Log.d("HidglobalCardService", "onServiceConnected");
        }

        public void onServiceDisconnected(ComponentName className) {
            CustomCardService.this.cardService = null;
            Log.d("HidglobalCardService", "onServiceDisconnected");
        }
    }
}
