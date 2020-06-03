package dev.hyunlab.web.tag;
/*
 * <pre>
 * Copyright (c) 2014 KOICA.
 * All rights reserved.
 * 
 * This software is the confidential and proprietary information
 *
 * </pre>
 */

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import dev.hyunlab.core.util.PpUtil;

/**
 * page size tag
 * 
 * @author : cs1492
 * @date : 2014. 11. 19.
 * @version : 1.0
 */
public final class PpWebPageSizeTag extends PpWebSelectTag {
	
	@SuppressWarnings("unused")
	private static Logger log = LoggerFactory.getLogger(PpWebPageSizeTag.class);


	/**
	 * 페이지 크기 뒤에 붙일 텍스트
	 */
	private String postfixText;

	
	/* 
	 * 우선 공통 코드용 콤보박스만 구현
	 * (non-Javadoc)
	 * @see org.springframework.web.servlet.tags.RequestContextAwareTag#doStartTagInternal()
	 */
	@Override
	public void doTag() throws  IOException {
		if(PpUtil.isEmpty(super.getCss())) {
			super.setCss("w100");
		}
		
		//
		if(PpUtil.isEmpty(super.getId()) && PpUtil.isEmpty(super.getName())) {
			super.setId("pageSize");
		}
		
//		if(CsUtil.isEmpty(super.getOnChangeJs())) {
//			super.setOnChangeJs("pageObj.pageSizeChanged");
//		}
		
		StringBuffer sb = new StringBuffer();
		
		//
		super.appendOpenSelect(sb);
		
		//
		List<Map<String,Object>> datas = getDatas();
		
		//
		appendOption(sb, datas);
		
		//
		appendCloseSelect(sb);
		
		
		getJspContext().getOut().write(sb.toString());
	}
	
	
	/**
	 * 데이터 추출
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	protected <T extends Map> List<T> getDatas(){
		
		//
		String[] datas = null;
		if(PpUtil.isEmpty(getDataSource())) {
			List<String> l = new ArrayList<>();
			for(int i=10; i<=50; i+=10) {
				l.add(""+i);
			}
			//
			datas = l.toArray(new String[l.size()]);
		}else {
			datas = getDataSource().toString().split(",");
		}
		
		//
		String postfix = (PpUtil.isNotEmpty(postfixText) ? postfixText : "");
		
		//
		List<T> list = new ArrayList<>();
		for(int i=0; i<datas.length; i++) {
			T map = (T) new HashMap<>();
			list.add(map);
			
			map.put(_T, datas[i]+postfix);
			map.put(_V, datas[i]);
		}
		
		return list;
	}


	public String getPostfixText() {
		return postfixText;
	}


	public void setPostfixText(String postfixText) {
		this.postfixText = postfixText;
	}


}
