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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import dev.hyunlab.core.util.PpUtil;


/**
 * UI =&gt; DB 파라미터 전달용 클래스
 * @author cs1492
 * @since   2018. 3. 16.
 *
 */
public class PpMap extends HashMap<String, Object> {
	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(PpMap.class);
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	/**
	 * map의 key/value를 CsMap으로 복사
	 * @param map key/value를 복사해올 원본 맵
	 * @return 맵
	 */
	public static PpMap copyFrom(Map<String,Object> map) {
		if(null == map) {
			return null;
		}
		
		Iterator<String> iter = map.keySet().iterator();
		String k;
		
		PpMap csmap = new PpMap();
		
		while(iter.hasNext()) {
			k = iter.next();
			
			csmap.put(k, map.get(k));
		}
		
		return csmap;
	}
	
	
	/**
	 * map에서 특정 key/value만 복사
	 * @param map 맵
	 * @param keys key 목록
	 * @return 맵
	 */
	public static PpMap copyFrom(Map<String,Object> map, String...keys) {
		if(null == map) {
			return null;
		}
		
		PpMap csmap = new PpMap();
		
		for(String k : keys) {
			csmap.put(k, map.get(k));
		}
		
		
		return csmap;
	}
	
	
	/**
	 * key/value 추가 후 인스턴스 리턴
	 * @param key key
	 * @param value 값
	 * @return 맵
	 */
	public PpMap add(String key, Object value) {
		this.put(key, value);
		return this;
	}
	
	
	/**
	 * map의 key/value를 map에 복사
	 * @param map key/value를 복사할 대상 맵
	 * @return 값
	 */
	public Map<String, Object> copyTo(Map<String,Object> map) {
		if(null == map) {
			return null;
		}
		
		Iterator<String> iter = this.keySet().iterator();
		String k;
		while(iter.hasNext()) {
			k = iter.next();
			
			map.put(k, this.get(k));
		}
		
		return map;
	}
	
	
	/**
	 * key의 값을 문자열 배열로 리턴
	 * @param key 키
	 * @return 값
	 */
	public String[] getArr(String key) {
		Object o = get(key);
		
		if(null == o) {
			return null;
		}
		
		//문자열 배열이면
		if(String[].class == o.getClass()) {
			return (String[]) o;
		}
		
		//리스트이면
		if(ArrayList.class == o.getClass()) {
			@SuppressWarnings({ "rawtypes", "unchecked" })
			List<Object> list = (ArrayList)o;
			String[] arr = new String[list.size()];
			
			for(int i=0; i<list.size(); i++) {
				arr[i] = list.get(i).toString();
			}
			
			return arr;
		}
		
		//그냥 문자열이면
		if(String.class == o.getClass()) {
			return new String[] {o.toString()};
		}
		
		return null;
    }
	
	/**
	 * key의 값을 Boolean형으로 리턴
	 * @param key key
	 * @return 값
	 * @since	
	 * 	0207	init
	 */
	public Boolean getBoolean(String key) {
		if(!this.containsKey(key)){
			return null;
		}
		
		//
		if(this.get(key) instanceof Boolean) {
			return (Boolean) this.get(key);
		}
		
		//
		if(this.get(key) instanceof String) {
			return Boolean.parseBoolean(""+this.get(key));
		}
		
		//
		return null;
	}
	

	/**
	 * key의 class 리턴
	 * @param key key
	 * @return 클래스
	 * @since
	 * 	0207	init
	 */
	public Class<?> getClass(String key) {
		return this.get(key).getClass();
	}
	
	
	/**
	 * key의 값을 Doble형으로 리턴
	 * @param key 키
	 * @return 값
	 */
	public double getDouble(String key) {
		double rtnValue = 0.0;
		try {
			rtnValue = new Double(getString(key)).doubleValue();
		} catch (NumberFormatException e) {			
			rtnValue = 0.0;
        }
		return rtnValue;
	}
	
	/**
	 * key의 값을 int형으로 리턴
	 * @param key 키
	 * @return 값
	 */
	public int getInt(String key) {
		return (int) getDouble(key);
	}
	
	/**
	 * 맵에 저장된 로그인 정보 리턴
	 * @return 값
	 */
	public PpMap getLoginResult() {
		return (PpMap)this.get(PpConst.LOGIN_RESULT);
	}
	
	/**
	 * key의 값을 Long형으로 리턴
	 * @param key 키
	 * @return 값 
	 */
	public long getLong(String key) {
		return (long) getDouble(key);
	}	
	
	
	

	/**
	 * key의 값을 String으로 리턴
	 * @param key 키
	 * @return 값
	 */
	public String getString(String key) {
		if(null == super.get(key)) {
			return "";
		}
		
		return ""+super.get(key);
	}
	
	/**
	 * 맵의 값을 문자열로 리턴
	 * @param key key
	 * @param defaultValue	default value
	 * @return 값
	 */
	public String getString(String key, String defaultValue) {
		String result = this.getString(key);
		
		//
		if(PpUtil.isEmpty(result)) {
			return defaultValue;
		}else {
			return result;
		}
	}
	
	
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
	 * CsMap의 key/value를 json 문자열로 리턴
	 * @return 문자열
	 */
	public String toJsonString(){
		return (new com.google.gson.Gson()).toJson(this);
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
		
		return sb.toString();
	}
	
	@SuppressWarnings("rawtypes")
	public String toString(ToStringStyle style) {
		String str = "";

		//
		if(ToStringStyle.SHORT_PREFIX_STYLE == style) {
			Iterator<String> iter = this.keySet().iterator();
			
			List<String> keys = new ArrayList<String>();
			while(iter.hasNext()) {
				keys.add(iter.next());
			}
			
			//
			Collections.sort(keys);
			
			//
			Object o;
			for(String k : keys) {
				str += k + ":";
				
				//
				o = this.get(k);
				
				if(null == o) {
					str += "\t";
					continue;
				}
				
				//
				if(List.class == o.getClass()) {
					if(10 > ((List)o).size()) {
						str += o;
					}else {
						str += ((List)o).size();
					}
				}else if(ArrayList.class == o.getClass()) {
					if(10 > ((ArrayList)o).size()) {
						str += o;
					}else {
						str += ((ArrayList)o).size();
					}
				}else if(Object[].class == o.getClass()) {
					if(10 > ((Object[])o).length){
						str += o;
					}else {
						str += ((Object[])o).length;
					}
				}else {
					str += o;
				}
				
				str += "\t";
			}
		}else {
			str = this.toString();
		}
		
		return str;
	}
	
	/**
	 * List로 리턴
	 * @param key key
	 * @return List
	 */
	public List<String> getList(String key){
		String[] arr = this.getArr(key);

		//
		List<String> list = new ArrayList<String>();
		
		//
		if(null == arr || 0 == arr.length) {
			return list;
		}
		
		//
		for(String v : arr) {
			list.add(v);
		}
		
		//
		return list;
	}
	
	
	/**
	 * key에 해당하는 값 검사
	 * @param key key
	 * @return true(key 미 존재시, key는 존재하나 값이 널|공백이면)/false
	 */
	public boolean isEmpty(String key) {
		if(!this.containsKey(key)) {
			return true;
		}
		
		//
		return PpUtil.isEmpty(this.get(key));
	}
	
	/**
	 * key에 해당하는 값 검사
	 * @param key key
	 * @return true(key가 존재하고 값이 널|공백이 아니면)/false
	 */
	public boolean isNotEmpty(String key) {
		return !this.isEmpty(key);
	}

}
