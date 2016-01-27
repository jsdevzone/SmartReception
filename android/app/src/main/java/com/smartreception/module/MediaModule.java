package com.smartreception.module;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.os.AsyncTask;
import android.os.Environment;
import android.provider.MediaStore;
import android.smartcardio.CardException;
import android.smartcardio.CommandAPDU;
import android.telecom.Call;
import android.util.Log;
import android.view.SoundEffectConstants;
import android.webkit.MimeTypeMap;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.smartreception.eid.EidPublicData;
import com.smartreception.eid.PCSCReader;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.MultipartBuilder;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;


import org.codehaus.jackson.map.ObjectMapper;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;


/**
 * Created by itse4 on 12/8/2015.
 */
public class MediaModule extends ReactContextBaseJavaModule {

    private Activity mActivity;
    private MediaRecorder mediaRecorder;
    private static String mFileName = null;
    private ReactApplicationContext mReactContext;
    public static final int REQUEST_IMAGE_CAPTURE = 1;

    private MediaPlayer mediaPlayer;

    private String currentRecordingFileName = null;
    /**
     * ******************************************
     */
    private static final String MANAGEMENT_PACKAGE = "com.hidglobal.cardreadermanager";
    private static final int REQUEST_APP_INSTALL = 48879;
    private static final String MANAGEMENT_APP = "CardReaderManager.apk";

    private PCSCReader mReader;

    public static final CommandAPDU SELECT_MASTER_FILE =
            new CommandAPDU(new byte[]{0x00, (byte) 0xA4, 0x00, 0x00});

    public static final CommandAPDU SELECT_FILE_EEEE =
            new CommandAPDU(new byte[]{0x00, (byte) 0xA4, 0x01, 0x0C, 0x02, (byte) 0xEE, (byte) 0xEE});

    public static final CommandAPDU SELECT_FILE_5044 =
            new CommandAPDU(new byte[]{0x00, (byte) 0xA4, 0x02, 0x04, 0x02, (byte) 0x50, (byte) 0x44});

    /**
     * *********************************************
     */

    public MediaModule(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        mReactContext = reactContext;
        mActivity = activity;

        try {
            this.mReader = new PCSCReader(reactContext);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        mFileName = Environment.getExternalStorageDirectory().getAbsolutePath();
        mFileName += "/SmartReception";
    }

    @Override
    public String getName() {
        return "MediaHelper";
    }

    @ReactMethod
    public void playClickSound() {
        AudioManager audioManager = (AudioManager) mActivity.getSystemService(Context.AUDIO_SERVICE);
        audioManager.playSoundEffect(SoundEffectConstants.CLICK);
    }

    @ReactMethod
    public void playFromNetwork(String url) {
        try {
            if (mediaPlayer == null)
                mediaPlayer = new MediaPlayer();


            mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
            mediaPlayer.setDataSource(url);
            mediaPlayer.prepare(); // might take long! (for buffering, etc)
            mediaPlayer.start();
            mediaPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mp) {
                    mediaPlayer.stop();
                    mediaPlayer.reset();
                    mReactContext
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("playbackfinished", null);
                }
            });
        } catch (Exception ex) {
            mediaPlayer.stop();
            mediaPlayer.reset();
            mReactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("playbackfinished", null);
            ex.printStackTrace();
        }
    }

    @ReactMethod
    public void stopMediaPlayer(String url, Callback callback) {
        try {
            if (mediaPlayer != null && mediaPlayer.isPlaying()) {
                mediaPlayer.stop();
                mediaPlayer.reset();
                callback.invoke();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            callback.invoke();
        }
    }

    @ReactMethod
    public void startRecording(String meetingId) {
        currentRecordingFileName = mFileName + "/" + meetingId + "/record_" + new Date().toString() + ".3gp";
        File folder = new File(mFileName + "/" + meetingId);
        if (!folder.exists())
            folder.mkdirs();

        if (mediaRecorder == null)
            mediaRecorder = new MediaRecorder();

        try {
            mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
            mediaRecorder.setOutputFile(currentRecordingFileName);
            mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
            mediaRecorder.prepare();
            mediaRecorder.start();

            mReactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("recordingstarted", currentRecordingFileName);

        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @ReactMethod
    public void stopRecording() {
        try {
            if (mediaRecorder != null) {
                mediaRecorder.stop();
                mediaRecorder.reset();
                mediaRecorder = null;

                mReactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("recordingfinished", currentRecordingFileName);

            }
        } catch (Exception ex) {
            ex.printStackTrace();
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
    public void uploadFile(String uri, String meetingId, String name, String desc, Callback callback) {
        Attachments attachments = new Attachments();
        attachments.setName(name);
        attachments.setDesc(desc);
        attachments.setUri(uri);
        attachments.setMeetingId(meetingId);

        UploadTask task = new UploadTask();
        task.setCallback(callback);

        task.execute(attachments);

    }

    @ReactMethod
    public void readEmiratesId(Callback callback) {
        EmiratesIdReadTask task = new EmiratesIdReadTask();
        task.setCallback(callback);;
        task.execute();
    }

    private ProgressDialog progressDialog;

    private class EmiratesIdReadTask extends AsyncTask<Void, Void, Void> {

        private Callback callback;

        public Callback getCallback() {
            return callback;
        }

        public void setCallback(Callback callback) {
            this.callback = callback;
        }

        @Override
        protected Void doInBackground(Void... params) {
            try {

                if (mReader == null)
                    mReader = new PCSCReader(mReactContext);

                if (mReader != null || !mReader.IsConnected())
                    mReader.Connect();

                if (mReader.IsUAECard()) {
                    EidPublicData data = mReader.getPublicData();

                    ObjectMapper mapper = new ObjectMapper();
                    String jsonInString = mapper.writeValueAsString(data);
                    if(callback != null)
                        callback.invoke(jsonInString);
                }

                mReader.Disconnect();

            } catch (CardException ex) {
                android.util.Log.v("Error", ex.getMessage());
            } catch (Exception ex) {
                android.util.Log.v("Error", ex.getMessage());
            }
            return null;
        }
    }

    private class UploadTask extends AsyncTask<Attachments, Void, Void> {

        private Callback callback;

        public Callback getCallback() {
            return callback;
        }

        public void setCallback(Callback callback) {
            this.callback = callback;
        }

        @Override
        protected Void doInBackground(Attachments... params) {
            Attachments param = params[0];
            File sourceFile = new File(param.getUri());
            String mimeType = "image/jpg";

            String ext = sourceFile.getName().substring(sourceFile.getName().lastIndexOf('.'));
            if (ext.equals(".3gp"))
                mimeType = "video/mp4";

            try {

                OkHttpClient client = new OkHttpClient();

                RequestBody requestBody = new MultipartBuilder()
                        .type(MultipartBuilder.FORM)
                        .addFormDataPart("AttachmentId", "0")
                        .addFormDataPart("BookedMeetingId", param.getMeetingId())
                        .addFormDataPart("Name", param.getName())
                        .addFormDataPart("Description", param.getDesc())
                        .addFormDataPart("AttachmentTypeId", "2")
                        .addFormDataPart("FileName", sourceFile.getName())
                        .addFormDataPart("file", sourceFile.getName(), RequestBody.create(MediaType.parse(mimeType), sourceFile))
                        .build();

                Request request = new Request.Builder()
                        //.url("http://192.168.4.77/SmartReception.Service/api/meeting/attachments/upload")
                        .url("http://smartreception.egovservice.com/Services/api/meeting/attachments/upload")
                        .post(requestBody)
                        .build();

                Response response = client.newCall(request).execute();
                //JSONObject responseString = new JSONObject(response.body().string());

                this.callback.invoke();

            } catch (Exception ex) {
                ex.printStackTrace();
            }
            return null;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            //progressDialog = ProgressDialog.show(mReactContext,"Uploading", "Uploading to server, please wait");
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);
            //progressDialog.dismiss();
        }
    }

    private class Attachments {
        private String uri;
        private String meetingId;
        private String name;
        private String desc;

        public String getUri() {
            return uri;
        }

        public void setUri(String uri) {
            this.uri = uri;
        }

        public String getMeetingId() {
            return meetingId;
        }

        public void setMeetingId(String meetingId) {
            this.meetingId = meetingId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDesc() {
            return desc;
        }

        public void setDesc(String desc) {
            this.desc = desc;
        }
    }
}
