---
title: "JSX"
description: "[Javascript] JSX"
date: "2023-07-29"
categories:
  - "Study"
  - "Javascript"
keywords:
  - "Javascript"
  - "React"
---

JSX는 JavaScript XML의 약자입니다. 이것은 React에서 UI 컴포넌트를 만들기 위한 문법입니다. JSX는 HTML과 매우 유사하지만 JavaScript 내부에서 사용됩니다. JSX를 사용하면 UI를 구성하는 코드를 작성하기 쉬워지며, 가독성과 유지보수성이 높아집니다.

JSX는 Babel(자바스크립트 문법을 확장해 주는 도구)과 같은 도구를 사용하여 JavaScript로 변환됩니다. 이러한 변환 과정은 컴파일러에서 이루어지며, 브라우저에서 실행 가능한 JavaScript 코드로 변환됩니다.

JSX는 HTML에서 알고 있던 태그들과 유사한 문법을 사용합니다. 하지만, JSX에서는 모든 태그 이름은 소문자로 써야 하며, 두 개 이상의 태그는 반드시 하나의 태그로 감싸져 있어야 합니다.

```
// JSX 예제
const element = <div>
                  <h1>Hello, World!</h1>
                  <p>Welcome to JSX!</p>
                </div>;

```

위에서 볼 수 있듯이, JSX에서는 HTML과 동일하게 태그를 사용하며, 중괄호({}) 안에 JavaScript 표현식을 작성할 수 있습니다. 이를 통해 동적인 UI를 구성할 수 있습니다.

JSX는 React에서 쉽고 빠르게 UI를 구성하는 데 필수적인 요소입니다. 이 문법을 익혀 놓으면, React에서 더욱 효과적으로 개발할 수 있습니다.

JSX는 문자열도, HTML도 아닌 Javascript를 확장한 문법이다.
