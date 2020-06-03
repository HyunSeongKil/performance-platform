/**
 * 
 */
package dev.hyunlab.core.vo;

/**
 * 그룹 코드 vo
 * 
 * @author daumsoft
 *
 */
@SuppressWarnings("serial")
public class PpGroupCodeVO extends PpVO {
    private String groupCodeId;
    private String groupCodeNm;
    private String useAt;

    public String getGroupCodeId() {
        return groupCodeId;
    }

    public String getUseAt() {
        return useAt;
    }

    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getGroupCodeNm() {
        return groupCodeNm;
    }

    public void setGroupCodeNm(String groupCodeNm) {
        this.groupCodeNm = groupCodeNm;
    }

    public void setGroupCodeId(String groupCodeId) {
        this.groupCodeId = groupCodeId;
    }
}
