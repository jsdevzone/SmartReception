package com.smartreception.module;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Environment;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.samsung.android.sdk.pen.SpenSettingEraserInfo;
import com.samsung.android.sdk.pen.SpenSettingPenInfo;
import com.samsung.android.sdk.pen.document.SpenInvalidPasswordException;
import com.samsung.android.sdk.pen.document.SpenNoteDoc;
import com.samsung.android.sdk.pen.document.SpenObjectTextBox;
import com.samsung.android.sdk.pen.document.SpenUnsupportedTypeException;
import com.samsung.android.sdk.pen.document.SpenUnsupportedVersionException;
import com.samsung.android.sdk.pen.engine.SpenSurfaceView;
import com.smartreception.PenSurface;
import com.smartreception.PenSurfaceManager;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.MultipartBuilder;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;
import com.squareup.okhttp.ResponseBody;

import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URL;

import okio.BufferedSink;
import okio.BufferedSource;
import okio.Okio;

/**
 * Created by itse4 on 12/20/2015.
 */
public class PenSurfaceModule extends ReactContextBaseJavaModule {

    private PenSurfaceManager mPenSurfaceManager;
    private ReactApplicationContext mContext;

    public PenSurfaceModule(ReactApplicationContext reactContext, PenSurfaceManager manager) {
        super(reactContext);
        mPenSurfaceManager = manager;
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "PenSurface";
    }

    @ReactMethod
    public void clear() {
        try {
            try {
                SpenNoteDoc mSpenNoteDoc = new SpenNoteDoc(mContext, 1100, 700);
                mPenSurfaceManager.setSpenNoteDoc(mSpenNoteDoc);
            } catch (IOException ex) {
                Log.d("", "");
            }

        } catch (Exception e) {
            Toast.makeText(mContext, "Failed to load noteDoc.", Toast.LENGTH_LONG).show();
        }
    }

    @ReactMethod
    public void switchToPenMode() {
        SpenSettingPenInfo penInfo = new SpenSettingPenInfo();
        penInfo.color = Color.BLACK;
        penInfo.size = 3;
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

    @ReactMethod
    public void saveDrawings(int meetingId, int attachmentId, Callback callback) {

        String strDirName = Environment.getExternalStorageDirectory().getAbsolutePath()
                + "/SmartReception"
                + "/" + String.valueOf(meetingId)
                + "/Sketches";
        String strFileName = strDirName + "/" + String.valueOf(attachmentId) + ".png";

        /**
         * Create directory if not exists
         */
        File dir = new File(strDirName);
        if (!dir.exists())
            dir.mkdirs();
        /*
         * Download image from the server
         */

        // Capture the view
        Bitmap imgBitmap = mPenSurfaceManager.getPenSurface().captureCurrentView(true);
        OutputStream out = null;


        try {
            // Create FileOutputStream and save the captured image.
            out = new FileOutputStream(strFileName);
            imgBitmap.compress(Bitmap.CompressFormat.PNG, 100, out);
            // Save the note information.
            mPenSurfaceManager.getSpenNoteDoc().save(out, false);
            out.close();
        } catch (IOException e) {
            File tmpFile = new File(strFileName);
            if (tmpFile.exists()) {
                tmpFile.delete();
            }
            e.printStackTrace();
        } catch (Exception e) {
            File tmpFile = new File(strFileName);
            if (tmpFile.exists()) {
                tmpFile.delete();
            }
            e.printStackTrace();
        }
        imgBitmap.recycle();

        uploadSketches(meetingId, attachmentId, strFileName);

        callback.invoke();
    }

    @ReactMethod
    public void addNewPage() {
        mPenSurfaceManager.addNewPage();
    }

    @ReactMethod
    public void loadImage(int meetingId, int attachmentId) {
        String strDirName = Environment.getExternalStorageDirectory().getAbsolutePath()
                + "/SmartReception"
                + "/" + String.valueOf(meetingId)
                + "/Sketches";
        String strFileName = strDirName + "/" + String.valueOf(attachmentId) + ".png";

        /**
         * Create directory if not exists
         */
        File dir = new File(strDirName);
        if (!dir.exists())
            dir.mkdirs();
        /*
         * Download image from the server
         */

        downloadImage(meetingId, attachmentId);

        try {
            SpenObjectTextBox.setInitialCursorPos(SpenObjectTextBox.CURSOR_POS_END);
            // Create NoteDoc with the selected file.
            SpenNoteDoc tmpSpenNoteDoc = new SpenNoteDoc(mContext, strFileName, 1100,
                    SpenNoteDoc.MODE_WRITABLE);
            mPenSurfaceManager.setSpenNoteDoc(tmpSpenNoteDoc);
            Toast.makeText(mContext, "Successfully loaded noteFile.", Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            Toast.makeText(mContext, "Cannot open this file.", Toast.LENGTH_LONG).show();
        } catch (SpenUnsupportedTypeException e) {
            Toast.makeText(mContext, "This file is not supported.", Toast.LENGTH_LONG).show();
        } catch (SpenInvalidPasswordException e) {
            Toast.makeText(mContext, "This file is locked by a passwo;rd.", Toast.LENGTH_LONG).show();
        } catch (SpenUnsupportedVersionException e) {
            Toast.makeText(mContext, "This file is the version that does not support.",
                    Toast.LENGTH_LONG).show();
        } catch (Exception e) {
            Toast.makeText(mContext, "Failed to load noteDoc.", Toast.LENGTH_LONG).show();
        }
    }


    @ReactMethod
    public void downloadSketches() {

    }


    public void uploadSketches(int meetingId, int attachmentId, String strFileName) {

        File sourceFile = new File(strFileName);

        try {
            OkHttpClient client = new OkHttpClient();
            RequestBody requestBody = new MultipartBuilder()
                    .type(MultipartBuilder.FORM)
                    .addFormDataPart("AttachmentId", String.valueOf(attachmentId))
                    .addFormDataPart("BookedMeetingId", String.valueOf(meetingId))
                    .addFormDataPart("Name", "Sketches")
                    .addFormDataPart("Description", "User Sketches")
                    .addFormDataPart("AttachmentTypeId", "1")
                    .addFormDataPart("FileName", strFileName)
                    .addFormDataPart("file", sourceFile.getName(), RequestBody.create(MediaType.parse("image/jpg"), sourceFile))
                    .build();

            Request request = new Request.Builder()
                    //.url("http://192.168.4.77/SmartReception.Service/api/meeting/attachments/upload")
                    .url("http://smartreception.egovservice.com/Services/api/meeting/attachments/upload")
                    .post(requestBody)
                    .build();

            Response response = client.newCall(request).execute();
            JSONObject responseString = new JSONObject(response.body().string());

        } catch (Exception ex) {

        }
    }

    private String URL_BASE = "http://192.168.4.77/SmartReception.Service/Attachments/";


    private void downloadImage(int meetingId, int attachmentId) {
        // Chunk Size
        int DOWNLOAD_CHUNK_SIZE = 2048;

        // Url of the file to be downloaded
        String URL = URL_BASE + String.valueOf(meetingId) + "/Sketches/" + String.valueOf(attachmentId) + ".png";

        // Create OkHttpClient instance
        OkHttpClient client = new OkHttpClient();

        try {
            // Build simple request object
            Request request = new Request.Builder().url(URL).build();

            // Configure Response
            Response response = client.newCall(request).execute();
            ResponseBody body = response.body();
            long contentLength = body.contentLength();
            BufferedSource source = body.source();

            // Compose local file name
            String strDirName = Environment.getExternalStorageDirectory().getAbsolutePath()
                    + "/SmartReception"
                    + "/" + String.valueOf(meetingId)
                    + "/Sketches";
            String strFileName = strDirName + "/" + String.valueOf(attachmentId) + ".png";

            // Create local dirs if it does not exists
            File dir = new File(strDirName);
            if (!dir.exists())
                dir.mkdirs();

            File file = new File(strFileName);
            BufferedSink sink = Okio.buffer(Okio.sink(file));

            long bytesRead = 0;
            while (source.read(sink.buffer(), DOWNLOAD_CHUNK_SIZE) != -1) {
                bytesRead += DOWNLOAD_CHUNK_SIZE;
                int progress = (int) ((bytesRead * 100) / contentLength);
                //publishProgress(progress);
            }

            // wrire to local file
            sink.writeAll(source);

            //close stream
            sink.close();
            //publishProgress(FileInfo.FULL);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
