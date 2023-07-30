---
title: "ESLint & Prettier"
description: "[Javascript] ESLint & Prettier에 대한 설명"
date: "2023-07-30"
categories:
  - "Study"
  - "Javascript"
  - "React"
keywords:
  - "Javascript"
  - "React"
---

# ESLint

자바스크립트 코드에서 발견된 문제 패턴을 식별하기 위한 정적 코드 분석 도구이다.

대부분의 프로그래밍 언어에는 컴파일 과정에서 수행되는 Linter가 기본적으로 내정되어 있다.

하지만 인터프리터 언어인 자바스크립트는 Linter가 내장되어 있지 않다. 때문에 런타임 환경에서 에러가 발생할 확률이 높다.

## Lint

자바스크립트에서는 ESLint와 같은 Linting 도구를 사용한다.

Lint란 소스코드를 분석하여 문법적인 오류나 스타일적인 오류, 적절하지 않은 구조 등에 표시를 달아주는 행위이며, Linter란 Lint 동작을 도와주는 도구이다.

```jsx
// 함수 선언문
function square(number) {
  return number * number;
}

// 기명 함수 표현식(named function expression)
const foo = function multiply(a, b) {
  return a * b;
};

// 익명 함수 표현식(anonymous function expression)
const bar = function(a, b) {
  return a * b;
};

// 생성자 함수
const square = new Function('number', 'return number * number');
console.log(square(10)); // 100

// 화살표 함수
// 매개변수 지정 방법
    () => { ... } // 매개변수가 없을 경우
     x => { ... } // 매개변수가 한 개인 경우, 소괄호를 생략할 수 있다.
(x, y) => { ... } // 매개변수가 여러 개인 경우, 소괄호를 생략할 수 없다.

// 함수 몸체 지정 방법
x => { return x * x }  // single line block
x => x * x             // 함수 몸체가 한줄의 구문이라면 중괄호를 생략할 수 있으며 암묵적으로 return된다. 위 표현과 동일하다.

() => { return { a: 1 }; }
() => ({ a: 1 })  // 위 표현과 동일하다. 객체 반환시 소괄호를 사용한다.

() => {           // multi line block.
  const x = 10;
  return x * x;
};
```

이와 같이 다양한 방식으로 구현할 수 있는 코드 방식으로 일관성있게 구현할 수 있도록 잡아주는 것이 ESLint의 역할이다.

# 사용 방법

## ESLint 설치

`yarn add -D eslint`

## .eslintrc 설정

각종 lint 룰 설정을 위해 프로젝트 루트 디렉토리에 .eslintrc 파일을 만들어서 작성해야 한다.

.eslintrc 파일의 확정자는 js, json, yml로 다양하게 설정 가능하다.

https://eslint.org/docs/latest/use/configure/configuration-files (ESLint 공식 문서)

```json
{
    "root": true,
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": { "project": ["./tsconfig.json"] },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/strict-boolean-expressions": [
            2,
            {
                "allowString" : false,
                "allowNumber" : false
            }
        ]
    },
    "ignorePatterns": ["src/**/*.test.ts", "src/frontend/generated/*"]
}
```

- root : default가 true이고, 이 값이 true가 아니면 eslintrc 파일을 찾을 때 상위의 디렉토리까지 검색한다.
- plugins
    - plugin 설정을 통해 다른 사람이 만든 규칙을 가져올 수 있다.
    - plugin 종류는 다양하고, 여러 plugin을 가져와서 사용하는 경우가 많다.
    - plugin에 추가된다고 해서 바로 적용되는 것이 아니고, extends나 rules 설정을 해야 적용할 수 있다.
- extends
    - plugin package의 규칙을 그대로 따르고 싶을 때 plugin을 extends에 추가한다.
    - 가져온 plugin을 일부만 사용할 수 있지만 보통 extends를 통해 plugin을 통째로 가져와 사용한다.
    - plugin에서 extends 옵션을 제공하는 경우가 많은데, recommended/strict/all 등이 있다. plugin의 규칙을 얼마나 어떻게 따를 것인지 의미하며 보통 recommened를 많이 사용한다.
        
        ```json
        "extends": [
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended"
        ],
        ```
        
- parser
    - ESLint가 구문 분석을 위해 어떤 parser를 사용할지 설정한다.
    - 기본적으로 Expree parser를 사용하는데, Typescript 구문 분석을 위해 `@typescript-eslint/parser` 를 사용하며 설치가 필요하다.
        
        `yarn add -D @typescript-eslint/parser`
        
- rules
    
    plugin의 규칙을 커스텀할 수 있다. extends하여 기본으로 설정된 규칙을 바꾸거나 없앨 수 있고, 기본으로 설정되지 않은 규칙을 추가할 수 있다.
    
- parserOptions : 자바스크립트 언어 옵션을 지정할 수 있다.
- env : 해당 환경에서 정의된 함수나 전역 변수를 사용할 수 있게 해준다.
    - `“browser”: true` 를 설정하면 console.log()를 에러 없이 사용할 수 있다.
    - `“node”: true`를 하게 되면, require를 에러 없이 사용할 수 있게 된다.

# Prettier

Prettier는 일관적인 코드 스타일을 유지할 수 있게 도와주는 툴이다.

ESLint는 문법 에러를 잡아주거나 더 좋은 코드 구현 방식을 사용하도록 해주지만, Prettier는 줄바꿈, 공백, 들여 쓰기 등과 같은 스타일을 교정한다.

## Prettier 설치

`yarn add -D prettier`

## .prettierrc 설정

prettierrc는 공식 문서에서 원하는 옵션을 찾아 추가해주기만 하면 된다.

> https://prettier.io/docs/en/options.html
> 

prettier의 각종 옵션을 직접 설정할 수 있다.

```json
{
 "printWidth": 100,
 "tabWidth": 2,
 "semi": true,
 "singleQuote": true,
 "trailingComma": "all",
 "endOfLine": "auto"
}
```

- printWidth - 줄 바꿈할 줄 길이
- tabWidth - 들여쓰기 칸 수
- semi - 세미콜론 강제
- singleQuote - 작은 따옴표 사용을 강제
- trailingComma - 쉼표로 구분된 여러 줄인 구문에서 후행 쉼표를 추가
- endOfLine - EoF 방식, OS별로 처리 방식이 다름

## ESLint와 Prettier

ESLint의 plugin들의 rule 중 스타일과 관련된 것들도 있기 때문에 Prettier와 충돌할 수 있다.

이를 방지하기 위해 아래 두가지 plugin을 이용할 수 있다.

1. eslint-config-prettier : Prettier를 ESLint plugin으로 추가한다. Prettier가 인식하는 코드 포맷 오류를 ESLint 오류로 출력하도록 할 수 있다. (extends의 가장 마지막에 추가)
    
    ```bash
    {
    "extends": [
      "some-other-config-you-use",
      "prettier"
    ]
    }
    ```
    
2. eslint-plugin-prettier: ESLint의 코드 포맷과 관련된 rule 중 prettier와 충돌하는 부분을 비활성화할 수 있다.
    
    ```bash
    {
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": "error"
      }
    }
    ```
    

```bash
yarn add -D eslint-config-prettier eslint-plugin-prettier
```

## script 설정

package.json에 아래와 같이 추가하면

```json
"scripts": {
    "lint": "yarn lint-eslint && yarn lint-prettier",
    "lint-eslint": "eslint --ignore-path .gitignore src/**/*{ts,tsx} --fix",
    "lint-prettier": "prettier --write \"src/**/*.(ts|tsx)\""
  },
```

`yarn lint`명령어로 편하게 lint를 실행할 수 있다.

# Husky + lint-staged

huskey와 lint-stage로 커밋할 때마다 자동으로 lint를 검사할 수 있다.

협업을 할 때에 ESLint + Prettier 설정을 해도 규칙에 맞지 않는 커밋을 할 수 있다.

lint가 적용되지 않은 상태로 git에 파일이 올라가면, 그 이후 다른 누군가 제대로 lint를 적용하여 올리면 그 사람이 개발 중이던 이슈와 상관 없는 파일들까지 갈아 엎어지게 된다.

그러면 어쩔 수 없이 모두 add하고 lint 적용 커밋을 날려야 한다.

이러한 불편함을 해결하기 위해 lint-staged라는 도구를 사용한다.

## lint-staged

lint-staged를 실행하면 staged 상태의 파일들에게 lint를 적용시켜준다.

이는 git의 이벤트 사이에 원하는 스크립트를 끼워 넣을 수 있도록 해주는 git hook 때문에 가능하다.

hook은 여러 종류가 있지만 lint-staged와 관계되는 것은 커밋 워크플로우 훅이며, 그 중에서도 **pre-commit**(커밋 직저에 실행되는 hook)을 이용한다.

이를 husky와 함께 사용하면 편하다.

## husky

git hook을 손쉽게 제어하도록 도와주는 도구이다.

git hook은 .git/hooks 폴더 안의 스크립트 파일을 직접 수정하거나 추가하여 관리할 수 있다.

그렇지만 직접 스크립트를 작성하는 것도 이것도 번거로울 수 있다.

husky는 직접 스크립트를 작성하지 않고 hook을 설정할 수 있게 해준다.

# 사용 방법

## lint-staged 설치

`yarn add -D lint-staged`

## lint-staged 설정

그 이후, package.json에 아래 코드를 추가한다.

```json
"lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
```

그 후 `yarn lint-staged` 명령어를 실행하면 staged 상태의 파일들에 lint를 적용시켜준다.

## husky 설치

`yarn add -D husky`

## husky 설정

`yarn husky install` 명령어를 실행하면 root 디렉토리에 **.husky** 폴더가 생성되며 기본 설정 파일들이 생겨난다.

아래 명령어를 통해 pre-commit hook에 lint-staged 실행을 서정한다.

`npx husky add .husky/pre-commit "yarn lint-staged"`

.husky/pre-commit 파일이 생겨나면 아래 내용이 있는지 확인한다.

```json
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged
```

이제 모든 설정이 끝나 커밋할 때마다 lint-staged가 실행된다.

---

**참고**

[https://velog.io/@treejy/기본적인-ESLint-Prettier-config](https://velog.io/@treejy/%EA%B8%B0%EB%B3%B8%EC%A0%81%EC%9D%B8-ESLint-Prettier-config)
