/**
 * 
 */
package dev.hyunlab.core;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang.builder.ToStringStyle;

import dev.hyunlab.core.util.PpUtil;

/**
 * DB =&gt; UI 데이터 전달 클래스
 * @author cs1492
 * @since   2018. 3. 16.
 *
 */
@SuppressWarnings("serial")
public class PpTransferObject extends HashMap<String, Object> {
	

	private static final String RESULT_CODE = "resultCode";
	private static final String RESULT_MESSAGE = "resultMessage";

	
	/**
	 * key의 값을 generic으로 리턴
	 * @param <T> 리턴 타입
	 * @param key key
	 * @return 값
	 */
	@SuppressWarnings("unchecked")
	public <T> T getT(String key) {
		return (T)this.get(key);
	}
	


	/**
	 * get resultCode
	 * @return 결과 코드
	 */
	public String getResultCode() {
		return (String)this.get(RESULT_CODE);
	}


	/**
	 * set resultCode
	 * @param resultCode 결과 코드
	 */
	public void setResultCode(String resultCode) {
		this.put(RESULT_CODE, resultCode);
	}



	/**
	 * get resultMessage
	 * @return 문자열
	 */
	public String getResultMessage() {
		return (String)this.get(RESULT_MESSAGE);
//		return resultMessage;
	}
	
	
	/* (non-Javadoc)
	 * @ref java.util.HashMap#put(java.lang.Object, java.lang.Object)
	 */
	public PpTransferObject add(String key, Object value) {
		super.put(key, value);
		
		return this;
	}





	/**
	 * toString
	 * @return 문자열
	 */
	@Override
	public String toString() {
		StringBuffer sb = new StringBuffer();
		
		Iterator<String> iter = this.keySet().iterator();
		String k;
		while(iter.hasNext()) {
			k = iter.next();
			
			sb.append(k).append(":").append(this.get(k)).append("\n");
		}
		
		//
		return sb.toString();
	}
	
	/**
	 * toString
	 * @param style 스타일
	 * @return 문자열
	 */
	public String toString(ToStringStyle style) {
		String str = "";

		//
		if(style == ToStringStyle.SHORT_PREFIX_STYLE) {
			Iterator<String> iter = this.keySet().iterator();
			
			List<String> keys = new ArrayList<String>();
			while(iter.hasNext()) {
				keys.add(iter.next());
			}
			
			//
			Collections.sort(keys);
			
			//
			for(String k : keys) {
				str += k + ":" + this.get(k) + "\t";
			}
		}else {
			str = this.toString();
		}
		
		//
		if(PpUtil.isNotEmpty(this.getResultCode())) {
			str += "resultCode:" + this.getResultCode() + "\t";
		}
		
		//
		if(PpUtil.isNotEmpty(this.getResultMessage())) {
			str += "resultMessage:" + this.getResultMessage() + "\t";
		}
		
		return str;
	}

}
