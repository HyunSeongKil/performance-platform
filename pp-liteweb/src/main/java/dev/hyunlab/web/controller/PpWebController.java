/**
 * @author	cs1492
 * @since	2017. 9. 1.
 */
package dev.hyunlab.web.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.file.Paths;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import dev.hyunlab.core.PpConst;
import dev.hyunlab.core.util.PpUtil;
import dev.hyunlab.core.vo.PpFileVO;
import dev.hyunlab.web.util.PpWebSessionUtil;


/**
 * 모든 컨트롤러의 부모 class
 * @author	cs1492
 * @since	2017. 9. 1.
 */
public class PpWebController {
	private static Logger log = LoggerFactory.getLogger(PpWebController.class);
	
	
	/**
	 * 파일 다운로드
	 * @param response
	 * @param fileVo
	 * @throws IOException
	 * @since
	 * 	20200131	init
	 */
	protected void downloadFile(HttpServletResponse response, PpFileVO fileVo) throws IOException {
		
		File file = fileVo.getFullPath().toFile();
		
		if(null == file || !file.exists()){
			OutputStream os = response.getOutputStream();
			os.write("file not found".getBytes(Charset.forName("utf-8")));
			os.close();
			return;
			
		}
		
		response.setHeader("Content-Transfer-Encoding", "binary;");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "-1");
		
		
		response.setContentType( fileVo.getContentType() +";charset=UTF-8");
		response.setContentLength(Integer.parseInt(fileVo.getSize()));
		
		//한글파일명 깨짐 현상 해결 필요
//		System.out.println(filename);
		response.setHeader("Content-Disposition", String.format("inline; filename=\""+fileVo.getOrginlFileName()+"\""));
		
		InputStream is = null;
		try {
			is = new BufferedInputStream(new FileInputStream(file)); 
			
			IOUtils.copy(is, response.getOutputStream());
			
			response.flushBuffer();
		} catch (IOException e) {
			log.error("{}",e);
		}finally {
			if(null != is) {
				is.close();
			}
		}
	}

	/**
	 * 파일 다운로드
	 * @param response
	 * @param map
	 * @throws IOException
	 * @since
	 * 	20200131	generic type으로 변경. deprecated. @see kr.co.ucsit.web.controller.CsWebAbstractController.downloadFile(HttpServletResponse, CsFileVO)
	 */
	@Deprecated
	@SuppressWarnings("rawtypes")
	protected <T extends Map> void downloadFile(HttpServletResponse response, T map) throws IOException{
		PpFileVO fileVo = new PpFileVO();
		
		fileVo.setFullPath(Paths.get(map.get("filePath").toString()));
		fileVo.setContentType(map.get("contentType").toString());
		fileVo.setSize(map.get("fileSize").toString());
		fileVo.setOrginlFileName(map.get("fileName").toString());
		
		//
		downloadFile(response, fileVo);
	}
	
	
	/**
	 * session에 저장된 loginVo를 paramMap에 저장하기
	 * @param request
	 * @param paramMap
	 * @since
	 * 	20200131	init
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	protected <T extends Map> void putLoginVoToParamMap(HttpServletRequest request, T paramMap){
		paramMap.put(PpConst.LOGIN_VO, PpWebSessionUtil.getLoginVo(request));
	}
	
	
	/**
	 * paramMap에 loginResult 바인드
	 * @param request
	 * @param paramMap
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void bindLoginResult(HttpServletRequest request, Map paramMap){
		paramMap.put(PpConst.LOGIN_RESULT, request.getSession().getAttribute(PpConst.LOGIN_RESULT));
	}

	
	/**
	 * request -> paramMap 바인드
	 * @param request
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	protected <T extends Map> T bindParamMap(HttpServletRequest request, T paramMap) {
		if(null == paramMap){
			paramMap = (T)new HashMap();
		}
		
		Enumeration<String> en = request.getParameterNames();
		
		String k;
		
		while(en.hasMoreElements()){
			k = en.nextElement();
			
			paramMap.put(k, request.getParameter(k));
			
			if(1 < request.getParameterValues(k).length){
				paramMap.put(k, request.getParameterValues(k));
			}
		}
		
		//로그인 vo paramMap에 put
		this.putLoginVoToParamMap(request, paramMap);
		
		//
		if(!paramMap.containsKey("P_PAGE_NO") || PpUtil.isEmpty(""+paramMap.get("P_PAGE_NO"))){
			paramMap.put("P_PAGE_NO", 1);
		}
		
		if(!paramMap.containsKey("P_PAGE_SIZE") || PpUtil.isEmpty(""+paramMap.get("P_PAGE_SIZE"))){
			paramMap.put("P_PAGE_SIZE", 10);
		}
		
		if(String.class == paramMap.get("P_PAGE_SIZE").getClass()){
			paramMap.put("P_PAGE_SIZE", Integer.parseInt(""+paramMap.get("P_PAGE_SIZE")));
		}
		
		
		int offSet = (Integer.parseInt(""+paramMap.get("P_PAGE_NO")) - 1) * Integer.parseInt(""+paramMap.get("P_PAGE_SIZE"));
		paramMap.put("P_OFFSET", offSet);
		
		return paramMap;
	}
}
