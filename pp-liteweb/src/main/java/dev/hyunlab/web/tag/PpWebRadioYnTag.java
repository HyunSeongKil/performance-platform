/**
 * 
 */
package dev.hyunlab.web.tag;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import dev.hyunlab.core.util.PpUtil;

/**
 * <input type="radio"> 커스텀 태그
 * @author cs1492
 *
 */
public class PpWebRadioYnTag extends PpWebRadioTag {

	@Override
	public void doTag() throws IOException {
		//
		super.setDataSource("[{'t':'Y','v':'Y'},{'t':'N','v':'N'}]");
		
		StringBuffer sb = new StringBuffer();
		
		//
		super.appendHeaderText(sb);
		
		//
		List<Map<String,Object>> datas = super.getDatas();
		
		if(PpUtil.isEmpty(datas)) {
			getJspContext().getOut().write(sb.toString());
			
			return;
		}

		//
		sb = super.createRadios(datas, sb);
		
		
		//
		getJspContext().getOut().write(sb.toString());
	}


}
