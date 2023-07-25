---
title: "리액트 성능 최적화"
description: "[React] 성능 최적화"
date: "2023-07-25"
categories:
  - "Study"
  - "React"
keywords:
  - "React"
---

# 성능 최적화

## Rerendering 방지

컴포넌트 리렌더링 되는 조건은

1. 전달받은 props가 변경될 때
2. 부모 컴포넌트가 리렌더링 될 때
3. 자신의 state가 변경될 때

이다.

### useMemo

컴포넌트가 리렌더링 될 때마다 함수도 리렌더링 되는데, 리렌더링할 때마다 실행 시간이 오래 걸리는 함수를 연산된 값을 `useMemo`라는 Hook 을 사용하여 재사용할 수 있다.

⇒ memoization : 기존에 수행한 연산의 결과값을 어딘가에 저장해두고 동일한 입력이 들어오면 재활용하는 프로그래밍 기법. memoization을 절적히 적용하면 중복 연산을 피할 수 있기 때문에 메모리를 조금 더 쓰더라도 애플리케이션의 성능을 최적화할 수 있다.

```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

`useMemo`는 의존성이 변경되었을 때에만 메모이제이션된 값만 다시 계산한다.

단, useMemo를 남용하면 단점이 있다.

1. 컴포넌트의 복잡도가 올라가 코드 가독성이 떨어지고, 따라서 유지보수가 어려워진다.
2. useMemo가 적용된 레퍼런스는 재활용을 위해 가비지 컬렉션에서 제외되기 때문에 메모리를 더 쓴다.

### React.memo 컴포넌트 메모이제이션

useMemo와 달리 hook이 아니므로 클래스 컴포넌트에도 적용이 가능하다.

컴포넌트의 props가 바뀌지 않았다면, 리렌더링하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 성능을 최적화한다.

React.memo는 콜백함수를 이용해 메모이제이션을 적용할지 여부를 판단할 수 있다.

```tsx
const MyComponent = React.memo(function MyComponent(props) {
  /* props를 사용하여 렌더링 */
});
```

### useCallback

useMemo가 리턴되는 값을 memoize 시켜주었는데, useMemo와 비슷한 useCallback은 함수 선언을 memoize 하는데 사용된다.

자식 컴포넌트에 함수를 넘겨줄 때 새로 생성된 함수를 넘겨주면, 자식 컴포넌트를 React.memo로 감쌌어도 전달된 함수 props이 다른 참조 값을 가지므로 props가 변경된 것으로 인식하고 리렌더링을 한다. 이를 방지하기 위해 useCallback을 사용할 수 있다.

```tsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

### **자식 컴포넌트의 props로 객체를 넘겨줄 경우 변형 X**

자식 컴포넌트의 props로 전달할 때 형태에 주의해야 한다.

```tsx
// 생성자 함수
<Component prop={new Obj("x")} />
// 객체 리터럴
<Component prop={{property: "x"}} />
```

새로 생성된 객체가 props로 들어가므로 컴포넌트가 리렌더링 될 때마다 새로운 객체가 생성되어 자식 컴포넌트로 전달된다.

생성자 함수나 객체 리터럴로 객체를 생성해서 하위 컴포넌트로 넘겨주는 방식이 아닌, state를 그대로 하위컴포넌트에 넘겨주어 필요한 데이터 가공을 그 하위컴포넌트에서 해주는 것이 좋다.

### key 값에 index 사용 X

어떤 배열에 중간에 어떤 요소가 삽입될때 그 중간 이후에 위치한 요소들은 전부 index가 변경된다.

그러면 key 값이 변경되면서 React는 key가 동일 할 경우, 동일한 DOM Element를 보여주기 때문에 예상치 못한 문제가 발생할 수 있다.

### Input onChange 최적화

보통 input 태그에 onChange 이벤트를 줄때 타이핑을 할때마다 해당 컴포넌트가 렌더링 되어, 최적화 방법을 많이 찾는다.
