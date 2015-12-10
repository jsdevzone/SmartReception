package com.smartreception.module;

import android.app.Activity;
import android.content.Intent;
import android.media.MediaRecorder;
import android.os.Environment;
import android.provider.MediaStore;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;

/**
 * Created by itse4 on 12/8/2015.
 */
public class MediaModule extends ReactContextBaseJavaModule {

    private Activity mActivity;
    private MediaRecorder mediaRecorder;
    private static String mFileName = null;
    private ReactApplicationContext mReactContext;
    public static final int REQUEST_IMAGE_CAPTURE = 1;

    public MediaModule(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        mReactContext = reactContext;
        mActivity = activity;

        mFileName = Environment.getExternalStorageDirectory().getAbsolutePath();
        mFileName += "/audiorecordtest.3gp";
    }

    @Override
    public String getName() {
        return "MediaHelper";
    }

    @ReactMethod
    public void startRecording() {
        mediaRecorder = new MediaRecorder();
        mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
        mediaRecorder.setOutputFile(mFileName);
        mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
        try {
            mediaRecorder.prepare();
        } catch (IOException e) {
        }
        mediaRecorder.start();
    }

    @ReactMethod
    public void stopRecording() {
        mediaRecorder.stop();
        mediaRecorder.release();
        mediaRecorder = null;
    }

    @ReactMethod
    public void showCamera() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(mReactContext.getPackageManager()) != null) {
            mActivity.startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }

    @ReactMethod
    public void showGallery() {
        Intent photoPickerIntent = new Intent(Intent.ACTION_PICK);
        photoPickerIntent.setType("image/*");
        mActivity.startActivityForResult(photoPickerIntent, 2);
    }

}
