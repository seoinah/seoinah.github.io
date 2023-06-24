---
title: "Suspense"
description: "[React] Suspense란"
date: "2023-06-25"
categories:
  - "Study"
  - "React"
keywords:
  - "React"
---

# Suspense

React v18.0 에서 새로 도입된 기능이다.

Suspense 를 통해 컴포넌트의 렌더링을 어떤 작업이 끝날 때까지 잠시 중단시키고, 다른 컴포넌트를 먼저 렌더링할 수 있다.

Suspense는 어떤 컴포넌트가 읽어야 할 데이터가 아직 준비되어 있지 않다는 것을 리엑트에게 알려준다.

```jsx
<Suspense fallback={<Loading />}>
  <SampleList />
</Suspense>
```

컴포넌트를 Suspense로 감싸주었을 경우, 컴포넌트의 렌더링을 특정 작업 이후로 미루고, 특정 작업이 이루어질 동안 fallback 속성으로 넘긴 Loading 컴포넌트를 대신 보여줄 수 있다.

간단히, Suspense는 Promise를 캐싱한다.

Suspense는 pending 상태일 때 children를 실행시키지 않고 fallback을 반환한다. 때문에 waterfall 현상이 발생할 수 있다.

때문에, 무조건 좋은 기능이라고 Suspense를 남용할 경우 네트워크 병목 현상으로 인해 어플리케이션 로딩 성능이 저하될 수 있다.

Suspense를 사용하면서 한 컴포넌트에 두 개 이상의 요청을 할 경우, network waterfall 이 발생하기 때문에 이를 지양해야 한다.

→ useQueries를 사용하여 필요한 요청을 병렬로 처리한다

이 방법의 경우 tanstack/react-query v4.15.0부터 useQueries에서 suspense와 error Boundaries를 제공하기 때문에 버전을 고려하며 다시 확인이 필요한 해결 방법이다.

→ 두 개 이상의 요청이 이루어지는 컴포넌트를 한 컴포넌트에 하나의 요청만 이루어지도록 구분한 후 한 suspense로 감싸준다.
