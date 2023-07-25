---
title: "React Query"
description: "[React] React Query"
date: "2023-07-25"
categories:
  - "Study"
  - "React"
keywords:
  - "React"
---
<aside>
💡 react-query는 data fetching, 캐싱, 동기화, 서버 쪽 데이터 업데이트 등을 쉽게 만들어주는 React 라이브러리
</aside>

대부분의 기존 상태 관리 라이브러리는 클라이언트 상태 관리에 적합하지만, 비동기 또는 서버 샅애 관리에는 적합하지 않다. 

## 기본 설정

### 옵션

1. staleTime
    
    캐시를 사용하면서 매번 background-refetching을 한 후, 변경 사항이 있으면 그 때 UI를 변경하기 때문에 매번 네트워크 요청이 발생한다.
    
    만약 서버 데이터가 자주 변경되지 않는 서비스의 경우 staleTime을 통해 background-refetching 시간을 조정할 수 있다.
    
2. refetchOnMount
    
    useQuery hook의 옵션으로 줄 수 있는 값이다.
    
    기본값은 true로, 페이지를 최초 방문 후 데이터를 캐싱한 다음에 재방문시 컴포넌트가 마운트될 때 데이터가 stale(오래된) 상태이면 refetch가 발생한다.
    
    초기 데이터를 가져오는데 유용하며, 실시간으로 업데이트 되지 않는 사이트의 경우 false로 두어도 괜찮다.
    
    브라우저 포커스시에 refetch하는 것과 상관 없다.
    
3. refetchOnWindowFocus
    
    서버 데이터가 변경되었을 때, 새로고침을 하지 않아도 window에 다시 focus를 한다면 refetch를 통해 데이터를 가져와 UI에 적용시킨다.
    
    → window에 focus 된다는 것은?
    
    다른 탭에서 돌아오거나, alt tab으로 다른 앱을 사용하다 온다거나 등을 말한다.
    
    window에 focus 되었을 때 데이터가 stale 상태일때 refetch를 한다. (true로 설정되어 있을 경우)
    
4. refetchOnReconnect
    
    네트워크 연결이 끊겼다가 다시 연결 되었을 때 refetch를 한다.
    
5. cacheTime
    
    기본적으로 비활성 쿼리는 5분 후에 가비지 수집이 된다.
    
    이 시간을 변경하려면 cacheTime을 통해 변경할 수 있다.
    
6. retry
    
    실패한 쿼리는 자동으로 3번 재시도 한다.
    
7. suspense
    
    true로 설정할 경우 [suspense](https://www.notion.so/Suspense-df3769c1028d4ef1b38a7bbd0da18628?pvs=21) 기능을 제공한다.
    
     
    

## Queries

쿼리는 고유키(queryKey)에 연결된 비동기 데이터 소스 단위로 작동 된다.

```jsx
import { useQuery } from 'react-query'
 
 function App() {
   const info = useQuery('todos', fetchTodoList)
 }
```

쿼리는 서버에서 데이터를 가져오기 위해 모든 Promise 기반 메서드에 대해 사용이 가능하다.

### Query Keys

React Quer는 query key를 기반으로 쿼리 캐싱을 관리한다.

쿼리 키는 단순한 문자열이 될 수도 있고, 많은 문자열과 중첩된 객체의 배열과 같이 복잡할 수도 있다.

(쿼리 키가 직렬화 가능하고, 쿼리 데이터에 고유한 한 사용할 수 있다.)

- 배열 키
    
    쿼리에 데이터를 고유하게 설명하기 위해 추가 정보가 필요한 경우 문자열이 있는 배열과 직렬화 가능한 개체를 사용하여 설명할 수 있다.
    
    추가 매개변수가 있는 쿼리, 추가 옵션의 개체를 전달하는 것이 일반적이다.
    
    쿼리 기능이 변수에 의지 하는 경우 아래와 같이 쿼리 키에 포함된다.
    
    ```jsx
    function Todos({ todoId }) {
       const result = useQuery(['todos', todoId], () => fetchTodoById(todoId))
     }
    ```
    

### Query Functions

쿼리 함수는 Promise를 return하는 모든 함수일 수 있다.

return 된 Promise는 error를 발생시키거나 데이터를 가져와야 한다.

## 병렬 쿼리 (Parallel Queries)

병렬 쿼리는 병렬로 실행되거나 동시에 가져오는 동시성을 최대화 하기 위한 쿼리이다.

### 수동 병렬 쿼리

```jsx
function App () {
   // The following queries will execute in parallel
   const usersQuery = useQuery('users', fetchUsers)
   const teamsQuery = useQuery('teams', fetchTeams)
   const projectsQuery = useQuery('projects', fetchProjects)
   ...
 }
```

원하는 만큼의 useQuery / useInfiniteQuery를 나란히 사용한다.

### 동적 병렬 쿼리

간단하게 말해서 queryKey와 queryFn을 동적으로 주는 방법이다.

병렬 쿼리 작업을 수행을 하지만 상황에 따라 쿼리 작업이 유동적으로 변하는 것을 의미한다.

```jsx
//useQueries의 사용 방법은 단순하게 useQuery를 배열로 넣어주는 것이다.
function App({ users }) {
   const userQueries = useQueries(
     users.map(user => {
       return {
         queryKey: ['user', user.id],
         queryFn: () => fetchUserById(user.id),
       }
     })
   )
 }

const queries = useQueries([
    useQuery1,
    useQuery2,
    useQuery3,
    ...
]);
```

여기서 [Suspense](https://www.notion.so/Suspense-df3769c1028d4ef1b38a7bbd0da18628?pvs=21) 에 useQueries에 관한 내용이 조금 있는데 Suspense를 사용하고 있다면 참고해보자

## 종속 쿼리

종속 쿼리는 실행하기 이 전에 완료해야 하는 이전 쿼리에 의존한다.

 enabled쿼리 옵션만 사용하면 된다.

```jsx
// Get the user
 const { data: user } = useQuery(['user', email], getUserByEmail)
 
 const userId = user?.id
 
 // Then get the user's projects
 const { isIdle, data: projects } = useQuery(
   ['projects', userId],
   getProjectsByUser,
   {
     // The query will not execute until the userId exists
     enabled: !!userId,
   }
 )
 
 // isIdle will be `true` until `enabled` is true and the query begins to fetch.
 // It will then go to the `isLoading` stage and hopefully the `isSuccess` stage :)
```

## 쿼리 비활성화 / 일시 정지

쿼리가 자동으로 실행되지 않게 하기 위해서는 enabled 쿼리 옵션을 false로 설정하면 된다.

enabled 옵션이 false로 설정되어 있으면, 

- 쿼리에 캐시된 데이터가 있는 경우 :
    
    쿼리는 status === 'success'또는 isSuccess상태 에서 초기화된다 .
    
- 쿼리에 캐시된 데이터가 없는 경우
    
    쿼리는 status === 'idle'또는 isIdle상태 에서 시작된다 .
    
- 쿼리는 마운트 시 자동으로 가져오지 않는다.
- 새 인스턴스가 마운트되거나 새 인스턴스가 나타날 때 쿼리가 백그라운드에서 자동으로 다시 가져오지 않는다.
- 쿼리는 쿼리 클라이언트 invalidateQueries와 refetchQueries일반적으로 쿼리를 다시 가져오는 호출을 무시한다 .
- refetch 가져올 쿼리를 수동으로 트리거하는 데 사용할 수 있다.

!! 하지만 여기서 주의해야 할 점이 있다.

enabled 옵션을 false로 설정할 경우, 첫 마운트 시 useQuery가 fetcher 함수를 자동 호출하고 실패할 경우 재시도 하는 행위를 사전 차단한 것임을 알아야 한다.

한마디로 useQuery의 기능을 사용하지 않고, 수동적으로 refetch 함수를 통해 호출해야 한다.

하지만 **refetch** 함수는 **캐싱 결과는 조회하지 않고 완전히 무시한 채 요청을 보내는 메서드**이다.

때문에 react-query의 캐싱을 사용하고자 하는 경우에는 refetch 함수를 사용하는 것은 좋지 않다.

때문에 나는 enabled 옵션을 사용할 때, 특정 상태를 충족할 때문 true로 하고, 그 외에는 false로 하여 초기 요청시 오류를 방지하고 있다.

그렇게 하면 조건부로 enabled 옵션이 true로 설정되어 요청을 날리게 되면서 캐싱에도 저장이 된다.

## 쿼리 재시도

useQuery로 요청한 쿼리가 실패 시 retry 옵션을 통해 동작을 설정할 수 있다.

따로 설정하지 않을 경우, 실패시  3번 연속 재 시도를 한다. 

쿼리를 실패하면 연속 재 시도의 최대 수에 도달하지 않은 경우 쿼리가 자동으로 쿼리를 다시 시도한다.

- retry = false : 재시도를 하지 않는다.
- retry = true : 실패한 요청을 무한하게 재시도 한다.
- retry = (숫자) : 지정한 숫자만큼 재시도 한다.
- retry = (failureCount, error) => …  : 요청이 실패한 이유에 따라 사용자 정의 논리를 허용한다.

### Retry Delay

재시도는 요청이 실패할 경우 바로 시도 되는 것이 아니라, 설정할 수 있다.

기본값 retryDelay은 1000시도할 때마다 두 배( ms 에서 시작)로 설정 되지만 30초를 초과할 수 없다.

## Paginated / Lagged Queries

페이지가 있는 데이터에 일반적으로 사용한다.

```jsx
const result = useQuery(['projects', page], fetchProjects)
```

### keepPreviousData

위와 같은 코드로 처리하게 되면, 각각의 새 페이지가 완전히 새로운 쿼리로 처리되기 때문에 UI가 success 및 loading 상태에서 점프하거나 점프하지 못하게 되는 경우가 발생한다.

이 때 사용할 수 있는 옵션이 **keepPreviousData**이다.

keepPreviousData를 true로 설정할 경우, 쿼리 키가 변경되어서 새로운 데이터를 요청하는 동안에도 마지막 data를 유지한다.

이를 통해 페이지네이션을 구현할 때, 캐시되지 않은 페이지를 불러올 때 화면에서 목록이 사라져 깜빡거리는 현상을 방지할 수 있다.

새 데이터가 오면 이전의 데이터가 원활하게 swap하여 새 데이터를 표시한다.

**isPreviousData**를 통해서 현재 쿼리가 제공하는 데이터가 이전 데이터인지 확인할 수 있다.

## Infinite Queries

기존 데이터에 추가로 더 많은 데이터를 로드하거나, 무한 스크롤링 하는 데이터 목록에도 사용할 수 있다.

이러한 유형의 쿼리가 필요할 때 useInfiniteQuery를 사용할 수 있다.

useInfiniteQuery는 파라미터 값만 변경하여 동일한 useQuery를 무한정 호출할 때 사용한다.

- data : 무한 쿼리 데이터를 포함하는 객체
- data.pages : 가져온 페이지를 포함하는 배열
- data.pageParams : useInfiniteQuery가 현재 어떤 페이지에 있는지 확인할 수 있는 파라미터
- fetchNextPage및 fetchPreviousPage기능
    - fetchNextPage : 다음 페이지의 데이터를 호출할 때 사용한다.
        - useInfiniteQuery의 return 값에 포함된다.
        - fetchNextPage를 통해 호출된 데이터는 배열에 가장 우측에 새롭게 담겨진다.
    - fetchPreviousPage : 이전 페이지의 데이터를 호출할 때 사용한다.
        - fetchPreviousPage를 통해 호출된 데이터는 배열에 가장 좌측에 새롭게 담겨진다.
- getNextPageParam / getPreviousPageParam : 로드할 데이터가 더 있는지, 가져올 정보가 있는지 확인
    - 쿼리 함수에서 추가 매개변수로 제공된다.
    - getNextPageParam : 다음 api를 요청할 때 사용될 pageParam값을 정할 수 있다. (return값)
    - getPreviousPageParam : 이전 api를 요청할 때 사용될 pageParam값을 정할 수 있다. (return값)
    - getNextPageParam이 undefined가 아닐 때, hasNextPage는 true이다.
    - getPreviousPageParam이 undefined가 아닐 때, hasPreviousPage는 true이다.
- isFetchingNextPage / isFetchingPreviousPage : background refresh state와 loading more state 를 구분짓는데 사용한다.
- 예시
    
    ```jsx
    const getPersons = () => {
        const res = useInfiniteQuery(
            ['infinitePerson'], 
            ({ pageParam = 5 }) => axios.get('http://localhost:8080/person', {
            params: {
                id: pageParam
            }
        }), {
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.data.id < 10 && lastPage.data.id + 1; // 다음 페이지를 호출할 때 사용 될 pageParam
            },
            getPreviousPageParam: (firstPage, allPages) => {
                return firstPage.data.id > 1 && firstPage.data.id - 1; // 이전 페이지를 호출할 때 사용 될 pageParam 
            },
        });
    
        // 로딩 중일 경우
        if(res.isLoading) {
            return (
                <LoadingText>Loading...</LoadingText>
            )
        }
    
        // 결과값이 전달되었을 경우
        if(res.data) {
            return (
                <Person.Container>
                    {res.data.pages.map((page) => {
                        const person: Iperson = page.data;
    
                        return (
                            <Person.Box key={person.id}>
                                <Person.Title>{person.id}.</Person.Title>
                                <Person.Text>{person.name}</Person.Text>
                                <Person.Text>({person.age})</Person.Text>
                            </Person.Box>
                        )
                    })}
    
                    <Person.NextButton onClick={() => res.hasNextPage && res.fetchNextPage()}>Next</Person.NextButton> {/* 클릭 시 다음 페이지 호출 */}
                    <Person.PrevButton onClick={() => res.hasPreviousPage && res.fetchPreviousPage()}>Prev</Person.PrevButton> {/* 클릭 시 이전 페이지 호출 */}
                </Person.Container>
            )
        }
    }
    ```
    

### infinite query를 다시 가져와야 하는 경우

useInfiniteQuery문을 그냥 refetch 하게 되면 지금까지 조회한 모든 페이지를 다시 조회하게 된다.

때문에 첫페이지만 다시 조회하기 위해서는 데이터를 초기화하고 가져와야 한다. 

remove를 한 후 refetch를 하면 된다.

```jsx
getRequestsQuery.remove();
getRequestsQuery.refetch().then();
```

만약에 첫페이지만 조회하는 것이 아니라면 첫 번째 쿼리에서 시작하여 각 그룹을 순차적으로 가져온다.

### 특정 페이지만 다시 가져오기

모든 페이지의 하위 집합만 refetch 하려면 useInfiniteQuery에서 return 하는 refetch 함수에서 refetchPage 함수를 이용할 수 있다.

```jsx
onst { refetch } = useInfiniteQuery('projects', fetchProjects, {
   getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
 })
 
 // only refetch the first page // index === {refetch하고 싶은 페이지}
 refetch({ refetchPage: (page, index) => index === 0 })
```

• refetchPage: (page: TData, index: number, allPages: TData[]) => boolean

## Placeholder Query Data

- placeholder data : initialData 옵셤과 유사하게 쿼리에 이미 데이터가 있는 것처럼 작동할 수 있지만, 데이터는 캐시에 유지되지 않는다.

실제 데이터를 백그라운드에서 가져오는 동안 서버 데이터와는 관련 없는 보여주기용 가짜 데이터이다.

→ 값으로 지정

```jsx
function Todos() {
   const result = useQuery('todos', () => fetch('/todos'), {
     placeholderData: placeholderTodos,
   })
 }
```

→ 함수로 지정

```jsx
function Todos() {
   const placeholderData = useMemo(() => generateFakeTodos(), [])
   const result = useQuery('todos', () => fetch('/todos'), { placeholderData })
 }
```

쿼리의 placeholderData에 액세스하는 프로세스가 집중적이가 모든 렌더링에서 수행하는 작업아 아닌 경우 값을 memo하거나 memoization된 함수를 placeholderData값으로 전달할 수 있다.

→ 캐시의 placeholderData

경우에 따라 다른 쿼리의 캐시된 결과에서 쿼리에 대한 placeholderData를 제공할 수 있다.

예를 들어 게시물의 미리보기 버전을 제공할 때 블로그 게시물 목록 쿼리에서 캐시된 데이터를 검색한 다음 개별 게시물 쿼리에 대한 placeholderData로 사용할 수 있다.

```jsx
function Todo({ blogPostId }) {
   const result = useQuery(['blogPost', blogPostId], () => fetch(`/blogPosts/${blogPostId}`), {
     placeholderData: () => {      
       return queryClient
         .getQueryData('blogPosts')
         ?.find(d => d.id === blogPostId)
     },
   })
 }
```

## Initial Query Data (초기 쿼리 데이터)

Initial Data는 placeholder Data와는 다르게 캐시에 유지된다.

때문에 부분적 또는 물완전한 데이터를 제공할 때는 Initial Data 대신에 placeholder data를 사용하자.

initial data를 통해 쿼리의 초기 데이터를 설정하고 초기 로드 상태를 건너뛸 수 있다.

```jsx
function Todos() {
   const result = useQuery('todos', () => fetch('/todos'), {
     initialData: initialTodos,
   })
 }
```

### stale time  &  initialDataUpdatedAt

initial data는 새롭게 패치된 것처럼 처리되기 때문에, staleTime 옵션에 의해 해석이 다르다.

- initial data를 설정하고 staleTime을 설정하지 않거나 0으로 설정하면 쿼리가 mount될 때 즉시 다시 가져온다.
- staleTime의 시간을 설정하면, 해당 데이터는 그 시간 동안 유효하기 때문에 백엔드에 요청하지 않는다.

**initialDataUpdatedAt**은 initialData가 생성되었을 때 React Query에 알리고 이를 고려하여 background refetch가 트리거 된다.

기존 캐시 항목에서 dataUpdatedAt 타임스탬프와 initialData를 사용할 때 유용하다.

```jsx
const useTodo = (id) => {
  const queryClient = useQueryClient()

  return useQuery(['todo', id], () => fetchTodo(id), {
    staleTime: 30 * 1000,
    initialData: () =>
      queryClient
        .getQueryData(['todo', 'list'])
        ?.find((todo) => todo.id === id),
    initialDataUpdatedAt: () =>
	// ✅ initial data를 채우는데 사용한 쿼리 데이터가 
    // staleTime(30초) 더 오래된 경우 백그라운드에서 다시 가져옵니다.
      queryClient.getQueryState(['todo', 'list'])?.dataUpdatedAt,
  })
}
```

초기 데이터에 관계없이 쿼리를 다시 가져와야 하는지 여부와 시기를 결정하는데 필요한 모든 정보를 쿼리 인스턴스에 제공한다.

## Prefetching

prefetchQuery 메서드를 사용하면 캐시에 넣을 쿼리 결과를 미리 가져올 수 있다.

```jsx
const prefetchTodos = async () => {  
   await queryClient.prefetchQuery('todos', fetchTodos)
 }
```

→ 이 쿼리에 대한 데이터가 이미 캐시에 있고 무효화 되지 않은 경우 데이터를 가져오지 않는다.

→ 데이터가 지정된 staleTime보다 오래된 경우 쿼리를 가져온다.

→ prefetch된 쿼리에 대한 Instance가 나타나지 않으면 cacheTime 이후에 삭제되어 가비지에 수집된다.

## Mutations

일반적으로 데이터를 생성/수정/삭제하거나 서버 사이드 이펙트를 수행할 때 useMutation hook를 사용한다.

→ mutate 함수는 비동기식 함수이므로 React 16와 이전 버전의 이벤트 콜백에서 직접 사용할 수 없다.

### mutation 상태값 재설정

mutation의 error나 data 상태를 초기화하기 위해 reset 함수를 사용할 수 있다.

```jsx
const CreateTodo = () => {
   const [title, setTitle] = useState('')
   const mutation = useMutation(createTodo)
 
   const onCreateTodo = e => {
     e.preventDefault()
     mutation.mutate({ title })
   }
 
   return (
     <form onSubmit={onCreateTodo}>
       {mutation.error && (
         <h5 onClick={() => mutation.reset()}>{mutation.error}</h5>
       )}
       <input
         type="text"
         value={title}
         onChange={e => setTitle(e.target.value)}
       />
       <br />
       <button type="submit">Create Todo</button>
     </form>
   )
 }
```

### Mutation Side Effects

useMutation은 mutation의 life cycle의 모든 단계에서 빠르고 쉽게 side effect를 허용하는 옵션들이 있다.

```jsx
useMutation(addTodo, {
   onMutate: variables => {
     // Mutation이 곧 발생함
 
     // 선택적으로 롤백과 같은 경우에 사용할 데이터가 포함된 컨텍스트를 반환합니다.
     return { id: 1 }
   },
   onError: (error, variables, context) => {
      // 오류가 발생했습니다!
     console.log(`rolling back optimistic update with id ${context.id}`)
   },
   onSuccess: (data, variables, context) => {
     // 붐 베이비!
   },
   onSettled: (data, error, variables, context) => {
     // 오류 또는 성공... 중요하지 않습니다!
   },
 })

//콜백 함수에서 promise를 반환하면 다음 callback이 호출되기 전에 기다린다.
useMutation({
  mutationFn: addTodo,
  onSuccess: async () => {
    console.log("I'm first!")
  },
  onSettled: async () => {
    console.log("I'm second!")
  },
})
```

mutate를 호출할 때 useMutation에 정의된 콜백 외에 추가 콜백을 트리거 하고 싶을 때 동일한 콜백 옵션을 mutate 함수에 오버라이드 하면 된다.

하지만, 컴포넌트가 mutation을 완료하기 전에 언마운트 된다면 재정의한 콜백이 실행되지 않는다.

### Promises

mutate 대신에 `mutateAsync`를 사용하면 성공시 resolve되거나 오류를 발생시키는 promise를 얻을 수 있다.

```jsx
const mutation = useMutation({ mutationFn: addTodo })

try {
  const todo = await mutation.mutateAsync(todo)
  console.log(todo)
} catch (error) {
  console.error(error)
} finally {
  console.log('done')
}
```

### Retry

리액트 쿼리는 mutation 요청이 실패했을 때 자동으로 다시 시도하지 않지만, `retry`옵션을 사용할 수 있다.

```jsx
const mutation = useMutation({
  mutationFn: addTodo,
  retry: 3,
})
```

### mutation 유지

mutation은 필요한 경우 hydration func을 통해 저장소에 유지되고 다시 시작할 수 있다.

```jsx
const queryClient = new QueryClient()
 
 // "addTo" 돌연변이 정의
 queryClient.setMutationDefaults('addTodo', {
   mutationFn: addTodo,
   onMutate: async (variables) => {
     // 할 일 목록에 대한 현재 쿼리 취소
     await queryClient.cancelQueries('todos')
 
     // 낙관적 할일 생성
     const optimisticTodo = { id: uuid(), title: variables.title }
 
    // 할 일 목록에 낙관적 할 일 추가
     queryClient.setQueryData('todos', old => [...old, optimisticTodo])
 
     // 낙관적 할일과 함께 컨텍스트를 반환합니다.
     return { optimisticTodo }
   },
   onSuccess: (result, variables, context) => {
     // 할 일 목록의 낙관적 할 일을 결과로 바꿉니다.
     queryClient.setQueryData('todos', old => old.map(todo => todo.id === context.optimisticTodo.id ? result : todo))
   },
   onError: (error, variables, context) => {
    // 할일 목록에서 낙관적 할일 제거
     queryClient.setQueryData('todos', old => old.filter(todo => todo.id !== context.optimisticTodo.id))
   },
   retry: 3,
 })
 
 // 일부 구성 요소에서 돌연변이 시작:
 const mutation = useMutation('addTodo')
 mutation.mutate({ title: 'title' })
 
 // 예를 들어 장치가 오프라인이기 때문에 mutation가 일시 중지된 경우
 // 그러면 일시 중지된 돌연변이는 애플리케이션이 종료될 때 dehydrate될 수 있습니다.
 const state = dehydrate(queryClient)
 
 // 그런 다음 응용 프로그램이 시작될 때 mutation를 다시 수화할 수 있습니다.
 hydrate(queryClient, state)
 
 // 일시 중지된 mutation를 재개합니다.
 queryClient.resumePausedMutations()
```

## 쿼리 무효화

쿼리를 오래된 것으로 생각(staleTime에서 사용 중인 모든 구성을 재정의)하고 다시 가져올 수 있는 invalidateQueries 방법

```jsx
// 캐시의 모든 쿼리를 무효화
 queryClient.invalidateQueries()
// `todos`로 시작하는 키로 모든 쿼리를 무효화
 queryClient.invalidateQueries('todos')
```

invalidateQueries 는 매우 유연하지만, exact 옵션을 통해 완전히 일치한 것만 무효화 시킬 수 있다.

```jsx
queryClient.invalidateQueries('todos', { exact: true })
 
 // 아래 쿼리는 무효화
 const todoListQuery = useQuery(['todos'], fetchTodoList)
 
  // 그러나 아래 쿼리는 무효화
 const todoListQuery = useQuery(['todos', { type: 'done' }], fetchTodoList)
```

### mutation으로 인한 무효화

mutation이 되면 기존 쿼리를 무효화하고 새로 가져오는 것이 일반적이다.

object를 업데이트 하는 mutation를 처리할 때 mutation의 응답으로 새 개체가 자동으로 반환되는 것이 일반적이다.

mutation 함수에서 반환된 객체를 활용하고 쿼리 클라이언트의setQueryData 메서드를 사용하여 즉시 새 데이터로 기존 쿼리를 업데이트할 수 있다.

```jsx
const queryClient = useQueryClient()
 
 const mutation = useMutation(editTodo, {
   onSuccess: data => {
     queryClient.setQueryData(['todo', { id: 5 }], data)
   }
			// 두 번째 인수는 `mutate` 함수가 받는 변수 객체입니다.
     onSuccess: (data, variables) => {
       queryClient.setQueryData(['todo', { id: variables.id }], data)
     },
 })
 
 mutation.mutate({
   id: 5,
   name: 'Do the laundry',
 })
 
 /// 아래 쿼리는 다음의 응답으로 업데이트됩니다.
 // 성공적인 돌연변이
 const { status, data, error } = useQuery(['todo', { id: 5 }], fetchTodoById)
```

---

**참고**

[https://velog.io/@familyman80/React-Query-한글-메뉴얼#팁-요령-및-주의-사항](https://velog.io/@familyman80/React-Query-%ED%95%9C%EA%B8%80-%EB%A9%94%EB%89%B4%EC%96%BC#%ED%8C%81-%EC%9A%94%EB%A0%B9-%EB%B0%8F-%EC%A3%BC%EC%9D%98-%EC%82%AC%ED%95%AD)[https://velog.io/@familyman80/React-Query-한글-메뉴얼#팁-요령-및-주의-사항](https://velog.io/@familyman80/React-Query-%ED%95%9C%EA%B8%80-%EB%A9%94%EB%89%B4%EC%96%BC#%ED%8C%81-%EC%9A%94%EB%A0%B9-%EB%B0%8F-%EC%A3%BC%EC%9D%98-%EC%82%AC%ED%95%AD)
