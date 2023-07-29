---
title: "[Javascript Doc] 객체"
description: "Javascript Doc에서의 객체 부분 정리"
date: "2023-07-29"
categories:
  - "Study"
  - "Javascript"
keywords:
  - "Javascript"
---

객체형은 원시형(하나의 데이터만 담을 수 있음)과 달리 다양한 데이터를 담을 수 있다.

키로 구분된 데이터 집합이나 복잡한 개체를 저장할 수 있다.

```jsx
let user = new Object(); // '객체 생성자' 문법
let user = {};  // '객체 리터럴' 문법 => 객체 선언할 때 주로 이 방법 사용

user.isAdmin = true // 불린형 프로퍼티 추가
delete user.isAdmin // delete 연산자를 사용하여 프로퍼티 삭제
```

객체를 만들 때 객체 리터럴 안의 프로퍼티 키가 대괄호로 둘러싸여 있는 경우, 이를 계산된 프로퍼티라고 부른다.

```jsx
let fruit = prompt("어떤 과일을 구매하시겠습니까?", "apple");

let bag = {
  [fruit]: 5, // 변수 fruit에서 프로퍼티 이름을 동적으로 받아 옵니다.
};

alert( bag.apple ); // fruit에 "apple"이 할당되었다면, 5가 출력됩니다.
```

- 참조에 의한 객체 복사

객체는 ‘참조에 의해’ 저장되고 복사된다.

변수엔 객체가 그대로 저장되는 것이 아니라, 객체가 저장되어 있는 ‘메모리 주소’엔 객체에 대한 ‘참조 값’ 이 저장.

## 옵셔널 체이닝 ‘?.’

옵셔널 체이닝을 사용하면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다.

`?.`은 `?.`'앞’의 평가 대상이 `undefined`나 `null`이면 평가를 멈추고 `undefined`를 반환한다.

옵셔널 체이닝은 존재하지 않아도 괜찮은 대상에만 사용해야 한다.

옵셔널 체이닝을 남용하면 에러를 조기에 발견하지 못하고 디버깅이 어려워진다.

## 심볼형

자바스크립트는 객체 프로퍼티 키로 오직 문자형과 심볼형만 허용한다.

```jsx
// id는 새로운 심볼이 됩니다.
let id = Symbol();

// 심볼 id에는 "id"라는 설명이 붙습니다.
let id = Symbol("id");

let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
```

심볼은 유일성이 보장되는 자료형이기 때문에, 설명이 동일한 심볼이어도 각 심볼값은 다르다.

심볼은 다른 자료형으로 암시적 형 변환(자동 형 변환)이 되지 않는다.

### 숨김 프로퍼티

심볼을 이용하면 ‘숨김(hidden)’ 프로퍼티를 만들 수 있다. 숨김 프로퍼티는 외부 코드에서 접근이 불가능하고 값도 덮어 쓸 수 없다.

심볼은 유일성이 보장되므로 우리가 만든 식별자와 제3의 스크립트에서 만든 식별자가 이름이 같더라도 충돌하지 않는다.

### Symbols in a literal

객체 리터럴을 사용해 객체를 만든 경우, 대괄호로 심볼형 키를 만들어야 한다.

```jsx
let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123 // "id": 123은 안됨
};
```

심볼은 **for…in** 에서 배제된다.

Object.assign은 키가 심볼인 프로젝트를 배제하지 않고 객체 내 모든 프로퍼티를 복사한다.

### 전역 심볼

전역 심볼 레지스트리는 이름이 같은 심볼이 같은 개체를 가리키길 원하는 경우 사용한다.

전역 심볼 레지스트리 안에 심볼을 만들고 해당 심볼에 접근하면, 이름이 같은 경우 동일한 심볼을 반환해준다.

```jsx
// 전역 레지스트리에서 심볼을 읽습니다.
let id = Symbol.for("id"); // 심볼이 존재하지 않으면 새로운 심볼을 만듭니다.

// 동일한 이름을 이용해 심볼을 다시 읽습니다(좀 더 멀리 떨어진 코드에서도 가능합니다).
let idAgain = Symbol.for("id");

// 두 심볼은 같습니다.
alert( id === idAgain ); // true
```

### Symbol.keyFor

전역 심볼을 찾을 때 사용되는 `Symbol.for(key)`에 반대되는 메서드도 있다.

 `Symbol.keyFor(sym)`를 사용하면 이름을 얻을 수 있다. 전역 심볼이 아닌 심볼에는 사용할 수 없다.

## 객체를 원시형으로 변환하기

객체는 숫자형이나 문자형으로만 형 변환이 일어난다고 생각하면 된다.

### ToPrimitive

특수 객체 메서드를 사용하면 숫자형이나 문자형으로의 형 변환을 원하는 대로 조절할 수 있다.

객체 형 변환은 세 종류로 구분되는데 ‘hint’(목표로 하는 자료형)라 불리는 값이 구분 기준이 된다.

hint는 string, number, default(자료형이 확실치 않을 때) 가 있다.

- 자바스크립트는 형 변환이 필요할 때 아래와 같은 알고리즘을 따라 원하는 메서드를 찾고 호출한다.
1. 객체에 `obj[Symbol.toPrimitive](hint)`메서드가 있는지 찾고, 있다면 메서드를 호출합니다. `Symbol.toPrimitive`는 시스템 심볼로, 심볼형 키로 사용됩니다.
2. 1에 해당하지 않고 hint가 `"string"`이라면,
    - `obj.toString()`이나 `obj.valueOf()`를 호출합니다(존재하는 메서드만 실행됨).
3. 1과 2에 해당하지 않고, hint가 `"number"`나 `"default"`라면
    - `obj.valueOf()`나 `obj.toString()`을 호출합니다(존재하는 메서드만 실행됨).
    

### Symbol.toPrimitive

자바스크립트엔 Symbol.toPrimitive라는 내장 심볼이 존재한다.

이 심볼은 목표로 하는 자료형(hint)를 명명하는데 사용된다.

```jsx
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// 데모:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500

_____________________________________________________________________

let user = {
  name: "John",
  money: 1000,

  // hint가 "string"인 경우
  toString() {
    return `{name: "${this.name}"}`;
  },

  // hint가 "number"나 "default"인 경우
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```
