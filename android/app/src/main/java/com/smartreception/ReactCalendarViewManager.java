package com.smartreception;

import android.widget.CalendarView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.BaseViewPropertyApplicator;
import com.facebook.react.uimanager.CatalystStylesDiffMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIProp;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.views.text.ReactTextShadowNode;



public class ReactCalendarViewManager extends SimpleViewManager<CalendarView> {
    public static final String REACT_CLASS = "RCTCalendarView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public CalendarView createViewInstance(ThemedReactContext context) {
        return new CalendarView(context);
    }

    /*@Override
    public ReactTextShadowNode createCSSNodeInstance() {
        return new ReactTextShadowNode(false);
    }*/
}
