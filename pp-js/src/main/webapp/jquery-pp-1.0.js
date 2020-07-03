// JavaScript source code
/**
 * cs 공통 javascript 라이브러리
 * jquery의 plugin
 * 주의! 
 * 	- 이 파일의 로직은 임의로 변경하면 안됨
 * 	- 변경시 현성길/부장과 상의 바람
 * 	- ucsit-js의 jquery-cs-0.9a.js 파일 업데이트하여 사용해야 함
 * @since
 * 	201901xx	init
 * 	20191024	주의 comment 추가
 * 	20200414	pluginName변경. cs => pp
 * @param $
 * @param window
 * @param document
 * @param undefined
 * @returns
 */
;(function ( $, window, document, undefined) {
    'use strict';

    var pluginName = 'pp';

    $[pluginName] = $.fn[pluginName] = {
		
        DEFAULT_PAGE_NO: 1,
        DEFAULT_PAGE_SIZE: 10,
        MSG_NO_DATA_FOUND: '데이터가 없습니다',
		
		FILE_EXT_OFFICE : ['.doc','.docx','.xls','.xlsx','.ppt','.pptx','.hwp','.pdf','.show','.cell'],
		FILE_EXT_TEXT : ['.txt'],
		FILE_EXT_PHOTO : ['.jpg','.bmp','.png','.gif'],
		FILE_EXT_ZIP : ['.zip','.7z','.z00','.z01','.z02','.z03','.z04','.z05','.alz','.a00','.a01','.a02','.a03'],

		//
        defaultOption: {
            contextPath : '/',
			urlPostDo : '.do',
			urlPostJson : '.json',
			fileExtGbns : ['OFFICE','TEXT','PHOTO','ZIP'],
			fileExts : []
        },
		
		getInfo : function(){
			return {version:'0.9a', author:'cs1492', date:'20190110'};
		},

		/**
		 * 옵션값 초기화 
		 * @param {Object} optionJson	defaultOption 구조와 동일
		 */
        init: function (optionJson) {
            $.extend(this.defaultOption, optionJson);
        },


        /**
         * 문자열에 천단위 콤마 추가
         * @param {String|Number} strOrNum 문자열|숫자
         * @return {String} 콤마 추가된 문자열
         */
        addComma: function (strOrNum) {
            let s = strOrNum;

            if (this.isEmpty(s)) {
                return '';
            }

            //
            if ('number' === typeof s) {
                s = s.toString();
            }

            return s.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
        },


        /**
         * strOrNum에 천단위 콤마 추가하여 리턴
         * @param {string|number} strOrNum 문자형 또는 숫자형
         * @since
         *  20200416    init
         */
        comma : function(strOrNum){
            return addComma(strOrNum);
        },


        /**
         * 엔터키 입력시 처리. 보통 조회 조건 입력 후 엔터 입력시 처리를 위해 사용
         * @param {Array} objects jquery 인스턴스 목록. ex)$('[type=search]')
         * @param {Function} callback 호출할 콜백함수
         * @return {Boolean} true:엔터키 입력이 아니면
         */
        bindEnterKey : function (objects, callback) {
            $.each(objects, function (i, item) {
                //
                $(item).on('keypress', function (e) {
                    var key = window.event ? e.keyCode : e.which;
                    //
                    if (13 === key) {
                        eval(callback)($(this), e);
                        return false;
                    }
                });
            });
            return true;
        },


        /**
         * drop 이벤트 처리
         * @param $selector 이벤트 바인드할 셀렉터
         * @param callbackFunction 콜백 함수
         * @since
         * 	20200305	init
         */
        bindDropEvent : function($selector, callbackFunction){
        	//
            $selector.on('drop', function(evt){
                //
                let dataTransfer = evt.originalEvent.dataTransfer;
                if(!dataTransfer || !dataTransfer.files){
                    console.log('<<.cs.bindDropEvent', 'null files');
                    callbackFunction(result);
                    return;
                }
                
                //
                evt.preventDefault();
                evt.stopPropagation();
                
                //
                let fileList = dataTransfer.files;
                
                //
                console.log('<<cs.bindDropEvent', fileList);
                callbackFunction(fileList);
            });

        },
        
        
        
        /**
         * paste 이벤트 처리
         * @param $selector 이벤트 바인드할 셀렉터
         * @param callbackFunction 콜백 함수
         * @since
         * 	20200305	init
         */
        bindPasteEvent : function($selector, callbackFunction){
        	
        	//
        	$selector.on('paste', function(evt){
        		let data = evt.originalEvent;

                //
                if(!data.clipboardData || !data.clipboardData.items || 0 == data.clipboardData.items.length){
                	result.resultCode = 'E_NULL_CLIPBOARD';
                    callbackFunction(null);
                    return;
                }

                //
                evt.preventDefault();
                evt.stopPropagation();

                //맨 마지막꺼 하나만 처리
                let items = data.clipboardData.items;
                let dataTransferItem = items[items.length-1];

                //
                if(null == dataTransferItem || undefined == dataTransferItem){
                    callbackFunction(null);
                }
    
                //
                console.log('<<cs.bindPasteEvent', dataTransferItem);
                callbackFunction(dataTransferItem);
        	});
        },
        
        
        /**
         * json의 key/value로 html의 value값 바인드하기
         * @param opts {yn:bool}
         * 	yn : true(Y/N으로 표시), false(예/아니오로 표시)
         * @history
         * 	20200515	init
         */
        bindElementValueFromJson : function($holders, json, opts){
        	let opt = opts?opts:{};
        	
        	//
        	$holders.each(function(i,item){
        		let $holder = $(item);
        		
        		let keys = Object.keys(json);
        		for(let i=0; i<keys.length; i++){
        			let k = keys[i];
        			let v = json[k];
        			
        			//
        			let $el = $holder.find('[name='+k+']') || $holder.find('#'+k);
        			if(null == $el || undefined == $el || 0 == $el.length){
        				continue;
        			}
        			
        			//
        			if('INPUT' === $el.prop('tagName')){
        				//TODO checkbox
        				
        				
        				if('Y' === v && !opt.yn){
        					v = "예";
        				}
        				if('N' === v && !opt.yn){
        					v = "아니오";
        				}
        				
        				$el.val(v);
        				continue;
        			}
        			
        			//
        			if('TEXTAREA' === $el.prop('tagName')){
        				$el.html(v);
        				continue;
        			}
        		}
        	});
        },


        /**
         * 첫자만 대문자로 변환
         * @param {String} str 문자열
         * @return {String} 처리된 문자열
         */
        capitalize: function (str) {
            if (this.isNull(str)) {
                return '';
            }
            return str.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            });
        },


        /**
         * 구분자로 문자열 더하기
         * @param {String} deli 구분자
         * @param {Array} arr 배열
         * @return {String} 문자열
         */
        concat: function (deli, arr) {
            let s = '';
            //
            if (this.isEmpty(deli) || this.isEmpty(arr) || !Array.isArray(arr)) {
                return s;
            }

            //
            $.each(arr, function (i, item) {
                s += ((0 === s.length) ? '' : deli) + item;
            });

            //
            return s;
        },


        /**
         * 폼 인스턴스 생성 & hidden 엘리먼트 추가
         * @param {Array} attrs 폼에 추가(생성)될 element의 attribute의 key/value 목록. [{key:value,...},...] 
         * @return {Object} 폼 인스턴스
         */
        createForm: function (attrs) {
            var formId = this.createUid('f');
            var $form = $("<form id=" + formId + "/>");

            //
            if (this.isEmpty(attrs)) {
                return $form;
            }

            //
            for(let i=0; i<attrs.length; i++){
                $form.append(this.createElement(attrs[i]));
            }

            //
            return $form;
        },
        
        /**
         * 폼생성 & 제출을 한번에...
         * @param {Array} attrs createForm의 attrs 설명 참조 
         * @param {String} url 전송할 url
         */
        createFormAndSubmit : function(attrs, url){
        	let $f = this.createForm(attrs);
        	
        	//
        	$('body').append($f);
        	
        	//
        	this.submitForm($f, url);
        },
        

        /**
         * 엘리먼트 생성
         * @param {Object} attrJson 추가 옵션. 키는 엘리먼트의 attribute가 되고, 값은 엘리먼트의 값이 됨. ex){'name':'이름',value:'값'} or {'key':'value'}
         * @return {Object} 생성된 엘리먼트
         * @history
         * 	20200514	{'key':'value'}처리 로직 추가
         */
        createElement: function (attrJson) {            
            //
            let ty = this.containsKey(attrJson, 'type') ? attrJson['type'] : 'hidden';
           
            //
            let $el = $('<input type="'+ty+'">');
            
            //
            if(this._hasNameKey(attrJson)){
            	//json의 key는 element의 attribute가 되고, value는 element의 value가 됨
            	for (let k in attrJson) {
            		$el.attr(k, attrJson[k]);
            	}
            	
            }else{
            	//json의 key는 element의 name's value가 되고, value는 value's value가 됨
            	for(let k in attrJson){
            		$el.attr('name', k);
            		$el.attr('value', attrJson[k]);
            	}
            }

            //
            return $el;
        },
        
        
        
        /**
         * json에 키 이름중에 name이 있는지 검사
         * @param json json object
         * @return true(키중에 name이라는게 존재) / false
         * @history
         * 	20200514	init
         */
        _hasNameKey : function(json){
        	if(null == json || undefined == json){
        		return false;
        	}
        	
        	let b = false;
        	for(let k in json){
        		if('name' === k){
        			b = true;
        			break;
        		}
        	}
        	
        	//
        	return b;
        },

        
        /**
         * 배열안에 searchValue가 있는지 여부
         * @param {Object} searchValue 찾을 값
         * @param {Array} 배열
         * @param {String} key json's key. 배열안의 값이 json일 경우 사용. 옵션
         * @returns {Boolean} 존재시 true
         */
        containsInArray : function(searchValue, arr, key){
        	if(2 == arguments.length){
        		for(let i in arr){
        			let d = arr[i];
        			
        			if(searchValue == d){
        				return true;
        			}
        		}
        	}else{
        		for(let i in arr){
        			let d = arr[i];
        			
        			if(searchValue == d[key]){
        				return true;
        			}
        		}
        	}
        	
        	//
        	return false;
        },
        
        
        /**
         * json에 key가 존재하는지 여부
         * @param {Object} json 객체
         * @param {String} key 검사할 키
         * @return {Boolean} true:json에 key존재
         */
        containsKey: function (json, key) {
            if (this.isNull(json) || this.isEmpty(key)) {
                return false;
            }

            return json.hasOwnProperty(key);
        },




        /**
         * 유니크한 문자열 생성
         * @param {Object} prefix 리터할 문자열 앞에 붙일 구분자. default:UID
         * @return {String} 문자열
         */
        createUid: function (prefix) {
            return (this.isNotNull(prefix) ? prefix : 'UID') + (new Date()).getTime();
        },
        
        
        /**
         * 중복제거된 값 목록(쿼리의 distinct와 유사)
         * @param {Array} arr 배열
         * @param {String} key 배열의 키
         * @returns {Array} 값 목록
         */
        distinct : function(arr, key){
        	if(this.isEmpty(arr)){
        		return [];
        	}
        	
        	//
        	let m = {};
        	for(let i=0; i<arr.length; i++){
        		let v = arr[i][key];
        		m[v] = v;
        	}
        	
        	//
        	let results = Object.keys(m);
        	
        	//
        	results.sort();
        	
        	//
        	return results;
        },



        /**
         * 문자열에서 콤마 제거
         * @param {String} str 문자열
         * @return {String} 콤마 제거된 문자열
         */
        deleteComma: function (str) {
            if (this.isEmpty(str)) {
                return '';
            }
            //
            return str.replace(/,/gi, '');
        },

        /**
         * @see deleteComma
         * @param {*} str 
         * @since
         *  20200416    init
         */
        uncomma : function(str){
            return deleteComma(str);
        },


        /**
         * endsWith method는 es6에 존재함(이전 버전에는 존재하지 않음)
         * @param {String} sourceString 원본 문자열
         * @param {String} search 찾을 문자열
         * @return {Boolean} true:search로 끝나면
         */
        endsWith: function (sourceString, search) {
            return (search === sourceString.substring(sourceString.length - search.length));
        },


        /**
         * 체크된 체크박스의 값 목록 추출
         * @param {Object} $checkedList 체크된 
         * @return {Array} 값 목록
         */
        getCheckedValues: function ($checkedList) {
            let arr = [];

            for (let i = 0; i < $checkedList.length; i++) {
                let $item = $($checkedList[i]);

                if ($item.is(':checked')) {
                    arr.push($item.val());
                }
            }

            //
            return arr;
        },
        
        
        /**
         * value만 배열로 리턴
         */
        getValues : function($list){
        	let arr = [];
        	for(let i=0; i<$list.length; i++){
        		arr.push( $list[i].value );
        	}
        	
        	//
        	return arr;
        },
        
        
        /**
         * 입력 가능한 키코드인지 여부
         * @param {Number} keyCode
         * @param {Object} json {include:{keys:[Number], between:[{from:Number, to:Number}]}, exclude:{keys:[Number], between:[{from:Number, to:Number}]}}
         */
        _isAllowKeyCode:function(keyCode, json){
        	if(this.isNull(json)){
        		return true;
        	}
        	
        	//포함정보이면
        	if(this.isNotNull(json.include)){
        		//키코드 목록이면
        		if(this.isNotNull(json.include.keys)){
        			let arr = json.include.keys;
        			for(let i=0; i<arr.length; i++){
        				if(keyCode === arr[i]){
        					return true;
        				}
        			}
        		}
        		
        		//between이면
        		if(this.isNotNull(json.include.between)){
        			let arr = json.include.between;
        			for(let i=0; i<arr.length; i++){
        				for(let j=arr[i].from; j<=arr[i].to; j++){
        					if(keyCode === j){
        						return true;
        					}
        				}
        			}
        		}        		
        	}
        	
        	//
        	if(this.isNotNull(json.exclude)){
        		throw new Error('._isAllowKeyCode - exclude not impl');
        	}
        	
        	
        	//
        	return false;
        },


        /**
        * 널인지 검사
        * @param {Object} obj 오브젝트
        * @return {Boolean} true:널 or undefined
        */
        isNull: function (obj) {           
            if (null === obj) {
                return true;
            }
            if (undefined === obj) {
                return true;
            }

            return false;
        },


        /**
         * 널이 아닌지 검사
         * @param {Object} obj 검사할 오브젝트
         * @return {Boolean} true:null and undefined이 아님
         */
        isNotNull: function (obj) {
            return !this.isNull(obj);
        },


        /**
         * obj가 공백인지 검사. 숫자인경우 항상 false 리턴. 배열인 경우 배열의 length 검사
         * @param {String|Number|Array} obj 문자열|숫자|배열
         * @return {Boolean}  true:널or공백
         * @throws 문자열or배열이 아니면 예외 발생
         */
        isEmpty: function (obj) {
            if (this.isNull(obj)) {
                return true;
            }

            //문자열이면
            if ('string' === typeof (obj)) {
                if ('' === obj || 0 === obj.length) {
                    return true;
                } else {
                    return false;
                }
            }

            //숫자는 항상 false
            if ('number' === typeof (obj)) {
                return false;
            }

            //배열이면
            if (Array.isArray(obj)) {
                return (0 === obj.length);
            }

            throw new Error('.isEmpty - only string or array');

        },
        
        
        /**
         * 배열 요소중에 empty가 있는지 검사
         * @param arr
         * @return true(배열 요소중에 하나라도 empty가 존재 or 배열이 null) / false
         * @since
         * 	20200518	init
         */
        isEmptyAny : function(arr){
        	if(null == arr || undefined == arr){
        		return false;
        	}
        	
        	
        	//
        	for(let i=0; i<arr.length; i++){
        		let d = arr[i];
        		
        		if(this.isEmpty(d)){
        			return true;
        		}
        	}
        	
        	//
        	return false;
        },


        /**
         * 널or공백이 아닌지 검사
		 * @see isEmpty
         * @param {Object} obj 검사할 오브젝트
         * @return {Boolean} true:널|공백이 아님
         */
        isNotEmpty: function (obj) {
            return !this.isEmpty(obj);
        },


        /**
         * 문자열 길이 채우기(왼쪽)
         * @param {String|Number} strOrNum 문자열|숫자
         * @param {Number} padLength 리턴 문자열 전체 길이
         * @param {String} padStr padding 문자열
         * @return {String} padding된 문자열
         */
        lpad: function (strOrNum, padLength, padStr) {
            let s;
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
            if (this.isEmpty(s)) {
                return '';
            }
            //
            while (s.length < padLength) {
                s = padStr + s;
            }
            //
            return s;
        },


        /**
         * arguments로 넘어온 숫자에서 가장 작은 값 리턴
         * @history
         *  0702    init
         */
        min: function(){
            let result = Number.MAX_VALUE;

            //
            if(0 == arguments.length){
                return result;
            }

            //
            for(let i=0; i<arguments.length; i++){
                if(result > arguments[i]){
                    result = arguments[i];
                }
            }

            //
            return result;
        },

        /**
         * arguments로 넘어온 숫자에서 가장 큰 값 리턴
         * @history
         *  0702    init
         */
        max: function(){
            let result = Number.MIN_VALUE;

             //
             if(0 == arguments.length){
                return result;
            }

            //
            for(let i=0; i<arguments.length; i++){
                if(result < arguments[i]){
                    result = arguments[i];
                }
            }

            //
            return result;
        },


        /**
         * 오라클의 nvl()같은 역할
         * @param {Object} obj
         * @param {Object} defaultValue obj가 널일때 리턴할 값
		 * @return {Object} 널이 아니면 obj, 널이면 defaultValue
         */
        nvl: function (obj, defaultValue) {
            if (this.isNull(obj)) {
                if (!this.isNull(defaultValue)) {
                    return defaultValue;
                }
                else {
                    return '';
                }
            }
            else {
                return obj;
            }
        },

        /**
        * 데이터가 없는 테이블에 메시지 표시하기
        * @param {Object} $tables 테이블 목록
        * @return {Object} 처리된 테이블 목록
        */
        noDataFound: function ($tables) {
            if (this.isNull($tables)) {
                return;
            }

			for(let i=0; i<$tables.length; i++){
				let item = $tables[i];
				this._noDataFound($(item));
			}
            
            //
            return $tables;
        },


        /**
         * 데이터가 없는 테이블에 메시지 표시하기
         * @param {Object} $table 테이블 객체
         * @return {Object} 처리된 테이블 객체
         */
        _noDataFound: function ($table) {
            if (this.isNull($table)) {
                return;
            }

            //
            if(0 === $table.find('thead').length) {
                return;
            }

            //
            if (0 === $table.find('thead tr').length) {
                return;
            }

            //
            if (0 === $table.find('thead tr th').length) {
                return;
            }

            //
            if (0 < $table.find('tbody').length && 0 < $table.find('tbody tr').length && 0 < $table.find('tbody tr td').length) {
                return;
            }

            //
            let $tbody = (0 === $table.find('tbody').length) ? $('<tbody/>').appendTo($table) : $table.find('tbody');
            let $tr = (0 === $tbody.find('tr:first').length) ? $('<tr/>').appendTo($tbody) : $tbody.find('tr:first');
            let len = $table.find('thead tr th').length;

            $tr.append('<td colspan="' + len + '" style="text-align:center;">데이터가 없습니다</td>');

            //
            return $table;
        },


		
		
		

        /**
         * [{'name':'k','value':'v'},...] ==> {'k':'v'}로 변환
         * @param {Object} arrOfJson 보통 폼의 엘리먼트를 serializeArray()한 값
         * @return {Object} json 객체
         */
        arrayToKVJson: function (arrOfJson) {
            if (!Array.isArray(arrOfJson)) {
                return arrOfJson;
            }

            //
            let json = {};
            for (let i = 0; i < arrOfJson.length; i++) {
                let j1 = arrOfJson[i];
                let k1 = j1.name;

                json[k1] = j1.value;

                //
                let list = [];
                for (let j = 0; j < arrOfJson.length; j++) {
                    let j2 = arrOfJson[j];
                    let k2 = j2.name;
                    //
                    if (k1 === k2) {
                        list.push(j2.value);
                    }
                }

                //
                if (1 === list.length) {
                    json[k1] = list[0];
                } else {
                    json[k1] = list;
                }
            }

            //
            return json;
        },



        /**
         * arrOfNameValue를 key/value json으로 변환
         * @param {array} arrOfNameValue  [{'name':'string', 'value':'string'},...]
         */
        _convertArrayToJson : function(arrOfNameValue){
            let p={};
            //
            for(let i=0; i<arrOfNameValue.length; i++){
                let json = arrOfNameValue[i];
                let p2 = _convertNameValueToJson(json.name, json.value);
                //
                p = $.extend(p, p2);
            }
        },



        /**
         * objectOfNameValue를 key/value json으로 변환
         * @param {object} objectOfNameValue {'name':'string', 'value':'string'}
         */
        _convertObjectToJson : function(objectOfNameValue){
            return _convertNameValueToJson(objectOfNameValue.name, objectOfNameValue.value);
        },


        /**
         * name,value를 key/value json으로 변환
         * @param {string} name 
         * @param {string} value 
         */
        _convertNameValueToJson : function(name, value){
            let k = name;
            let v = value;
            //
            return {k:v};
        },

        /**
         *  case1   [{'name':'string, 'value':'string'},...]
         *  case2   {'name':'string', 'value':'string'}
         *  case3   name, value
         */
        convertNameValueToJson : function(){
            //error
            if(0 === arguments.length){
                return {};
            }


            //case3
            if(2 === arguments.length){
                return _convertNameValueToJson(arguments[0], arguments[1]);
            }

            //
            if(Array.isArray(arguments[0])){
                //case1
                return _convertArrayToJson(arguments[0]);

            }else{
                //case2
                return _convertObjectToJson(arguments[0]);
            }
        },
        
        /**
         * 날짜형식만 입력 가능
         * @param {Object} $item
         */
        _onlyDate : function($item){
        	let json = {};
        	json.include = {};
        	json.include.keys = [8,9,13,17,46,67,86,88, 45,189,109];
        	json.include.between = [{from:48, to:57}, {from:96, to:105}]; //1~0, numpad 1~0
        	
        	let self = this;
        	
    		//
    		$item.keydown(function(e){
    			let b = self._isAllowKeyCode(e.keyCode, json);
    			if(!b){
    				e.returnValue = false;
        			$item.val( $item.val().replace(/[^0-9- ]/g,''));
        			return false;
    			}

    			//
    			return true;
    		});
        },
        
        
        
        /**
         * 숫자만 입력 가능. keydown 이벤트에 등록
         * @param {Object} $item
         */
        _setEventOnlyNumber : function($item){
        	let json = {};
        	json.include = {};
        	json.include.keys = [8,9,13,17,46,67,86,88];
        	json.include.between = [{from:48, to:57}, {from:96, to:105}]; //1~0, numpad 1~0
        	
        	let self = this;
        	
    		//
    		$item.keydown(function(e){
    			let b = self._isAllowKeyCode(e.keyCode, json);
    			if(!b){
    				e.returnValue = false;
        			$item.val( $item.val().replace(/[^0-9 ]/g,''));
        			return false;
    			}

    			//
    			return true;
    		});
        },
        
        
        /**
         * 숫자만 입력 가능
         * @param {Object} $list
         */
        setEventOnlyNumber : function($list){
        	if(this.isNull($list)){
        		return;
        	}
        	
        	//
        	for(let i=0; i<$list.length; i++){
        		let $item = $($list[i]);
        		
        		//
        		this._setEventOnlyNumber($item);
        	}
        },

        /**
         * 비동기 방법으로 ajax 호출
         * @param {Object} actionUrl 호출할 url
         * @param {Object} jsonParam 파라미터. 배열 또는 json
         * @param {Object} callbackSuccess 호출 성공시 실행할 콜백함수
         * @param {Object} callbackBeforeSend 전송전 실행할 콜백함수
         * @param {Object} callbackComplete 완료 후 실행할 콜백함수
         * @param {Object} callbackError 에러 발생시 실행할 콜백함수
         * @since
         * 	1024	상대경로,절대경로관련 수정
         */
        submitAjax: function (actionUrl, jsonParam, callbackSuccess, callbackBeforeSend, callbackComplete, callbackError) {
            let strOfJson;
            //
            if (Array.isArray(jsonParam)) {
                strOfJson = JSON.stringify(this.arrayToKVJson(jsonParam));
            }
            else {
                strOfJson = JSON.stringify(jsonParam);
            }

            //
            let url = actionUrl;
            if('.' === url[0]){
            	//상대경로이면... url 그대로 사용
            }else if('/' === url[0]){
            	//절대경로이면... contextPath를 맨 앞에 붙임
            	if (-1 === url.indexOf(this.defaultOption.contextPath)) {
            		url = this.defaultOption.contextPath + '/' + url;
            	}
            }
            

            //
            if (-1 === url.indexOf(this.defaultOption.urlPostJson)) {
                url += this.defaultOption.urlPostJson;
            }

            //
            this._submitAjax(true, url, strOfJson, callbackSuccess, callbackBeforeSend, callbackComplete, callbackError);
        },


        /**
         * 동기방법으로 ajax 호출
         * @param {Object} actionUrl 호출할 url
         * @param {Object} jsonParam 배열 또는 json
         * @param {Object} callbackSuccess 호출 성공시 실행할 콜백함수
         * @param {Object} callbackBeforeSend 전송전 실행할 콜백함수
         * @param {Object} callbackComplete 완료 후 실행할 콜백함수
         * @param {Object} callbackError 에러 발생시 실행할 콜백함수
         */
        submitAjaxSync: function (actionUrl, jsonParam, callbackSuccess, callbackBeforeSend, callbackComplete, callbackError) {
            let strOfJson;
            //
            if (Array.isArray(jsonParam)) {
                strOfJson = JSON.stringify(this.arrayToKVJson(jsonParam));
            }
            else {
                strOfJson = JSON.stringify(jsonParam);
            }

            //
            let url = actionUrl;
            if (-1 === url.indexOf(this.defaultOption.contextPath)) {
                url = this.defaultOption.contextPath + '/' + url;
            }

            //
            if (-1 === url.indexOf(this.defaultOption.urlPostJson)) {
                url += this.defaultOption.urlPostJson;
            }

            //
            this._submitAjax(false, url, strOfJson, callbackSuccess, callbackBeforeSend, callbackComplete, callbackError);
        },

        /**
         * ajax호출
		 * @see payload body
         * @param {Object} bAsync 비동기호출 여부
         * @param {Object} actionUrl 호출할 전체(절대) 경로
         * @param {Object} strOfJson json을 문자열로 변환한 값
         * @param {Object} callbackSuccess 호출 성공시 실행할 콜백함수
         * @param {Object} callbackBeforeSend 호출전 실행할 콜백함수
         * @param {Object} callbackComplete 호출 완효 후 실행할 콜백함수
         * @param {Object} callbackError 오류 발생시 실행할 콜백함수
         */
        _submitAjax: function (bAsync, actionUrl, strOfJson, callbackSuccess, callbackBeforeSend, callbackComplete, callbackError) {
            
            //payload body
            $.ajax({
                type: 'POST',
                contentType: 'application/json;charset=UTF-8',
                dataType: 'json',
                url: actionUrl.replace(/\/\//gi, '/'),
                data: strOfJson,
                async: bAsync,
                beforeSend: function () {
                    if ('function' === typeof (callbackBeforeSend)) {
                        callbackBeforeSend();
                    }
                },
                success: function (res) {
                    if ('function' === typeof (callbackSuccess)) {
                    	if('string' === typeof(res)){
                    		let s = res.trim();
                    		if('[' === s[0] || '{' === s[0]){
                    			callbackSuccess(JSON.parse(s));
                    		}else{
                    			callbackSuccess(res);
                    		}
                    	}else{
                    		callbackSuccess(res);
                    	}
                    }
                },
                complete: function () {
                    if ('function' === typeof (callbackComplete)) {
                        callbackComplete();
                    }
                },
                error: function (xhr, textStatus, error) {
                    if ('function' === typeof (callbackError)) {
                        callbackError(JSON.parse(xhr.responseText), textStatus, error);
                    }
                    else {
                    	$.pp.log(xhr, textStatus, error);
                        alert('처리중 오류가 발생했습니다.');
                    }
                }
            });
        },

        /**
         * 폼 생성 & get방식으로 전송
         * @param {*} actionUrl 
         * @param {*} arrayOrObject [{'name':'', 'value':''},...] or {'key':'value',...}
         * @history
         *  0702    init
         *  20200514	refactoring
         */
        submitGet : function(actionUrl, arrayOrObject){
            this.submit('get', actionUrl, arrayOrObject);
        },
        
        
        /**
         * 폼 생성 & post방식으로 전송
         * @param arrayOrObject	ex)[{'name':'', 'value':''},...] or {'key':'value',...}
         * @history
         * 	20200514	init
         */
        submitPost : function(actionUrl, arrayOrObject){
        	this.submit('post', actionUrl, arrayOrObject);
        },
        
        
        
        /**
         * 폼 생성 & 전송
         * @param mthd
         * @param actionUrl
         * @param arrayOrObject ex)[{'name':'', 'value':''},...] or {'key':'value',...}
         */
        submit : function(mthd, actionUrl, arrayOrObject){
        	let $f = this.createForm();
        	$f = this.appendElementToForm($f, arrayOrObject);
        	$('body').append($f);
        	
        	//
        	$f.attr('action', actionUrl)
        		.attr('method', mthd)
        		.submit();
        },
        
        
        /**
         * form에 input element추가하기
         * @param	$f	폼
         * @param	arrayOrObject	배열 또는 객체	ex)[{'name':'', 'value':''},...] or {'key':'value',...}
         * 	배열일 경우	=> 객체의 key는 element의 attribute가 됨, value는 해당 attribute의 값이 됨
         * 	객체일 경우 => key는 element의 name attribute가 됨. value는 name attribute의 값이 됨
         * @return	element가 추가된 폼
         */
        appendElementToForm : function($f, arrayOrObject){
        	//
        	let _createEmptyEl = function(){
        		return $('<input type="hidden"/>');
        	};
        	
        	
        	//배열
        	let _fromArray = function($f, arr){
        		for(let i=0; i<arr.length; i++){
        			let obj = arr[i];
        			let $el =  _createEmptyEl();
        			
        			for(let k in obj){
        				$el.attr(k, obj[k]);
        			}
        			
        			//
        			$f.append($el);
        		}
        		
        		//
        		return $f;
        	};
        	
        	//객체
        	let _fromObject = function($f, obj){
        		for(let k in obj){
        			let $el =  _createEmptyEl();
        			
        			//
        			$el.attr('name', k);
        			$el.attr('value', obj[k]);
        			
        			//
        			$f.append($el);
        		}
        		
        		//
        		return $f;
        	};
        	
        	//
        	if(Array.isArray(arrayOrObject)){
        		return _fromArray($f, arrayOrObject);
        	}else{
        		return _fromObject($f, arrayOrObject);
        	}
        },


        /**
         * 폼을 POST 방식으로 전송
         * @param {Object} $form 폼 인스턴스
         * @param {String} actionUrl 호출할 url
         * @return {Boolean} 항상 false
         */
        submitForm: function ($form, actionUrl) {
            var url = actionUrl;
            //
            if (-1 === url.indexOf(this.defaultOption.contextPath)) {
                url = this.defaultOption.contextPath + '/' + url;
            }
            //
            if (-1 === url.indexOf(this.defaultOption.urlPostDo)) {
                url += this.defaultOption.urlPostDo;
            }

            //
            $form.attr('method', 'POST')
                .attr('action', url)
                .submit();

            return false;
        },

        /**
         * json 객체 생성
         * @param {Object} id 아이디
         * @param {Object} name 네임
         * @param {Object} value 값
		 * @return {Object} {id:string, name:string, value:string}
         */
        toJson: function (id, name, value) {
            let json = {};
            if (this.isNotNull(id)) {
                json.id = id;
            }

            if (this.isNotNull(name)) {
                json.name = name;
            }

            if (this.isNotNull(value)) {
                json.value = value;
            }

            //
            return json;
        },
        
        
        
        /**
         * $selecotr하위 input의 정보(이름,값)를 array로 생성&리턴
         * @history
         * 	20200515	init
         */
        toArrayFromElement : function($selector){
        	let arr = {};
        	
        	$selector.find('input').each(function(i,item){
        		let p = {};
        		p.name = $(item).attr('name');
        		p.value = $(item).attr('value');
        		
        		//
        		arr.push(p);
        	});
        	
        	//
        	return arr;
        },
        
        /**
         * $selecotr하위 input의 정보(이름,값)를 json object로 생성&리턴
         * @history
         * 	20200515	init
         */
        toJsonFromElement : function($selector){
        	let p = {};
        	
        	$selector.find('input').each(function(i,item){
        		let k = $(item).attr('name');
        		let v = $(item).attr('value');
        		
        		//
        		p[k] = v;
        	});
        	
        	//
        	return p;
        },



        /******************/

        /**
         * 이메일 주소 형식인지 검사
         * @param {String} email 문자열
         * @return {Boolean} true:이메일 주소 형식
         */
        checkEmail: function (email) {
            if (this.isEmpty(email)) {
                return true;
            }
            //
            if (-1 === email.indexOf('@')) {
                return false;
            }
            //
            if (-1 === email.indexOf('.')) {
                return false;
            }
            //
            return true;
        },

        /**
         * 인스턴스의 필수 입력 값 검사
         * @param {Object} $item 인스턴스
         * @return {Boolean} true:항목의 값 존재
         */
        _validateReq: function ($item) {
            if (this.isNull($item)) {
                return true;
            }

            return this.isNotEmpty($item.val());
        },

        /**
         * 필수 입력 항목 값 검사
         * @param {Object} $list 인스턴스 목록. ex) $('[data-vreq]')
         * @return {Boolean} 정상일 경우 b:true로 리턴됨. {b:boolean, obj:object, title:string}
         */
        validateReq: function ($list) {           
            let result = { 'b': true };
            //
            if (this.isNull($list)) {
                return result;
            }

            //
            for (let i = 0; i < $list.length; i++) {
                let $item = $($list[i]);

                //
                if (!this._validateReq($item)) {
                    result.b = false;
                    result.obj = $item;
                    result.title = $item.prop('title');
                    break;
                }                
            }

            //
            if (!result.b) {
				result.obj.focus();
                alert(result.title + '은(는) 필수입력 항목입니다.');
            }

            //
            return result;
        },

        /**
         *  값이 숫자인지 검사
         * @param {Object} $item 인스턴스
         * @return {Boolean} true:값이 문자열이고 숫자로 변환이 되면
         */
        _validateNum: function ($item) {
            if ('string' !== typeof $item.val()) {
                return true;
            }

            return !isNaN(parseInt($item.val()));
        },

        /**
         * 값이 숫자인지 검사
         * @param {Object} $list 인스턴스 목록. ex) $('[data-vnum]')
         * @return {Boolean} 정상일 경우 b:true로 리턴됨 {b:boolean,obj:object,title:string}
         */
        validateNum: function ($list) {
            var result = { 'b': true };
            //
            if (this.isNull($list)) {
                return result;
            }
           

            //
            for (let i = 0; i < $list.length; i++) {
                let $item = $($list[i]);

                //
                if (!this._validateNum($item)) {
                    result.b = false;
                    result.obj = $item;
                    result.title = $item.prop('title');
                    break;
                }
            }

            //
            if (!result.b) {
				result.obj.focus();
                alert(result.title + '은(는) 숫자만 가능합니다.');
            }
            
            //
            return result;

        },

        /**
         * 날짜형인지 검사
         * @param {Object} $item 인스턴스
         * @return {Boolean} true:날짜형
         */
        _validateDate: function ($item) {
            if (this.isNull($item)) {
                return true;
            }

            let v = $item.val();
            if (this.isEmpty(v)) {
                return true;
            }

            if ('string' === typeof v) {
                let s = v.replace(/-/gi, '');
                if ((8 !== s.length) || isNaN(parseInt(s))) {
                    return false;
                }
            }

            if ('number' === typeof v) {
                if (8 !== v.toString().length) {
                    return false;
                }
            }

            //
            return true;
        },

        /**
         * 날짜형인지 검사
         * @param {Object} $list 인스턴스 목록. ex) $('[data-vdate]')
         * @return {Boolean} 정상일 경우 b:true로 리턴됨. {b:boolean,obj:object,title:string}
         */
        validateDate: function ($list) {
            var result = { 'b': true };
            //
            if (this.isNull($list)) {
                return result;
            }
           

            //
            for (let i = 0; i < $list.length; i++) {
                let $item = $($list[i]);

                if (!this._validateDate($item)) {
                    result.b = false;
                    result.obj = $item;
                    result.title = $item.prop('title');
                    break;
                }
            }
			
			//
			if(!result.b){
				result.obj.focus();
				alert(result.title + '의 날짜형식이 올바르지 않습니다.');
			}
            
            //
            return result;

        },

		/**
		 * 입력값의 숫자 선후관계 검사
		 * @param {Object} $fromItem 선 인스턴스
		 * @return {Boolean} true:올바른 선후관계
		 */
        _validateNumFromTo: function ($fromItem) {
            let idx = $fromItem.data('vfromnum');
            let $toItem = $($('input[data-vtonum=' + idx + ']'));
			
			let fromNum = $fromItem.val();
			let toNum = $toItem.val();
			
			try{
				return (parseInt(fromNum) <= parseInt(toNum));
			}catch(e){
				return true;
			}
        },


		/**
		 * 입력값의 숫자 선후관계 검사
		 * @param {Object} $list  ex) $('[data-vfromNum]')
		 * @return {Boolean} 정상일 경우 b:true로 리턴됨. {b:boolean,obj:object,title:string}
		 */
        validateNumFromTo: function ($list) {
            let result = { b: true };
            
            //
            for (let i = 0; i < $list.length; i++) {
                let $item = $($list[i]);

                if(!this._validateNumFromTo($item)){
					result.b = false;
					result.obj = $item;
					result.title = $item.prop('title');
					break;
				}
            }
			
			//
			if(!result.b){
				result.obj.focus();
				alert(result.title + '의 선후관계가 올바르지 않습니다.');
			}
			
            //
            return result;
        },
		
		/**
		 * 날짜 선후관계 검사
		 * @param {Object} $fromItem 선 인스턴스
		 * @return {Boolean} true:날짜 선후관계 정상
		 */
		_validateDateFromTo: function($fromItem){
			let idx = $fromItem.data('vfromdate');
			let $toItem = $('[data-vtodate='+idx+']');
			
			let fromdate = $fromItem.val();
			let todate = $toItem.val();
			
			//
			fromdate = fromdate.replace(/-/gi, '');
			todate = todate.replace(/-/gi, '');
			
			//
			try{
				return (parseInt(fromdate) <= parseInt(todate));
			}catch(e){
				return false;
			}
		},
		
		/**
		 * 날짜 선후관계 검사
		 * @param {Object} $list  ex) $('[data-vfromDate]')
		 * @return {Boolean} 정상일 경우 b:true로 리턴됨 {b:boolean, obj:object, title:string}
		 */
		validateDateFromTo: function($list){
			let result = { b: true };            

            //
            for (let i = 0; i < $list.length; i++) {
                let $item = $($list[i]);

                if(!this._validateDateFromTo($item)){
					result.b = false;
					result.obj = $item;
					result.title = $item.prop('title');
					break;
				}
            }
			
			//
			if(!result.b){
				result.obj.focus();
				alert(result.title + '의 선후관계가 올바르지 않습니다.');
			}
			
            //
            return result;
		},




        /*************************/


        /**
         * 날짜 더하기
         * @param {Date|String} dateOrStr 날짜형 또는 문자열(년월일 8자). 대시(-)존재시 제거하고 계산함
         * @param {Number} num 더할 날짜
         * @return {String} num이 더해진 날짜 문자열(yyyyMMdd)
         */
        addDays: function (dateOrStr, num) {
            //날짜형
            if (dateOrStr instanceof Date) {
                let dt = dateOrStr;
                dt.setDate(dt.getDate() + num);

                return this.formatDate(dt, 8);
            }

            //문자형
            if (this.isEmpty(dateOrStr)) {
                return '';
            }
            var s = dateOrStr.replace(/-/gi, '');
            var d;
            switch (s.length) {
                case 4:
                    d = new Date(s);
                    break;
                case 6:
                    d = new Date(parseInt(s.substring(0, 4)), parseInt(s.substring(4, 6)) - 1);
                    break;
                case 8:
                    d = new Date(parseInt(s.substring(0, 4)), parseInt(s.substring(4, 6)) - 1, parseInt(s.substring(6, 8)));
                    break;
                default:
                    throw new Error('.addDays - invalid yyyymmdd:' + dateOrStr);
            }
            d.setDate(d.getDate() + num);

            //
            return this.formatDate(d, 8);
        },


        /**
         * 월 더하기
         * @param {Date|String} dateOrStr 날짜형 또는 문자형(년월일 8자). 대시(-) 존재시 제거하고 계산함
         * @param {Number} num 더할 월의 수
         * @return {String} 월이 더해진 날짜 문자열(yyyyMMdd)
         */
        addMonths: function (dateOrStr, num) {
            
            //날짜형
            if (dateOrStr instanceof Date) {
                let dt = dateOrStr;
                dt.setMonth(dt.getMonth() + num);

                return this.formatDate(dt, 8);                
            }

            //문자형
            if (this.isEmpty(dateOrStr)) {
                return '';
            }
            var s = dateOrStr.replace(/-/gi, '');
            var d;
            //
            if (4 === s.length) {
                d = new Date(s);
            }
            else if (6 === s.length) {
                d = new Date(parseInt(s.substring(0, 4)), parseInt(s.substring(4, 6)) - 1);
            }
            else if (8 <= s.length) {
                d = new Date(parseInt(s.substring(0, 4)), parseInt(s.substring(4, 6)) - 1, parseInt(s.substring(6, 8)));
            }
            d.setMonth(d.getMonth() + num);

            //
            return this.formatDate(d, 8);
        },
        
        /**
         * 날짜 선후관계 검사
         * @param {String|Date} fromDateOrStr
         * @param {String|Date} toDateOrStr
         * @return {Boolean} true:정상
         */
        checkDateFromTo : function(fromDateOrStr, toDateOrStr){
        	let fromDt=null;
        	let toDt=null;
        	
        	//둘다 문자형이면 날짜형으로 변환
        	if('string' === typeof fromDateOrStr && 'string' === typeof toDateOrStr){
        		let fromStr = fromDateOrStr;
        		let toStr = toDateOrStr;
        		
        		fromStr = fromStr.replace(/-/gi, '');
        		toStr = toStr.replace(/-/gi, '');
        		
        		//
        		if(8 != fromStr.length || 8 != toStr.length){
        			throw new Error('');
        		}
        		
        		//
        		fromDt = new Date();
        		fromDt.setFullYear(parseInt(fromStr.substring(0,4)));
        		fromDt.setMonth(parseInt(fromStr.substring(4,6))-1);
        		fromDt.setDate(parseInt(fromStr.substring(6,8)));
        		
        		//
        		toDt = new Date();
        		toDt.setFullYear(parseInt(toStr.substring(0,4)));
        		toDt.setMonth(parseInt(toStr.substring(4,6))-1);
        		toDt.setDate(parseInt(toStr.substring(6,8)));        		
        	}
        	
        	//둘다 날짜형이면
        	if(fromDateOrStr instanceof Date && toDateOrStr instanceof Date){
        		fromDt = fromDateOrStr;
        		toDt = toDateOrStr;
        	}
        	
        	//
        	if(this.isNotNull(fromDt) && this.isNotNull(toDt)){
        		return this._checkDateFromTo(fromDt, toDt);
        	}
        	
        },
        
        /**
         * 날짜의 선후관계 검사
         * @param {Date} fromDt 시작 날짜
         * @param {Date} toDt 종료 날짜
         * @return {Boolean} true:정상
         */
        _checkDateFromTo : function(fromDt, toDt){
        	if(!fromDt instanceof Date || !toDt instanceof Date){
        		throw new Error('._checkDateFromTo - 날짜형만 가능');
        	}
        	
        	//
        	return (0 <= toDt.getTime() - fromDt.getTime());
        },

        /**
         * 오늘 날짜 문자열 구하기
         * @param {Null|Number} len 리턴할 날짜 문자열 길이. 파라미터가 없거나 널이거나 8이면 yyyy-MM-dd로 리턴. 12이면 yyyy-MM-dd HH:mm 14면 yyyy-MM-dd HH:mm:dd
         * @return {String} len이 따른 오늘 날짜 문자열
         */
        getToday: function (len) {            
            let num = len;
            if (0 === arguments.length || this.isNull(len)) {
                num = 8;
            }

            //
            return this.formatDate(new Date(), num);
        },
        
        
        /**
         * 이미지 파일 인스턴스이면 base64 문자열 리턴. 비동기
         * @param file 파일 인스턴스
         * @param callbackFunction 콜백함수
         */
        getBase64IfImageFile : function(file, callbackFunction){
        	if(null == file || undefined == file){
        		console.log('<<cs.getBase64IfImageFile - null file')
                callbackFunction('');
                return;
        	}
        	
        	//
        	if(-1 === file.type.indexOf('image')){
        		console.log('<<cs.getBase64IfImageFile - not image file')
                callbackFunction('');
                return;
        	}
        	
        	//
        	let reader = new FileReader();
        	reader.onload = function(){
        		callbackFunction(reader.result);
        	};
        	reader.readAsDataURL(file);
        },

        /**
         * 문자열을 날짜 형식으로 변환
         * @param {Date|String|Number} dateOrStr 날짜 인스턴스 또는 문자열. 보통 yyyyMMdd or yyyyMMddHH or yyyyMMddHHmm or yyyyMMddHHmmss. 대시(-) 존재시 제거하고 계산함
         * @param {Null|Number} num 리턴될 날짜 문자열의 자릿수(8,12,14). 널이면 구분자 없이 문자열만 리턴
         * @return {String} 변환된 날짜 문자열
         */
        formatDate: function (dateOrStr, num) {
            if (this.isNull(dateOrStr)) {
                return '';
            }
            
            //
            let s = '';
            if (dateOrStr instanceof Date) {
                //날짜형
                s = dateOrStr.getFullYear()
                    + this.lpad(dateOrStr.getMonth() + 1, 2, '0')
                    + this.lpad(dateOrStr.getDate(), 2, '0')
                    + this.lpad(dateOrStr.getHours(), 2, '0')
                    + this.lpad(dateOrStr.getMinutes(), 2, '0')
                    + this.lpad(dateOrStr.getSeconds(), 2, '0');
                    
            }else if('number' === typeof dateOrStr) {
            	s = dateOrStr.toString();
            }else{
                //문자형
                s = dateOrStr.replace(/-/gi, '').split(' ').join('');
            }

            //
            if (this.isEmpty(s)) {
                return '';
            }

            //
            if (1 === arguments.length || this.isNull(num)) {
                return s;
            }

            //
            let s2 = '';
            try {
                //
                if (8 <= num) {
                    s2 = s.substring(0, 4) + '-' + s.substring(4, 6) + '-' + s.substring(6, 8);
                }

                //
                if (12 <= num) {
                    s2 += ' ' + s.substring(8, 10) + ':' + s.substring(10, 12);
                }

                //
                if (14 <= num) {
                    s2 += ':' + s.substring(12, 14);
                }

            } catch (e) {
                this.log(e);
            }

            //
            return s2;
        },
		
		
/***************************/
		
		/**
		 * 파일 업로드. 업로드 완료 후 콜백함수 호출
		 * @param {Array} $files 파일 목록 ex)$('[type=file]')
		 * @param {String} actionUrl 전체(절대) 경로
		 * @param {Function} callbackFunction 콜백함수
		 * @param {Object} opt 옵션 {maxFileSize:integer, fileExtGbns:array, fileExts:array}		 
		 */
		upload: function($files, actionUrl, callbackFunction, opt){
			let arr = [];
			
			if(this.isNull($files)){
				callbackFunction(arr);
				return;
			}
			
			//check file size
			let result = this.checkFileSize($files, opt);
			if(!result.b){
				callbackFunction(null);
				return;
			}
			
			//check file ext
			result = this.checkFileExt($files, opt);
			if(!result.b){
				callbackFunction(null);
				return;
			}
			
			//업로드 처리
			for(let i=0; i<$files.length; i++){
				let f = $files[i];
				
				//
				if(0 === f.files.length){
					continue;
				}
				
				//
				let result = this._upload(f, actionUrl, opt);
				if(!result.b){
					alert('파일('+f.files[0].name+') 업로드중 오류가 발생했습니다.');
					callbackFunction(null);
					return;
				}
				
				//
				arr.push(result.data);
			}
			
			//
			callbackFunction(arr);
		},
		
		
		/**
		 * 파일 업로드
		 * @param {Object} f 파일 인스턴스. ex)$('[type=file]')[0]
		 * @param {String} actionUrl 전체(절대) 경로
		 * @param {Object} opt 옵션 {maxFileSize:integer, fileExtGbns:array, fileExts:array}
		 * @return {Object} {b:boolean, code:string, data:object}
		 */
		_upload: function(f, actionUrl, opt){
			let result = {b:true};
			
			if(this.isNull(f)){
				result.b = false;
				result.code = 'E00';
				return result;
			}
			
			//
			if (0 === f.files.length) {
				result.b = false;
				result.code = 'E01';
				return result;
			}
			
			
			//업로드 처리
			let fd = new FormData();
			fd.append('file', f.files[0]);
			$.ajax({
				url: actionUrl,
				processData: false,
				contentType: false,
				type: 'post',
				data: fd,
				async: false,
				success: function (res) {
					result.data = res;
				},
				error: function(request, status, error){
					result.b = false;
					result.code = request.status;
					result.message = request.responseText;
				}
			});
			
			//
			return result;
		},
		
		
		/**
		 * 파일 확장자 검사
		 * @param {String} fileName 파일명
		 * @param {Object} opt 옵션 {fileExtGbns:array, fileExts:array}
		 * @return {Boolean} true:업로드 가능 확장자
		 */
		_checkFileExt: function(fileName, opt){
			if(this.isNotNull(opt)){
				this.defaultOption.fileExtGbns=[];
				this.defaultOption.fileExts=[];
				
				$.extend(this.defaultOption, opt);
			}
			
			//
			let arr = [];
			
			//
			if(this.isNotNull(this.defaultOption.fileExtGbns)){
				for(let i=0; i<this.defaultOption.fileExtGbns.length; i++){
					let gbn = this.defaultOption.fileExtGbns[i];
					
					//
					switch(gbn.toUpperCase()){
						case 'OFFICE':
							arr = arr.concat(this.FILE_EXT_OFFICE);
							break;
						case 'ZIP':
							arr = arr.concat(this.FILE_EXT_ZIP);
							break;
						case 'PHOTO':
							arr = arr.concat(this.FILE_EXT_PHOTO);
							break;
						case 'TEXT':
							arr = arr.concat(this.FILE_EXT_TEXT);
							break;
					}					
				}
			}
			
			//
			if(this.isNotNull(this.defaultOption.fileExts)){
				arr = arr.concat(this.defaultOption.fileExts);
			}
			
			//
			if(0 === arr.length){
				arr = arr.concat(this.FILE_EXT_OFFICE, this.FILE_EXT_PHOTO, this.FILE_EXT_TEXT, this.FILE_EXT_ZIP);
			}
			
			//
			for(let i=0; i<arr.length; i++){
				let ext = arr[i].toLowerCase();
				
				if(this.endsWith(fileName, ext)){
					return true;
				}
			}
			
			
			//
			return false;
		},
		
		/**
		 * 파일 확장자 검사
		 * @param {Object} $files 파일 목록 ex)$('[type=file]')
		 * @param {Object} opt 옵션 {fileExtGbns:array, fileExts:array}
		 * @return {Boolean} {b:boolean, obj:object, fileName:string, index:integer}
		 */
		checkFileExt: function($files, opt){
			let result = {b:true};
						
			for(let i=0; i<$files.length; i++){
				let f = $files[i];
				
				//
				if(0 === f.files.length){
					continue;
				}
				
				//
				if(!this._checkFileExt(f.files[0].name, opt)){
					result.b = false;
					result.obj = f;
					result.fileName = f.files[0].name;
					result.index = i;
					break;
				}
			}
			
			//
			if(!result.b){
				result.obj.focus();
				alert('업로드 할 수 없는 파일('+result.fileName+')입니다.');
			}
			
			//
			return result;
		},
		
		/**
		 * 파일 크기 검사. maxFileSize 미존재시 항상 true리턴
		 * @param {Number} fileSize 파일 크기
		 * @param {Object} opt 검사 옵션. {maxFileSize:integer}
		 * @return {Boolean} true:업로드 가능한 파일 크기
		 */
		_checkFileSize: function(fileSize, opt){
			if(this.isNull(opt) || this.isNull(opt.maxFileSize)){
				return true;
			}
						
			//
			return (fileSize <= opt.maxFileSize);
		},
		
		
		/**
		 * 파일 크기 검사
		 * @param {Object} $files 파일 목록. ex) $('[type=file]')
		 * @param {Object} opt 검사 옵션 {maxFileSize:integer, fileExtGbns:array, fileExts:array}
		 * @return {Object} {b:boolean, obj:object, fileName:string, index:integer}
		 */
		checkFileSize : function($files, opt){
						
			//
			let result = {b:true};
			
			//
			for(let i=0; i<$files.length; i++){
				let f = $files[i];
				
				//
				if(0 === f.files.length){
					continue;
				}
				
				//
				if(!this._checkFileSize(f.files[0].size, opt)){
					result.b = false;
					result.obj = f;
					result.fileName = f.files[0].name;
					result.index = i;
					break;
				}
			}
			
			//
			if(!result.b){
				result.obj.focus();
				alert('파일('+result.fileName+') 크기가 너무 큽니다.');
			}
			
			//
			return result;
		},
		
		
		/**
		 * json 배열에서 특정키의 값을 추출하여 배열로 리턴
		 * @param datas json 배열
		 * @param key json의 키
		 * @since
		 * 	20200228	init
		 */
		getArr : function(datas, key){
			if(null == datas || undefined == datas || 0 == datas.length){
				return [];
			}
			
			//
			let arr=[];
			
			//
			for (let i = 0; i < datas.length; i++) {
				let item = datas[i];
				arr.push( item[key] );
			}
			
			//
			return arr;
		},
		
		
		/**
		 * 랜덤 색깔 생성 & 리턴
		 * @param alpha 알파. 선택. default:0.5
		 * @since
		 * 	20200228
		 */
		randColor : function(alpha){
			let rgb = [Math.round(Math.random()*256), Math.round(Math.random()*256), Math.round(Math.random()*256)];
			
			return 'rgba('+rgb.join(',')+', '+(null == alpha || undefined == alpha ? '0.5' : alpha)+')';
		},
		
		/**
		 * @see https://www.w3schools.com/jsref/jsref_tofixed.asp
		 * @param {String|Number} v
		 * @param {Number} x
		 */
		toFixed : function(v, x){
			if(this.isNull(v)){
				return '';
			}
			
			if(isNaN(v)){
				return v;
			}
			
			//
			if('string' === typeof v){
				return parseFloat(v).toFixed(x);
			}else{
				return v.toFixed(x);
			}
		},
		
		
		/**
		 * 페이징
		 * @see https://jasonwatmore.com/post/2018/08/07/javascript-pure-pagination-logic-in-vanilla-js-typescript
		 * @since
		 * 	0207	init
		 */
		paginate : function(totalItems, currentPage, _pageSize){
			let pageSize = ((null == _pageSize || undefined == _pageSize) ? 10 : _pageSize);
			let maxPages = 10;
			
			// calculate total pages
			let totalPages = Math.ceil(totalItems / pageSize);

			// ensure current page isn't out of range
			if (currentPage < 1) {
				currentPage = 1;
			} else if (currentPage > totalPages) {
				currentPage = totalPages;
			}

			let startPage, endPage;
			if (totalPages <= maxPages) {
				// total pages less than max so show all pages
				startPage = 1;
				endPage = totalPages;
			} else {
				// total pages more than max so calculate start and end pages
				let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
				let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
				if (currentPage <= maxPagesBeforeCurrentPage) {
					// current page near the start
					startPage = 1;
					endPage = maxPages;
				} else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
					// current page near the end
					startPage = totalPages - maxPages + 1;
					endPage = totalPages;
				} else {
					// current page somewhere in the middle
					startPage = currentPage - maxPagesBeforeCurrentPage;
					endPage = currentPage + maxPagesAfterCurrentPage;
				}
			}

			// calculate start and end item indexes
			let startIndex = (currentPage - 1) * pageSize;
			let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

			// create an array of pages to ng-repeat in the pager control
//			let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
			let pages=[];
			for(let i=0; i<((endPage+1) - startPage); i++){
				pages.push(startPage+i);
			}

			// return object with all pager properties required by the view
			let json = {
				totalItems: totalItems,
				currentPage: currentPage,
				pageSize: pageSize,
				totalPages: totalPages,
				startPage: startPage,
				endPage: endPage,
				startIndex: startIndex,
				endIndex: endIndex,
				pages: pages
			};
			
			//
			console.log('<<.paginate', json);
			return json;
		},
		

		/**
		 * 로깅. console.log()이용. arguments의 갯수만큼 로그 출력
		 */
        log: function () {
			if(0 === arguments.length){
				return;
			}
			
			//
			for(let i=0; i<arguments.length; i++){
				console.log(arguments[i]);
			}
        }
    };


})( jQuery, window, document );
