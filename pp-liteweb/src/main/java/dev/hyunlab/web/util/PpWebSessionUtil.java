/**
 * 
 */
package dev.hyunlab.web.util;

import java.io.Serializable;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import dev.hyunlab.core.PpConst;
import dev.hyunlab.core.PpMap;
import dev.hyunlab.core.util.PpUtil;
import dev.hyunlab.core.vo.PpVO;

/**
 * 세션 관련 유틸리티
 * @author cs1492
 * @date   2018. 2. 9.
 *
 */
public class PpWebSessionUtil {
	private static Logger log = LoggerFactory.getLogger(PpWebSessionUtil.class);
	
	public static final String PREFIX = "";
	

	/**
	 * 세션에 key가 존재하는지 여부
	 * @param request
	 * @param key
	 * @return key로 조회했을 때 값이 널이 아니면 true
	 */
	public static boolean contains(HttpServletRequest request, String key){
		return contains(request.getSession(), key);
	}


	/**
	 * 세션에 key가 존재하는지 여부
	 * @param session
	 * @param key
	 * @return
	 */
	public static boolean contains(HttpSession session, String key){
		return (null != session.getAttribute(PREFIX + key));
	}
	
	/**
	 * @title
	 * @date : 2018. 2. 13.
	 * @param request
	 */
	public static void debug(HttpServletRequest request) {
		if(null == request || null == request.getSession()) {
			log.debug("request or session is null");
		}
		
		Enumeration<String> en = request.getSession().getAttributeNames();
		String k;
		while(en.hasMoreElements()) {
			k = en.nextElement();
			
			log.debug("{}\t{}", k, request.getSession().getAttribute(k));
		}
	}


	/**
	 * 세션에 저장된 값을 Object 타입으로 리턴
	 * @date : 2018. 2. 9.
	 * @param request
	 * @param key
	 * @return
	 */
	public static Object get(HttpServletRequest request, String key) {
		if(null == request || null == request.getSession()) {
			return null;
		}
		
		if(PpUtil.isEmpty(PREFIX+key)) {
			return null;
		}
		
		return (Object)request.getSession().getAttribute(PREFIX+key);
	}
	
	/**
	 * 세션에 저장된 값을 string 타입으로 리턴
	 * @date : 2018. 2. 9.
	 * @param request
	 * @param key
	 * @return
	 */
	public static String getAsString(HttpServletRequest request, String key) {
		if(null == request || null == request.getSession()) {
			return null;
		}
		
		if(PpUtil.isEmpty(PREFIX+key)) {
			return null;
		}
		
		return (String)request.getSession().getAttribute(PREFIX+key);
	}
	
	
	/**
	 * loginResult에 저장된 사용자 아이디 값 추출
	 * @date : 2018. 2. 9.
	 * @param csMap
	 * @return
	 */
	public static String getEmplyrId(PpMap csMap) {
		if(null == csMap) {
			return null;
		}
		
		return csMap.getString("EMPLYR_ID");
	}

	

	/**
	 * loginResult에 저장된 사용자 명 값 추출
	 * @date : 2018. 2. 9.
	 * @param csMap
	 * @return
	 */
	public static String getEmplyrNm(PpMap csMap) {
		if(null == csMap) {
			return null;
		}
		
		return csMap.getString("EMPLYR_NM");
	}
	

	
	
	/**
	 * 세션에 저장된 로그인 정보 추출
	 * @date : 2018. 2. 9.
	 * @param request
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Map getLoginResult(HttpServletRequest request) {
		return PpWebSessionUtil.<Map>getT(request, PpConst.LOGIN_RESULT);
	}
	
	

	/**
	 * 세션에 저장된 로그인 정보 추출
	 * VO는 CsVO를 상속해야 함
	 * @date : 2018. 2. 9.
	 * @param request
	 * @return
	 */
	public static <T extends Object> T getLoginVo(HttpServletRequest request) {
		return PpWebSessionUtil.<T>getT(request, PpConst.LOGIN_VO);
	}


	/**
	 * 
	 * @param <T>
	 * @param session
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T extends Serializable> T getLoginVo(HttpSession session){
		if(null == session){
			return null;
		}

		//
		return (T) session.getAttribute(PREFIX + PpConst.LOGIN_VO);
	}
	
	
	/**
	 * mymenu getter
	 * @param request
	 * @return
	 */
	public static List<Map<String, Object>> getMyMenu(HttpServletRequest request){
		return PpWebSessionUtil.<List<Map<String,Object>>>getT(request, "myMenu");
	}
	

	/**
	 * 세션에 저장된 프로젝트 명 추출
	 * @date : 2018. 2. 13.
	 * @param request
	 * @return
	 */
	public static String getPrjctNm(HttpServletRequest request) {
		return PpWebSessionUtil.<String>getT(request, "prjctNm");
	}
	
	
	/**
	 * 세션에 저장된 프로젝트 번호 추출
	 * @date : 2018. 2. 13.
	 * @param request
	 * @return
	 */
	public static String getPrjctNo(HttpServletRequest request) {
		return PpWebSessionUtil.<String>getT(request, "prjctNo");
	}

	/**
	 * 세션에 저장된 값을 T 타입으로 리턴
	 * @date : 2018. 2. 9.
	 * @param request
	 * @param key
	 * @return 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> T getT(HttpServletRequest request, String key) {
		if(null == request || null == request.getSession()) {
			return null;
		}
		
		if(PpUtil.isEmpty(PREFIX+key)) {
			return null;
		}
		
		return (T)PpWebSessionUtil.get(request, key);		
	}
	

	/**
	 * 항목 제거
	 * @param request
	 * @param key
	 */
	public static void remove(HttpServletRequest request, String key) {
		HttpSession ss = request.getSession();
		ss.removeAttribute(PREFIX + key);
	}

	/**
	 * 세션에 값 저장
	 * @date : 2018. 2. 9.
	 * @param request
	 * @param key
	 * @param val
	 */
	public static void set(HttpServletRequest request, String key, Object val) {
		if(null == request || null == request.getSession()) {
			return;
		}
		
		if(PpUtil.isEmpty(key)) {
			return;
		}
		
		request.getSession().setAttribute(PREFIX+key, val);
		
		//
		PpWebSessionUtil.debug(request);
	}


	/**
	 * 로그인 정보 세션에 추가하기
	 * @date : 2018. 2. 9.
	 * @param request
	 * @param response
	 */
	@SuppressWarnings("rawtypes")
	public static void setLoginResult(HttpServletRequest request, Map loginResult) {
		PpWebSessionUtil.set(request, PpConst.LOGIN_RESULT, loginResult);
	}
	
	/**
	 * 로그인 정보 세션에 추가하기
	 * VO는 CsVO를 상속해야 함
	 * @param request
	 * @param response
	 * @since
	 * 	20200131	init
	 */
	public static <T extends Object> void setLoginVo(HttpServletRequest request, T loginVo) {
		PpWebSessionUtil.set(request, PpConst.LOGIN_VO, loginVo);
	}
	
	
	/**
	 * mymenu setter
	 * @param request
	 * @param myMenus
	 */
	public static void setMyMenu(HttpServletRequest request, List<Map<String,Object>> myMenus) {
		PpWebSessionUtil.set(request, "myMenu", myMenus);
	}
	
	/**
	 * 세션에 프로젝트 명 추가
	 * @date : 2018. 2. 9.
	 * @param request
	 * @param response
	 */
	public static void setPrjctNm(HttpServletRequest request, String prjctNm) {
		PpWebSessionUtil.set(request, "prjctNm", prjctNm);
	}
	
	
	/**
	 * 세션에 프로젝트 번호 추가
	 * @date : 2018. 2. 9.
	 * @param request
	 * @param response
	 */
	public static void setPrjctNo(HttpServletRequest request, String prjctNo) {
		PpWebSessionUtil.set(request, "prjctNo", prjctNo);
	}
}
