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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import dev.hyunlab.core.PpMap;

/**
 * 페이징 Custom Tag
 * @author : cs1492
 * @date : 2014. 11. 19.
 * @version : 1.0
 */
public final class PpWebPaginationTag extends PpWebTag {
	static Logger log = LoggerFactory.getLogger(PpWebPaginationTag.class);

	/**
	 * 총건수
	 */
	private int totalCount = 0;

	/**
	 * 페이지번호
	 */
	private int pageNo = 1;

	/**
	 * 페이지사이즈
	 */
	private int pageSize = 10;

	/**
	 * 총페이지
	 */
	private int totalPage = 0;

	/**
	 * Display 페이지 수
	 */
	private int displayPageCount = 10;

	
	private PpMap csMap = null;

	private String css="";
	



	@Override
	public void doTag() throws  IOException {

		if(null != this.csMap) {
			this.pageNo = csMap.getInt("pageNo");
			this.pageSize = csMap.getInt("pageSize");
		}
		
		//
		log.debug("pageNo:{} pageSize:{} tot:{}", pageNo, pageSize, totalCount);

		drawPaging();
	}

	private void drawPaging() throws IOException {
		
		this.totalPage = (this.totalCount / this.pageSize) + ((this.totalCount*1.0) % (this.pageSize*1.0) > 0 ? 1 :  0);		

		int curPos = (this.pageNo / this.displayPageCount) + ((this.pageNo*1.0) % (this.displayPageCount*1.0) > 0 ? 1 : 0);		

		int prevPage	= curPos > 1 ?  (curPos - 1) * this.displayPageCount : 0;
		int nextPage = (curPos * this.displayPageCount + 1) <= this.totalPage ? curPos * this.displayPageCount + 1 : 0;

		int start =((this.pageNo / this.displayPageCount) + ((this.pageNo*1.0) % (this.displayPageCount*1.0) > 0 ? 1 : 0)) * this.displayPageCount - (this.displayPageCount - 1);
		int end = ((this.pageNo / this.displayPageCount) + ((this.pageNo*1.0) % (this.displayPageCount*1.0) > 0 ? 1 : 0)) * this.displayPageCount;


		if(end > this.totalPage) {
			end = this.totalPage;
		}		

		StringBuffer sb = new StringBuffer();

		sb.append("<ul class='"+css+"'>");

		if( start > end ){
			//sb.append("<a href=\"#\" class=\"pprev\" title=\"맨앞으로\" style=\"display: none;\"><span style=\"display: none;\">맨앞으로</span></a>");
		}else{
			//sb.append("<a href=\"javascript:" + onClickedJs + "(1)\" class=\"pprev\" title=\"맨앞으로\"><span style=\"display: none;\">맨앞으로</span></a>");
		}
		
		if(this.pageNo > this.displayPageCount) {
			sb.append(String.format("<li class='before' title='이전'><a href='javascript:;' data-no='%s'>&lt;</a></li>", prevPage));
		} else {
			sb.append("<li class='before' title='이전'><a href='javascript:;' ></a></li>");
		}
		
		
		if( start > end ){
			sb.append("<li class='on'><a href=\"javascript:;\" class=\"active\" title=\"1\" data-no='1'>1</a></li>");
		}else{

			for(int i=start ; i<=end ; i++) {
				if(i == this.pageNo) {
					sb.append("<li class='on'><a href='javascript:;' >" + i + "</a></li>");
				} else {
					sb.append(String.format("<li class=''><a href='javascript:;' data-no='%s'>%s</a></li>", i, i));
				}
			}

		}

/*		System.out.println("this.pageNo => " + this.pageNo);
		System.out.println("this.totalPage => " + this.totalPage);
		System.out.println("this.totalCount => " + this.totalCount);
		System.out.println("this.pageSize => " + this.pageSize);
		System.out.println("this.nextPage => " + nextPage);*/


		if(this.totalPage >= nextPage && nextPage != 0) {
			sb.append(String.format("<li class='after next' title='다음'><a href='javascript:;' data-no='%s'>&gt;</a></li>", nextPage));
		} else {
			//sb.append("<a href=\"#\" class=\"next\" title=\"뒤로\"><span style=\"display: none;\">뒤로</span></a>");
			sb.append("<li class='after next'><a href='javascript:;'></a></li>");
		}

		if( start > end ){
			//sb.append("<a href=\"#\" class=\"nnext\" title=\"맨뒤로\" style=\"display: none;\"><span style=\"display: none;\">맨뒤로</span></a>");
		}else{
			//sb.append("<a href=\"javascript:" + onClickedJs + "(" + totalPage + ")\" class=\"nnext\" title=\"맨뒤로\"><span style=\"display: none;\">맨뒤로</span></a>");
		}
		

		sb.append("</ul>");
		
		
		getJspContext().getOut().write(sb.toString());
	}
	

	public PpMap getParamMap() {
		return csMap;
	}

	public void setCsMap(PpMap csMap) {
		this.csMap = csMap;
	}

	

	/**
	 * 총건수를 Set 한다.
	 * @param totalCount
	 * @author : cs1492 
	 * @date : 2014. 11. 27.
	 */
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	/**
	 * 페이지번호를 Set 한다.
	 * @param pageNo
	 * @author : cs1492 
	 * @date : 2014. 11. 27.
	 */
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo < 1 ? 1 : pageNo;
	}

	/**
	 * 페이지사이즈를 Set 한다.
	 * @param pageSize
	 * @author : cs1492 
	 * @date : 2014. 11. 27.
	 */
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize < 1 ? 10 : pageSize;
	}

	/**
	 * Display 페이지 건수를 Set 한다.
	 * @param displayPageCount
	 * @author : cs1492 
	 * @date : 2014. 11. 27.
	 */
	public void setDisplayPageCount(int displayPageCount) {
		this.displayPageCount = displayPageCount < 1 ? 10 : displayPageCount;
	}
	


	public String getCss() {
		return css;
	}

	public void setCss(String css) {
		this.css = css;
	}
}
