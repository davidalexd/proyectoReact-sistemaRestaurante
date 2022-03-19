package com.restaurant.api.utils;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class SummaryUtils {

    public static List<Date> getDates(String format, Boolean now){
        Calendar firstCalendar = formatDate(format,(now)?1:0);
        Calendar lastCalendar = formatDate(format,(now)?0:-1);
        List<Date> dates = new ArrayList<Date>();
        dates.add(firstCalendar.getTime());
        dates.add(lastCalendar.getTime());
        return dates;
    }

    public static Calendar getDateWithoutTime(){
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar;
    }

    public static Calendar formatDate(String format, Integer range){
        Calendar date = getDateWithoutTime();
        switch (format){
            case "DAY":
                date.add(Calendar.DATE, range);
                break;
            case "MONTH":
                date.add(Calendar.MONTH, range);
                break;
            case "YEAR":
                date.add(Calendar.YEAR	, range);
                break;
        }
        return date;
    }
    public static Long checkIfIsNull(Long number){
        if(number == null){
            return 0l;
        }
        return number;
    }
}
