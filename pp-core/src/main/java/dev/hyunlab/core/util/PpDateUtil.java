/**
 * 
 */
package dev.hyunlab.core.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.slf4j.LoggerFactory;

/**
 * 날짜관련 유틸리티
 * @author cs1492
 * @since 20180824
 */
public class PpDateUtil {
	public static final String YMSHMS = "yyyyMMddHHmmss";
	
	public static final String YYYYMMDD = "yyyyMMdd";
	
	private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(PpDateUtil.class);
	

	/**
	 * 현재 년월일시분초밀리초를 문자열로 리턴
	 * @return
	 */
	public static String getYmdhmssss() {
		return getByPattern(new Date(), "yyyyMMddHHmmssSSS");
	}
	
	/**
	 * 현재 년월일시분초를 문자열로 리턴
	 * @return
	 */
	public static String getYmdhms() {
		return getByPattern(new Date(), YMSHMS);
	}
	
	/**
	 * 현재 년월일을 문자열로 리턴
	 * @return
	 */
	public static String getYmd() {
		return getByPattern(new Date(), "yyyyMMdd");
	}
	
	/**
	 * 현재 년을 문자열로 리턴
	 * @return
	 */
	public static String getYyyy() {
		return getByPattern(new Date(), "yyyy");
	}
	
	/**
	 * 현재 월을 문자열로 리턴
	 * @return
	 */
	public static String getMm() {
		return getByPattern(new Date(), "MM");
	}
	
	/**
	 * 현재 일자를 문자열로 리턴
	 * @return
	 */
	public static String getDd() {
		return getByPattern(new Date(), "dd");
	}
	
	
	/**
	 * 현재를 pattern으로 변환하여 리턴
	 * @param pattern
	 * @return
	 */
	public static String getByPattern(String pattern) {
		return getByPattern(new Date(), pattern);
	}
	
	/**
	 * 날짜를 pattern으로 변환하여 리턴
	 * @param dt
	 * @param pattern
	 * @return
	 */
	public static String getByPattern(Date dt, String pattern) {
		return (new SimpleDateFormat(pattern)).format(dt);
	}
	
	
	/**
	 * dt1과 dt2의 날짜 차이
	 * dt2에서 dt1을 뺌
	 * @param dt1
	 * @param dt2
	 * @return
	 */
	public static long getDiffDays(Date dt1, Date dt2) {
		long millisec = dt2.getTime() - dt1.getTime();
		return TimeUnit.DAYS.convert(millisec, TimeUnit.MILLISECONDS);
	}
	
	/**
	 * dt1과 dt2의 시간 차이
	 * dt2에서 dt1을 뺌
	 * @param dt1
	 * @param dt2
	 * @return
	 */
	public static long getDiffHours(Date dt1, Date dt2) {
		long millisec = dt2.getTime() - dt1.getTime();
		return TimeUnit.HOURS.convert(millisec, TimeUnit.MILLISECONDS);
	}
	
	
	/**
	 * 어제 
	 * @return
	 */
	public static Date getYesterday() {
		Calendar c = Calendar.getInstance();
		c.setTime(new Date());
		c.add(Calendar.DATE, -1);
		
		//
		return c.getTime();
	}
	
	/**
	 * dt가 fromDt~endDt 사이에 있는지 여부
	 * @param dt
	 * @param fromDt
	 * @param toDt
	 * @return
	 */
	public static boolean isBetween(Date dt, Date fromDt, Date toDt) {
		if((fromDt.getTime() <= dt.getTime()) && (dt.getTime() <= toDt.getTime())) {
			return true;
		}
		
		return false;
	}
	
	/**
	 * dt가 오늘 일시보다 크면 미래라고 판단
	 * @param dt
	 * @return
	 */
	public static boolean isFuture(Date dt) {
		return (dt.getTime() > new Date().getTime());
	}
	
	
	/**
	 * 
	 * @param dt
	 * @param pattern
	 * @return
	 */
	public static String format(Date dt, String pattern) {
		return new SimpleDateFormat(pattern).format(dt);
	}
	
	/**
	 * dt를 문자열(yyyyMMddHHmmss)로 변경
	 * @param dt
	 * @return
	 */
	public static String toYmdhmsString(Date dt) {
		return (new SimpleDateFormat(YMSHMS).format(dt));
	}
	
	
	/**
	 * (문자열 길이에 따라 자동으로) 문자열을 날짜형으로 변환
	 * @param str
	 * @return
	 */
	public static Date parse(String str) {
		if(PpUtil.isEmpty(str)) {
			LOGGER.error(".parse - str is empty");
			return null;
		}
		
		if(8 == str.length()) {
			return parse(str, "yyyyMMdd");
		}
		
		if(10 == str.length()) {
			return parse(str, "yyyyMMddHH");
		}
		
		if(12 == str.length()) {
			return parse(str, "yyyyMMddHHmm");
		}
		
		if(14 == str.length()) {
			return parse(str, YMSHMS);
		}
		
		//
		LOGGER.error(".parse - str:{}", str);
		return null;
	}
	
	/**
	 * 문자열을 날짜형으로 변환
	 * @param str
	 * @param pattern
	 * @return
	 */
	public static Date parse(String str, String pattern) {
		try {
			return new SimpleDateFormat(pattern).parse(str);
		} catch (ParseException e) {
			LOGGER.error("{}",e);
			return null;
		}
	}
}
