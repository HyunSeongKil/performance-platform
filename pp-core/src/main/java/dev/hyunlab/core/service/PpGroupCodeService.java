/**
 * 
 */
package dev.hyunlab.core.service;

import java.util.List;

import dev.hyunlab.core.vo.PpGroupCodeSearchVO;
import dev.hyunlab.core.vo.PpGroupCodeVO;

/**
 * @author daumsoft
 *
 */
public interface PpGroupCodeService extends PpService<PpGroupCodeVO, PpGroupCodeSearchVO> {

    default public List<PpGroupCodeVO> getsByGroupCodeId(PpGroupCodeVO vo){
        return null;
    };
}
