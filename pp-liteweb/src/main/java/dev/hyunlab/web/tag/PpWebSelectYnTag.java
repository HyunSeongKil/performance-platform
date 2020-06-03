/**
 * 
 */
package dev.hyunlab.web.tag;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import dev.hyunlab.core.util.PpUtil;

/**
 * 예/아니오만 존재하는 <select> 커스텀 태그
 * @author cs1492
 *
 */
public class PpWebSelectYnTag extends PpWebSelectTag {

	@Override
	public void doTag() throws IOException {
		if(PpUtil.isEmpty(super.getCss())) {
			super.setCss("wd100");
		}
		
		//
		super.setDataSource("[{'t':'예','v':'Y'},{'t':'아니오','v':'N'}]");


		StringBuffer sb = new StringBuffer();

		//
		super.appendOpenSelect(sb);


		//
		appendHeaderText(sb);

		//
		List<Map<String,Object>> datas = getDatas();
		appendOption(sb, datas);

		//
		appendCloseSelect(sb);


		getJspContext().getOut().println(sb.toString());
	}

}
