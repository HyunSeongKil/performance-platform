/**
 * 
 */
package dev.hyunlab.core.dao;

import java.util.List;
import java.util.Map;

/**
 * 모든 dao의 부모 interface
 * @author ucsit
 * @since 2018. 4. 16.
 */
public interface PpDao<T,T2> {
	
	/**
	 * 조회
	 * @param searchvo
	 * @return
	 */
	default T get(T2 searchvo) {
		return null;
	}
	
	/**
	 * 목록 조회
	 * @param searchvo
	 * @return
	 */
	default T gets(T2 searchvo) {
		return null;
	}
	
	/**
	 * 등록
	 * @param vo
	 */
	default void regist(T vo) {};
	
	/**
	 * 수정
	 * @param vo
	 */
	default void updt(T vo) {};
	
	/**
	 * 삭제
	 * @param vo
	 */
	default void delete(T vo) {};
	
	/**
	 * 조회
	 * @param map
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	default Map get(Map map) {
		return null;
	}
	
	/**
	 * 목록 조회
	 * @param map
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	default List<Map> gets(Map map) {
		return null;
	}
	
	/**
	 * 등록
	 * @param map
	 */
	@SuppressWarnings("rawtypes")
	default void regist(Map map) {}
	
	/**
	 * 수정
	 * @param map
	 */
	@SuppressWarnings("rawtypes")
	default void updt(Map map) {}
	
	/**
	 * 삭제
	 * @param map
	 */
	@SuppressWarnings("rawtypes")
	default void delete(Map map) {}
}
