package com.smartreception.module;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Environment;
import android.widget.Toast;

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
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import com.squareup.okhttp.ResponseBody;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import okio.BufferedSink;
import okio.BufferedSource;
import okio.Okio;

/**
 * Created by itse4 on 12/20/2015.
 */
public class PenSurfaceModule extends ReactContextBaseJavaModule {

    private  PenSurfaceManager mPenSurfaceManager;
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
    public void saveDrawings() {
        // Capture the view
        Bitmap imgBitmap = mPenSurfaceManager.getPenSurface().captureCurrentView(true);
        OutputStream out = null;

        String strFileName = Environment.getExternalStorageDirectory().getAbsolutePath() + "/image.png";

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
    }

    @ReactMethod
    public void addNewPage() {
        mPenSurfaceManager.addNewPage();
    }

    @ReactMethod
    public  void loadImage() {
        String strFileName = Environment.getExternalStorageDirectory().getAbsolutePath() + "/image.png";

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
            Toast.makeText(mContext, "This file is locked by a password.", Toast.LENGTH_LONG).show();
        } catch (SpenUnsupportedVersionException e) {
            Toast.makeText(mContext, "This file is the version that does not support.",
                    Toast.LENGTH_LONG).show();
        } catch (Exception e) {
            Toast.makeText(mContext, "Failed to load noteDoc.", Toast.LENGTH_LONG).show();
        }
    }


    @ReactMethod
    public void downloadSketches() {
        final int DOWNLOAD_CHUNK_SIZE = 2048; //Same as Okio Segment.SIZE
        OkHttpClient client = new OkHttpClient();
        try {
            Request request = new Request.Builder().url("http://192.168.4.77/SmartReception.Service/Attachments/20151209_121005.jpg").build();

            Response response = client.newCall(request).execute();
            ResponseBody body = response.body();
            long contentLength = body.contentLength();
            BufferedSource source = body.source();

            File file = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/image.png");
            BufferedSink sink = Okio.buffer(Okio.sink(file));

            long bytesRead = 0;
            while (source.read(sink.buffer(), DOWNLOAD_CHUNK_SIZE) != -1) {
                bytesRead += DOWNLOAD_CHUNK_SIZE;
                int progress = (int) ((bytesRead * 100) / contentLength);
                //publishProgress(progress);
            }
            sink.writeAll(source);
            sink.close();
            //publishProgress(FileInfo.FULL);
        } catch (IOException e) {
            //publishProgress(FileInfo.CODE_DOWNLOAD_ERROR);
            //Logger.reportException(e);
        }
    }


    public void uploadSketches() {

    }

}
