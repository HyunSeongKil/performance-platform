/**
 * 
 */
package dev.hyunlab.web.tag;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import dev.hyunlab.core.util.PpUtil;

/**
 * <select> 커스텀 태그
 * @author cs1492
 *
 */
public class PpWebSelectTag extends PpWebTag {
	static Logger log = LoggerFactory.getLogger(PpWebSelectTag.class);

	@Override
	public void doTag() throws IOException {
		//
		log.debug(">>.doTag - {}", ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE));

		StringBuffer sb = new StringBuffer();
		
		//
		appendOpenSelect(sb);
		
		
		//
		List<Map<String,Object>> datas = getDatas();
		
		//
		if(PpUtil.isEmpty(datas)) {
			appendCloseSelect(sb);
			
			getJspContext().getOut().println(sb.toString());
			return;
		}
		
		//
		appendHeaderText(sb);
		
		//
		appendOption(sb, datas);
		
		//
		appendCloseSelect(sb);
		
		
		getJspContext().getOut().println(sb.toString());		
		
		//
		log.debug("<<.doTag");

	}
	

	/**
	 * select의 닫는 태그 추가
	 * @date : 2018. 2. 7.
	 * @param sb
	 */
	protected void appendCloseSelect(StringBuffer sb) {
		sb.append("</select>");
	}


	/**
	 * select의 여는 태그 추가
	 * @date : 2018. 2. 7.
	 * @param sb
	 */
	protected void appendOpenSelect(StringBuffer sb) {
		sb.append("<select");
		
		if(!PpUtil.isEmpty(getId())) {
			sb.append(" id='"+getId()+"'");
		}
		
		if(!PpUtil.isEmpty(getName())) {
			sb.append(" name='"+getName()+"'");
		}
		
		if(!PpUtil.isEmpty(getCss())) {
			sb.append(" class='"+getCss()+"'");
		}
		
		if(!PpUtil.isEmpty(getOnChangeJs())) {
			sb.append(" onchange='"+getOnChangeJs()+"(this)'");
		}
		
		if(!PpUtil.isEmpty(getValid())) {
			sb.append(" data-v='"+getValid()+"'");
		}
		
		if(!PpUtil.isEmpty(getTitle())) {
			sb.append(" title='"+getTitle()+"'");
		}

		if(!PpUtil.isEmpty(getEtc())){
			sb.append(" " + getEtc());
		}
		
		sb.append(">");
	}


	/**
	 * option 추가
	 * @date : 2018. 2. 7.
	 * @param sb
	 * @param datas
	 */
	protected void appendOption(StringBuffer sb, List<Map<String, Object>> datas) {
		if(null == datas || 0 == datas.size()) {
			return;
		}
		
		Map<String,Object> map;
		for(int i=0; i<datas.size(); i++) {
			map = datas.get(i);
			
			if(null == map.get(getValueKey())) {
				log.info(".appendOption vKey:{} tKey:{} map:{}", getTextKey(), getValueKey(), map);
				continue;
			}
			
			sb.append("<option value='"+map.get(getValueKey())+"'");
			
			
			//선택값이 있으면
			if(map.get(getValueKey()).toString().equals(getInitValue())) {
				sb.append(" selected='selected'");
			}
			sb.append(">");
			
			sb.append(map.get(getTextKey())).append("</option>");
		}
	}


	/**
	 * headerText값 추가
	 * @date : 2018. 2. 7.
	 * @param sb
	 */
	protected void appendHeaderText(StringBuffer sb) {
		if(null == getHeaderText()) {
			return;
		}
		
		sb.append("<option value=''>"+getHeaderText()+"</option>");
	}


}
