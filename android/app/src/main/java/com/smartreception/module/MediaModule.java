package com.smartreception.module;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaRecorder;
import android.os.AsyncTask;
import android.os.Environment;
import android.provider.MediaStore;
import android.smartcardio.CardException;
import android.smartcardio.CommandAPDU;
import android.telecom.Call;
import android.util.Log;
import android.view.SoundEffectConstants;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.stetho.json.ObjectMapper;
import com.smartreception.eid.EidPublicData;
import com.smartreception.eid.PCSCReader;
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
    public void eid(Callback callback) {
        try {

            /*
            ResponseAPDU response;
            if (mFactory == null) {
                mFactory = mService.getTerminalFactory();
            }
            List<CardTerminal> terminals = mFactory.terminals().list();
            CardTerminal terminal_1 = terminals.get(0);
            Boolean b =terminal_1.isCardPresent();
            android.util.Log.v("Test",b.toString());
            Card card = terminal_1.connect("T=0");
            ATR x = card.getATR();
            CardChannel channel = card.getBasicChannel();
            */


            if (mReader == null)
                this.mReader = new PCSCReader(mReactContext);

            if (mReader != null || !mReader.IsConnected())
                mReader.Connect();

            if (mReader.IsUAECard()) {
                EidPublicData data = mReader.getPublicData();
                String str = "{" +
                        "\"ArabicName\": " + "" + data.getArabicFullName() + "," +
                        "\"FulleName\": " + "" + data.getFullName() + "," +
                "}";
                callback.invoke(str);
            }

            mReader.Disconnect();
            /*


            //Select first file
            //response = selectFile(channel, new byte[]{0x00, 0x02, 0x43, 0x00, 0x13, 0x00, 0x00, 0x00, 0x01, 0x01});
            response = channel.transmit( new CommandAPDU(new byte[]{
                    0x00,(byte)0xA4 ,0x04 ,0x00 ,0x0C ,(byte)0xA0 ,0x00 ,0x00 ,0x02 ,0x43 ,0x00 ,0x13 ,0x00 ,0x00 ,0x00 ,0x01 ,0x01
            }));
            if (response.getSW1()!=0x61)
                throw new Exception("Response error");
            //read from first file
            response = getResponseStd(channel, response.getSW2()); ;//Not used data for now

            response = channel.transmit(new CommandAPDU(new byte[]{(byte)0x80,(byte)0xC0, 0x02, (byte)0xA1, 0x08}));
            if (response.getSW() != 0x9000)
                throw new Exception("Failed to get Card serial no");


            card.disconnect(true);

            //if (response.getSW() != 0x9000)
            //    throw new Exception("Response error");

            */


        } catch (CardException ex) {
            //..
            android.util.Log.v("Error", ex.getMessage());
        } catch (Exception ex) {
            android.util.Log.v("Error", ex.getMessage());
        }
    }

    private ProgressDialog progressDialog;

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
            try {
                File sourceFile = new File(param.getUri());
                OkHttpClient client = new OkHttpClient();
                RequestBody requestBody = new MultipartBuilder()
                        .type(MultipartBuilder.FORM)
                        .addFormDataPart("AttachmentId", "0")
                        .addFormDataPart("BookedMeetingId", param.getMeetingId())
                        .addFormDataPart("Name", param.getName())
                        .addFormDataPart("Description", param.getDesc())
                        .addFormDataPart("AttachmentTypeId", "2")
                        .addFormDataPart("file", sourceFile.getName(), RequestBody.create(MediaType.parse("image/jpg"), sourceFile))
                        .build();

                Request request = new Request.Builder()
                        .url("http://192.168.4.77/SmartReception.Service/api/meeting/attachments/upload")
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
