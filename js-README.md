# 사업 일반
* 이메일
    제목 머리에 사업 영문 약자 표기
        예) [LHDT] 이메일제목
* 의사소통 도구 선정
        
# 개발가이드 - javascript

* VAIV_INSTANCE

* 비동기 호출 방안
	** 1안)callback
	** 2안)Promise
	** 3안)async/await

* 매개변수로 플래그를 사용하지 않음
    플래그를 사용하는것 자체가 그 함수가 한가지 이상의 역할을 하고 있다는 의미임

* Object.assing()을 사용해 기본 객체를 생성

* Pp-xxx.js 이용

* 함수
    함수 인자는 2개 이하가 적당함

* 함수는 하나의 행동만 해야 함

* 함수명은 함수가 무엇을 하는지 알 수 있어야 함

* 함수형 프로그래밍 지향

* 조건문 캡슐화

* 부정조건문 사용 금지

* 타입-체킹 피하기

* SOLID
    ** 단일 책임 원칙(Single Responsibility Priciple, SRP)
    클래스를 수정할 때는 수정 해야하는 이유가 2개 이상 있으면 안된다.

    ** 개방/폐쇄 원칙(Open/Closed Principle, OCP)
    확장을 위해 개방적이어야 하며, 수정에는 폐쇄적이어야 한다.

    ** 리스코프 치환 원칙(Liskov Substitution Princle, LSP)
    
* self
    this의 alias로 self이용


## <span style="color:blue;">기본</span>
### 유지보수성
* 분석이 쉬운 코드
    ** 쉬운로직
* 읽기 편한 코드
    ** 들여쓰기, 공백, codeing convension, 표준화
* 수정하기 쉬운 코드
    ** 모듈화, 쉬운로직

### OOP 
* 1안)prototype 이용
    ``` 
    const Person = function(){

    };

    Person.prototype.walk = function(){

    };
    ```

### 주석
* 주석이 없어도 스스로 설명이 되는 코드를 작성한다.
* 주석이 필요한 경우, 로직에 대한 이유 및 목적등을 설명한다.
* @param, @returns 이용
    ```
    /**
    * 출발 위치에서 도착 위치로 speed의 속도로 걸어감
    * @param {string} from 출발 위치
    * @param {string} to 도착 위치
    * @param {number} speed 걷는 속도
    * @returns {array}
    */
    Person.prototype.walk = function(from, to, speed){
        ...
        return [];
    };
    ```

### vanilla javascript
* jquery등 사용 회피

### typescript
* 가능하면 typescript 이용

## <span style="color:blue;">명명규칙</span>
### 파일 명
* 클래스명.js 로 한다.
    * 파일명은 모두 소문자
    * 대문자는 하이픈으로 변경
    ```
    //클래스명
    const DataRegistForm = function(){
    
    }

    //파일명
    data-regist-form.js
    ```

### 클래스 명 
* 대문자로 시작한다.
    ```
    const Person = function(){

    }

    or

    class Persion(){

    }
    ```
### 메소드(함수) 명
* 동사로 시작한다.
    ```
    getData(), calcDistance(), drawLine(),...
    ```
### 변수 명
* 전역 변수
* 지역 변수

## <span style="color:blue;">코딩 스타일</span>
### 들여쓰기(indent)
    공백(space) 4 로 한다.
### 필수 메소드
* init()
    ```
    /**
     * 초기작업
     */
    Person.prototype.init = function(){

    } 
    ```

* setEventHandler()
    ```
    /**
     * 이벤트 등록
     */
    Person.prototype.setEventHandler = function(){

    } 
    ```

## <span style="color:blue;">IDE</span>
### visual studio code
#### 유용한 extension
    * Auto Close Tag
    * Auto Rename Tag
    
    
    * Debugger for Java
    * Java Extension Pack
    * Language Support for Java
    * Project Manager for Java

    * Spring Boot Dashboard
    * Spring Boot Extension Pack
    * Spring Boot Tools
    * Spring Initializr Java Support

    * JavaScript Debugger
    * ESLint

    * GitLens

    * Gradle Tasks
    
    * Visual Studio IntelliCode
    * Rainbow Brackets
    * Prettier
    