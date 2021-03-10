/**
 * 노드의 속성 변경 목격자
 * @author vaiv
 * @since 0124 init
 */
class PPMutationObserver {
    constructor() {
        this.arr = [];
    }

    /**
     * 
     */
    init() {
        console.debug('<<.init', this);
    }
    /**
     * 목격자에 등록, 목격 시작
     * @param {string} selector
     * @param {function} callbackFn 콜백함수
     */
    add(selector, callbackFn) {
        if (null != this.get(selector)) {
            //기존 데이터 삭제
            this.remove(selector);
        }



        let json = {
            selector,
            observer: new MutationObserver(function (mutationList, observer) {
                for (let mutation of mutationList) {
                    if ('attributes' != mutation.type) {
                        return;
                    }

                    if (null != callbackFn) {
                        callbackFn(mutation, document.querySelector(selector).offsetParent);
                    }
                }
            }),
        };

        //목격 시작
        json.observer.observe(document.querySelector(selector), { attributes: true });

        //추가
        this.arr.push(json);

        return json;
    }
    /**
     * 목격 중지
     * @param {string} selector
     */
    remove(selector) {
        let index = this.getIndex(selector);

        if (-1 == index) {
            return;
        }

        let obj = this.arr[index];

        //목격 중지
        obj.observer.disconnect();

        //삭제
        this.arr.splice(index, 1);
    }
    /**
     *
     * @param {string} selector
     * @returns
     */
    get(selector) {
        for (let i = 0; i < this.arr.length; i++) {
            let d = this.arr[i];

            if (selector == d.selector) {
                return d;
            }
        }

        return null;
    }
    /**
     *
     * @param {string} selector
     * @returns
     */
    getIndex(selector) {
        for (let i = 0; i < this.arr.length; i++) {
            let d = this.arr[i];

            if (selector == d.selector) {
                return i;
            }
        }

        return -1;
    }
    /**
     *
     * @param {string} selector
     * @returns
     */
    exists(selector) {
        return (null != this.get(selector));
    }
}


//
let ppMutationObserver = new PPMutationObserver();
ppMutationObserver.init();