## Part 2 - [Communicating with server](https://fullstackopen.com/en/part2)

### [b) Javascript](https://fullstackopen.com/en/part1/javascript)

JS types - [Boolean, Null, Undefined, Number, String, Symbol, and Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures).

#### Transpiling

브라우저들은 JS의 최신 feature 들을 100% 지원하지 못한다. 따라서 브라우저에서 돌아가는 많은 코드들은 더 오래된 호환 가능한 JS 버전으로 `transpile` 된다.  

Transpliling 하는 가장 대중적인 방법은 [Babel](https://babeljs.io/) 을 사용하는 것인데, create-react-app 으로 만들어진 React application 은 Transpilation 이 자동으로 configured 되어 있다. configuration 에 대해서는 이후 [part 7](https://fullstackopen.com/part7) 에서 더 자세히 다룰 것!

#### Array

Array 를 iterate 하는 법

```js
const t = [1, -1, 3]

t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3 are printed
})    
```

#### Functional Programming

Functional Programming 에서는 immutable data structure이 중요하다. immutable 한 객체를 통해 memoization, 그리고 객체의 속성을 다 비교하지 않고도 객체의 state 변화를 감지할 수 있기 때문! (마치 원시 type과 같이)

