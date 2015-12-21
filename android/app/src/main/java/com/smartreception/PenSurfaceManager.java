package com.smartreception;

import android.graphics.Color;
import android.graphics.Rect;
import android.util.Log;
import android.view.Display;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.samsung.android.sdk.pen.SpenSettingPenInfo;
import com.samsung.android.sdk.pen.document.SpenNoteDoc;
import com.samsung.android.sdk.pen.document.SpenPageDoc;

import java.io.IOException;

/**
 * Created by itse4 on 12/20/2015.
 */
public class PenSurfaceManager extends SimpleViewManager<PenSurface> {

    private SpenNoteDoc mSpenNoteDoc;
    private SpenPageDoc mSpenPageDoc;
    private PenSurface mPenSurface;

    @Override
    public String getName() {
        return "PenSurface";
    }

    @Override
    protected PenSurface createViewInstance(ThemedReactContext themedReactContext) {
        mPenSurface = new PenSurface(themedReactContext);
        SpenSettingPenInfo penInfo = new SpenSettingPenInfo();
        penInfo.color = Color.BLACK;
        penInfo.size = 3;

        try {
            mSpenNoteDoc = new SpenNoteDoc(themedReactContext, 1100, 700);
        } catch (IOException ex) {
            Log.d("", "");
        }
        mPenSurface.setPenSettingInfo(penInfo);

        mSpenPageDoc = mSpenNoteDoc.appendPage();
        mSpenPageDoc.setBackgroundColor(0xFFFFFFFF);
        mSpenPageDoc.clearHistory();


        mPenSurface.setPageDoc(mSpenPageDoc, true);

        return mPenSurface;
    }

    public PenSurface getPenSurface() {
        return mPenSurface;
    }

    public SpenPageDoc getSpenPageDoc() {
        return mSpenPageDoc;
    }

    public SpenNoteDoc getSpenNoteDoc() {
        return mSpenNoteDoc;
    }

    public void setSpenNoteDoc(SpenNoteDoc doc) throws Exception{

        mSpenNoteDoc.close();
        mSpenNoteDoc = doc;

        if (mSpenNoteDoc.getPageCount() == 0) {
            mSpenPageDoc = mSpenNoteDoc.appendPage();
        } else {
            mSpenPageDoc = mSpenNoteDoc.getPage(mSpenNoteDoc.getLastEditedPageIndex());
        }
        mPenSurface.setPageDoc(mSpenPageDoc, true);
        mPenSurface.update();
    }

    public void addNewPage() {
        mSpenPageDoc = mSpenNoteDoc.insertPage(mSpenNoteDoc.getPageIndexById(mSpenPageDoc.getId()) + 1);
        mSpenPageDoc.setBackgroundColor(0xFFD6E6F5);
        mSpenPageDoc.clearHistory();
    }
}
