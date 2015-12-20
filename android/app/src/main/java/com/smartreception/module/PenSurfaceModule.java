package com.smartreception.module;

import android.app.Activity;
import android.graphics.Color;
import android.os.Environment;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.samsung.android.sdk.pen.SpenSettingEraserInfo;
import com.samsung.android.sdk.pen.SpenSettingPenInfo;
import com.samsung.android.sdk.pen.engine.SpenSurfaceView;
import com.smartreception.PenSurface;
import com.smartreception.PenSurfaceManager;

/**
 * Created by itse4 on 12/20/2015.
 */
public class PenSurfaceModule extends ReactContextBaseJavaModule {

    private  PenSurfaceManager mPenSurfaceManager;

    public PenSurfaceModule(ReactApplicationContext reactContext, PenSurfaceManager manager) {
        super(reactContext);
        mPenSurfaceManager = manager;
    }

    @Override
    public String getName() {
        return "PenSurface";
    }

    @ReactMethod
    public void clear() {

    }

    @ReactMethod
    public void switchToPenMode() {
        SpenSettingPenInfo penInfo = new SpenSettingPenInfo();
        penInfo.color = Color.BLUE;
        penInfo.size = 10;
        mPenSurfaceManager.getPenSurface().setPenSettingInfo(penInfo);
        mPenSurfaceManager.getPenSurface().setToolTypeAction(SpenSurfaceView.TOOL_SPEN, SpenSurfaceView.ACTION_STROKE);
    }

    @ReactMethod
    public void switchToEraserMode() {
        SpenSettingEraserInfo eraserInfo = new SpenSettingEraserInfo();
        eraserInfo.size = 30;
        mPenSurfaceManager.getPenSurface().setEraserSettingInfo(eraserInfo);
        mPenSurfaceManager.getPenSurface().setToolTypeAction(SpenSurfaceView.TOOL_SPEN, SpenSurfaceView.ACTION_ERASER);
    }

}
