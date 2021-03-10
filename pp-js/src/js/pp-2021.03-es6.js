

/**
 * common js 
 * 일반 함수 + ui관련 함수
 * @author gravity@vaiv.kr
 * @since 20210307 init
 */
class PP {

    /**
     * stringOrNumber에 천단위 콤마 추가
     * stringOrNumber가 숫자형인 경우 문자형으로 변환하여 처리
     * @param {string|number} stringOrNumber 문자열|숫자
     * @returns {string} 콤마가 추가된 문자열
     */
    static addComma(stringOrNumber) {
        var s = stringOrNumber;
        if (Pp.isEmpty(s)) {
            return "";
        }
        //
        if ("number" === typeof s) {
            s = s.toString();
        }
        //
        return s.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    }


    /**
     * str에서 콤마 제거
     * @param {string} str 문자열
     * @returns {string} 콤마 제거된 문자열
     */
    static unComma(str) {
        if (Pp.isEmpty(str)) {
            return '';
        }

        return str.replace(/,/gi, '');
    }


    /**
     * uuid v4 문자열 생성
     * @see https://goni9071.tistory.com/209
     * @returns {string}
     */
    static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 3 | 8);
            return v.toString(16);
        });
    }



    /**
     * base64 문자열을 Blob로 변환하기
     * @see https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
     * @param {string} base64 
     * @param {string} contentType 
     * @returns {Blob}
     */
    static base64ToBlob(base64, contentType = 'image/png') {
        let byteCharacters = window.atob(base64);
        let byteArrays = [];
        let sliceSize = 512;

        //
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            //
            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            //
            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        //
        let blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    
    /**
     * 일자는 구분자로 구분된 문자열로 리턴
     * @param {Date|undefined|null} dt 일자
     * @param {String|undefined|null} deli 구분자
     * @returns {string} yyyy-MM-dd
     */
     static getYmd(dt=new Date(), deli='-'){
        let arr = [];
        
        arr.push(dt.getFullYear());
        
        let m = dt.getMonth()+1;
        arr.push(10>m ? '0' + m : m);
        
        let d = dt.getDate();
        arr.push(10>d ? '0' + d : d);

        return arr.join(deli);
    }




    /**
     * stringOrDate를 gbn형식에 맞추어 문자열로 변환
     * @param {string|Date} stringOrDate 문자|날짜
     * @param {string|number} gbn 구분
     * @returns {string}
     */
    static formatDate(stringOrDate, gbn) {
        if (Pp.isNull(stringOrDate)) {
            return '';
        }

        if ('object' === typeof stringOrDate) {
            return PP.formatDateByDate(stringOrDate, gbn);
        }



        let s = stringOrDate.replace(/-: /gi, '');

        let yyyy = s.substring(0, 4);
        let mm = s.substring(4, 6);
        let dd = s.substring(6, 8);
        let hh = s.substring(8, 10);
        let mi = s.substring(10, 12);
        let ss = s.substring(12, 14);

        if (8 === gbn || 'yyyyMMdd' === gbn) {
            return `${yyyy}-${mm}-${dd}`;
        }
        if (10 === gbn || 'yyyyMMddHH' === gbn) {
            return `${yyyy}-${mm}-${dd} ${hh}`;
        }
        if (12 === gbn || 'yyyyMMddHHmm' === gbn) {
            return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
        }
        if (14 === gbn || 'yyyyMMddHHmmss' === gbn) {
            return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
        }
    }


    /**
     * dt를 gbn 형식에 맞추어 문자열로 변환
     * @param {Date} dt 날짜
     * @param {string|number} gbn 구분
     * @returns {string}
     */
    static formatDateByDate(dt, gbn) {
        let yyyy = dt.getFullYear();
        let mm = PP.padStart(dt.getDate(), 2, '0');
        let dd = PP.padStart(dt.getDate(), 2, '0');
        let hh = PP.padStart(dt.getHours(), 2, '0');
        let mi = PP.padString(dt.getMinutes(), 2, '0');
        let ss = PP.padString(dt.getSeconds(), 2, '0');

        if (6 === gbn || 'yyyyMM' === gbn) {
            return `${yyyy}-${mm}`;
        }

        if (8 === gbn || 'yyyyMMdd' === gbn) {
            return `${yyyy}-${mm}-${dd}`;
        }

        if (10 === gbn || 'yyyyMMddHH' === gbn) {
            return `${yyyy}-${mm}-${dd} ${hh}`;
        }

        if (12 === gbn || 'yyyyMMddHHmm' === gbn) {
            return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
        }

        if (14 === gbn || 'yyyyMMddHHmmss' === gbn) {
            return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
        }


        return '';


    }



    /**
     * es6의 String.prototype.padEnd()와 동일
     * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
     * @param {string|number} stringOrNumber 문자|숫자
     * @param {number} targetLength 전체길이
     * @param {string} padString 채워넣을 문자
     * @returns {string}
     */
    static padEnd(stringOrNumber, targetLength, padString = '0') {
        let s = stringOrNumber;
        if (Pp.isNull(s)) {
            return '';
        }

        if ('number' === typeof stringOrNumber) {
            s = '' + stringOrNumber;
        }

        return s.padEnd(targetLength, padString);
    }


    /**
     * es6의 String.prototype.padString()과 동일
     * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
     * @param {string|number} stringOrNumber 문자|숫자
     * @param {number} targetLength 전체 길이
     * @param {string} padString 채워넣을 문자열
     * @returns {string}
     */
    static padStart(stringOrNumber, targetLength, padString = '0') {
        let s = stringOrNumber;
        if (Pp.isNull(s)) {
            return '';
        }

        if ('number' === typeof stringOrNumber) {
            s = '' + stringOrNumber;
        }

        return s.padStart(targetLength, padString);
    }


    /**
     * obj가 널인지 판단
     * @param {object} obj 객체
     * @returns {boolean}
     */
    static isNull(obj) {
        if (null === obj) {
            return true;
        }

        if (undefined === obj) {
            return true;
        }

        return false;
    }


    /**
     * obj가 널이 아닌지 판단
     * @see PP.isNull()
     * @param {object} obj 객체
     * @returns {boolean}
     */
    static isNotNull(obj) {
        return !PP.isNull(obj);
    }


    /**
     * obj가 빈값인지 판단
     *  문자열이면 공백인지 판단
     *  배열이면 아이템이 있는지 판단
     *  객체이면 키가 있는지 판단
     * @param {object} obj 객체
     * @returns {boolean}
     */
    static isEmpty(obj) {
        if (PP.isNull(obj)) {
            return true;
        }

        if ('string' === typeof obj && 0 === obj.length) {
            return true;
        }

        if (Array.isArray(obj) && 0 == obj.length) {
            return true;
        }

        if ('object' === typeof obj && 0 == Object.keys(obj).length) {
            return true;
        }


        return false;
    }


    /**
     * obj가 빈값이 아닌지 판단
     * @see PP.isEmpty()
     * @param {object} obj 객체
     * @returns {boolean}
     */
    static isNotEmpty(obj) {
        return !PP.isEmpty(obj);
    }


    /**
     * str이 한글인지 여부
     * @param {string} str 문자열
     * @returns {boolean} true(한글)
     */
    static isHangul(str) {
        var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if (pattern_kor.test(str)) {
            return true
        } else {
            return false
        }
    }

    
    /**
     * 페이지네이션
     * @see https://jasonwatmore.com/post/2018/08/07/javascript-pure-pagination-logic-in-vanilla-js-typescript
     * @param {number} totalItems 전체 아이템 갯수
     * @param {number|undefined|null} currentPage 현재 페이지 번호
     * @param {object|undefined|null} opt 옵션 pageSize:페이징크기, maxPages:화면에 표시할 페이지 번호 갯수
     */
    static paginate(totalItems, currentPage=1, opt={pageSize:10, maxPages:10}) {

        // calculate total pages
        let totalPages = Math.ceil(totalItems / opt.pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage, endPage;
        if (totalPages <= opt.maxPages) {
            // total pages less than max so show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // total pages more than max so calculate start and end pages
            let maxPagesBeforeCurrentPage = Math.floor(opt.maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(opt.maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1;
                endPage = opt.maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // current page near the end
                startPage = totalPages - opt.maxPages + 1;
                endPage = totalPages;
            } else {
                // current page somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * opt.pageSize;
        let endIndex = Math.min(startIndex + opt.pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: opt.pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };

    }


    /**
    * 0 ~ 100사이의 임의의 값 생성
    * @param {number} min 범위-최소
    * @param {number} max 범위-최대
    * @returns {number}
    */
    static random(min = 0, max = 100) {
        for (let i = 0; i < 100; i++) {
            let no = Math.floor((Math.random() * 100) + 1);

            if (min <= no && no < max) {
                return no;
            }
        }

        return max;
    }



    ////////////////////////////////////////
    ///////여기부터는 ui관련////////////////
    ////////////////////////////////////////

    
    /**
     * 배열, 콜렉션, 노드목록을 1차원 배열로 변환
     * @param {Array|any} arrOrAny 
     * @returns {Array} 배열
     */
     static flat(arrOrAny){
        if(!Array.isArray(arrOrAny)){
            return PP.flat([arrOrAny]);
        }

        //
        let arr=[];

        arrOrAny.forEach(x=>{                
            if('string' === typeof(x)){
                arr = arr.concat(Array.from(document.querySelectorAll(x)));
                return;
            }

            if(x instanceof NodeList){
                arr = arr.concat(Array.from(x));
                return;
            }
            
            if(x instanceof HTMLCollection){
                arr = arr.concat(Array.from(x));
                return;
            }
            
            if(x instanceof Element){
                arr = arr.concat(Array.from([x]));            
                return;
            }
        });

        //
        return arr.filter(x=>{
            return PP.isNotNull(x);
        });

    }

    /**
     * 엔터키 처리
     * 예) PP.addEnterListener('input[type=search]', function(el){ console.log(el); })
     * 예) PP.addEnterListener(['input[type=text]', 'input#id', 'input#pw'], function(el){ console.log(el); })
     * @param {string|array<string>} selectorOrArr 
     * @param {*} callbackFn 
     */
     static addEnterListener(selectorOrArr, callbackFn){
        //문자열
        if('string' === selectorOrArr){
            let els = document.querySelectorAll(selectorOrArr);
            els.forEach(el=>{
                el.addEventListener('keyup', (evt)=>{
                    if(13 == evt.keyCode){
                        callbackFn(el);
                    }
                });
            });

            return;
        }


        //배열
        if(Array.isArray(selectorOrArr)){
            let arr = selectorOrArr;
            arr.forEach(selector=>{
                PP.addEnterListener(selector);
            });
        }
    }


    /**
     * 
     * @param {string|Array<string>|Element} selectorOrArrOrEl 
     * @param {*} className 
     */
    static removeClass(selectorOrArrOrEl, className){
        /**
         * 
         * @param {Element} el 
         * @param {*} className 
         */
        let _element = (el, className)=>{
            el.classList.remove(className);
        };


        /**
         * 
         * @param {Array<string>} arr 
         * @param {*} className 
         */
        let _array = (arr, className)=>{
            arr.forEach(selector=>{
                PP.removeClass(selector, className);
            });
        };


        /**
         * 
         * @param {string} selector 
         * @param {*} className 
         */
        let _string = (selector, className)=>{
            let els = document.querySelectorAll(selector);
            els.forEach(el=>{
                PP.removeClass(el, className);
            })

        }

        //Element
        if(selectorOrArrOrEl instanceof Element){
            _element(selectorOrArrOrEl, className);

            return;
        }


        //배열
        if(Array.isArray(selectorOrArrOrEl)){
            _array(selectorOrArrOrEl, className);
            
            return;
        }


        //문자열
        if('string' == typeof selectorOrArrOrEl){
            _string(selectorOrArrOrEl, className);
            
            return;
        }
    }


    /**
     * 
     * @param {string|Array<string>|Element} selectorOrArrOrEl 
     * @param {*} className 
     */
    static toggleClass(selectorOrArrOrEl, className){
        /**
         * 
         * @param {Element} el 
         * @param {*} className 
         */
        let _element = (el, className)=>{
            if(PP.hasClass(el, className)){
                PP.removeClass(el, className);
            }else{
                PP.addClass(el, className);
            }

        };


        /**
         * 
         * @param {Array<string>} arr 
         * @param {*} className 
         */
        let _array = (arr, className)=>{
            arr.forEach(selector=>{
                PP.toggleClass(selector, className);
            })

        };

        /**
         * 
         * @param {string} selector 
         * @param {*} className 
         */
        let _string = (selector, className)=>{
            let els = document.querySelectorAll(selector);
            els.forEach(el=>{
                PP.toggleClass(el, className);
            })

        };


        //Element
        if(selectorOrArrOrEl instanceof Element){
            _element(selectorOrArrOrEl, className);
            return ;
        }

        //배열
        if(Array.isArray(selectorOrArrOrEl)){
            _array(selectorOrArrOrEl, className);
            return;
        }

        //문자열
        if('string' === typeof selectorOrArrOrEl){
            _string(selectorOrArrOrEl, className);
            return;
        }
    }



    /**
     * 
     * @param {string|Array<string>|Element} selectorOrArrOrEl 
     * @param {*} className 
     */
    static addClass(selectorOrArrOrEl, className){
        /**
         * 
         * @param {Element} el 
         * @param {*} className 
         * @returns 
         */
        let _element = (el, className)=>{
            if(PP.hasClass(el, className)){
                return;
            }

            el.classList.add(className);
        };


        /**
         * 
         * @param {Array<string>} arr 
         * @param {*} className 
         */
        let _array = (arr, className)=>{
            arr.forEach(selector=>{
                PP.addClass(selector, className);
            });

        };


        /**
         * 
         * @param {string} selector 
         * @param {*} className 
         */
        let _string = (selector, className)=>{
            let els = document.querySelectorAll(selector);
            els.forEach(el=>{
                PP.addClass(el, className);
            });

        };


        //Element
        if(selectorOrArrOrEl instanceof Element){
            _element(selectorOrArrOrEl, className);
            return;
        }


        //배열
        if(Array.isArray(selectorOrArrOrEl)){
            _array(selectorOrArrOrEl, className);
            return;
        }

        //문자열
        if('string' === typeof selectorOrArrOrEl){
            _string(selectorOrArrOrEl, className);
            return;
        }

    }


    /**
     * 
     * @param {string|array<string>|Element} selectorOrArrOrEl 
     * @param {*} className 
     */
    static hasClass(selectorOrArrOrEl, className){
        /**
         * 
         * @param {Element} el 
         * @param {*} className 
         * @returns 
         */
        let _element = (el, className)=>{
            let b = false;

            el.classList.forEach(x=>{
                b |= (x === className);
            })

            return b;
        };


        /**
         * 
         * @param {Array<string>} arr 
         * @param {*} className 
         * @returns 
         */
        let _array = (arr, className)=>{
            let b = false;

            arr.forEach(selector=>{
                b |= PP.hasClass(selector, className);
            });

            return b;
        };


        /**
         * 
         * @param {string} selector 
         * @param {*} className 
         * @returns 
         */
        let _string = (selector, className)=>{
            let b = false;

            let els = document.querySelectorAll(selector);
            els.forEach(el=>{
                b |= PP.hasClass(el, className);
            });

            return b;
        };


        //Element
        if(selectorOrArrOrEl instanceof Element){
            return _element(selectorOrArrOrEl);
        }

        //배열
        if(Array.isArray(selectorOrArrOrEl)){
            return _array(selectorOrArrOrEl, className);
        }


        //문자열
        if('string' === typeof selectorOrArrOrEl){
            return _string(selectorOrArrOrEl, className);
        }
    }


    /**
     * className으로 모든 엘리먼트 목록 조회. className이 정확하게 일치해야 함(like조건 아님)
     * @param {string} className 클래스 명
     * @returns className을 가지고 있는 엘리먼트 목록
     * @history 20210307    init
     */
     static getElementsByClassName(className){
        let arr = [];
        let els = document.getElementsByTagName('*');

        els.forEach(el=>{
            if(PP.isNull(el)){
                return;
            }

            let classes = el.className.split(' ');
            if(PP.isEmpty(classes)){
                return;
            }

            classes.forEach(x=>{
                if(className === x){
                    arr.push(el);
                }
            });
        });

        return arr;
    }



    /**
     * <select/>에 데이터 바인드 하기
     * 예)PP.bindDatas('select:eq(0)', 
     *                  [{'t':'텍스트', 'v':'값', 'loValue':'127'}], 
     *                  {'vKey':'v', 
     *                   'tKey':'t', 
     *                   'initValue':'a', 
     *                   'headerText':'선택', 
     *                   'headerValue':'',
     *                   'dataset': [{'datasetKey':'lo-value', 'dataKey':'loValue'}]
     *                  }
     *  )
     * @param {string|array} selectorOrEl 셀렉터|엘리먼트
     * @param {array} datas 데이터 목록
     * @param {object} option 
     *  vKey    string  datas에서 값으로 사용될 데이터의 키. 필수
     *  tKey    string  datas에서 텍스트로 사용될 데이터의 키. 필수
     *  initValue   string|number 초기값. 선택
     *  headerText  string 헤더 텍스트. 선택
     *  headerValue string|number 헤더 값. 선택
     *  dataset array 데이터셋 목록. 선택
     *      datasetKey  string 데이터셋으로 사용될 문자열. 필수
     *      dataKey string datas에서 값으로 사용될 데이터의 키. 필수
     * @returns {void}
     */
    static bindDatas(selectorOrEl, datas=[], option={}){
        /**
         * <option></option> 목록 문자열 생성&리턴
         * @param {array} datas 
         * @param {object} opt 
         * @requires {string}
         */
        let _option = (datas=[], opt)=>{
            let s = '';

            if(PP.isNotEmpty(opt.headerText)){
                s += `<option value="${opt.headerValue||''}">${opt.headerText}</option>`;
            }


            datas.forEach(item=>{
                s += `<option value="${item[opt.vKey]}" ${_dataset(item, opt)} ${_selected(item, opt)}>${item[opt.tKey]}</option>`;
            });


            return s;
        }


        /**
         * selected 문자열 생성&리턴
         * @param {object} item 
         * @param {object} opt 
         * @returns {string}
         */
        let _selected = (item,opt)=>{
            if(PP.isEmpty(opt.initValue)){
                return '';
            }

            if(item[opt.vKey] == opt.initValue){
                return ' selected ';
            }

            return '';
        }

        /**
         * data-xxx 문자열 생성&리턴
         * @param {object} item 
         * @param {object} opt  {'dataset':[{'datasetKey':'', 'dataKey':''}, ...]}
         * @returns {string}
         */
        let _dataset = (item, opt)=>{
            if(PP.isEmpty(opt.dataset)){
                return '';
            }

            let s = '';
            opt.dataset.forEach(x=>{
                s += ` data-${item[x.datasetKey]}="${item[x.dataKey]}"`;
            })


            return s;
        }


        //
        let arr = PP.flat(selectorOrEl);

        if(PP.isEmpty(arr)){
            return;
        }


        let opt = {"append":false, "headerText":"", "headerValue":""};
        if(PP.isNotNull(option)){
            //@see https://webisfree.com/2019-07-09/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9D%EC%B2%B4-%EB%B3%91%ED%95%A9-%ED%95%A9%EC%B9%98%EB%8A%94-%EB%B0%A9%EB%B2%95-merge
            opt = Object.assign({}, opt, option);
        }

         //
         for(let i=0; i<arr.length; i++){
            let el = arr[i];
            if(PP.isNull(el)){
                continue;
            }

            //
            if ('SELECT' === el.tagName) {
                el.innerHTML = _option(datas, opt);
            }
        }

        //
        return;
    }


    /**
     * async하게 javascript 로드
     * @param {string} src js파일 경로
     * @param {string|undefined|null} charset 문자셋
     * @history 20210307    init
     */
    static loadScript(src, charset = 'UTF-8') {
        let el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = src;
        el.charset = charset || 'ISO-8859-1';

        let headEl = document.getElementsByTagName('head');
        if (Pp.isNotNull(headEl)) {
            headEl.appendChild(el);
            return;
        }


        let bodyEl = document.getElementsByTagName('body');
        if (Pp.isNotNull(bodyEl)) {
            bodyEl.appendChild(el);
            return;
        }

        console.debug('<<.loadScript - null head and body element');

    }


    


}

