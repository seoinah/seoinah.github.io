---
title: "ESM"
description: "[Javascript] ECMA Module이란"
date: "2023-06-25"
categories:
  - "Study"
  - "Javascript"
keywords:
  - "Javascript"
  - "자료구조"
  - "HashTable"
---

# ES Module

## ES Module

→ ES6(ECMAScript : 자바스크립트를 표준화하기 위해 만들어진 스크립트 프로그래밍 언어)에 도입된 모듈 시스템

→ import, export를 사용해 분리된 자바스크립트 파일끼리 서로 접근할 수 있다.

## 사용하는 이유

### 기존의 문제점

1. jQuery가 생겨나고 어플리케이션의 규모가 커지면서 script 파일을 나누기 시작했고, 파일 간의 변수, 함수 등을 전달하고 받는 방법이 필요함
2. ESM 이전에는 각각의 script 파일을 전역 scope 처럼 사용했다. HTML 파일 보다 위에 있는 script 파일은 저녁 스코프처럼 하위의 script 태그에서 접근, 변경이 가능했다
3. 때문에 jQuery script를 최상단에 두고, 순서를 올바르게 구성하는 것이 중요했다.

### 모듈화

위의 문제들로 인해 모듈화의 필요성이 높아져 ES Module이 등장했다.

모듈은 함수와 변수를 모듈 스코프에 넣고, 각 함수는 함수 스코프를 가진다.

export로 해당 변수, 함수를 다른 모듈에서 import를 통해 의존할 수 있도록 지정할 수 있다.

### Node.js에서의 ESM

nodejs는 브라우저보다 빨리 모듈화를 위한 대책을 마련하였다.

ex) CommonJS, AMD, Webpack-Babel 등

## ESM 동작

브라우저의 자바스크립트는 파일 자체를 사용할 수 없고, 모듈 레코드라고 하는 데이터 구조로 변환해야 한다. (해당 파일들의 모든 구문을 분석해야 한다.)

파일을 불러오는 것은 HTML 명세를 따라 loader가 한다.

script 태그에 type = “module”을 적어 entry 파일로 지정한다.

1. 구성
Loader : entry 파일부터 import 문을 찾아가며 필요한 모든 파일을 모듈 레코드로 구문 분석한다.
2. 인스턴스화
    
    export된 값을 모두 배치하기 위해 메모리 공간을 찾는다.
    
    export와 import들이 이런 메모리 공간을 가리키도록 한다. ( → linking) : 공간을 찾고 지정할 뿐 실제 값을 채우진 않음
    
3. 평가
    
    코드를 실행하여 메모리를 변수의 실제 값으로 채운다.
    

## 사용 방법

### named export

1. 내보내고자 하는 변수, 함수 앞에 export 붙이기
2. 묶어서 내보내기

### default export

1. 내보내고자 하는 변수, 함수 앞에 export default 붙이기
    1. default export는 모듈 당 하나만 가능하다.
    
    ```jsx
    // 변수값은 default로 선언, 내보내기가 동시에 되지 않는다
    export default const a = 1 // xx
    
    // fn.js
    export default function fn(){}
    
    // Class.js
    export default class Class{}
    ```
    
2. 선언 후 내보내기
    
    ```jsx
    //a.js
    const a = 1
    export default a
    
    // fn.js
    function fn(){}
    export default fn
    
    // Class.js
    class Class{}
    export default Class
    ```
    
    ### named export를 import 하는 경우
    
    ```jsx
    import {a} from 'a.js'
    import {fn} from 'fn.js'
    import {Class} from 'class.js'
    ```
    
    ### default export를 import하는 경우
    
    ```jsx
    import a from 'a.js'
    import fn from 'fn.js'
    import Class from 'class.js'
    
    //default의 경우 변수명은 원하는대로 바꿔도 된다.
    
    import DD from 'class.js'
    ```
    

---

**참고**

[https://velog.io/@jjunyjjuny/ES-Modules-정리하기](https://velog.io/@jjunyjjuny/ES-Modules-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0)

[https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
