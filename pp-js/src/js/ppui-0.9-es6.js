
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
class ppui{
    
    /**
     * 엔터키 처리
     * @param {HTMLElement|HTMLCollection|NodeListOf<Element>} el getElement or getElements or querySelectorAll()
     * @param {Function} callback 
     * @returns {void}
     */
    static bindEnterKey(el, callback){
        /**
         * getElement의 경우
         * @param {Element|null} el element
         * @param {Function} callback 
         */
        function _element(el, callback){
            //
            el.removeEventListener('keypress', function(){
                //nothing
            });

            //
            el.addEventListener('keypress', (ev)=>{
                if(13 === ev.keyCode){
                    callback(ev);
                }
            });
        }

        /**
         * getElements의 경우
         * @param {HTMLCollection} coll 콜렉션
         * @param {Function} callback 
         */
        function _collection(coll, callback){
            if(pp.isNull(coll)){
                return;
            }

            //
            for(let i=0; i<coll.length; i++){
                _element( coll.item(i), callback);
            }
        }


        /**
         * querySelectorAll()의 경우
         * @param {NodeList} nl 노드 리스트
         * @param {Function} callback
         */
        function _nodeList(nl, callback){
            if(pp.isNull(nl)){
                return;
            }

            //
            nl.forEach(x=>{
                _element(x, callback);
            });
        }

        //
        if(el instanceof HTMLElement){
           _element(el, callback);
        }

        //
        if(el instanceof HTMLCollection){
            _collection(el, callback);
        }

        //
        if(el instanceof NodeList){
            _nodeList(el, callback);
        }
    }



    /**
     * el에 클래스 추가. like jq's addClass
     * @param {HTMLElement|HTMLCollection|NodeListOf<Element>} el getElement or getElements or querySelectorAll()
     * @param {string} className 클래스명
     * @returns {HTMLElement|HTMLCollection|NodeListOf<Element>}
     */
    static addClass(el, className){
        if(pp.isNull(el)){
            return el;
        }

        //
        if(el instanceof HTMLElement){
            if(ppui.hasClass(el, className)){
                return el;
            }

            //
            el.classList.add(className);
            //
            return el;
        }

        //
        if(el instanceof HTMLCollection){
            for(let i=0; i<el.length; i++){
                if(ppui.hasClass(el.item(i), className)){
                    continue;
                }

                //
                el.item(i).classList.add(className);
            }
            //
            return el;
        }

        //
        if(el instanceof NodeList){
            el.forEach(x=>{
                if(ppui.hasClass(x, className)){
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
    static hasClass(el, className){
        if(pp.isNull(el)){
            return false;
        }

        //
        if(el instanceof Element){
            return ppui._hasClassAtElement(el, className);
        }

        //
        if(el instanceof HTMLCollection){
            //
            let b=false;
            //
            for(let i=0; i<el.length; i++){
                b = b || ppui._hasClassAtElement( el.item(i), className);
            }

            //
            return b;
        }

        //
        if(el instanceof NodeList){
            let b = false;
            //
            el.forEach(x=>{
                b = b || ppui._hasClassAtElement(x, className);
            });

            //
            return b;
        }

        //
        return null;

    }


    /**
     * like jquery's toggleClass
     * @param {Element} el 
     * @param {string} className 
     */
    static toggleClass(el, className){
        ppui.hasClass(el, className) ? ppui.removeClass(el, className) : ppui.addClass(el, className);
    }

    /**
     * 
     * @param {Element|null} el 
     * @param {string} className 
     * @returns {boolean}
     */
    static _hasClassAtElement(el, className){
        if(pp.isNull(el)){
            return false;
        }

         //
         let b = false;
         //
         el.classList.forEach(x=>{
             if(x === className){
                 b=true;
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
    static removeClass(el, className){
        if(pp.isNull(el)){
            return el;
        }

        //
        if(el instanceof HTMLElement){
            //
            el.classList.remove(className);
    
            //
            return el;
        }

        //
        if(el instanceof HTMLCollection){
            for(let i=0; i<el.length; i++){
                el.item(i).classList.remove(className);
            }
            //
            return el;
        }

        //
        if(el instanceof NodeList){
            el.forEach(x=>{
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
	static createImgByBlob(blob, option, callbackFn){
		let img = document.createElement('img');
		
		//
		let opt = pp.extend({}, option);
		
		//
		if(pp.isNotEmpty(opt.id)){
			img.id = opt.id;
		}
		//
		if(pp.isNotEmpty(opt.name)){
			img.name = opt.name;
		}
		//
		if(pp.isNotEmpty(opt.width)){
			img.width = opt.width;			
		}
		//
		if(pp.isNotEmpty(opt.height)){
			img.height = opt.height;			
		}
		
		//@see http://www.jongminjang.com/html5/file/2018/12/27/blob-as-img-src.html
		let reader = new FileReader();
		reader.onload = function(e){
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
    static createElement(tagName, name, value, opt){
        let htmlElement = document.createElement(tagName);

        //
        if('INPUT' === tagName.toUpperCase()){
            htmlElement.setAttribute('type', 'hidden');
            htmlElement.setAttribute('value', value);
        }
        //
        htmlElement.setAttribute('id', name);
        htmlElement.setAttribute('name', name);

        //
        if(pp.isNull(opt)){
            return htmlElement;
        }

        //
        let keys = Object.keys(opt);
        //
        keys.forEach(k=>{
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
    static createForm(param){
        let htmlFormElement = document.createElement('form');
        //
        htmlFormElement.setAttribute('id', pp.createUid());

        //
        if(pp.isNull(param)){
            return htmlFormElement;
        }

        //
        let map = pp.toMap(param);
        //
        map.forEach((value, key)=>{
            //
            let el = ppui.createElement('INPUT', key, value);
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
    static createFormAndSubmit(url, param){
        let htmlFormElement = ppui.createForm(param);
        //
        if(pp.isNull(htmlFormElement)){
            return;
        }


        //
        let el = document.querySelector('body:last-child');
        //
        if(pp.isNull(el)){
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
    static submitForm(url, htmlFormElement){
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
        let htmlFormElement = ppui.createForm(param);

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
        let htmlFormElement = ppui.createForm(param);

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
    static serializeArray(htmlCollection){
        /**
         * children쪽 처리
         * @param {htmlCollection} htmlCollection body하위의 children
         * @return {Array} 
         */
        function _children(htmlCollection) {
            let arr = [];
            //
            if(pp.isNull(htmlCollection)){
                return arr;
            }

            //
            for(let i=0; i<htmlCollection.length; i++){
                let el = htmlCollection.item(i);
                if(pp.isNull(el)){
                    continue;
                }

                //
                if('INPUT' === el.tagName){
                    arr.push({
                        'name' : el.name,
                        'value' : el.value
                    });
                }
                //
                if('TEXTAREA' === el.tagName){
                    arr.push({
                        'name' : el.name,
                        'value' : el.value
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
        if(pp.isNull(htmlCollection) || 0 == htmlCollection.length){
            return [];
        }

        
        //body 갯수만큼 루프
       for(let i=0; i<htmlCollection.length; i++){
           let el = htmlCollection.item(i);
           if(pp.isNull(el)){
               continue;
           }

           //body내의 children (input, textarea, ...)
           let children = el.children;
            //children에서 값을 추출해 arr에 추가
            arr = arr.concat( _children(children) );
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
    static checkReq(nodeList, option){
        let map = new Map();
        map.set('b', true);

        //
        let opt = pp.extend(new Map().set('showMessage',true), option);

        //
        if(null == nodeList || 0 == nodeList.length){
            return map;
        }

        //
        for(let i=0; i<nodeList.length; i++){
            let node = nodeList.item(i);

            //
            if(pp.isEmpty(node.value)){
                map.set('b', false);
                map.set('node', node);

                break;
            }
        }

        //
        if(pp.isNotEmpty(map.get('node').title)){
            map.set('title', map.get('node').title);
        }else{
            let id = node.id;
            let htmlElement = document.querySelector('label[for="'+id+'"]');
            if(pp.isNotNull(htmlElement)){
                map.set('title', htmlElement.innerHTML);
            }
        }

        //메시지 표시이면
        if(opt.get('showMessage')){
            map.get('node').focus();
            //
            if(pp.isNotEmpty(map.get('title'))){
                alert(`${map.get('title')}은(는) 필수항목입니다.`);
            }else{
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
    static on(el, eventName, callbackFn){
    	if(pp.isNull(el)){
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
    static uploadFile(url, file, callbackSuccess, option){
        if(pp.isNull(file)){
            callbackSuccess({errorCode:'E_NULL'});
            return;
        }

        //파일 크기 검사
        if(!pp.checkFileSize(file, 123456)){
            callbackSuccess({errorCode:'E_FILE_SIZE'});
            return;
        }

        //파일 확장자 검사
        if(!pp.checkFileExt(file)){
            callbackSuccess({errorCode:'E_EXT'});
            return;
        }

        //
        let xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        //
        xhr.onreadystatechange = ()=>{
            if(XMLHttpRequest.DONE === xhr.readyState){
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
                    callbackSuccess({errorCode:'E_500'});
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