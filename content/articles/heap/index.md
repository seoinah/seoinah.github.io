---
title: "Heap | Priority Queue"
description: "[Algorithm] Heap|Priority Queue 이란"
date: "2023-06-11"
categories:
  - "Study"
  - "Algorithm"
  - "자료구조"
keywords:
  - "Algorithm"
  - "자료구조"
  - "Heap"
  - "PriorityQueue"
---

## Heap

- 완전 이진 트리의 일종으로 Priority Queue를 위해 만들어진 자료구조이다.
- 다익스트라 알고리즘(최단 거리 구하기 알고리즘) 에서 최소 비용을 기반으로 그래프를 탐색 할 때도 heap을 사용한다.
- 여러 개의 값들 중 최댓값 또는 최솟값을 빠르게 찾을 수 있다.
- 중복된 값을 허용한다. 
- 시간 복잡도
  - 꺼내기 : O(1)
  - 삽입 : O(logn)
  - 삭제 : O(logn)

1. max heap (최대 힙)
  부모 노드의 키 값이 자식 노드의 키 값보다 크거나 같은 완전 이진 트리   ->  key(부모 노드) >= key(자식 노드)
  
3. min heap (최소 힙)
  부모 노드의 키 값이 자식 노드의 키 값보다 작거나 같은 완전 이진 트리   ->  key(부모 노드) <= key(자식 노드)

## heap 구현
배열을 사용하여 heap을 구현한다. 우선순위 큐를 만들기 위해 min heap을 구현할 예정이다.

**힙에서의 부모 노드와 자식 노드의 관계**
 -> 왼쪽 자식의 인덱스 = (부모의 인덱스) * 2
 -> 오른쪽 자식의 인덱스 = (부모의 인덱스) * 2 + 1
 -> 부모의 인덱스 = (자식의 인덱스) / 2

### 기본 구조
```javascript
class Heap {
  constructor() {
    this.heap = []
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2)

  peek = () => this.heap[0] // 항상 최상위 노드가 peek 가 된다.
}
```

### 삽입
```javascript
class Heap {
  ...

  insert = (key, value) => { // 우선순위를 비교하기 위해서 key, value 로 받는다.
    const node = { key, value } // 객체로 node 를 만들고
    this.heap.push(node) // push 한다.
    this.heapifyUp() // 배열에 가장 끝에 넣고, 다시 min heap 의 형태를 갖추도록 한다.
  }
  
  /**
  *최근에 삽입한 노드가 min heap 의 형태를 갖추도록 자리를 찾아주는 함수
  **/
  heapifyUp = () => {
    let index = this.heap.length - 1 // 계속해서 변하는 index 값
    const lastInsertedNode = this.heap[index] // 최근에 삽입된 노드의 정보

    // 루트노드가 되기 전까지
    while (index > 0) {
      const parentIndex = this.getParentIndex(index)

      // 부모 노드의 key 값이 마지막에 삽입된 노드의 키 값 보다 크다면
      // 부모의 자리를 계속해서 아래로 내린다.
      if (this.heap[parentIndex].key > lastInsertedNode.key) {
        this.heap[index] = this.heap[parentIndex]
        index = parentIndex
      } else break
    }

    // break 를 만나서 자신의 자리를 찾은 상황
    // 마지막에 찾아진 곳이 가장 나중에 들어온 노드가 들어갈 자리다.
    this.heap[index] = lastInsertedNode
  }
}
```

### 삭제
```javascript
class Heap {
  ...

  remove = () => {
    const count = this.heap.length
    const rootNode = this.heap[0]

    if (count <= 0) return undefined
    if (count === 1) this.heap = []
    else {
      this.heap[0] = this.heap.pop() // 끝에 있는 노드를 부모로 만들고
      this.heapifyDown() // 다시 min heap 의 형태를 갖추도록 한다.
    }

    return rootNode
  }
  
  // 변경된 루트노드가 제 자리를 찾아가도록 하는 메소드
  heapifyDown = () => {
    let index = 0
    const count = this.heap.length
    const rootNode = this.heap[index]

    // 계속해서 left child 가 있을 때 까지 검사한다.
    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index)
      const rightChildIndex = this.getRightChildIndex(index)

      // 왼쪽, 오른쪽 중에 더 작은 노드를 찾는다
      // rightChild 가 있다면 key의 값을 비교해서 더 작은 값을 찾는다.
      // 없다면 leftChild 가 더 작은 값을 가지는 인덱스가 된다.
      const smallerChildIndex =
        rightChildIndex < count && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
          ? rightChildIndex
          : leftChildIndex

      // 자식 노드의 키 값이 루트노드보다 작다면 위로 끌어올린다.
      if (this.heap[smallerChildIndex].key <= rootNode.key) {
        this.heap[index] = this.heap[smallerChildIndex]
        index = smallerChildIndex
      } else break
    }

    this.heap[index] = rootNode
  }
}
```

---

## Priority Queue
- 비선형 자료구조이다. (트리 구조)
- 우선순위를 가진 데이터들을 저장하는 큐이다.
- 우선순위 큐 삽입/삭제 시간 복잡도 : 𝑂(𝑙𝑜𝑔𝑁)

```javascript
class PriorityQueue extends Heap {
  constructor() {
    super()
  }

  //min heap에 넣기
  enqueue = (priority, value) => this.insert(priority, value)
  //min heap에서 삭제 (우선순위가 가장 높은 노드 꺼내기)
  dequeue = () => this.remove()
  //heap이 비었는지 
  isEmpty = () => this.heap.length <= 0
}
}
```

---
[참고]
[https://jun-choi-4928.medium.com/javascript%EB%A1%9C-heap-priority-queue-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-8bc13bf095d9](https://jun-choi-4928.medium.com/javascript%EB%A1%9C-heap-priority-queue-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-8bc13bf095d9)


