## Part 1 - [Introduction to React](https://fullstackopen.com/en/part1)

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

따라서 기존 배열은 변하지 않고 새로운 배열이 반환되는 `push` 보다는 `concat` , `splice` 보다는 `slice`가 권장된다.

 `map`, `reduce` , `filter` 과 같은 [배열 메소드](https://bblog.tistory.com/300)도 다 새로운 배열을 반환.

  ⚠️  mutating state directly is forbidden in React - since it can result in unexpected side effects

### C) [Component state, event handlers](https://fullstackopen.com/en/part1/component_state_event_handlers)

#### Event Handling

Event Handling 을 위한 event handler 은 function call 이 아닌, **function** (or a reference to a function) 이어야 한다.
아래 코드는 infinite re-render을 발생시킨다.

🚫

```react
const App = (props) => {
  const [ counter, setCounter ] = useState(0)
	{/* setToValue 는 즉시 setCounter(value) 를 리턴한다 */}
  const setToValue = (value) => setCounter(value)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={setToValue(counter + 1)}>
        plus
      </button>
      <button onClick={setToValue(0)}>
        zero
      </button>
    </div>
  )
}
```

render 할 때마다 setToValue function call 실행 > re render > 다시 실행.... 무한반복!

Handler을 함수 표현식으로 변수에 따로 지정해서 지정해주던가, 아래처럼 **익명 함수**로 바꿔줘야 한다.

✅

```react
const App = (props) => {
  const [ counter, setCounter ] = useState(0)

  const setToValue = (value) => setCounter(value)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setToValue(counter + 1)}>
        plus
      </button>
      <button onClick={() => setToValue(0)}>
        zero
      </button>
    </div>
  )
}
```

혹은 아래처럼 **함수를 리턴하는 함수**로 핸들러를 정의해 줄 수도 있다.

```react
const App = (props) => {
  const [ counter, setCounter ] = useState(0)
	{/* 함수를 리턴하는 함수! */}
  const setToValue = (value) => {
    return () => {
      setCounter(value)
    }
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={setToValue(counter + 1)}>
        plus
      </button>
      <button onClick={setToValue(0)}>
        zero
      </button>
    </div>
  )
}
```

짧게 쓰면 아래처럼 쓸 수도! (double arrow function)

```react
const setToValue = (value) => () => setCounter(value)
```

첫번째 함수 setToValue는 parameter을 정의해 두번째 함수 setCounter을 configure 하기 위해 쓰인다. 최종 결과를 얻기 위해 2번의 function call 이 이루어지는것! 

✨ **[tip]** 이런 function을 return하는 function은 parameter로 customized 되는 generic functionality를 정의하는데 활용할 수 있다. 두번째 함수를 configure 할 때 파라미터를 각각 다르게 넘겨줌으로써, 마치 첫번째 함수가 customized event handler을 만드는 **factory**와 같은 역할을 하게 되는 것.

### D) A more complex state, debugging React apps

#### Rules of Hooks

- Hooks는 언제나 React component 를 정의하는 function body 안에서만 called 되어야 한다. 
- *useState* function (as well as the *useEffect* function) 은 *must **not** be called* from inside of a loop, a conditional expression, or any place that is not a function defining a component.
- 왜냐면 hooks는 언제나 같은 order 로 called 되어야 하기 때문이다. (if this isn't the case the application will behave erratically)

```react
const App = (props) => {
  // 올바른 사용법
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // Conditional expression 안에서는 X!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // For loop 안에서도 X!
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // React FC 안이 아니니까 X!
    const [x, setX] = useState(-1000)
  }

  return (
  )
}
```

#### Event Handlers 복습

##### Event handler should be function, not a function call

event handler 은 반드시 항상 **function** (or a reference to a function) 이어야 한다.

```react
<button onClick={console.log('clicked the button')}>
  button
</button>
```

위 코드를 보면, 첫 렌더링 때 한번 console.log가 찍히고 그 이후로는 실행되지 않는다. 왜일까? 🤔

그 이유는, event handler 는 **function 이 return** 하는 값에 assign 되기 때문이다! *console.log* 가 return 하는 값은 undefined 이기에 button을 눌러도 아무 일도 일어나지 않는 것.

처음 1번 console.log가 찍히는 이유는 console.log function call 이 component render 시 한번 실행되기 때문.

```react
<button onClick={() => console.log('clicked the button')}>
  button
</button>
```

위처럼 arrow function 문법을 이용해 핸들러를 수정하면 버튼을 클릭할 때마다 console.log가 찍힌다.

Component render 시에는 어떠한 function call도 일어나지 않는 대신, arrow function의 reference가 event handler 에게 assign 된다. 따라서 이후 button 을 클릭했을때 arrow function이 실행되는 것! :)

##### Avoid defining event handlers directly in the attribute of the component

Event handler을 component에게 바로 속성으로 전달하기보단, 따로 관리하기.

```react
const App = (props) => {
  const [value, setValue] = useState(10)
  {/* handleClick은 reference to the function에 assigned 되었고 */}
  const handleClick = () => {
    console.log('clicked the button')
    setValue(0)
  }

  return (
    <div>
      {value}
      {/* 이 reference가 onClick attribute로 button에게 passed 됨 */}
      <button onClick={handleClick}>button</button>
    </div>
  )
}
```

##### function call that returns function as event handlers

```react
const App = (props) => {
  const [value, setValue] = useState(10)
  // who para를 받아 customized된 function을 return하는 function
  const hello = (who) => () => console.log('hello', who)
  return (
    <div>
      {value}
      {/* 하나의 hello handler이지만 마치 customized 된 handler처럼 사용*/}
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}
```

물론 궂이 위처럼 사용하지 않고도 arrow function을  통해 customize 가능하다.

```react
const App = (props) => {
  const [value, setValue] = useState(10)
  // 일반적인 handler 함수
  const hello = (who) => console.log('hello', who)
  return (
    <div>
      {value}
      {/* arrow function 사용해서 정의하고 파라미터 넘겨주기 */}
      <button onClick={() => hello('world')}>button</button>
      <button onClick={() => hello('react')}>button</button>
      <button onClick={() => hello('function')}>button</button>
    </div>
  )
}
```

그냥 취향에 따라 선택해서 사용하면 됨.

#####  Never define components inside of other components

컴포넌트 안에 컴포넌트를 선언하지 말 것. 아무런 이점이 없고 불필요한 오류들을 발생시킬 수 있다.
한 파일 내에 여러개의 컴포넌트를 정의한다면, 병렬적으로 선언하기!

