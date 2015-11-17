package com.smartreception;

import android.graphics.Color;
import android.support.annotation.Nullable;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.lang.reflect.Field;

public class ReactCalendarManager extends SimpleViewManager<ReactCalendarView> {

    public static String REACT_CLASS = "RCTCalendarView";

    @Override
    public ReactCalendarView createViewInstance(ThemedReactContext context) {
        ReactCalendarView calendarView = new ReactCalendarView(context);
        calendarView.setShowWeekNumber(false);

        ViewGroup vg = (ViewGroup) calendarView.getChildAt(0);
        View child = vg.getChildAt(0);

        if (child instanceof TextView) {
            ((TextView) child).setTextColor(Color.parseColor("#FFFFFF"));
        }

        return calendarView;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

}
