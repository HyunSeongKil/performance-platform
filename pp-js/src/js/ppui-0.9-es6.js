
/**
 * ui와 관련된 것들
 * es6 버전
 * jquery사용하지 않음
 * 원본 파일 : ppui-version-es6.js
 * 변환 파일 : ppui-version-legacy.js
 * 변환툴 : babel
 * es5로 컴파일하는 방법 : @see https://stackoverflow.com/questions/34747693/how-do-i-get-babel-6-to-compile-to-es5-javascript
 * 주의! 직접 ppui-version-lagacy.js파일 변경 불허
 * @since   
 *  2020-07-16  init
 * @author gravity@daumsoft.com
 */
class Ppui {


    /**
     * 엘리먼트에 값 바인드
     * @param {string|object} selectorOrEl 엘리먼트 선택자 또는 엘리먼트
     * @param {array} datas 데이터 목록
     * @param {object} option {initValue:string|null, tkey:string, vkey:string, headerText:string|null, headerValue:string|null, append:boolean}
     *                  initValue : 초기값. 선택
     *                  tkey : 텍스트 키. datas에서 text로 사용될 키의 정보. 필수
     *                  vkey : 값 키. datas에서 value으로 사용될 키의 정보. 필수
     *                  headerText : 헤더 텍스트. 헤더 텍스트 존재시 headerValue도 반드시 존재해야 함. 선택
     *                  headerValue : 헤더 값. 헤더 값 존재시 headerText도 반드시 존재해야 함. 선택
     *                  append : 추가 여부. false이면 기존 option 모두 삭제 후 데이터 바인드. 선택. 초기값:true
     * @since 20200827 init
     */
    static bindDatas(selectorOrEl, datas, option) {
        let el = selectorOrEl;

        //
        if ('string' === typeof (selectorOrEl)) {
            el = document.querySelector(selectorOrEl);
        }

        //
        if (Pp.isNull(el)) {
            return;
        }

        //
        let opt = Pp.extend({ 'initValue': null, 'append': true, 'headerText': null, 'headerValue': null }, option);

        //
        let _select = function (el, datas, opt) {
            //추가가 아니면
            if (!opt.append) {
                //기존 옵션 모두 삭제
                el.options.length = 0;
            }

            //
            if(Pp.isEmpty(datas)){
                return;
            }

            //헤더 텍스트 존재하면
            if (Pp.isNotEmpty(opt.headerText)) {
                let option = document.createElement('option');
                el.appendChild(option);
                //
                option.text = opt.headerText;
                option.value = opt.headerValue;
            }

            //
            for (let i = 0; i < datas.length; i++) {
                let d = datas[i];

                //
                let option = document.createElement('option');
                el.appendChild(option);
                //
                option.value = d[opt.vkey];
                option.text = d[opt.tkey];
            }

            //초기값 존재하면
            if (Pp.isNotEmpty(opt.initValue)) {
                for (let i = 0; i < el.options.length; i++) {
                    if (opt.initValue == el.options[i].value) {
                        el.selectedIndex = i;
                        break;
                    }
                }
            }

            //
            return el;
        };


        //
        if ('SELECT' === el.tagName) {
            _select(el, datas, opt);
            return;
        }
    };

    /**
     * 엔터키 처리
     * @param {HTMLElement|HTMLCollection|NodeListOf<Element>|string} elOrSelector getElement or getElements or querySelectorAll()
     * @param {Function} callback 
     * @returns {void}
     */
    static bindEnterKey(elOrSelector, callback) {
        let arr = Ppui._flat(elOrSelector);
        //
        arr.forEach(el=>{
            //
            el.removeEventListener('keypress', function () {
                //nothing
            });
    
            //
            el.addEventListener('keypress', (ev) => {
                if (13 === ev.keyCode) {
                    callback(ev);
                }
            });
        });
    }


    /**
     * el이 엘리먼트인지 여부
     * @param {HTMLElement|any} el 엘리먼트
     * @returns {boolean} 엘리먼트이면 true
     */
    static _isElement(el) {
        return (el instanceof HTMLElement);
    }

    /**
     * 콜렉션인지 여부
     * @param {HTMLCollection|any} coll  콜렉션
     * @returns {boolean} 콜렉션이면 true
     */
    static _isCollection(coll) {
        return (coll instanceof HTMLCollection);
    }

    /**
     * 노드리스트인지 여부
     * @param {NodeList|any} nl  노드리스트
     * @returns {boolean} 노드리스트이면 true
     */
    static _isNodeList(nl) {
        return (nl instanceof NodeList);
    }


    /**
     * 배열, 콜렉션, 노드목록을 1차원 배열로 변환
     * @param {Array|any} arrOrAny 
     * @returns {Array} 배열
     */
    static _flat(arrOrAny){
        if(!Array.isArray(arrOrAny)){
            return Ppui._flat([arrOrAny]);
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
            return Pp.isNotNull(x);
        });

    }



    /**
     * el에 클래스 추가. like jq's addClass
     * @param {HTMLElement|HTMLCollection|NodeListOf<Element>|Array|string} el getElement or getElements or querySelectorAll()
     * @param {string} className 클래스명
     * @returns {object} Ppui
     * @since
     *  20200831    el에 string 추가
     */
    static addClass(obj, className) {
        let arr = Ppui._flat(obj);

        //
        arr.forEach(el=>{
            if(Pp.isEmpty(el)){
                return;
            }

            //
            if (Ppui.hasClass(el, className)) {
                return;
            }
    
            //
            el.classList.add(className);
        });
    }


    /**
     * el에 클래스가 존재하는지 여부. like jq's hasClass
     * @param {Element|HTMLCollection|NodeListOf<Element>|Array|string} elOrSelector getElement or getElements or querySelectorAll()
     * @param {string} className 클래스명
     * @returns {boolean|null}
     */
    static hasClass(elOrSelector, className) {
        let arr = Ppui._flat(elOrSelector);

        //
        let b = false;
        arr.forEach(el=>{
            b = b|| Ppui._hasClassAtElement(el, className);
        });

        //
        return b;
    }


    /**
     * like jquery's toggleClass
     * @param {Element|HTMLCollection|NodeList|string} elOrSelector 
     * @param {string} className 
     * @returns {object} Ppui
     */
    static toggleClass(elOrSelector, className) {
        Ppui.hasClass(elOrSelector, className) ? Ppui.removeClass(elOrSelector, className) : Ppui.addClass(elOrSelector, className);

        return Ppui;
    }

    /**
     * 
     * @param {Element|null} el 
     * @param {string} className 
     * @returns {boolean}
     */
    static _hasClassAtElement(el, className) {
        if (Pp.isNull(el)) {
            return false;
        }

        //
        let b = false;
        //
        el.classList.forEach(x => {
            if (x === className) {
                b = true;
            }
        });

        //
        return b;
    }




    /**
     * el에서 클래스 삭제. like jq's removeClass
     * @param {HTMLElement|HTMLCollection|NodeListOf<Element>|string} el getElement or getElements or querySelectorAll()
     * @param {string} className 클래스명
     * @returns {object} Ppui
     * @since
     *  20200831    el에 string추가
     */
    static removeClass(elOrSelector, className) {
        let arr = Ppui._flat(elOrSelector);

        //
        arr.forEach(el=>{
            el.classList.remove(className);
        });
    }


    /**
     * 
     * @param {Element|Node|NodeList|string} elOrSelector 
     * @param {string} beforeClassName 변경전 classname
     * @param {string} afterClassName 변경후 classname
     */
    static replaceClass(elOrSelector, beforeClassName, afterClassName) {
        //
        Ppui.removeClass(elOrSelector, beforeClassName)
            .addClass(elOrSelector, afterClassName);
    }


    /**
     * 엘리먼트 삭제
     * @param {Element|Collection|NodeList|string} elOrSelector 엘리먼트|콜렉션|노드목록|셀렉터
     * @since 20200903 init
     */
    static remove(elOrSelector){
        let arr = Ppui._flat(elOrSelector);
        //
        arr.forEach(el=>{
            el.remove();
        });
    }


    /**
     * 화면에서 숨기기
     * @param {Element|Collection|NodeList|Array|string} elOrSelector 엘리먼트|콜렉션|노드목록|셀렉터
     */
    static hide(elOrSelector){
        Ppui._showHide(elOrSelector, false);
    }


    /**
     * 화면에 표시하기
     * @param {Element|Collection|NodeList|Array|string} elOrSelector 엘리먼트|콜렉션|노드목록|셀렉터
     */
    static show(elOrSelector){
        Ppui._showHide(elOrSelector, true);
    }

    /**
     * 화면에서 숨기기/표시하기
     * @param {Element|Collection|NodeList|Array|string} elOrSelector 엘리먼트|콜렉션|노드목록|배열|셀렉터
     * @param {boolean} isShow 표시여부
     */
    static _showHide(elOrSelector, isShow){
        let arr = Ppui._flat(elOrSelector);
        //
        arr.forEach(el=>{
            el.style.display = isShow ? 'block' : 'none';
        });
    }


    /**
     * blob로 <img> 생성
     * @param {Object} blob 이미지 blob
     * @param {object} option 속성값 {'width':number, 'height':number, 'id':string, 'name':string}
     * @param {function} callbackFn 이미지 생성 완료 후 호출할 콜백함수. FileReader가 비동기적으로 처리되기 때문에 콜백사용
     */
    static createImgByBlob(blob, option, callbackFn) {
        let img = document.createElement('img');

        //
        let opt = Pp.extend({}, option);

        //
        if (Pp.isNotEmpty(opt.id)) {
            img.id = opt.id;
        }
        //
        if (Pp.isNotEmpty(opt.name)) {
            img.name = opt.name;
        }
        //
        if (Pp.isNotEmpty(opt.width)) {
            img.width = opt.width;
        }
        //
        if (Pp.isNotEmpty(opt.height)) {
            img.height = opt.height;
        }

        //@see http://www.jongminjang.com/html5/file/2018/12/27/blob-as-img-src.html
        let reader = new FileReader();
        reader.onload = function (e) {
            img.src = reader.result;

            //
            callbackFn(img);
        }
        //
        reader.readAsDataURL(blob);
    }



    /**
     * element 생성
     * @param {string} tagName 
     * @param {string} name 
     * @param {any} value 
     * @param {any|undefined} opt case3
     * @returns {HTMLElement}
     */
    static createElement(tagName, name, value, opt) {
        let htmlElement = document.createElement(tagName);

        //
        if ('INPUT' === tagName.toUpperCase()) {
            htmlElement.setAttribute('type', 'hidden');
            htmlElement.setAttribute('value', value);
        }
        //
        htmlElement.setAttribute('id', name);
        htmlElement.setAttribute('name', name);

        //
        if (Pp.isNull(opt)) {
            return htmlElement;
        }

        //
        let keys = Object.keys(opt);
        //
        keys.forEach(k => {
            let key = k;
            let value = opt[k];
            //
            htmlElement.setAttribute(key, value);
        });

        //
        return htmlElement;
    }


    /**
     * 폼 생성
     * @param {Array|any|undefined} param case1,case2,case3,case4
     * @returns {HTMLFormElement}
     */
    static createForm(param) {
        let htmlFormElement = document.createElement('form');
        //
        htmlFormElement.setAttribute('id', Pp.createUid());

        //
        if (Pp.isNull(param)) {
            return htmlFormElement;
        }

        //
        let map = Pp.toMap(param);
        //
        map.forEach((value, key) => {
            //
            let el = Ppui.createElement('INPUT', key, value);
            //
            htmlFormElement.appendChild(el);
        });


        //
        return htmlFormElement;
    }


    /**
     * 폼 생성 & 제출
     * @param {string} url 
     * @param {Array|any|undefined} param 
     * @returns {void}
     */
    static createFormAndSubmit(url, param) {
        let htmlFormElement = Ppui.createForm(param);
        //
        if (Pp.isNull(htmlFormElement)) {
            return;
        }


        //
        let el = document.querySelector('body:last-child');
        //
        if (Pp.isNull(el)) {
            return;
        }

        //
        el.appendChild(htmlFormElement);


        //
        htmlFormElement.setAttribute('method', 'post');
        htmlFormElement.setAttribute('action', url);
        //
        htmlFormElement.submit();
    }



    /**
     * 폼 전송
     * @param {string} url 
     * @param {htmlFormElement} htmlFormElement  form element
     * @returns {void}
     */
    static submitForm(url, htmlFormElement) {
        //
        htmlFormElement.setAttribute('method', 'post');
        htmlFormElement.setAttribute('action', url);
        //
        htmlFormElement.submit();
    }



    /**
     *
     * @param {string} url
     * @param {any} param case1~4
     * @returns {void}
     */
    static submitGet(url, param) {
        let htmlFormElement = Ppui.createForm(param);

        //
        htmlFormElement.setAttribute("method", "get");
        //
        htmlFormElement.submit();
    }

    /**
     *
     * @param {string} url
     * @param {any} param case1~4
     * @returns {void}
     */
    static submitPost(url, param) {
        let htmlFormElement = Ppui.createForm(param);

        //
        htmlFormElement.setAttribute("method", "post");
        //
        htmlFormElement.submit();
    }



    /**
     * like jquery's serializeArray
     * @param {HTMLCollection} htmlCollection document.getElementsByTagName('body') 
     * @returns {Array}
     */
    static serializeArray(htmlCollection) {
        /**
         * children쪽 처리
         * @param {htmlCollection} htmlCollection body하위의 children
         * @return {Array} 
         */
        function _children(htmlCollection) {
            let arr = [];
            //
            if (Pp.isNull(htmlCollection)) {
                return arr;
            }

            //
            for (let i = 0; i < htmlCollection.length; i++) {
                let el = htmlCollection.item(i);
                if (Pp.isNull(el)) {
                    continue;
                }

                //
                if ('INPUT' === el.tagName) {
                    arr.push({
                        'name': el.name,
                        'value': el.value
                    });
                }
                //
                if ('TEXTAREA' === el.tagName) {
                    arr.push({
                        'name': el.name,
                        'value': el.value
                    });
                }
                //TODO others

            }

            //
            return arr;
        }//


        //결과
        let arr = [];

        //
        if (Pp.isNull(htmlCollection) || 0 == htmlCollection.length) {
            return [];
        }


        //body 갯수만큼 루프
        for (let i = 0; i < htmlCollection.length; i++) {
            let el = htmlCollection.item(i);
            if (Pp.isNull(el)) {
                continue;
            }

            //body내의 children (input, textarea, ...)
            let children = el.children;
            //children에서 값을 추출해 arr에 추가
            arr = arr.concat(_children(children));
        }

        //
        return arr;
    }


    /**
     * 필수입력 항목 검사
     * @param {NodeList} nodeList document.querySelectorAll('[required]')
     * @param {Map|undefined} option {showMessage:boolean}
     * @returns {Map} {b:boolean, title:string, node:Node}
     */
    static checkReq(nodeList, option) {
        let map = new Map();
        map.set('b', true);

        //
        let opt = Pp.extend(new Map().set('showMessage', true), option);

        //
        if (null == nodeList || 0 == nodeList.length) {
            return map;
        }

        //
        for (let i = 0; i < nodeList.length; i++) {
            let node = nodeList.item(i);

            //
            if (Pp.isEmpty(node.value)) {
                map.set('b', false);
                map.set('node', node);

                break;
            }
        }

        //
        if (Pp.isNotEmpty(map.get('node').title)) {
            map.set('title', map.get('node').title);
        } else {
            let id = node.id;
            let htmlElement = document.querySelector('label[for="' + id + '"]');
            if (Pp.isNotNull(htmlElement)) {
                map.set('title', htmlElement.innerHTML);
            }
        }

        //메시지 표시이면
        if (opt.get('showMessage')) {
            map.get('node').focus();
            //
            if (Pp.isNotEmpty(map.get('title'))) {
                alert(`${map.get('title')}은(는) 필수항목입니다.`);
            } else {
                alert('필수항목입니다.');
            }
        }

        //
        return map;

    }


    /**
     * el에 이벤트 등록
     * @param {HtmlElement|HTMLCollection|NodeList|string} elOrSelector
     * @param {string} eventName
     * @param {Function} callbackFn
     * @since	20200818	init
     */
    static on(elOrSelector, eventName, callbackFn) {
        let arr = Ppui._flat(elOrSelector);
        //
        arr.forEach(el=>{
            //
            el.addEventListener(eventName, callbackFn);
        });
    }



    /**
     * 이벤트 강제로 실행시키기
     * @param {HTMLElement|HTMLCollection|NodeList|string} elOrSelector 
     * @param {string} eventName 이벤트명
     */
    static trigger(elOrSelector, eventName) {
        let arr = Ppui._flat(elOrSelector);
        //
        arr.forEach(el=>{
            //
            el.dispatchEvent(new Event(eventName));
        });        
    }


    /**
     * click 이벤트 등록
     * @param {HTMLElement|HTMLCollection|NodeList|string} elOrSelector 
     * @param {function} callbackFn 
     */
    static click(elOrSelector, callbackFn) {
        Ppui.on(elOrSelector, 'click', callbackFn);
    }


    /**
     * change 이벤트 등록
     * @param {HTMLElement|HTMLCollection|NodeList|string} elOrSelector 
     * @param {function} callbackFn 
     */
    static change(elOrSelector, callbackFn) {
        Ppui.on(elOrSelector, 'change', callbackFn);
    }



    /**
     * 파일 업로드
     * @param {string} url
     * @param {File} file 
     * @param {Function} callbackSuccess
     * @param {any|undefined} option
     */
    static uploadFile(url, file, callbackSuccess, option) {
        if (Pp.isNull(file)) {
            callbackSuccess({ errorCode: 'E_NULL' });
            return;
        }

        //파일 크기 검사
        if (!Pp.checkFileSize(file, 123456)) {
            callbackSuccess({ errorCode: 'E_FILE_SIZE' });
            return;
        }

        //파일 확장자 검사
        if (!Pp.checkFileExt(file)) {
            callbackSuccess({ errorCode: 'E_EXT' });
            return;
        }

        //
        let xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        //
        xhr.onreadystatechange = () => {
            if (XMLHttpRequest.DONE === xhr.readyState) {
                //성공
                if (200 === xhr.status) {
                    //json 형식
                    if (v.startsWith("{")) {
                        callbackSuccess(JSON.parse(v));
                    } else {
                        //text 형식
                        callbackSuccess(v);
                    }
                } else {
                    callbackSuccess({ errorCode: 'E_500' });
                    return;
                }
            }
        };

        //
        let fd = new FormData();
        fd.append('file', file);

        //
        xhr.send(fd);
    }

}