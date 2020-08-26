/**
 * @author	cs1492
 * @since	2017. 9. 1.
 */
package dev.hyunlab.web.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.InvocationTargetException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;

import dev.hyunlab.core.misc.PpConst;
import dev.hyunlab.core.util.PpUtil;

/**
 * 웹 관련 유티리티
 * @author	cs1492
 * @since	2017. 10. 27.
 */
public class PpWebUtil extends PpUtil{
	static Logger log = LoggerFactory.getLogger(PpWebUtil.class);
	
	public static void main(String[] args) {}
	


	/**
	 * 접속자 아이피 구하기
	 * @param request
	 * @return
	 */
	public static String getConectIp(HttpServletRequest request){
		String ip = request.getHeader("X-Forwarded-For");
		
		if(PpUtil.isEmpty(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if(PpUtil.isEmpty(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if(PpUtil.isEmpty(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if(PpUtil.isEmpty(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if(PpUtil.isEmpty(ip)) {
			ip = request.getHeader("REMOTE_ADDR");
		}
		if(PpUtil.isEmpty(ip)) {
			ip = request.getRemoteAddr();
		}
		
		//
		return ip;
	}	



	public static String nl2br(String str) {
		if(null == str) {
			return "";
		}
		
		return str.replaceAll("\n", "<br/>").replaceAll(" ", "&nbsp;");
	}
	
	
	/**
	 * 
	 * 화면 목록에 표시하는 역순의 번호 생성
	 * @date : 2018. 2. 9.
	 * @param csMap
	 * @param totcnt	전체 건수
	 * @param count	현재 row의 번호
	 * @return
	 * @since
	 * 	20200414	refactoring, rename
	 */
	@SuppressWarnings("rawtypes")
	public static String getRowNum(Map map, String totcnt, String count) {
		if(PpUtil.isNull(map) || PpUtil.isEmpty(totcnt) || PpUtil.isEmpty(count)) {
			return "0";
		}
		
		//
		if(!map.containsKey(PpConst.PAGE_NO) || !map.containsKey(PpConst.PAGE_SIZE)){
			log.debug("");
			return "0";
		}
		
		
		//
		Integer pageNo =  PpUtil.getInt(map.get(PpConst.PAGE_NO));
		Integer pageSize = PpUtil.getInt(map.get(PpConst.PAGE_SIZE));
		
		//
		if(null == pageNo || null == pageSize) {
			return "0";
		}
		
		//
		Integer result = (PpUtil.getInt(totcnt)+1) - ((((pageNo-1) * pageSize) + PpUtil.getInt(count)));
		return "" + result;
	}
	

	/**
	 * csrf token 검사
	 * @date : 2018. 3. 11.
	 * @param request
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static boolean checkCsrf(HttpServletRequest request, Map paramMap) {
//		System.out.println(CsWebSessionUtil.get(request, CsConst.CSRF_TOKEN));
//		System.out.println(paramMap.get(CsConst.CSRF_TOKEN));
		
		//
		String csrfFromSession = PpWebSessionUtil.<String>getT(request, PpConst.CSRF_TOKEN);
		String csrfFromParam = (String)paramMap.get(PpConst.CSRF_TOKEN);
		
		
		//
		return PpUtil.isAllEquals(csrfFromSession, csrfFromParam);
	}
	
	
	
	
	
	@SuppressWarnings("rawtypes")
	public static Map getParamMap(HttpServletRequest request) {
		if(null == request.getAttribute(PpConst.PARAM_MAP)) {
			return null;
		}
		
		return (Map)request.getAttribute(PpConst.PARAM_MAP);
	}
	


	
	/**
	 * map에서 키가 keys에 속하면해당하는 놈들의 값을 value로 put함
	 * @param map
	 * @param value
	 * @param keys
	 */
	public static void putValueIfIn(Map<String,Object> map, Object value, String...keys){
		if(null == map){
			return;
		}
		
		Iterator<String> iter = map.keySet().iterator();
		while(iter.hasNext()){
			String keyOfMap = iter.next();
			
			for(String key : keys){
				if(keyOfMap.equals(key)){
					map.put(keyOfMap, value);
				}
			}
		}
	}
	
	/**
	 * map의 key가 keys에 속하지 않으면 value로 put함
	 * @param map
	 * @param value
	 * @param keys
	 */
	public static void putValueIfNotIn(Map<String,Object> map, Object value, String...keys){
		if(null == map){
			return;
		}
		
		Iterator<String> iter = map.keySet().iterator();
		while(iter.hasNext()){
			String keyOfMap = iter.next();
			
			boolean b = false;
			for(String key : keys){
				if(keyOfMap.equals(key)){
					b = true;
					break;
				}
			}
			
			if(!b){
				map.put(keyOfMap, value);
			}
		}
	}
	
	public static Map<String,Object> toParamMap(HttpServletRequest request)  {
		if(request.getRequestURI().contains(".json")) {
			//.json 요청이면
			if(null != request.getQueryString()) {
				//파라미터가 get/post방식으로 전달되었으면
				return toMap(request);
			}else {
				try {
					return payloadToParamMap(request);
				} catch (IOException e) {
					log.error("{}",e);
					return new HashMap<>();
				}
			}
		}else {
			//.do 요청이면
			return toMap(request);
		}
	}
	
	/**
	 * request의 attribute, parameter를 T의 key/value로 설정. payload는 처리하지 않음
	 * @param <T> Map을 상속받은 클래스
	 * @param request request
	 * @param clazz 클래스
	 * @return 값이 세팅된 T의 인스턴스
	 * @since 20200826	init
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static <T extends Map> T toMap(HttpServletRequest request, Class<T> clazz) {
		T map = null;
		
		
		try {
			map = clazz.getDeclaredConstructor().newInstance();
			
		} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException	| NoSuchMethodException | SecurityException e) {
			log.error("{}",e);
		}
		
		//
		if(null == map) {
			return null;
		}
		
		//
		String k;
		Enumeration<String> en = request.getAttributeNames();
		while(en.hasMoreElements()) {
			k = en.nextElement();
			
			//
			if(PpUtil.isEmpty(k)) {
				continue;
			}
			
			//
			map.put(k, request.getAttribute(k));
		}
		
		//
		en = request.getParameterNames();
		
		while(en.hasMoreElements()) {
			k = en.nextElement();
			
			if(null == k) {
				continue;
			}
			
			
			if(1 == request.getParameterValues(k).length) {
				map.put(k, request.getParameter(k));
			}else {
				map.put(k, request.getParameterValues(k));
			}
		}
		
		//
		return map;
	}
	
	/**
	 * request의 attribute, parameter를 맵에 설정. payload는 처리하지 않음
	 * @date : 2018. 2. 2.
	 * @param request request
	 * @return 값이 세팅된 맵
	 */
	@SuppressWarnings("unchecked")
	private static Map<String,Object> toMap(HttpServletRequest request) {
		Map<String,Object> map = toMap(request, Map.class);
		
		//
		return map;		
	}
	
	
	/**
	 * payload body를 map으로 변환
	 * @param request request 
	 * @return map
	 * @throws IOException 예외
	 */
	@Deprecated
	@SuppressWarnings("unchecked")
	public static Map<String,Object> payloadToParamMap(HttpServletRequest request) throws IOException {
		Map<String,Object> map = payloadToMap(request, Map.class);
		//
		return map;
	}
	
	
	/**
	 * payload body를 map으로 변환
	 * @param request request 
	 * @return map
	 * @throws IOException 예외
	 */
	@SuppressWarnings("unchecked")
	public static Map<String,Object> payloadToMap(HttpServletRequest request) throws IOException {
		Map<String,Object> map = payloadToMap(request, Map.class);
		//
		return map;
	}
	
	
	/**
	 * payload body를 map으로 변환
	 * @date : 2018. 2. 2.
	 * @param request request
	 * @return map
	 * @throws IOException 예외
	 * @history
	 * 	20200514	double형인데 끝이 .0으로 끝나면 integer로 변환하여 저장
	 * 	20200826	generic type으로 리펙토링
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static <T extends Map> T payloadToMap(HttpServletRequest request, Class<T> clazz) throws IOException {
		log.trace(".jsonToParameterMap");
		
		BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
		String line="";
		StringBuffer sb = new StringBuffer();
		
		while(null != (line = br.readLine())) {
			if(0 == line.length()) {
				continue;
			}
			
			sb.append(line);
		}
		
		String str = sb.toString();
		
		if(!str.startsWith("{")) {
			return null;
		}
		
		if(!str.endsWith("}")) {
			return null;
		}
		
		//
		T map = (new Gson()).fromJson(str, clazz);
		
		//
		if(null == map) {
			return null;
		}
		
		
		//
		Iterator<String> iter = map.keySet().iterator();
		while(iter.hasNext()) {
			String k = iter.next();
			
			//
			if(null == map.get(k)) {
				continue;
			}
			
			//더블형인데 끝이 .0 이면 integer로 변환
			if(Double.class == map.get(k).getClass() && map.get(k).toString().endsWith(".0")) {
				map.put(k, ((Double)map.get(k)).intValue());
			}
		}
		
		return map;
	}
	
	
	
	/**
	 * response에 jsonp string write할 때 사용
	 * @param pw	보통 response의 print writer
	 * @param jsonp	jsonp의 키
	 * @param map	write할 데이터를 저장하고 있는 맵
	 */
	public static void writeJsonpString(PrintWriter pw, String jsonp, Map<String,Object> map){
		if(null == pw || isEmpty(jsonp) || null == map){
			return;
		}
		
		String s = String.format("%s(%s)", jsonp, (new Gson()).toJson(map));
		
		pw.write(s);
		pw.flush();
	}
}
