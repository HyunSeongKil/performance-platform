"use strict";
/**
 * 원본 파일 : typescript
 * jquery-pp-1.0.js의 typescript 버전
 * @since
 *  2020-07 typescript + 바닐라js
 */
var pp = /** @class */ (function () {
    function pp() {
    }
    /**
     * 천단위 콤마 추가
     * @param strOrNum
     */
    pp.addComma = function (strOrNum) {
        var s = strOrNum;
        if (pp.isEmpty(strOrNum)) {
            return '';
        }
        //
        if ('number' === typeof s) {
            s = s.toString();
        }
        //
        return s.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };
    /**
     * 엔터키 처리
     * @param el getElement or getElements or querySelectorAll()
     * @param callback
     */
    pp.bindEnterKey = function (el, callback) {
        /**
         * getElement의 경우
         * @param el element
         */
        function _element(el, callback) {
            //
            el === null || el === void 0 ? void 0 : el.removeEventListener('keypress', function () {
                //nothing
            });
            //
            el === null || el === void 0 ? void 0 : el.addEventListener('keypress', (function (ev) {
                if (13 === ev.keyCode) {
                    callback(ev);
                }
            }));
        }
        /**
         * getElements의 경우
         * @param coll 콜렉션
         * @param callback
         */
        function _collection(coll, callback) {
            if (pp.isNull(coll)) {
                return;
            }
            //
            for (var i = 0; i < coll.length; i++) {
                _element(coll.item(i), callback);
            }
        }
        /**
         * querySelectorAll()의 경우
         * @param nl 노드 리스트
         */
        function _nodeList(nl, callback) {
            if (pp.isNull(nl)) {
                return;
            }
            //
            nl.forEach(function (x) {
                _element(x, callback);
            });
        }
        //
        if (el instanceof HTMLElement) {
            _element(el, callback);
        }
        //
        if (el instanceof HTMLCollection) {
            _collection(el, callback);
        }
        //
        if (el instanceof NodeList) {
            _nodeList(el, callback);
        }
    };
    /**
     * 콤마 제거
     * @param str
     */
    pp.unComma = function (str) {
        if (pp.isEmpty(str)) {
            return '';
        }
        //
        return str.replace(/,/gi, '');
    };
    /**
     * el에 클래스 추가. like jq's addClass
     * @param el getElement or getElements or querySelectorAll()
     * @param className 클래스명
     */
    pp.addClass = function (el, className) {
        var _a;
        if (pp.isNull(el)) {
            return el;
        }
        //
        if (el instanceof HTMLElement) {
            if (pp.hasClass(el, className)) {
                return el;
            }
            //
            el.classList.add(className);
            //
            return el;
        }
        //
        if (el instanceof HTMLCollection) {
            for (var i = 0; i < el.length; i++) {
                if (pp.hasClass(el.item(i), className)) {
                    continue;
                }
                //
                (_a = el.item(i)) === null || _a === void 0 ? void 0 : _a.classList.add(className);
            }
            //
            return el;
        }
        //
        if (el instanceof NodeList) {
            el.forEach(function (x) {
                if (pp.hasClass(x, className)) {
                    return;
                }
                //
                x.classList.add(className);
            });
            //
            return el;
        }
        //
        return el;
    };
    /**
     * el에 클래스가 존재하는지 여부. like jq's hasClass
     * @param el getElement or getElements or querySelectorAll()
     * @param className 클래스명
     */
    pp.hasClass = function (el, className) {
        if (pp.isNull(el)) {
            return false;
        }
        //
        if (el instanceof Element) {
            return pp.hasClassAtElement(el, className);
        }
        //
        if (el instanceof HTMLCollection) {
            //
            var b = false;
            //
            for (var i = 0; i < el.length; i++) {
                b = b || pp.hasClassAtElement(el.item(i), className);
            }
            //
            return b;
        }
        //
        if (el instanceof NodeList) {
            var b_1 = false;
            //
            el.forEach(function (x) {
                b_1 = b_1 || pp.hasClassAtElement(x, className);
            });
            //
            return b_1;
        }
        //
        return null;
    };
    /**
     *
     * @param el
     * @param className
     */
    pp.hasClassAtElement = function (el, className) {
        if (pp.isNull(el)) {
            return false;
        }
        //
        var b = false;
        //
        el.classList.forEach(function (x) {
            if (x === className) {
                b = true;
            }
        });
        //
        return b;
    };
    /**
     *
     * @param strOrNum
     * @param padLength
     * @param padStr
     */
    pp.lpad = function (strOrNum, padLength, padStr) {
        var s;
        //
        if ('number' === typeof (strOrNum)) {
            s = strOrNum.toString();
        }
        else if ('string' === typeof (strOrNum)) {
            s = strOrNum;
        }
        else {
            throw new Error('.lpad - not allowed type');
        }
        //
        if (pp.isEmpty(s)) {
            return '';
        }
        //
        while (s.length < padLength) {
            s = padStr + s;
        }
        //
        return s;
    };
    /**
     * el에서 클래스 삭제. like jq's removeClass
     * @param el getElement or getElements or querySelectorAll()
     * @param className 클래스명
     */
    pp.removeClass = function (el, className) {
        var _a;
        if (pp.isNull(el)) {
            return el;
        }
        //
        if (el instanceof HTMLElement) {
            //
            el.classList.remove(className);
            //
            return el;
        }
        //
        if (el instanceof HTMLCollection) {
            for (var i = 0; i < el.length; i++) {
                (_a = el.item(i)) === null || _a === void 0 ? void 0 : _a.classList.remove(className);
            }
            //
            return el;
        }
        //
        if (el instanceof NodeList) {
            el.forEach(function (x) {
                x.classList.remove(className);
            });
            //
            return el;
        }
        //
        return el;
    };
    /**
     * unique한 문자열 생성
     * @param pre prefix
     */
    pp.createUid = function (pre) {
        return (pre ? pre : 'UID') + (new Date()).getTime();
    };
    /**
     * element 생성
     * @param tagName
     * @param name
     * @param value
     * @param opt case3
     */
    pp.createElement = function (tagName, name, value, opt) {
        var el = document.createElement(tagName);
        //
        if ('INPUT' === tagName.toUpperCase()) {
            el.setAttribute('type', 'hidden');
            el.setAttribute('value', value);
        }
        //
        el.setAttribute('id', name);
        el.setAttribute('name', name);
        //
        if (pp.isNull(opt)) {
            return el;
        }
        //
        var keys = Object.keys(opt);
        //
        keys.forEach(function (k) {
            var key = k;
            var value = opt[k];
            //
            el.setAttribute(key, value);
        });
        //
        return el;
    };
    /**
     * 폼 생성
     * @param param case1,case2,case3,case4
     */
    pp.createForm = function (param) {
        var form = document.createElement('form');
        //
        form.setAttribute('id', pp.createUid());
        //
        if (pp.isNull(param)) {
            return form;
        }
        //
        var p = pp.toKv(param);
        //
        var keys = Object.keys(p);
        //
        keys.forEach(function (k) {
            var key = k;
            var value = p[k];
            //
            var el = pp.createElement('INPUT', key, value);
            //
            form.appendChild(el);
        });
        //
        return form;
    };
    /**
     * 폼 생성 & 제출
     * @param param
     * @param url
     */
    pp.createFormAndSubmit = function (param, url) {
        var form = pp.createForm();
        //
        if (pp.isNull(form)) {
            return;
        }
        //
        var el = document.querySelector('body:last-child');
        //
        if (pp.isNull(el)) {
            return;
        }
        //
        el === null || el === void 0 ? void 0 : el.append(form);
        //
        var p = pp.toKv(param);
        Object.keys(p).forEach(function (k) {
            var name = k;
            var value = p[k];
            //
            form.append(pp.createElement('input', name, value));
        });
        //
        form.setAttribute('method', 'post');
        form.setAttribute('action', url);
        //
        form.submit();
    };
    /**
     * jquery의 $.extend()같은거. source의 key/value를 몽땅 target에 추가
     * @param target {}
     * @param source {}
     */
    pp.extend = function (target, source) {
        if (pp.isNull(target) || pp.isNull(source)) {
            return target;
        }
        //
        var keys = Object.keys(source);
        //
        keys.forEach(function (k) {
            if (pp.isNotNull(target[k])) {
                return;
            }
            //
            target[k] = source[k];
        });
        //
        return target;
    };
    /**
 * 널인지 여부
 * @param obj 오브젝트
 */
    pp.isNull = function (obj) {
        if (null === obj) {
            return true;
        }
        //
        if (undefined === obj) {
            return true;
        }
        //
        return false;
    };
    /**
     * not isNull
     * @param obj
     */
    pp.isNotNull = function (obj) {
        return !pp.isNull(obj);
    };
    /**
     * not isEmpty
     * @param strOrArr
     */
    pp.isNotEmpty = function (strOrArr) {
        return !pp.isEmpty(strOrArr);
    };
    /**
     * obj가 공백인지 여부
     * @param strOrArr 문자열|배열
     */
    pp.isEmpty = function (strOrArr) {
        if (pp.isNull(strOrArr)) {
            return true;
        }
        //숫자형은 항상 false
        if ('number' === typeof strOrArr) {
            return false;
        }
        //
        if (Array.isArray(strOrArr)) {
            if (0 === strOrArr.length) {
                return true;
            }
        }
        //
        if ('string' === typeof strOrArr) {
            if (0 === strOrArr.length) {
                return true;
            }
        }
        //
        return false;
    };
    /**
     * like oracle's nvl()
     * @param obj
     * @param defaultValue
     */
    pp.nvl = function (obj, defaultValue) {
        if (pp.isNotNull(obj)) {
            return obj;
        }
        //
        if (pp.isNull(defaultValue)) {
            return '';
        }
        else {
            return defaultValue;
        }
    };
    /**
     *
     * @param url
     * @param param case1~4
     * @param callbackSuccess
     * @param opt {'method':string, 'async':boolean}
     */
    pp.submitAjax = function (url, param, callbackSuccess, opt) {
        if (pp.isEmpty(url) || pp.isNull(param)) {
            return;
        }
        //
        var xhr = new XMLHttpRequest();
        //
        xhr.onreadystatechange = function () {
            if (XMLHttpRequest.DONE === xhr.readyState) {
                if (200 === xhr.status) {
                    //성공
                    var v = xhr.responseText.trim();
                    if (-1 != v.indexOf('{')) {
                        //json 형식
                        callbackSuccess(JSON.parse(v));
                    }
                    else {
                        //text 형식
                        callbackSuccess(v);
                    }
                }
                else {
                    //실패
                    alert('오류가 발생했습니다.');
                }
            }
        };
        //
        var defaultSetting = {
            method: 'POST',
            async: true
        };
        //
        var option = pp.extend(defaultSetting, opt);
        //
        xhr.open(option.method, url, option.async);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/json');
        // param 형 변환
        var p = pp.toKv(param);
        //
        xhr.send(p);
    };
    /**
     *
     * @param url
     * @param param case1~4
     */
    pp.submitGet = function (url, param) {
        var form = pp.createForm(param);
        //
        form.setAttribute('method', 'get');
        //
        form.submit();
    };
    /**
     *
     * @param url
     * @param param case1~4
     */
    pp.submitPost = function (url, param) {
        var form = pp.createForm(param);
        //
        form.setAttribute('method', 'post');
        //
        form.submit();
    };
    /**
     * 폼 전송
     * @param url
     * @param el  form element
     */
    pp.submitForm = function (url, el) {
        //
        el.setAttribute('method', 'post');
        el.setAttribute('action', url);
        //
        el.submit();
    };
    /**
     * like jquery's serializeArray
     * @param coll document.getElementsByTagName('body')
     */
    pp.serializeArray = function (coll) {
        /**
         * children쪽 처리
         * @param children body하위의 children
         * @return 배열
         */
        function _children(children) {
            var arr = [];
            //
            if (pp.isNull(children)) {
                return arr;
            }
            //
            for (var i = 0; i < children.length; i++) {
                var item = children === null || children === void 0 ? void 0 : children.item(i);
                if (pp.isNull(item)) {
                    continue;
                }
                //
                if ('INPUT' === (item === null || item === void 0 ? void 0 : item.tagName)) {
                    arr.push({
                        'name': item.nodeName,
                        'value': item.nodeValue
                    });
                }
                //
                if ('TEXTAREA' === (item === null || item === void 0 ? void 0 : item.tagName)) {
                    arr.push({
                        'name': item.nodeName,
                        'value': item.nodeValue
                    });
                }
                //TODO others
            }
            //
            return arr;
        } //
        //결과
        var arr = [];
        //
        if (pp.isNull(coll) || 0 == coll.length) {
            return [];
        }
        //body 갯수만큼 루프
        for (var i = 0; i < coll.length; i++) {
            var item = coll.item(i);
            if (pp.isNull(item)) {
                continue;
            }
            //body내의 children (input, textarea, ...)
            var children = item === null || item === void 0 ? void 0 : item.children;
            //children에서 값을 추출해 arr에 추가
            arr = arr.concat(_children(children));
        }
        //
        return arr;
    };
    /**
     * 파라미터 형 변환
     * @param param 파라미터
     *  case1 {'name':string, 'value':any}
     *  case2 [case1]
     *  case3 {'key':'value'}
     *  case4 [case3]
     */
    pp.toKv = function (param) {
        var p = {};
        //case2, case4인 경우
        if (Array.isArray(param)) {
            return pp.toKvFromArray(param);
        }
        //case1
        if (pp.isNotEmpty(param.name)) {
            return pp.toKvFromNameValue(param.name, param.value);
        }
        //case3
        return param;
    };
    /**
     * 파리미터 형 변환
     * @param arr 파라미터 배열
     */
    pp.toKvFromArray = function (arr) {
        if (pp.isEmpty(arr)) {
            return {};
        }
        //
        var json = arr[0];
        //
        if (pp.isNotEmpty(json.name)) {
            //case2
            return pp.toKvFromNameValueArray(arr);
        }
        else {
            //case4
            var p_1 = {};
            //
            arr.forEach(function (json) {
                p_1 = pp.extend(p_1, json);
            });
            //
            return p_1;
        }
    };
    /**
     * 파라미터 형변환
     * @param arr 파라미터 배열. case2
     */
    pp.toKvFromNameValueArray = function (arr) {
        var _this = this;
        var p = {};
        //
        arr.forEach(function (json) {
            p = pp.extend(p, _this.toKvFromNameValue(json.name, json.value));
        });
        //
        return p;
    };
    /**
     * 파라미터 형 변환
     * @param name
     * @param value
     */
    pp.toKvFromNameValue = function (name, value) {
        return {
            'name': name,
            'value': value
        };
    };
    return pp;
}());
