---
title: "Webpack"
description: "Webpack이란"
date: "2023-06-23"
categories:
  - "Study"
  - "Javascript"
keywords:
  - "Javascript"
---
# Webpack

메모: 모듈 번들러

## 웹팩이란?

웹팩은 모듈 번들러로, 모듈 번들러는 JavaScript 모듈(JavaScript modules)을 브라우저에서 실행할 수 있는 단일 JavaScript 파일로 묶는 데 사용되는 도구이다.

module: 각 리소스 파일

bundle: 웹팩 실행 후에 나오는 결과 파일로 여러개의 모듈로 만들어진다

### 웹팩이 필요한 이유

```jsx
<html>
  <head>
        <script src="javascript_file_1.js" />
        <script src="javascript_file_2.js“ />
        // ...
        <script src="javascript_file_999.js" />
    </head>
// ...
</html>
```

하나의 html에 많은 자바스크립트 파일을 포함하는 경우, 계속 늘어나는 js 파일을 관리하기 힘들고, 실행 순수를 신경써야 하고, 기존에 생성된 전역 변수를 덮어쓰지 않도록 신경써야 한다.

Webpack을 사용하면 이러한 고민없이 여러가지 리소스를 전달하기 좋은 형태로 만들 수 있다.

## 웹팩 실행

```bash
mkdir webpack-init
cd webpack-init
npm init -y
npm install webpack webpack-cli
```

→ webpack-cli를 사용하면 CLI에서 웹팩을 실행 할 수 있다.

```jsx
// ./src/util.js
export function sayHello(name){
    console.log('hello', name);
}
```

```jsx
// ./src/index.js
import { sayHello } from './util';
function myFunc() {
    sayHello('mike');
    console.log('myFunc');
};
 
myFunc();
```

```bash
npm webpack //웹팩 실행
```

```
project
  ㄴdist
    ㄴmain.js
  ㄴnode_modules
  ㄴsrc
```

1. 웹팩을 실행하면 dist 폴더가 만들어지고 그 밑에 main.js 번들 파일이 생성된다.
2. index.js 모듈과 util.js 모듈이 main.js로 번들링 된다.
3. 별 다른 설정 없이 웹팩을 실행하면 ./src/index.js 모듈을 입력으로 받아서 ./dist/main.js 번들 파일을 생성한다.

### 설정 파일 이용

```jsx
//프로젝트 루트에 webpack.config.js 파일을 생성한다.
const path = require('path');
 
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production', //프로덕션 모드: 코드 압축을 포함한 여러 최적화 기능이 들어감
    optimization: {
        minimizer: [], //압축 X
    }
};
```

- entry : 웹팩으로 번들링 할 파일 지정
- output : 웹팩 실행으로 만들어지는 번들의 위치와 이름을 설정
- mode: 'production' : 프로덕션모드는 코드압축을 포함한 여러 최적화 기능이 들어감
- minimizer : [] : 압축을 하지않도록 설정하여 번들파일 ( 내용을 쉽게확인 하기 위해서 사용 )

### 웹팩이 생성한 번들 파일의 내용

```jsx
(function(modules) {  //번들 파일 전체가 즉시 실행함수로 묶여있다
   // -------------- 웹팩 런타임 코드 start ----------------
        var installedModules = {};
    function __webpack_require__(moduleId) {/*...*/}
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {/*...*/};
        __webpack_require__.r = function(exports) {/*...*/};
        __webpack_require__.t = function(value, mode) {/*...*/};
        __webpack_require__.n = function(module) {/*...*/};
        __webpack_require__.o = function(object, property) {/*...*/};
        __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 0);
   // -------------- 웹팩 런타임 코드 finish ----------------
 })
 ([
 (function(module, __webpack_exports__, __webpack_require__) {
  // -------------- 우리가 작성한 코드 start ----------------
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    function sayHello(name){
    console.log('hello',name);
    }
    function myFunc(){
    sayHello('mike');
    console.log('myFunc');
    };
    myFunc();
 })
   // -------------- 우리가 작성한 코드 finish ----------------
]);
```

1. 번들 파일 전체가 즉시 실행함수로 묶여있다
2. 웹팩 런타임 코드: 모듈을 관리, 설정파일(webpack.config.js)에서 entry 파일을 여러개 입력하면 각 entry에 의해 생성되는 번들 파일에는 웹팩 런타임 코드가 들어간다
3. 우리가 작성한 코드는 즉시 실행 함수의 매개변수로 입력된다
4. 전역 변수를 사용하는지, 어떤 모듈 시스템을 사용하는지의 여부에 따라 번들파일의 내용은 달라질 수 있다

### loader 사용하기

loader는 모듈을 입력으로 받아서 원하는 형태로 변환한 후 새로운 모듈이 출력해 주는 함수이다.

자바스크립트파일, 이미지 파일, css 파일, csv 파일 등 모든 파일은 모듈이 될 수 있다.

- babel-loader
    - loader 사용하는 프로젝트 생성 및 필요한 패키지 설치 방법
        
        ```bash
        mkdir webpack-loader
        cd webpack-loader
        npm init -y
        npm install webpack webpack-cli
         
        npm install babel-loader @babel/core @babel/preset-react react react-dom
        ```
        
        ⇒ jsx 문법으로 작성된 리액트 코드를 처리하기 위해 필요한 패키지들을 설치한다.
        
    - jsx 문법을 사용한 자바스크립트 코드
        
        ```jsx
        // ./babel.config.js
        const presets = ['@babel/prset-react'];
        module.exports = { presets };
        ```
        
        ⇒ 프로젝트 루트에 @babel/preset-react를 사용하도록 설정한다.
        
    - webpack.config.js
        
        ```jsx
        const path = require('path');
         
        module.exports = {
            entry: './src/index.js',
            output: {
                filename: 'main.js',
                path: path.resolve(__dirname, 'dist'),
            },
            module: {     
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: 'babel-loader',
                    },
                ],
            },         
            mode:"production",
        };
        ```
        
        1. js 확장자를 갖는 모듈은 babel-loader가 처리하도록 설정
        2. 웹팩 실행해보면 dist 폴더 및에 main.js 파일 생성
    
    ## 웹팩으로 파일 처리
    
    아래의 상태로 웹팩을 실행하면 CSS 모듈을 처리하는 로더가 없어서 에러가 발생하게 된다.
    
    ```jsx
    // ./src/App.css
    .container {
        border: 1px solid blue;
    }
    .title {
        color:red;
    }
    ```
    
    ```jsx
    // ./src/index.js
    import Style from './App.css'
    console.log({ Style });
    ```
    
    ## css 모듈을 처리하기 위한 로더 설치
    
    ```bash
    npm install css-loader
    ```
    
    - webpack.config.js 파일에 다음 코드 추가
        
        ```jsx
        module: {
                rules: [
                    //.... 기존 내용
                    {
                      test: /\.css$/,
                      use: 'css-loader',
                    },
                ],
            },
        //.. 기존 내용
        ```
        
        - css 확장자를 갖는 파일은 css-loader를 사용하도록 설정
        - 웹팩을 실행해보면 에러가 발생하지 않음
        - 하지만 index.html 파일을 브라우저에서 실행해보면 돔 요소의 스타일은 변경되지 않음
    - 스타일을 적용하기 위한 style-loader 설치
        
        ```bash
        npm install style-loader
        ```
        
        ```jsx
        // ./webpack.config.js
        module: {
                rules: [
                    //.... 기존 내용
                    {
                      test: /\.css$/,
                      use: ['style-loader', 'css-loader'],
                    },
                ],
            },
        //.. 기존 내용
        ```
        
        - 로더를 배열로 입력하면 오른쪽 로더부터 실행
        - style-loader는 css-loader가 생성한 css 데이터를 style 태그로 만들어서 번들파일이 브라우저에서 실행될 때 HTML head에 삽입
        - 번들파일이 실행되다가 에러가 발생하면 style태그가 삽입되지 않을 수 있다
    
    ### 기타 파일 처리하기
    
    1. 임의의 PNG 파일을 src 폴더 밑에 icon.png 로 저장
    2. src 폴더 밑에 data.txt 파일 만들고 아무 내용이나 입력
    3. src 폴더 밑에 data.json 파일 만들고 아무 내용이나 입력
    4. src 폴더 밑에 index.js에 아래 내용 추가
    
    ```json
    // ./src/data.json
    {
        "name": "ireh",
        "age": 26
    }
    ```
    
    ```jsx
    // ./src/index.js
    import Icon from './icon.png';
    import Json from './data.json';
    import Text from './data.txt';
     
    function App() {
        return (
            <div className="container">
                <h3 className="title">webpack example</h3>
                div>{`name: ${Json.name}, age:{Json.age}`}</div>
                <div>{`text: ${Text}`}</div>
                <img src={Icon} />
            </div>
        );
    }
    ReactDom.render(<App />, document.getElementById('root'));
    console.log({ Style });
    ```
    
    ⇒ JSON, TXT, PNG 모듈 사용
    
    JSON 모듈은 웹팩에서 기본적으로 처리해 주기 때문에 별도의 로더를 설치하지 않아도 된다.
    
    txt, png 모듈은 패키지를 설치해야 한다.
    
    `npm install file-loader raw-loader`
    
    1. file-loader는 모듈의 내용을 그대로 복사하여 dist 폴더 밑에 복사본을 생성한다.
    2. 모듈을 사용하는 쪽에는 해당 모듈의 경로를 넘겨준다.
    3. row-loader(txt 확장자 처리)는 모듈의 내용을 그래도 자바스크립트 코드로 가져온다.
    4. 웹팩 실행 후 dist 폴더에 생성된 이미지 파일의 이름에는 해시값이 포함되어 이미지 파이을 수정하는 경우에만 변경되기 때문에 브라우저의 캐싱 효과를 활용할 수 있다.
    
    ```jsx
    // ./webpack.config.js
    module: {
            rules: [
                //.... 기존 내용
                {
                    test: /\.(png|jpg|gif)$/,
                    use: 'file-loader',
                },
                {
                    test: /\.txt$/,
                    use: 'raw-loader',
                },
            ],
        },
    //.. 기존 내용
    ```
    
    ### 이미지 파일 요청 횟수 줄이기
    
    번들 파일에 이미지 파일이 포함되면 브라우저의 파일 요청 횟수를 줄일 수 있지만, 번들 파일이 너무 커지면 자바스크립트가 늦게 실행되므로 작은 이미지 파일만 포함시키는 것이 좋다.
    
    `npm install url-loader`
    
    ```jsx
    // ./webpack.config.js
    module: {
            rules: [
                //.... 기존 내용
                {
                    test: /\.(png|jpg|gif)$/,          
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                            }
    										}]
                },
            ],
        },
    //.. 기존 내용
    ```
    
    - url-loader는 파일 크기가 option.limit 값보다 작은 경우에만 번들 파일에 파일의 내용을 포함시킨다.
        
        → limit 값이 파일보다 크면 번들 파일인 main.js에 데이터가 입력된다.
        
    - 더 큰 경우에는 다른 로더가 처리할 수 있도록 fallback 함수를 제공한다.
    - fallback 함수를 입력하지 않으면 기본적으로 file-loader가 처리한다.
    
    ### 플러그인 사용
    
    로더는 특정 모듈에 대한 처리만 담당하고, 플러그인은 웹팩이 실행되는 전체 과정에 개입할 수 있다.
    
    ```jsx
    // ./webpack.config.js
    const path = require('path');
     
    module.exports = {
        entry: './src/index.js',
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test:/\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            preset: ['@babel/preset-react'],
                        },
                    },
                },
            ],
        },
        mode: 'production',
    };
    ```
    
    chunkhash를 사용하면 파일의 내용이 수정될 때마다 파일 이름이 변경되도록 할 수 있다.
    
    자바스크립트 모듈을 처리하도록 babel-loader를 설정한다.
    
- html-webpack-plugin
    - 웹팩을 실행해서 나오는 결과물을 확인하기 위해서 HTML 파일을 수동으로 작성해야 한다.
    - 위와 같이 설정하면. 번들 파일이 변경될 때마다 번들 파일의 이름이 변경되므로 HTML 파일의 내용도 수정해야 한다.
    
    ⇒ 이를 자동으로 해주는 플로그인이다.
    

`npm install clean-webpack-plugin html-webpack-pugin`

(clean-webpack-plugin은 웹팩을 실행할 때마다 dist 폴더를 정리해준다.

```jsx
//...
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
module.exports = {
// ...
plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './template/index.html',
        }),
    ],
// ...
```

- index.html 파일이 자동으로 생성되도록 html-webpack-plugin을 설정한다.
- 원하는 형태를 기반으로 index.html 파일이 생성되도록 template 옵션을 설정한다.
    
    (프로젝트 루트에 template/index.html 생성해줘야한다.)
    
    → 필요한 태그를 이 파일에 추가하면 html-webpack-plugin이 생성하는 새로운 HTML 파일에 같이 포함된다. 웹팩을 실행하면 dist 폴더 밑에 index.html 파일이 생성된다.
    

## 번들 파일 최적화

### Tree Shaking

: 필요 없는 코드들을 제거해주어 번들 파일의 크기나 번들링의 시간을 줄여주는 작업

기본적으로 웹팩에서 불필요한 코드를 제거해 주는 기능을 제공하지만, 제대로 동작하지 않을 수 있다.

이 때, tree shaking를 잘 이해하고 있어야 번들 파일 크기를 최소로 유지한다.

- tree shaking이 동작하지 않는 경우
    - 사용하는 모듈이 ESM(ECMAScript Modules)이 아닌 경우
    - 동적 임포트(Dynamic import) 를 사용하는 경우

외부 패키지에 대해서도 tree shaking이 적용되나, 외부 패키지는 다양한 방식의 모듈 시스템을 사용하기 때문에 제대로 동작하지 않을 수 있다.

## 코드 분할

어플리케이션의 전체 코드를 하나의 번들 파일로 만드는 것은 렌더링이 오래 걸리고, 응답시간을 최소화할 수 있다.

⇒ 코드 분할하는 가장 직관적인 방법은 웹팩의 entry 설정값에 페이지별로 입력하는 것이다.

```jsx
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
 
module.exports = {
    entry: {
        page1: './src/index1.js',
        page2: './src/index2.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dis'),
    },
    plugins : [new CleanWebpackPlugin()],
    mode: 'production',
};
```

- 각 페이지의 자바스크립트 파일을 entry로 입력한다
- dist 폴더를 정리하기 위해 clean-webpack-plugin을 사용한다
    
    웹팩을 실행하면 dist/page1.js dist/page2.js 두파일이 생성된다
    
- 하지만 두 파일 모두 같은 내용을 포함하고 있기 때문에 둘다 가지고 있는것은 비효율적

### SplitChunks Plugin

웹팩에서는 코드 분할을 위해 기본적으로 SplitChunksPlugin을 ㄴ장하고 있다.

별도의 패키지 설치 없이 설정파일을 수정하여 코드 분할을 할 수 있다.

```jsx
//...
entry: {
            page1: './src/index1.js',
},
//...
optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'vendor',
        },
    },
//...
```

- optimization의 splitChunks속성을 이용하면 코드를 분할할 수 있다.
- chunks 속성의 기본값은 동적 임포트만 분할하는 async, 동적임포트가 아니더라도 코드가 분할되도록 all로 설정한다.
- 웹팩을 빌드하면
    - **로다시와 리액트 모듈은 vendor.js파일로 만들어진다**
    - add함수를 가지고 있는 **util.js 모듈은 파일의 크기가 작기 때문에 page1.js 파일에 포함된다**
- SplitChunk의 속성
    - async : 동적 임포트만 코드를 분할하도록 설정되어 있다
    - 30000 : 파일크기가 30kb 이상인 모듈만 분할 대상으로 한다
    - minChunks: 1 : 한개 이상의 chunk에 포함되어 있어야 한다
        - chunk : 웹팩에서 내부적으로 사용되는 용어인데 대개 번들파일이라고 이해해도 괜찮다
    - cacheGroups : 파일분할은 그룹별로 이루어진다
        - 기본적으로 vendor(외부모듈)과 default(내부모듈) 두 그룹으로 설정되어 있다
        - vendor(외부모듈)은 내부모듈보다 비교적 낮은 비율로 코드가 변경되기 때문에 브라우저에 오래 캐싱될 수 있다는 장점이 있다
        - default(내부모듈)은 두개이상의 번들파일에 포함되어야 분할 된다
    
    → 리액트 패키지는 별도록 불할되도록 설정한다. 
    
    ```jsx
    cacheGroups:{
                    vendors: {
                      test: /[\\/]node_modules[\\/]/,
                      priority: 1,
                      name: 'vendors',
                    },
                    reactBundle: {
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        priority: 2,
                        name: 'react.bundle',
                        minSize: 100,
                    },
                },
    ```
    

### 동적 임포트

: 동적으로 모듈을 가져올 수 있는 기능

웹팩에서 동적 임포트를 사용하면 해당 모듈의 코드는 자동으로 분할된다.

utils.js, lodash를 동적으로 임포트해서 사용하는 index3.js

```jsx
function myFunc() {
    import('./util').then(({ add }) =>
        import('lodash').then(({ default: _ }) =>
            console.log('value', _.fill([1, 2, 3], add(10,20))),
        ),
    );
}
myFunc();
```

→ import 함수롤 사용하여 동적으로 모듈을 가져오고, import 함수는 프로미스 객체를 반환하기 때문에 then 메서드로 연결할 수 있다.

```jsx
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
module.exports = {
    entry: {
        page3: './src/index3.js', //index3.js 파일의 번들링을 위해
    },
    output: {
        filename: '[name].js',
        chukFilename: '[name].chunk.js'
        path: path.resolve(__dirname, 'dist'),
    },
    plugins : [new CleanWebpackPlugin()],
    mode: 'production',
};
```

- chunkFilename 속성을 이용해서 동적 임포트로 만들어지는 번들파일의 이름을 설정한다
- 웹팩을 실행하면 page3.js, 1.chunk.js, 2.chunk.js 세 파일이 생성된다
- 1.chunk.js 파일에는 util.js 모듈의 코드가 들어가고
- 2.chunk.js 파일에는 로다시 모듈의 코드가 들어간다
    - 근데 거꾸로 들어감
- 웹팩 런타임 코드는 page3.js 파일에만 들어 간다

### Prefetch, Preload

- Prefetch : 가까운 미래에 필요한 파일이라고 브라우저에게 알려주는 기능이다.
    - prepatch로 설정된 파일은 브라우저가 바쁘지 않을 때 미리 다운로드 된다.
    - prefetch는 lazy loading의 단점을 보완한다.
- Preload : 지금 당장 필요한 파일이라고 브라우저에게 알려주는 기능
    - HTML에서 preload로 설정된 파일은 첫 페이지 로딩 시 즉시 다운로드 된다.
    - preload를 남발하면 첫 페이지 로딩 속도에 부정적인 영향을 줄 수 있다.

```jsx
async function myFunc() {
    const [{ add }, { default: _ }] = await Promise.all([
        import(/* webpackPreload: true */ './util'),
        import(/* webpackPrefetch: true */ 'lodash'),
    ]);
    console.log('value', _.fill([1, 2, 3], add(30, 20)));
}
myFunc();
```

1. chunk.js : 'lodash'
2. chunks.js : './util'

로 분할 되어 있다. 웹팩을 실행하면,

- chunk.js 파일은 prefetch가 적용됨
- link 태그는 page3.js 파일이 실행되면서 웹팩에 의해서 삽입된다
- script 태그는 myFunc 함수가 실행될 때 웹팩에 의해서 삽입된다
- 따라서 script 태그보다 link 태그가 먼저 삽입된다
---

