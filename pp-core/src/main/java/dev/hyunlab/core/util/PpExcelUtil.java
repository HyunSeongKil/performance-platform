/**
 * 
 */
package dev.hyunlab.core.util;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 엑셀 관련 유틸
 * @author cs1492
 *
 */
public class PpExcelUtil {
	static final Logger LOGGER = LoggerFactory.getLogger(PpExcelUtil.class);
	
	/**
	 * row 생성, 데이터 바인드
	 * @param sheet 시트
	 * @param rownum 행번호
	 * @param datas 데이터 목록
	 * @return 생성된 행
	 */
	public static Row createRow(Sheet sheet, int rownum, String[] datas) {
		Row row = sheet.createRow(rownum);
		
		//
		for(int i=0; i<datas.length; i++) {
			row.createCell(i).setCellValue(datas[i]);
		}
		
		//
		return row;
	}
	
	/**
	 * row 생성, 데이터 바인드
	 * @param sheet 시트
	 * @param rownum 행번호
	 * @param data 데이터
	 * @param keys 키목록
	 * @return 생성된 행
	 */
	public static Row createRow(Sheet sheet, int rownum, Map<String,Object> data, String[] keys) {
		Row row = sheet.createRow(rownum);
		
		//
		int i=0;
		String k;
		boolean b;
		for(String s : keys) {
			Iterator<String> iter = data.keySet().iterator();
			b = false;
			
			while(iter.hasNext()) {
				k = iter.next();
				
				if(s.equals(k)) {
					row.createCell(i++).setCellValue(data.get(k).toString());
					b = true;
					break;
				}
			}
			
			//
			if(!b) {
				row.createCell(i++).setCellValue("");
			}
		}
		
		//
		return row;
	}
	
	/**
	 * row 생성, 데이터 바인드
	 * @param sheet 시트
	 * @param rownum 행번호
	 * @param datas 데이터 목록
	 * @param keys 키 목록
	 * @return 생성된 행
	 */
	public static Row createRow(Sheet sheet, int rownum, List<Map<String,Object>> datas, String[] keys) {
		int i = rownum;
		for(Map<String,Object> data : datas) {
			createRow(sheet, i++, data, keys);
		}
		
		//
		return null;
	}

	

	/**
	 * workbook에 sheet 생성
	 * @param workbook workbook
	 * @param sheetName 생성할 sheet의 이름
	 * @param titles 제목줄에 표시할 제목 목록
	 * @param keys 데이터 목록
	 * @param data map에서 데이터를 추출할 key의 목록
	 * @return  생성된 시트
	 */
	public static Sheet createSheet(Workbook workbook, String sheetName, String[] titles, Map<String,Object> data, String[] keys) {
		LOGGER.debug(".createSheet");
		
		List<Map<String,Object>> list = new ArrayList<>();
		list.add(data);
		
		return createSheet(workbook, sheetName, titles, list, keys);
	}

	/**
	 * workbook에 sheet 생성
	 * @param workbook workbook
	 * @param sheetName 생성할 sheet의 이름
	 * @param titles 제목줄에 표시할 제목 목록
	 * @param datas 데이터 목록
	 * @param keys map에서 데이터를 추출할 key의 목록
	 * @return 생성된 시트
	 */
	public static Sheet createSheet(Workbook workbook, String sheetName, String[] titles, List<Map<String,Object>> datas, String[] keys) {
		LOGGER.debug(".createSheet - workbook:{}, sheetName:{}, titles:{}, datas:{}, keys:{}"
				, workbook
				, sheetName
				, (null != titles ? titles.length : 0)
				, (null != datas ? datas.size() : 0)
				, (null != keys ? keys.length : 0));
		
		
		Sheet sheet = workbook.createSheet(PpUtil.nvl(sheetName,"sheet").toString());
		
		//
		if(PpUtil.isEmpty(titles)) {
			return sheet;
		}
		
		//제목 row 생성
		createRow(sheet, 0, titles);		
		
		//
		if(PpUtil.isNull(datas) || PpUtil.isNull(keys)) {
			return sheet;
		}
		
		//데이터 row 생성
		createRow(sheet, 1, datas, keys);
		
		
		//
		return sheet;
	}

}
