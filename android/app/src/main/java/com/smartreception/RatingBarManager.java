package com.smartreception;

import android.widget.RatingBar;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import javax.annotation.Nullable;

/**
 * Created by itse4 on 11/23/2015.
 */
public class RatingBarManager extends SimpleViewManager<RatingBar> {
    @Override
    public String getName() {
        return "RCTRatingBar";
    }

    @Override
    protected RatingBar createViewInstance(ThemedReactContext themedReactContext) {
        return new RatingBar(themedReactContext);
    }

    @ReactProp(name = "rating", defaultFloat = 0f)
    public void setSrc(RatingBar view, float rating) {
        view.setRating(rating);
    }
}
