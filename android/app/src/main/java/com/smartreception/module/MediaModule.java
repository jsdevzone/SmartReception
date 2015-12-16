package com.smartreception.module;

import android.app.Activity;
import android.content.Intent;
import android.media.MediaRecorder;
import android.os.AsyncTask;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.MultipartBuilder;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;

import org.json.JSONObject;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


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
        mFileName += "/SmartReception";
    }

    @Override
    public String getName() {
        return "MediaHelper";
    }

    @ReactMethod
    public void startRecording(String meetingId) {

        File folder = new File(mFileName += "/" + meetingId);
        if (!folder.exists())
            folder.mkdirs();

        try {
            mediaRecorder = new MediaRecorder();
            mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
            mediaRecorder.setOutputFile(mFileName += "/record.3gp");
            mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
            mediaRecorder.prepare();
            mediaRecorder.start();
        } catch (IOException e) {
        }

    }

    @ReactMethod
    public void stopRecording() {
        if (mediaRecorder != null) {
            mediaRecorder.stop();
            mediaRecorder.release();
            mediaRecorder = null;
        }
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


    @ReactMethod
    public void uploadFile(String uri, String meetingId, String name, String desc) {
        try {
            File sourceFile = new File(uri);
            OkHttpClient client = new OkHttpClient();
            RequestBody requestBody = new MultipartBuilder()
                    .type(MultipartBuilder.FORM)
                    .addFormDataPart("BookedMeetingId", meetingId)
                    .addFormDataPart("Name", name)
                    .addFormDataPart("Description", desc)
                    .addFormDataPart("file", sourceFile.getName(), RequestBody.create(MediaType.parse("image/jpg"), sourceFile))
                    .build();

            Request request = new Request.Builder()
                    .url("http://192.168.4.77/SmartReception.Service/api/meeting/attachments/upload")
                    .post(requestBody)
                    .build();

            Response response = client.newCall(request).execute();
            JSONObject responseString = new JSONObject(response.body().string());

        } catch (Exception ex) {

        }
    }
}
