'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 노드의 속성 변경 목격자
 * @author vaiv
 * @since 0124 init
 */
var PPMutationObserver = function () {
    function PPMutationObserver() {
        _classCallCheck(this, PPMutationObserver);

        this.arr = [];
    }

    _createClass(PPMutationObserver, [{
        key: 'init',
        value: function init() {
            console.debug('<<.init', this);
        }
        /**
         * 목격자에 등록, 목격 시작
         * @param {string} selector
         * @param {function} callbackFn 콜백함수
         */

    }, {
        key: 'add',
        value: function add(selector, callbackFn) {
            if (null != this.get(selector)) {
                //기존 데이터 삭제
                this.remove(selector);
            }

            var json = {
                selector: selector,
                observer: new MutationObserver(function (mutationList, observer) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = mutationList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var mutation = _step.value;

                            if ('attributes' != mutation.type) {
                                return;
                            }

                            if (null != callbackFn) {
                                callbackFn(mutation, document.querySelector(selector).offsetParent);
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                })
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

    }, {
        key: 'remove',
        value: function remove(selector) {
            var index = this.getIndex(selector);

            if (-1 == index) {
                return;
            }

            var obj = this.arr[index];

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

    }, {
        key: 'get',
        value: function get(selector) {
            for (var i = 0; i < this.arr.length; i++) {
                var d = this.arr[i];

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

    }, {
        key: 'getIndex',
        value: function getIndex(selector) {
            for (var i = 0; i < this.arr.length; i++) {
                var d = this.arr[i];

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

    }, {
        key: 'exists',
        value: function exists(selector) {
            return null != this.get(selector);
        }
    }]);

    return PPMutationObserver;
}();

var ppMutationObserver = new PPMutationObserver();
ppMutationObserver.init();
