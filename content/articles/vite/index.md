---
title: "Vite"
description: "[Javascript] Vite란"
date: "2023-06-06"
categories:
  - "Study"
  - "Javascript"
keywords:
  - "Javascript"
  - "React"
  - "ESM"
---

# Vite

설명: ESbuild를 기반으로 만들어진 프론트엔드 빌드툴

## CRA

리액트 팀이 추천하는 공식 리액트 보일러 툴.

React 프로젝트를 생성할 때 대부분 Create React App (CRA) 를 통해 생성했다.

CRA는 Webpack을 사용하는데, 여기서 Webpack은 자바스크립트 코드로 구성된 툴을 뜻한다.

자바스크립트는 Interpreted 언어(소스코드를 기계어로 컴파일하지 않고 명령어를 바로 해석하여 실행하는 언어 : 실행할 때 해석하면서 실행한다.)이기 때문에 느리다. 

때문에 개발자들은 Go와 같은 low-level language를 활용하여 자바스크립트 툴을 창조했고, 그렇게 생겨난게 Esbuild이다. 

**Esbuild**는 Go로 작성된 자바스크립트 빌드툴로 빠르다.

## Vite

Vite는 Esbuild를 기반으로 만들어진 프론트엔드 빌드툴이다.

브라우저에서의 Native ES 모듈 활용과 compile-to-native 언어로 작성된 자바스크립트 툴 이라는 새로운 발전을 통해 더 나은 개발자 경험을 제공한다.

ES 모듈 활용으로 인해 자바스크립트 코드를 모두 bundle할 필요 없이 브라우저에서 자바스크립트 어플리케이션을 작동할 수 있다.

- 핵심은 ES 모듈을 사용하여 브라우저가 필요로 하는 어플리케이션 코드의 일부분만 변환하고 제공한다.

### 자바스크립트 모듈

개발 모드로 빌드를 할 때, Vite는 자바스크립트 모듈을 두 가지 카테고리로 나눈다.

1. 의존성 모듈
node_modules 폴더로부터 import 되는 자바스크립트 모듈 → 개발하는 동안엔 자주 바뀌지 않는 편
    
    vite의 사전 번들링 기능은 esbuild를 사용하여 처리 된다. 때문에 기존 번들러 대비 빠른 번들링 속도를 보인다.
    
    → webpack은 브라우저의 요청 이전에 모든 자바스크립트 모듈을 처리하지만, vite는 브라우저 요청 전에 의존성 모듈만 미리 번들링한다.
    
2. 소스 코드
    
    `.jsx`,`.vue` ,`.scss`와 같은 라이브러리 관련 확장자를 포함할 수 있고, 자주 수정되는 파일이다
    
    Vite는 native [ESM](https://www.notion.so/ES-Module-45b27aa32fcc4971a43f8a0e13976ef1?pvs=21)을 통해 소스코드를 제공한다. → 이는 브라우저로 하여금 번들러의 작업 일부를 넘겨 받게 한다.
    
    Vite는 브라우저의 요청이 있을때만 소스코드를 변환하고 제공한다.
    

### HMR

HMR은 나머지 페이지에 영향을 끼치지 않고, 특정 모듈만 즉시 반영 될 수 있도록 해준다.

하지만 프로젝트 크기가 커지면, HMR의 시간 또한 길어지므로 생산성 저하로 이어지게 된다.

Vite는 네이티브 ESM을 기반으로 HMR을 구현하기 때문에 다른 번들링 툴보다 우위에 있다고 할 수 있다.

모듈이 수정되면, Vite는 수정된 모듈과 관련된 부분만을 교체하고, 브라우저에서 해당 모듈을 요청하면 교체된 모듈을 전달한다.

---

**참조** 

[https://velog.io/@jaewoneee/리액트-보일러플레이트-Create-React-App-vs-Vite](https://velog.io/@jaewoneee/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%B3%B4%EC%9D%BC%EB%9F%AC%ED%94%8C%EB%A0%88%EC%9D%B4%ED%8A%B8-Create-React-App-vs-Vite)

[https://velog.io/@ho2yahh/React-CRA를-100배-빠른-Vite로-바꾸기](https://velog.io/@ho2yahh/React-CRA%EB%A5%BC-100%EB%B0%B0-%EB%B9%A0%EB%A5%B8-Vite%EB%A1%9C-%EB%B0%94%EA%BE%B8%EA%B8%B0)
