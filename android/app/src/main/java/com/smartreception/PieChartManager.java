package com.smartreception;

import android.graphics.Color;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.formatter.PercentFormatter;
import com.github.mikephil.charting.utils.ColorTemplate;

import java.util.ArrayList;

/**
 * Created by itse4 on 1/25/2016.
 */
public class PieChartManager extends SimpleViewManager<PieChart> {

    private   PieChart chart;

    @Override
    public String getName() {
        return "PieChart";
    }

    @Override
    protected PieChart createViewInstance(ThemedReactContext themedReactContext) {

       chart = new PieChart(themedReactContext);


        chart.setUsePercentValues(true);
        chart.setDescription("User Feedback");
        chart.setDrawHoleEnabled(true);
        chart.setHoleColorTransparent(true);
        chart.setHoleRadius(7);
        chart.setTransparentCircleRadius(10);

        chart.setRotationAngle(0);
        chart.setRotationEnabled(true);

        return chart;
    }

    public void addData() {
        float[] yData = {5, 10, 15, 30, 40};
        String[] xData = {"Sony", "Apple", "Huwei", "LG", "SamSung"};

        ArrayList<Entry> yVals = new ArrayList<Entry>();
        for (int i = 0; i < yData.length; i++)
            yVals.add(new Entry(yData[i], i));

        ArrayList<String> xVals = new ArrayList<String>();
        for (int i = 0; i < xData.length; i++)
            xVals.add(xData[i]);

        PieDataSet ds = new PieDataSet(yVals, "User Feedback");
        ds.setSliceSpace(3);
        ds.setSelectionShift(5);

        ArrayList<Integer> colors = new ArrayList<Integer>();

        for(int c: ColorTemplate.VORDIPLOM_COLORS)
            colors.add(c);

        for(int c: ColorTemplate.JOYFUL_COLORS)
            colors.add(c);

        for(int c: ColorTemplate.COLORFUL_COLORS)
            colors.add(c);

        for(int c: ColorTemplate.LIBERTY_COLORS)
            colors.add(c);

        for(int c: ColorTemplate.PASTEL_COLORS)
            colors.add(c);

        colors.add(ColorTemplate.getHoloBlue());
        ds.setColors(colors);

        PieData data = new PieData(xVals, ds);
        data.setValueFormatter(new PercentFormatter());
        data.setValueTextSize(11f);
        data.setValueTextColor(Color.GRAY);

        chart.setData(data);
        chart.highlightValues(null);
        chart.invalidate();

    }
}
