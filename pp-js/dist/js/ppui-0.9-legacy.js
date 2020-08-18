'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ui와 관련된 것들
 * es6 버전
 * jquery사용하지 않음
 * typescript버전을 es6로 변환
 * es5로 컴파일하는 방법 : @see https://stackoverflow.com/questions/34747693/how-do-i-get-babel-6-to-compile-to-es5-javascript
 * ※ 주의! 이 pp-js가 원본임. 다른 경로의 파일 수정 불허
 * @since   
 *  2020-07-16  init
 * @author gravity@daumsoft.com
 */
var ppui = function () {
    function ppui() {
        _classCallCheck(this, ppui);
    }

    _createClass(ppui, null, [{
        key: 'bindEnterKey',


        /**
         * 엔터키 처리
         * @param {HTMLElement|HTMLCollection|NodeListOf<Element>} el getElement or getElements or querySelectorAll()
         * @param {Function} callback 
         * @returns {void}
         */
        value: function bindEnterKey(el, callback) {
            /**
             * getElement의 경우
             * @param {Element|null} el element
             * @param {Function} callback 
             */
            function _element(el, callback) {
                //
                el.removeEventListener('keypress', function () {
                    //nothing
                });

                //
                el.addEventListener('keypress', function (ev) {
                    if (13 === ev.keyCode) {
                        callback(ev);
                    }
                });
            }

            /**
             * getElements의 경우
             * @param {HTMLCollection} coll 콜렉션
             * @param {Function} callback 
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
             * @param {NodeList} nl 노드 리스트
             * @param {Function} callback
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
        }

        /**
         * el에 클래스 추가. like jq's addClass
         * @param {HTMLElement|HTMLCollection|NodeListOf<Element>} el getElement or getElements or querySelectorAll()
         * @param {string} className 클래스명
         * @returns {HTMLElement|HTMLCollection|NodeListOf<Element>}
         */

    }, {
        key: 'addClass',
        value: function addClass(el, className) {
            if (pp.isNull(el)) {
                return el;
            }

            //
            if (el instanceof HTMLElement) {
                if (ppui.hasClass(el, className)) {
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
                    if (ppui.hasClass(el.item(i), className)) {
                        continue;
                    }

                    //
                    el.item(i).classList.add(className);
                }
                //
                return el;
            }

            //
            if (el instanceof NodeList) {
                el.forEach(function (x) {
                    if (ppui.hasClass(x, className)) {
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
        }

        /**
         * el에 클래스가 존재하는지 여부. like jq's hasClass
         * @param {Element|HTMLCollection|NodeListOf<Element>|null} el getElement or getElements or querySelectorAll()
         * @param {string} className 클래스명
         * @returns {boolean|null}
         */

    }, {
        key: 'hasClass',
        value: function hasClass(el, className) {
            if (pp.isNull(el)) {
                return false;
            }

            //
            if (el instanceof Element) {
                return ppui._hasClassAtElement(el, className);
            }

            //
            if (el instanceof HTMLCollection) {
                //
                var b = false;
                //
                for (var i = 0; i < el.length; i++) {
                    b = b || ppui._hasClassAtElement(el.item(i), className);
                }

                //
                return b;
            }

            //
            if (el instanceof NodeList) {
                var _b = false;
                //
                el.forEach(function (x) {
                    _b = _b || ppui._hasClassAtElement(x, className);
                });

                //
                return _b;
            }

            //
            return null;
        }

        /**
         * like jquery's toggleClass
         * @param {Element} el 
         * @param {string} className 
         */

    }, {
        key: 'toggleClass',
        value: function toggleClass(el, className) {
            ppui.hasClass(el, className) ? ppui.removeClass(el, className) : ppui.addClass(el, className);
        }

        /**
         * 
         * @param {Element|null} el 
         * @param {string} className 
         * @returns {boolean}
         */

    }, {
        key: '_hasClassAtElement',
        value: function _hasClassAtElement(el, className) {
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
        }

        /**
         * el에서 클래스 삭제. like jq's removeClass
         * @param {HTMLElement|HTMLCollection|NodeListOf<Element>} el getElement or getElements or querySelectorAll()
         * @param {string} className 클래스명
         * @returns {HTMLElement|HTMLCollection|NodeListOf<Element>}
         */

    }, {
        key: 'removeClass',
        value: function removeClass(el, className) {
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
                    el.item(i).classList.remove(className);
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
        }

        /**
         * blob로 <img> 생성
            * @param {Object} blob 이미지 blob
         * @param {object} option 속성값 {'width':number, 'height':number, 'id':string, 'name':string}
         * @param {function} callbackFn 이미지 생성 완료 후 호출할 콜백함수. FileReader가 비동기적으로 처리되기 때문에 콜백사용
         */

    }, {
        key: 'createImgByBlob',
        value: function createImgByBlob(blob, option, callbackFn) {
            var img = document.createElement('img');

            //
            var opt = pp.extend({}, option);

            //
            if (pp.isNotEmpty(opt.id)) {
                img.id = opt.id;
            }
            //
            if (pp.isNotEmpty(opt.name)) {
                img.name = opt.name;
            }
            //
            if (pp.isNotEmpty(opt.width)) {
                img.width = opt.width;
            }
            //
            if (pp.isNotEmpty(opt.height)) {
                img.height = opt.height;
            }

            //@see http://www.jongminjang.com/html5/file/2018/12/27/blob-as-img-src.html
            var reader = new FileReader();
            reader.onload = function (e) {
                img.src = reader.result;

                //
                callbackFn(img);
            };
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

    }, {
        key: 'createElement',
        value: function createElement(tagName, name, value, opt) {
            var htmlElement = document.createElement(tagName);

            //
            if ('INPUT' === tagName.toUpperCase()) {
                htmlElement.setAttribute('type', 'hidden');
                htmlElement.setAttribute('value', value);
            }
            //
            htmlElement.setAttribute('id', name);
            htmlElement.setAttribute('name', name);

            //
            if (pp.isNull(opt)) {
                return htmlElement;
            }

            //
            var keys = Object.keys(opt);
            //
            keys.forEach(function (k) {
                var key = k;
                var value = opt[k];
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

    }, {
        key: 'createForm',
        value: function createForm(param) {
            var htmlFormElement = document.createElement('form');
            //
            htmlFormElement.setAttribute('id', pp.createUid());

            //
            if (pp.isNull(param)) {
                return htmlFormElement;
            }

            //
            var map = pp.toMap(param);
            //
            map.forEach(function (value, key) {
                //
                var el = ppui.createElement('INPUT', key, value);
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

    }, {
        key: 'createFormAndSubmit',
        value: function createFormAndSubmit(url, param) {
            var htmlFormElement = ppui.createForm(param);
            //
            if (pp.isNull(htmlFormElement)) {
                return;
            }

            //
            var el = document.querySelector('body:last-child');
            //
            if (pp.isNull(el)) {
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

    }, {
        key: 'submitForm',
        value: function submitForm(url, htmlFormElement) {
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

    }, {
        key: 'submitGet',
        value: function submitGet(url, param) {
            var htmlFormElement = ppui.createForm(param);

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

    }, {
        key: 'submitPost',
        value: function submitPost(url, param) {
            var htmlFormElement = ppui.createForm(param);

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

    }, {
        key: 'serializeArray',
        value: function serializeArray(htmlCollection) {
            /**
             * children쪽 처리
             * @param {htmlCollection} htmlCollection body하위의 children
             * @return {Array} 
             */
            function _children(htmlCollection) {
                var arr = [];
                //
                if (pp.isNull(htmlCollection)) {
                    return arr;
                }

                //
                for (var i = 0; i < htmlCollection.length; i++) {
                    var el = htmlCollection.item(i);
                    if (pp.isNull(el)) {
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
            } //


            //결과
            var arr = [];

            //
            if (pp.isNull(htmlCollection) || 0 == htmlCollection.length) {
                return [];
            }

            //body 갯수만큼 루프
            for (var i = 0; i < htmlCollection.length; i++) {
                var el = htmlCollection.item(i);
                if (pp.isNull(el)) {
                    continue;
                }

                //body내의 children (input, textarea, ...)
                var children = el.children;
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

    }, {
        key: 'checkReq',
        value: function checkReq(nodeList, option) {
            var map = new Map();
            map.set('b', true);

            //
            var opt = pp.extend(new Map().set('showMessage', true), option);

            //
            if (null == nodeList || 0 == nodeList.length) {
                return map;
            }

            //
            for (var i = 0; i < nodeList.length; i++) {
                var _node = nodeList.item(i);

                //
                if (pp.isEmpty(_node.value)) {
                    map.set('b', false);
                    map.set('node', _node);

                    break;
                }
            }

            //
            if (pp.isNotEmpty(map.get('node').title)) {
                map.set('title', map.get('node').title);
            } else {
                var id = node.id;
                var htmlElement = document.querySelector('label[for="' + id + '"]');
                if (pp.isNotNull(htmlElement)) {
                    map.set('title', htmlElement.innerHTML);
                }
            }

            //메시지 표시이면
            if (opt.get('showMessage')) {
                map.get('node').focus();
                //
                if (pp.isNotEmpty(map.get('title'))) {
                    alert(map.get('title') + '\uC740(\uB294) \uD544\uC218\uD56D\uBAA9\uC785\uB2C8\uB2E4.');
                } else {
                    alert('필수항목입니다.');
                }
            }

            //
            return map;
        }

        /**
         * el에 이벤트 등록
         * @param {HtmlElement} el
         * @param {string} eventName
         * @param {Function} callbackFn
         * @since	20200818	init
         */

    }, {
        key: 'on',
        value: function on(el, eventName, callbackFn) {
            if (pp.isNull(el)) {
                console.log('on', 'null htmlNode');
                return;
            }

            //
            el.addEventListener(eventName, callbackFn);
        }

        /**
         * 파일 업로드
         * @param {string} url
         * @param {File} file 
         * @param {Function} callbackSuccess
         * @param {any|undefined} option
         */

    }, {
        key: 'uploadFile',
        value: function uploadFile(url, file, callbackSuccess, option) {
            if (pp.isNull(file)) {
                callbackSuccess({ errorCode: 'E_NULL' });
                return;
            }

            //파일 크기 검사
            if (!pp.checkFileSize(file, 123456)) {
                callbackSuccess({ errorCode: 'E_FILE_SIZE' });
                return;
            }

            //파일 확장자 검사
            if (!pp.checkFileExt(file)) {
                callbackSuccess({ errorCode: 'E_EXT' });
                return;
            }

            //
            var xhr = new XMLHttpRequest();
            xhr.open('post', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            //
            xhr.onreadystatechange = function () {
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
            var fd = new FormData();
            fd.append('file', file);

            //
            xhr.send(fd);
        }
    }]);

    return ppui;
}();
