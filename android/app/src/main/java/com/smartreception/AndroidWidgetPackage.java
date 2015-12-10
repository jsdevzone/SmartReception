package com.smartreception;

import android.app.Activity;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.smartreception.module.MediaModule;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by itse4 on 11/16/2015.
 */
public class AndroidWidgetPackage implements ReactPackage {

    private Activity mActivity;
    public AndroidWidgetPackage(Activity activity) {
        mActivity = activity;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
        return Arrays.<ViewManager>asList(
                new ReactCalendarManager()
        );
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
        return Arrays.<NativeModule>asList(
                new SmartReceptionModule(reactApplicationContext),
                new MediaModule(reactApplicationContext, mActivity)
        );
    }
}
