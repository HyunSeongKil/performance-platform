/**
 * 원본 파일 : typescript
 * jquery-pp-1.0.js의 typescript 버전
 * @since
 *  2020-07 typescript + 바닐라js
 */
class pp{


    /**
     * 천단위 콤마 추가
     * @param strOrNum 
     */
    public static addComma(strOrNum:string|number):string{
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
    }


    /**
     * 엔터키 처리
     * @param el getElement or getElements or querySelectorAll()
     * @param callback 
     */
    public static bindEnterKey(el:HTMLElement|HTMLCollection|NodeListOf<Element>, callback:any):void{
        /**
         * getElement의 경우
         * @param el element
         */
        function _element(el:Element|null, callback:any){
            //
            el?.removeEventListener('keypress', function(){
                //nothing
            });

            //
            el?.addEventListener('keypress', ((ev:KeyboardEvent)=>{
                if(13 === ev.keyCode){
                    callback(ev);
                }
            }) as EventListener);
        }

        /**
         * getElements의 경우
         * @param coll 콜렉션
         * @param callback 
         */
        function _collection(coll:HTMLCollection, callback:any){
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
         * @param nl 노드 리스트
         */
        function _nodeList(nl:NodeListOf<Element>, callback:any){
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
     * 콤마 제거
     * @param str 
     */
    public static unComma(str:string):string{
        if (pp.isEmpty(str)) {
            return '';
        }
        //
        return str.replace(/,/gi, '');
    }

    /**
     * el에 클래스 추가. like jq's addClass
     * @param el getElement or getElements or querySelectorAll()
     * @param className 클래스명
     */
    public static addClass(el:HTMLElement|HTMLCollection|NodeListOf<Element>, className:string):HTMLElement|HTMLCollection|NodeListOf<Element>{
        if(pp.isNull(el)){
            return el;
        }

        //
        if(el instanceof HTMLElement){
            if(pp.hasClass(el, className)){
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
                if(pp.hasClass(el.item(i), className)){
                    continue;
                }

                //
                el.item(i)?.classList.add(className);
            }
            //
            return el;
        }

        //
        if(el instanceof NodeList){
            el.forEach(x=>{
                if(pp.hasClass(x, className)){
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
     * @param el getElement or getElements or querySelectorAll()
     * @param className 클래스명
     */
    public static hasClass(el:Element|HTMLCollection|NodeListOf<Element>|null, className:string):boolean|null{
        if(pp.isNull(el)){
            return false;
        }

        //
        if(el instanceof Element){
            return pp.hasClassAtElement(el, className);
        }

        //
        if(el instanceof HTMLCollection){
            //
            let b:boolean=false;
            //
            for(let i=0; i<el.length; i++){
                b = b || pp.hasClassAtElement( el.item(i), className);
            }

            //
            return b;
        }

        //
        if(el instanceof NodeList){
            let b:boolean = false;
            //
            el.forEach(x=>{
                b = b || pp.hasClassAtElement(x, className);
            });

            //
            return b;
        }

        //
        return null;

    }

    /**
     * 
     * @param el 
     * @param className 
     */
    private static hasClassAtElement(el:Element|null, className:string):boolean{
        if(pp.isNull(el)){
            return false;
        }

         //
         let b:boolean = false;
         //
         el!.classList.forEach(x=>{
             if(x === className){
                 b=true;
             }
         });
 
         //
         return b;
    }


    /**
     * 
     * @param strOrNum 
     * @param padLength 
     * @param padStr 
     */
    public static lpad(strOrNum:string|number, padLength:number, padStr:string):string{
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
    }


    /**
     * el에서 클래스 삭제. like jq's removeClass
     * @param el getElement or getElements or querySelectorAll()
     * @param className 클래스명
     */
    public static removeClass(el:HTMLElement|HTMLCollection|NodeListOf<Element>, className:string):HTMLElement|HTMLCollection|NodeListOf<Element>{
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
                el.item(i)?.classList.remove(className);
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
     * unique한 문자열 생성
     * @param pre prefix
     */
    public static createUid(pre?:string):string{
        return (pre?pre:'UID') + (new Date()).getTime();
    }



    /**
     * element 생성
     * @param tagName 
     * @param name 
     * @param value 
     * @param opt case3
     */
    public static createElement(tagName:string, name:string, value:any, opt?:any):HTMLElement{
        let el:HTMLElement = document.createElement(tagName);

        //
        if('INPUT' === tagName.toUpperCase()){
            el.setAttribute('type', 'hidden');
            el.setAttribute('value', value);
        }
        //
        el.setAttribute('id', name);
        el.setAttribute('name', name);

        //
        if(pp.isNull(opt)){
            return el;
        }

        //
        let keys:Array<string> = Object.keys(opt);
        //
        keys.forEach(k=>{
            let key = k;
            let value = opt[k];
            //
            el.setAttribute(key, value);
        });

        //
        return el;
    }


    /**
     * 폼 생성
     * @param param case1,case2,case3,case4
     */
    public static createForm(param?:Array<any>|any):HTMLFormElement{
        let form:HTMLFormElement = document.createElement('form');
        //
        form.setAttribute('id', pp.createUid());

        //
        if(pp.isNull(param)){
            return form;
        }

        //
        let p = pp.toKeyValue(param);
        //
        let keys = Object.keys(p);
        //
        keys.forEach(k=>{
            let key = k;
            let value = p[k];
            //
            let el = pp.createElement('INPUT', key, value);
            //
            form.appendChild(el);
        });

        //
        return form;
    }


    /**
     * 폼 생성 & 제출
     * @param param 
     * @param url 
     */
    public static createFormAndSubmit(param:Array<any>|any|null, url:string):void{
        let form:HTMLFormElement = pp.createForm();
        //
        if(pp.isNull(form)){
            return;
        }


        //
        let el:Element|null = document.querySelector('body:last-child');
        //
        if(pp.isNull(el)){
            return;
        }

        //
        el?.append(form);

        //
        let p = pp.toKeyValue(param);
        Object.keys(p).forEach(k=>{
            let name = k;
            let value = p[k];
            //
            form.append( pp.createElement('input', name, value));
        });

        //
        form.setAttribute('method', 'post');
        form.setAttribute('action', url);
        //
        form.submit();
    }

    /**
     * jquery의 $.extend()같은거. source의 key/value를 몽땅 target에 추가
     * @param target {}
     * @param source {}
     */
    public static extend(target:any, source:any){
        if(pp.isNull(target) || pp.isNull(source)){
            return target;
        }

        //
        let keys = Object.keys(source);
        //
        keys.forEach(k=>{
            if(pp.isNotNull(target[k])){
                return;
            }

            //
            target[k] = source[k];
        });

        //
        return target;
    }


        /**
     * 널인지 여부
     * @param obj 오브젝트
     */
    public static isNull(obj: any): boolean {
        if (null === obj) {
            return true;
        }

        //
        if (undefined === obj) {
            return true;
        }

        //
        return false;
    }


    /**
     * not isNull
     * @param obj 
     */
    public static isNotNull(obj:any):boolean{
        return !pp.isNull(obj);
    }

    /**
     * not isEmpty
     * @param strOrArr 
     */
    public static isNotEmpty(strOrArr:string|number|Array<any>|undefined):boolean{
        return !pp.isEmpty(strOrArr);
    }

    /**
     * obj가 공백인지 여부
     * @param strOrArr 문자열|배열
     */
    public static isEmpty(strOrArr: string | number | Array<any>|undefined): boolean {
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
    }


    /**
     * like oracle's nvl()
     * @param obj 
     * @param defaultValue 
     */
    public static nvl(obj:any, defaultValue:any):any{
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
    }




    /**
     * 
     * @param url 
     * @param param case1~4
     * @param callbackSuccess 
     * @param opt {'method':string, 'async':boolean}
     */
    public static submitAjax(url:string, param:any, callbackSuccess:any, opt?:any):void{
        if(pp.isEmpty(url) || pp.isNull(param)){
            return;
        }

        //
        let xhr = new XMLHttpRequest();
        //
        xhr.onreadystatechange = function(){
            if(XMLHttpRequest.DONE === xhr.readyState){
                if(200 === xhr.status){
                    //성공
                    let v = xhr.responseText.trim();
                    if(-1 != v.indexOf('{')){
                        //json 형식
                        callbackSuccess(JSON.parse(v));
                    }else{
                        //text 형식
                        callbackSuccess(v);
                    }
                }else{
                    //실패
                    alert('오류가 발생했습니다.');
                }
            }
        }

        //
        let defaultSetting={
            method : 'POST',
            async : true
        };
        //
        let option = pp.extend(defaultSetting, opt);
        //
        xhr.open(option.method, url, option.async);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/json');

        
        // param 형 변환
        let p = pp.toKeyValue(param);
        //
        xhr.send(p);
    }


    /**
     * 
     * @param url 
     * @param param case1~4
     */
    public static submitGet(url:string, param:any):void{
        let form:HTMLFormElement = pp.createForm(param);

        //
        form.setAttribute('method', 'get');
        //
        form.submit();
    }

    /**
     * 
     * @param url 
     * @param param case1~4
     */
    public static submitPost(url:string, param:any):void{
        let form:HTMLFormElement = pp.createForm(param);

        //
        form.setAttribute('method', 'post');
        //
        form.submit();
    }

    /**
     * 폼 전송
     * @param url 
     * @param el  form element
     */
    public static submitForm(url:string, el:HTMLFormElement):void{
        //
        el.setAttribute('method', 'post');
        el.setAttribute('action', url);
        //
        el.submit();
    }

    /**
     * like jquery's serializeArray
     * @param coll document.getElementsByTagName('body') 
     */
    public static serializeArray(coll:HTMLCollectionOf<HTMLFormElement>):Array<any>{
        /**
         * children쪽 처리
         * @param children body하위의 children
         * @return 배열 
         */
        function _children(children:HTMLCollection|undefined):Array<any> {
            let arr:Array<any> = [];
            //
            if(pp.isNull(children)){
                return arr;
            }

            //
            for(let i=0; i<children!.length; i++){
                let item:Element|null|undefined = children?.item(i);
                if(pp.isNull(item)){
                    continue;
                }

                //
                if('INPUT' === item?.tagName){
                    arr.push({
                        'name' : item.nodeName,
                        'value' : item.nodeValue
                    });
                }
                //
                if('TEXTAREA' === item?.tagName){
                    arr.push({
                        'name' : item.nodeName,
                        'value' : item.nodeValue
                    });
                }
                //TODO others

            }

            //
            return arr;
        }//


        //결과
        let arr:Array<any> = [];

        //
        if(pp.isNull(coll) || 0 == coll.length){
            return [];
        }

        
        //body 갯수만큼 루프
       for(let i=0; i<coll.length; i++){
           let item:Element|null = coll.item(i);
           if(pp.isNull(item)){
               continue;
           }

           //body내의 children (input, textarea, ...)
           let children:HTMLCollection|undefined = item?.children;
            //children에서 값을 추출해 arr에 추가
            arr = arr.concat( _children(children) );
       }

       //
       return arr;
    }


    /**
     * 파라미터 형 변환
     * @param param 파라미터
     *  case1 {'name':string, 'value':any}
     *  case2 [case1]
     *  case3 {'key':'value'}
     *  case4 [case3]
     */
    public static toKeyValue(param:any):any{
        let p={};
        //case2, case4인 경우
        if(Array.isArray(param)){
            return pp.toKeyValueFromArray(param);
        }

        //case1
        if(pp.isNotEmpty(param.name)){
            return pp.toKeyValueFromNameValue(param.name, param.value);
        }

        //case3
        return param;
    }


    /**
     * 파리미터 형 변환
     * @param arr 파라미터 배열
     */
    public static toKeyValueFromArray(arr:Array<any>):any{
        if(pp.isEmpty(arr)){
            return {};
        }

        //
        let json = arr[0];

        //
        if(pp.isNotEmpty(json.name)){
            //case2
            return pp.toKeyValueFromNameValueArray(arr);
        }else{
            //case4
            let p:any = {};
            //
            arr.forEach(json=>{
                p = pp.extend(p, json);
            });

            //
            return p;
        }

    }

    /**
     * 파라미터 형변환
     * @param arr 파라미터 배열. case2
     */
    public static toKeyValueFromNameValueArray(arr:Array<any>):any{
        let p={};

        //
        arr.forEach(json=>{
            p = pp.extend(p, this.toKeyValueFromNameValue(json.name, json.value));
        });

        //
        return p;
    }


    /**
     * 파라미터 형 변환
     * @param name 
     * @param value 
     */
    public static toKeyValueFromNameValue(name:string, value:string):any{
       return {
           'name' : name,
           'value' : value
       };
    }
}