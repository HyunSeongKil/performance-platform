/**
 * 
 */
package dev.hyunlab.core.service;

import java.util.List;
import java.util.Map;

import dev.hyunlab.core.PpTransferObject;

/**
 * @author hyunseongkil
 * @since
 * 	20200204	init
 * 20200414	
 * 		T extends OnestopVO
 * 		T2 extends PpSearchVO
 */
public interface PpService<T,T2> {
	
	/**
	 * 조회
	 * @param searchVo vo
	 * @return 객체
	 */
	default T get(T2 searchVo) {
		return null;
	}
	
	/**
	 * 목록 조회
	 * @param searchVo vo
	 * @return 목록
	 */
	default List<T> gets(T2 searchVo) {
		return null;
	}
	
	/**
	 * 삭제
	 * @param searchVo vo
	 */
	default void delete(T2 searchVo) { }
	
	/**
	 * 등록
	 * @param vo vo 
	 */
	default void regist(T vo) {	}
	
	/**
	 * 수정
	 * @param vo vo
	 */
	default void updt(T vo) { }
	
	/**
	 * 조회
	 * @param map 맵
	 * @return PpTransferObject
	 */
	default PpTransferObject get(Map<?,?> map) {
		return null;
	}
	
	/**
	 * 목록 조회
	 * @param map 맵
	 * @return PpTransferObject
	 */
	default PpTransferObject gets(Map<?,?> map) {
		return null;
	}
	
	/**
	 * 등록
	 * @param map 맵
	 */
	default void regist(Map<?,?> map) {}
	
	/**
	 * 수정
	 * @param map 맵
	 */
	default void updt(Map<?,?> map) {}
	
	/**
	 * 삭제
	 * @param map 맵
	 */
	default void delete(Map<?,?> map) {}
	
}
