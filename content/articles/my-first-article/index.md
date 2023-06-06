---
title: "HashTable"
description: "[Algorithm] Hash Table 이란"
date: "2023-06-06"
categories:
  - "Study"
  - "Algorithm"
  - "자료구조"
keywords:
  - "Algorithm"
  - "자료구조"
  - "HashTable"
---

## 해시테이블 (Hash Table)

- 해시 테이블은 (Key, Value)식으로 데이터를 저장하는 자료구조 중 하나이다.
- 시간 복잡도는 O(1)이다. 
- 해시 테이블은 Key 값을 해시 함수를 사용하여 변환한 값을 index로 한다.  =>  이를 해싱(Hashing) 이라고 한다.
- 기존 자료구조인 이진탐색트리나 배열에 비해 굉장히 빠른 속도를 갖는다.


## 해시 함수 (Hash Function)

해시 함수에서 가장 중요한 것은 고유한 인덱스이다. 인덱스가 중복되면 충돌(Collision)이 발생한다.

해시 함수의 특징으로는
 -> 일관성이 있어야 한다. (같은 key에는 항상 같은 value가 나와야 한다.)
 -> 다른 데이터가 들어오면 다른 해시값이 나와야 한다.
    
해시 테이블에 사용되는 대표적인 해시 알고리즘으로는,
1. Division Method
  숫자 Key를 테이블의 크기로 나누어 나온 나머지를 인덱스로 사용한다.
2. Digit Folding
  Key의 문자열을 ASCII 코드로 바꾸고 그 값을 합해서 테이블 내의 주소로 사용한다.
4. Multiplication Method
  index = (숫자로 된 Key 값 * 0과 1 사이의 실수 mod 1) * 2의 제곱수
등이 있다.


## 충돌
해시 함수는 서로 다른 데이터일 때, 서로 다른 해시값을 반환해야 한다. 
하지만 정확히 충돌이 없는 해시 함수를 만드는 것은 거의 불가능하다.

따라서 발생할 수 있는 충돌 현상을 방지하기 위해,

1. Separate Chaining (분리 연결법)
  - 동일한 버킷의 데이터에 대해 추가 메모리를 사용해서 다음 데이터의 주소를 저장한다.
  - 링크드 리스트 데이터 구조를 활용한다.
  - 해시 테이블의 확장이 필요없다.
  - 데이터의 수가 많아지면 동일한 버킷에 chaining되는 데이터가 많아져서 효율성이 떨어진다.
  - ex) 한 버킷은 거대한 연결 리스트가 존재하는데, 그 버킷 빼고 모두 비어있다면 결국 해시 테이블이 느려진다. => O(n)
  
2. Open Addressing (개방 주소법)
  - 비어있는 해시테이블의 공간을 활용한다.
  - 지정한 메모리 외 추가적인 저장 공간이 필요 없다.
  - insert, delete 시 오버헤드가 적다.
  - 비어있는 해시를 찾는 규칙
    1. Linear Probing ( 선형 탐색 ) : 고정폭 만큼 이동하여 차례대로 빈 버킷을 검색한다. 
      -> 특정 해시값 주변 버킷이 모두 채워져 있는 primary clustering(연속된 데이터 그룹이 생기는 현상) 문제에 취약하다.
      -> 탐색을 여러번 해야 하는 경우가 생긴다.
      -> 탐색 간격을 1 이외의 테이블의 크기 값과 서로소 관계에 있는 소수로 정해야 클러스터링 현상을 줄일 수 있다.
    2. Quadratic Proving ( 제곱 탑색 ) : 고정폭이 아니고 폭을 제곱수로 이동하여 빈 버킷을 검색한다.
      -> 선형 탐색보다 클러스터링이 적게 일어나지만, 여러개의 서로 다른 키들이 동일한 초기 해값을 갖는 secondary clustering 문제에 취약하다.
      -> 즉, 처음 충돌한 위치가 같다면 다음 충돌할 위치에서도 반복적으로 계속 충돌이 일어난다.
    3. Double Hasinh ( 이중 해시 ) : 다른 해시 함수를 한번 더 적용해서 다온 해시를 통해 데이터 저장
      -> 두 개의 해시 함수를 준비해서 하나는 최초의 해시값을 얻을 때, 또 다른 하나는 해시 충돌이 일어났을 때 탐색 이동폭을 얻기 위해 사용한다.
      -> 최초 해시값이 같더라도 탐색 이동폭이 달라지고, 탐색 이동폭이 같더라도 최초 해시값이 달라져서 위의 문제들이 해결된다.
      -> 위의 두 방법들보다 연산 수행이 많다.
      
3. Resizing
  - 위의 두 방법으로도 효율성이 좋아지지 않는다면, 버킷의 개수를 확장해야 한다.
  - 더 큰 버킷을 가지는 배열을 새로 생성하여, 새로운 배열에 기존 데이터의 해시값을 다시 계산해서 복사한다.


### 자바스크립트로 해시 테이블 구현
```javascript
//  string 자료형의 key에 해당하는 공간에 string 자료형의 value를 집어넣은 것
const person = {};
person["firstName"] = "Kelly";
person["lastName"] = "Park";

// 1. Hash Table 생성

class HashTable {
  table = new Array(3);
  // 해시 테이블 사이즈에 바로 접근 할 수 있도록 변수 생성, setItem 할 때마다
  // numItem++되어 table에 들어있는 개수를 그때 그때 반영
  //  이 값을 활용하여, table의 길이 대비 현재 들어있는 값의 개수를 연산해 
  // 특정 수준 이상으로 값이 할당이 되면 table의 길이를 늘림
  numItems = 0;

  setItem = (key, value) => {
    this.numItems++;

    // table 원소 개수가 80%이상 차있는 경우 resize()
    const loadFactor = this.numItems / this.table.length;
    if (loadFactor >= 0.8) {
      this.resize();
    }

    const idx = hashStringToInt(key, this.table.length);
    if (this.table[idx]) {
      this.table[idx].push([key, value]);
    } else {
      this.table[idx] = [[key, value]];
    }
  };

  // 만약 배열의 크기를 3에서 6으로 두 배를 했다면, 그보다 큰 소수인 7을 새로운 table의 크기로 설정해주는 것이다.
  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach((item) => {
      if (item) {
        item.forEach(([key, value]) => {
          const idx = hashStringToInt(key, newTable.length);
          if (newTable[idx]) {
            newTable[idx].push([key, value]);
          } else {
            newTable[idx] = [[key, value]];
          }
        });
      }
    });
    this.table = newTable;
  };

  // getItem에서도 값을 가져오기 원하는 key를 해시 함수로 변환해서 table[3]의 값을 리턴하도록 한다.
  getItem = (key) => {
    const idx = hashStringToInt(key, this.table.length);
    // 값이 없는 경우 null;
    if (!this.table[idx]) return null;

    // 단순히 전체 table의 index로 접근 = O(1) but array.find를 사용하면 O(n)으로 증가함
    return this.table[idx].find((el) => el[0] === key)[1];
  };
}

// 2.  해시 함수(Hash Function)가 필요한 이유

function hashStringToInt(s, tableSize) {
  let hash = 17;
  // return 3; 항상 table[3] index 중복 해시 충돌 발생
  for (let i = 0; i < s.length; i++) {
    hash = (13 * hash * s.charCodeAt(i)) % tableSize;
  }
  return hash;
}
```

```javascript
// 생성자 함수 생성 new HashTable();
const myTable = new HashTable();
myTable.setItem("firstName", "Kelly");
console.log(myTable.table.length); // 3
console.log(myTable.getItem("firstName")); // Kelly

myTable.setItem("lastName", "Park");
console.log(myTable.table.length); // 3
console.log(myTable.getItem("lastName"));

myTable.setItem("age", 29);
console.log(myTable.table.length); // 6
console.log(myTable.getItem("age"));

myTable.setItem("birth", "2000-00-00");
console.log(myTable.table.length); // 6
console.log(myTable.getItem("birth"));
```
resize 함수로 배열 크기가 80%가 차면 새로운 배열을 만들어 주는 걸 볼 수 있다.

브루트 포스 (완전 탐색)으로는 시간 초과에 빠지는 문제에서 해시를 적용한다.
  

---
[참고]
[https://algoroot.tistory.com/56](https://algoroot.tistory.com/56)


