/**
 * 
 */
package dev.hyunlab.core.vo;

import java.io.File;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * vo class
 * 
 * @author cs1492
 * @since 2018. 3. 16.
 *
 */
public class PpVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 조회 조건
	 */
	private String searchCondition;

	/**
	 * 조회 키워드
	 */
	private String searchKeyword;

	/**
	 * 페이지 번호
	 */
	private Integer pageNo;

	/**
	 * 페이징 크기
	 */
	private Integer pageSize;

	/**
	 * 페이징 시작 위치
	 */
	private int offset;

	private String registerId;

	private String registerNm;

	private Date registDt;

	private String updusrId;

	private String updusrNm;

	private Date updtDt;

	private String deleteAt;

	private String searchRegisterId;

	private String searchFromDe;

	private String searchToDe;

	private List<File> files;

	private Integer startPageIndex;

	private Integer endPageIndex;

	public String getSearchCondition() {
		return searchCondition;
	}

	public Integer getEndPageIndex() {
		return endPageIndex;
	}

	public void setEndPageIndex(Integer endPageIndex) {
		this.endPageIndex = endPageIndex;
	}

	public Integer getStartPageIndex() {
		return startPageIndex;
	}

	public void setStartPageIndex(Integer startPageIndex) {
		this.startPageIndex = startPageIndex;
	}

	public List<File> getFiles() {
		return files;
	}



	public void setFiles(List<File> files) {
		this.files = files;
	}



	public void setSearchCondition(String searchCondition) {
		this.searchCondition = searchCondition;
	}



	public String getSearchKeyword() {
		return searchKeyword;
	}



	public void setSearchKeyword(String searchKeyword) {
		this.searchKeyword = searchKeyword;
	}



	public Integer getPageNo() {
		return pageNo;
	}



	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}



	public Integer getPageSize() {
		return pageSize;
	}



	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}



	public int getOffset() {
		return offset;
	}



	public void setOffset(int offset) {
		this.offset = offset;
	}



	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}



	/**
	 * @return the registerId
	 */
	public String getRegisterId() {
		return registerId;
	}



	/**
	 * @param registerId the registerId to set
	 */
	public void setRegisterId(String registerId) {
		this.registerId = registerId;
	}



	/**
	 * @return the registDt
	 */
	public Date getRegistDt() {
		return registDt;
	}



	/**
	 * @param registDt the registDt to set
	 */
	public void setRegistDt(Date registDt) {
		this.registDt = registDt;
	}



	/**
	 * @return the updusrId
	 */
	public String getUpdusrId() {
		return updusrId;
	}



	/**
	 * @param updusrId the updusrId to set
	 */
	public void setUpdusrId(String updusrId) {
		this.updusrId = updusrId;
	}



	/**
	 * @return the updtDt
	 */
	public Date getUpdtDt() {
		return updtDt;
	}



	/**
	 * @param updtDt the updtDt to set
	 */
	public void setUpdtDt(Date updtDt) {
		this.updtDt = updtDt;
	}



	/**
	 * @return the deleteAt
	 */
	public String getDeleteAt() {
		return deleteAt;
	}



	/**
	 * @param deleteAt the deleteAt to set
	 */
	public void setDeleteAt(String deleteAt) {
		this.deleteAt = deleteAt;
	}



	/**
	 * @return the searchRegisterId
	 */
	public String getSearchRegisterId() {
		return searchRegisterId;
	}



	/**
	 * @param searchRegisterId the searchRegisterId to set
	 */
	public void setSearchRegisterId(String searchRegisterId) {
		this.searchRegisterId = searchRegisterId;
	}



	/**
	 * @return the searchFromDe
	 */
	public String getSearchFromDe() {
		return searchFromDe;
	}



	/**
	 * @param searchFromDe the searchFromDe to set
	 */
	public void setSearchFromDe(String searchFromDe) {
		this.searchFromDe = searchFromDe;
	}



	/**
	 * @return the searchToDe
	 */
	public String getSearchToDe() {
		return searchToDe;
	}



	/**
	 * @param searchToDe the searchToDe to set
	 */
	public void setSearchToDe(String searchToDe) {
		this.searchToDe = searchToDe;
	}



	public String getRegisterNm() {
		return registerNm;
	}



	public void setRegisterNm(String registerNm) {
		this.registerNm = registerNm;
	}



	public String getUpdusrNm() {
		return updusrNm;
	}



	public void setUpdusrNm(String updusrNm) {
		this.updusrNm = updusrNm;
	}
}
