/**
 * 
 */
package dev.hyunlab.web.tag;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.google.gson.Gson;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import dev.hyunlab.core.util.PpUtil;
import dev.hyunlab.core.vo.PpVO;


/**
 * 모든 커스텀 태그의 부모
 * @author cs1492
 * @history
 * 	20200514	remove selectedValue, add initValue
 */
public abstract class PpWebTag  extends SimpleTagSupport {
	
	static Logger log = LoggerFactory.getLogger(PpWebTag.class);

	
	protected static final String _T = "t";
	protected static final String _V = "v";

	
	private String id;
	
	private String name;
	
	private String css;
	
	private String valid;
	
	private String title;
	
	private String headerValue;
	
	private String headerText = null;
	
//	private String selectedValue;
	
	private String initValue;
	
	private String selectedText;
	
	private String afterJs;
	
	/**
	 * select onchange 이벤트 발생시 호출한 js 함수
	 */
	private String onChangeJs;
	
	/**
	 * 데이터
	 * key's key : t, value's key : v
	 * json 문자열 형식의 데이터. key's key:k, value's key:v
	 * ex) [{t:'',v:''},{t:'', v:''},...]
	 */
	private Object dataSource=null;

	/**
	 * maps에서 text에 해당하는 놈의 키
	 */
	private String tKey = null;

	

	/**
	 * maps에서 value에 해당하는 놈의 키
	 */
	private String vKey = null;
	
	/**기타 */
	private String etc = "";
	

	public abstract void doTag() throws JspException,IOException;
	
	
	public String getAfterJs() {
		return afterJs;
	}




	public String getCss() {
		return css;
	}
	

	/**
	 * 그룹코드 아이디로부터  상세코드 목록 조회 후 데이터 추출
	 * @param code 
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private <T extends Map> List<T> getDataFromCode(String code){
		throw new RuntimeException("not impl");
	}
	
	
	/**
	 * json string으로부터 데이터 추출
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private List getDatasFromJsonString(String jsonString){
		log.info("<<.getDataFromJsonString");
		return (new Gson()).fromJson(jsonString, List.class);
	}
	


	/**
	 * 리스트로부터 데이터 추출
	 * @param dataSource2 
	 * @date : 2018. 2. 22.
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private <T extends Map> List<T> getDatasFromListOfMap(List<T> listOfMap){
		if(PpUtil.isEmpty(listOfMap)) {
			return listOfMap;
		}
		
		
		//
		if(PpUtil.isEmpty(tKey) || PpUtil.isEmpty(vKey)){
			throw new RuntimeException("tKey or vKey is empty");
		}
		
		//tKey,vKey가 setting된 경우...
		if((null != tKey) && (null != vKey)) {
			for(T map : listOfMap) {
				map.put(_T, map.get(tKey));
				map.put(_V, map.get(vKey));
			}
		}
		
		//
		log.info("<<.getDataFromList - {}", listOfMap.size());
		return listOfMap;
	}

	/**
	 * vo 리스트이면 map 리스트로 변환 후 리턴
	 * @param <T>
	 * @param listOfVo
	 * @return
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private <T extends Map> List<T> getDatasFromListOfVo(List listOfVo) {
		
		//
		List<T> listOfMap = new ArrayList<T>();
		
		//
		if(PpUtil.isEmpty(listOfVo)) {
			return new ArrayList<T>();
		}
		
		
		try {
			//vo 리스트를 map 리스트으로 변환
			for(Object o : listOfVo) {
				Field[] fields = o.getClass().getDeclaredFields();
				
				Map map = new HashMap();
				listOfMap.add((T)map);
				
				//
				for(Field f : fields) {
					f.setAccessible(true);
					
					//
					map.put(f.getName(), f.get(o));
				}
			}
		} catch (SecurityException | IllegalArgumentException | IllegalAccessException e) {
			log.error("{}",e);
			return listOfMap;
		}
		
		//
		return (List<T>) getDatasFromListOfMap(listOfMap);
	}

	/**
	 * List<object>를 List<map>으로 변환
	 * @param ds
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private <T extends Map> List<T> getDatasFromListOfObject(List<?> ds) {
		
		if(null == ds || 0 == ds.size()) {
			return new ArrayList<T>();
		}
		
		//
		List<T> listOfMap = new ArrayList<T>();
		
		//		
		for(Object obj : ds) {
			listOfMap.add( (T) PpUtil.convertObjectToMap(obj) );
		}
		
		// 
		log.debug("<<.getDatasFromListOfObject - size:{}", listOfMap.size());
		return listOfMap;
	}


	/**
	 * 여러 데이터 소스에서 할당된 데이터 조회하여 리턴
	 * @date : 2018. 2. 7.
	 * @return
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected <T extends Map> List<T> getDatas(){
		log.info(">>.getDatas - dataSource:{}", (null != dataSource?dataSource.getClass():"null"));
		
		if(null == dataSource) {
			return new ArrayList<T>();
		}
		
		//
		if(dataSource instanceof Iterable) {
			log.debug(".getDatas - size:{}", ((List)getDataSource()).size());
			
			//
			if(PpUtil.isEmpty(((List)dataSource))){
				return new ArrayList<T>();				
			}
			
			//
			Object element = ((List)dataSource).get(0);
			log.debug(".getDatas - element:{}", element.getClass());
			
			//
			if(element instanceof Map) {
				return getDatasFromListOfMap((List)dataSource);
			}else if(element instanceof PpVO) {
				return getDatasFromListOfVo((List)dataSource);
			}else {
				return getDatasFromListOfObject((List)dataSource);
			}
			
		}
		
		//
		if(String.class == dataSource.getClass()) {
			String s = (String)dataSource;
			
			//
			if(s.trim().startsWith("[") && s.trim().endsWith("]")) {
				return getDatasFromJsonString((String)dataSource);
			}
			
			//
			if(s.trim().toLowerCase().startsWith("code;")) {
				return getDataFromCode((String)dataSource);
			}
		}
		
		
		
		//
		return new ArrayList<T>();
	}
	
	
	protected String getTextKey() {
		return (null != gettKey()? gettKey() : _T);
	}
	
	protected String getValueKey() {
		return (null != getvKey()? getvKey() : _V);
	}

	
	public Object getDataSource() {
		return dataSource;
	}

	public String getHeaderText() {
		return headerText;
	}

	public String getHeaderValue() {
		return headerValue;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getOnChangeJs() {
		return onChangeJs;
	}

	public String getSelectedText() {
		return selectedText;
	}

//	public String getSelectedValue() {
//		return selectedValue;
//	}

	
	public String getTitle() {
		return title;
	}

	public String gettKey() {
		return tKey;
	}

	public String getValid() {
		return valid;
	}

	public String getvKey() {
		return vKey;
	}

	public void setAfterJs(String afterJs) {
		this.afterJs = afterJs;
	}

	public void setCss(String css) {
		this.css = css;
	}

	public void setDataSource(Object dataSource) {
		this.dataSource = dataSource;
//		log.debug("", dataSource);
	}

	public void setHeaderText(String headerText) {
		if("ALL".equals(headerText)) {
			this.headerText = "전체";
		}
		
		else if("SEL".equals(headerText)) {
			this.headerText = "선택";

		}else {
			this.headerText = headerText;
		}
	}

	public void setHeaderValue(String headerValue) {
		this.headerValue = headerValue;
	}

	public void setId(String id) {
		this.id = id;
	}

	
	public void setName(String name) {
		this.name = name;
	}

	public void setOnChangeJs(String onChangeJs) {
		this.onChangeJs = onChangeJs;
	}

	public void setSelectedText(String selectedText) {
		this.selectedText = selectedText;
	}


//	public void setSelectedValue(String selectedValue) {
//		this.selectedValue = selectedValue;
//	}


	public void setTitle(String title) {
		this.title = title;
	}


	public void settKey(String tKey) {
		this.tKey = tKey;
		log.debug("<<.settKey - {}", this.tKey);
	}


	public void setValid(String valid) {
		this.valid = valid;
	}


	public void setvKey(String vKey) {
		this.vKey = vKey;
		log.debug("<<.setvKey - {}", this.vKey);
	}


	public String getInitValue() {
		return initValue;
	}


	public void setInitValue(String initValue) {
		this.initValue = initValue;
	}

	public String getEtc(){
		return this.etc;
	}

	public void setEtc(String etc){
		this.etc = etc;
	}


}
