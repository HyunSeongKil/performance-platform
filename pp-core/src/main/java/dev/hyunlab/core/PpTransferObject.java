/**
 * 
 */
package dev.hyunlab.core;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.builder.ToStringStyle;

import dev.hyunlab.core.util.PpUtil;
import dev.hyunlab.core.vo.PpVO;

/**
 * DB => UI 데이터 전달 클래스
 * @author cs1492
 * @date   2018. 3. 16.
 *
 */
@SuppressWarnings("serial")
public class PpTransferObject extends HashMap<String, Object> {
	

	private static final String RESULT_CODE = "resultCode";
	private static final String RESULT_MESSAGE = "resultMessage";

	
	
	/**
	 * 생성자 
	 */
	public PpTransferObject() {
		setResultCode("");
		setResultMessage("");
	}
	
	/**
	 * 데이터 1건 구하기
	 * @return
	 */
	public <T extends Map<String,Object>> T getData(){
		return PpUtil.getData(this);
	}
	
	/**
	 * 데이터 1건의 특정값 구하기
	 * @param key map's key
	 * @return
	 */
	public Object getData(String key){
		Map<String,Object> data = PpUtil.getData(this);
		if(null == data) {
			return null;
		}
		
		return data.get(key);
	}
	
	/**
	 * 데이터 목록(n건) 구하기
	 * @return
	 */
	public <T extends Map<String,Object>> List<T> getDatas(){
		return PpUtil.getDatas(this);
	}
	
	
	/**
	 * 모델 추출
	 * @param <T>
	 * @return
	 */
	public < T extends PpVO> T getModel(){
		return this.<T>getT(PpConst.MODEL);
	}
	
	
	/**
	 * 모델 목록 추출
	 * @param <T>
	 * @return
	 */
	public < T extends PpVO> List<T> getModels(){
		return this.<List<T>>getT(PpConst.MODELS);
	}
	
	
	/**
	 * key의 값을 generic으로 리턴
	 * @param key
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <T> T getT(String key) {
		return (T)this.get(key);
	}
	


	public String getResultCode() {
		return (String)this.get(RESULT_CODE);
	}



	public void setResultCode(String resultCode) {
		this.put(RESULT_CODE, resultCode);
	}



	public String getResultMessage() {
		return (String)this.get(RESULT_MESSAGE);
//		return resultMessage;
	}
	
	
	/* (non-Javadoc)
	 * @see java.util.HashMap#put(java.lang.Object, java.lang.Object)
	 */
	public PpTransferObject add(String key, Object value) {
		super.put(key, value);
		
		return this;
	}



	public void setResultMessage(String resultMessage) {
		this.put(RESULT_MESSAGE, resultMessage);
//		this.resultMessage = resultMessage;
	}
	
	
	/**
	 * this에 DATA put한 후 리턴
	 * @param data
	 * @return
	 */
	public PpTransferObject putData(Map<String,Object> data) {
		this.put(PpConst.DATA, data);
		
		return this;
	}
	
	/**
	 * CsTransferObject에 모델 추가
	 * @param t
	 * @return
	 */
	public <T extends PpVO> PpTransferObject putModel(T t) {
		this.put(PpConst.MODEL, t);
		
		return this;
	}
	
	
	/**
	 * this에 DATAS put한 후 리턴
	 * @param datas
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public <T extends Map> PpTransferObject putDatas(List<T> datas) {
		this.put(PpConst.DATAS, datas);
		
		return this;
	}

	/**
	 * CsTransferObject에 모델 목록 추가
	 * @param t
	 * @return
	 */
	public <T extends PpVO> PpTransferObject putModels(List<T> list) {
		this.put(PpConst.MODELS, list);
		
		return this;
	}


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
