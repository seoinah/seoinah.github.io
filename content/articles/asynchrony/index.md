---
title: "비동기 작업"
description: "[Javascript] 비동기 작업"
date: "2023-06-28"
categories:
  - "Study"
  - "Javascript"
  - "React"
keywords:
  - "Javascript"
  - "React"
---

# 비동기 작업

상위 항목: React (https://www.notion.so/React-cd7a3137ef7d4eac9c6879442e07e5a1?pvs=21), JavaScript (https://www.notion.so/JavaScript-367630c26993403a857566a44039dbb0?pvs=21)
학문 분야: Javascript, React

## 자바스크립트는 동기?

자바스크립트는 싱글 스레드를 기반으로 동기 방식으로 작동한다.

하지만, 자바스크립트에서 비동기로 작동하는 함수가 많은데?? 어떻게 비동기적으로 동작시킬 수 있을까?

### 이벤트 루프

자바스크립트는 이벤트 루프 덕분에 비동기 작업을 수행할 수 있다.

코드를 실행하면 비동기 작업은, ‘실행’이라는 명령을 담아 이벤트 루프로 던진다.

이벤트 루프가 비동기 작업을 담당 및 처리한다.

덕분에 자바스크립트 엔진은 **무거운 작업을 어딘가에 위임하고, 동기적으로 바로 다음 코드를 실행**한다.

그러다 이벤트 루프에서 작업이 완료되면, 비동기 작업을 만들 때 콜백 함수를 함께 지정하는데, 콜백 함수를 가지고 후속 작업을 진행한다.

nodejs는 비동기로 작동하는 함수가 많다. 동기 코드를 비동기로 짜야 하는 경우도 있다.

setTimeout / setInterval 등의 함수가 대표적인 비동기 루틴 생성 함수이며, promise는 비동기 루틴을 만드는 아주 효과적인 방법이다.

## 콜백 함수

콜백 함수는 **함수 자체를 인자로 전달하는 함수**이다.

```jsx
function increase(number, callback) {
	setTimeout(() => {
		const result = number + 10;
		if (callback){
			callback(result);
		} 
	},1000)
}

increase(0, result => {
	console.log(result);
});
```

파라미터 값이 주어지면 1초 뒤에 10을 더해 반환하는 코드가 있다.

해당 함수가 처린된 직후 어떤 작업을 하고 싶다면 위와 같이 콜백 함수를 활용한다.

함수는 비동기적으로 처리되어 increase() 안에 있는 함수가 모두 완료되기 까지 기다리지 않는다. 

콜백 안에 또 콜백을 넣어서 구현할 수 있는데, 여러번 반복될 경우 가독성이 나빠진다 ⇒ 콜백 지옥

## Promise

콜백 지옥과 같은 코드가 형성되지 않게 ES6에 새로 도입된 방안

동기적으로 보이는 비동기 처리 방식

Promise 객체는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타낸다.

```jsx
function increase(number) {
	const promise = new Promise((resolve, reject) => {
		setTimeout (() => {
			const result = number + 10;
			if(result > 50){
				// 50보다 높으면 에러 발생
				const e = new Error("NumberTooBig");
				return reject(e);
			}
			resolve(result);  // number 값에 + 10 후 성공 처리
		}, 1000);
	});
	return promise;
}

increase(0)
	.then(number => {
		// Promise에서 resolve된 값은 .then을 통해 받아 올 수 있음
		console.log("여기다",number);
		return increase(number);
	})
	.then(number => {
		// 또 다시 .then으로 처리 가능하다.
		console.log(number);
		return increase(number);
	})
	.then(number => {
		console.log(number);
		return increase(number);
	})
	.catch(e => {
		// 도중에 에러가 발생한다면 .catch를 통해 알 수 있음
		console.log(e);
	});
```

여러 작업을 연달아 처리할 때 함수를 여러번 감싸는 것이 아니라 .then을 사용하여 그 다음 작업을 설정한다.

## async / await

Promise를 더욱 쉽게 사용할 수 있게 해주는 ES8(ES2017) 문법

비동기 작업의 동기 처리를 해준다.

함수의 앞 부분에 `async` 키워드를 추가하고, 함수 내부에서 Promise 앞 부분에 `await` 키워드를 사용한다.

⇒ Promise가 끝날 때까지 기다리고, 결과 값을 특정 변수에 담을 수 있다.

```jsx
function increase(number) {
	const promise = new Promise((resolve, reject) => {
		setTimeout (() => {
			const result = number + 10;
			if(result > 50){
				// 50보다 높으면 에러 발생
				const e = new Error("NumberTooBig");
				return reject(e);
			}
			resolve(result);  // number 값에 + 10 후 성공 처리
		}, 1000);
	});
	return promise;
}

async function runTasks() {
	try{
		let result = await increase(0);
		console.log(result);
		
		result = await increase(result);
		console.log(result);
		
		result = await increase(result);
		console.log(result);
	}
	catch(e){
		console.log(e);
	}
}
```

```jsx
//promise
function main(num) {
    f(num)
        .then(g)
        .then(h)
        .then((value)=>{
            console.log(value);
        })
}

--------------------------------------
// async/await 사용
async function main(num) {
    const a = await f(num);
    const b = await g(a);
    const c = await h(b);
    console.log(c);
}
```

## Axios

→ Promise API를 활용하는 HTTP 비동기 통신 라이브러리

결과 값으로 Promise 객체를 받게 되는데, 데이터를 받아오지 못하고 줄거야 라는 약속만 해 놓은 상태이다.

데이터를 받기 위해서는 axios.get 전에 데이터가 올 때까지 기다리겠다는 명령을 해야 하는데, 그 명령어가 await이다.

Promise가 처리되길 기다리는 동안엔 엔진이 다른 일 (다른 스크립트 실행, 이벤트 처리 등)을 할 수 있기 때문에 CPU 리소스가 낭비되지 않는다.

1. Axios는 운영환경에 따라서 브라우저간 XMLHttpRequest 객체 또는 Node.js의 HTTP API를 사용한다.
2. Promise(ES6)를 사용. (promise가 상태를 관리하여 다른 코드가 비동기적으로 실행될 수 있도록 만드는 객체.)
3. 요청(Request) 응답 (reply)을 JSON 형태로 자동 변경

## React hook (비동기 처리)

react에서 비동기 처리를 편하게 하기 위해 제공하는 훅이 잇다.

1. useState : 변수의 상태를 추적한다.
    
    변수의 내용이 변하면 자동으로 jsx가 재렌더링 되어 변화된 변수가 화면에 반영된다.
    
    useState를 사용하지 않으면 스크립트 내부에서 변수에 변화가 있어도 jsx는 변화를 감지하지 못해 항상 초기 상태만 표시하게 된다.
    
2. useEffect : 변수의 상태를 추적해 작업을 한다.
    
    변수를 추적해 변화가 생긴다면 어떠한 기능을 수행할 수 있게 한다.
    

---

**참고**

[https://bum-developer.tistory.com/entry/React-비동기-작업콜백-함수-Promise-async-await](https://bum-developer.tistory.com/entry/React-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%9E%91%EC%97%85%EC%BD%9C%EB%B0%B1-%ED%95%A8%EC%88%98-Promise-async-await)
