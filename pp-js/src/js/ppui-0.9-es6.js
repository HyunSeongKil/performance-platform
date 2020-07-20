
/**
 * ui와 관련된 것들
 * es6 버전
 * jquery사용하지 않음
 * typescript버전을 es6로 변환
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


}