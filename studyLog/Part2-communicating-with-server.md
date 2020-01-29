## Part 2 - [Communicating with server](https://fullstackopen.com/en/part2)

---

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

---

### [c) getting data from server](https://fullstackopen.com/en/part2/getting_data_from_server)

```react
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [countries, setCountries] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("");
    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then(response => {
            console.log("fetching....");
            setCountries(response.data);
        });
    }, []);
    useEffect(() => {
        console.log(countries);
    }, [countries]);
    useEffect(() => {
        setFilter(inputValue);
    }, [inputValue]);
    const inputChangeHandler = event => {
        setInputValue(event.target.value);
    };
    console.log(filter, inputValue);
    return (
        <div>
            <h2>Country Data</h2>
            Find countries:
            <input value={inputValue} onChange={inputChangeHandler} />
        </div>
    );
}

export default App;

```

####  🤔 Q1. 

Handler 하나에 여러개의 setState 를 넣으면 제대로 동작을 안하대...?

```react
    const inputChangeHandler = event => {
        setInputValue(event.target.value);
      	setFilter(inputValue)
    };

    console.log(filter, inputValue);
```

이케 해보면 filter이 제대로 반영이 안된다.

setFilter이 inputValue에 dependent 해서 그런 듯 한데...

#### 🤔 Q2.

Fetch 되기 전 component가 render 되는 문제. (component에 fetch된 data에 dependent한 내용이 있을 경우)
지금은 WeatherData를 별개의 component로 빼고, 상위 component인 CountryData에서 먼저 weatherData를 fetch 해온 뒤 이를 state에 저장한 후 WeatherData에게 전달해주는 식으로 해결.

#### Hiding API Keys

1) HTML 에서 안전하게 API Key를 숨기는 방법 - API KEY 사용에 restriction 걸기

Google cloud나 AWS에서는 특정 URL에서만 API를 쓰도록, 혹은 하루에 일정 횟수만 사용할 수 있도록 API KEY에 제한을 걸 수 있다.

2) React App 에서 안전하게 API Key를 숨기는 방법 - **.env** 파일을 이용한다!

1. root directory에 .env 파일 작성

```react
// create-react-app이 해당 환경변수를 identify 하기위해 반드시 REACT_APP_ 이라는 prefix를 붙여야 함
REACT_APP_API_KEY= something
```

2. gitignore에 .env 추가

```
// .gitignore

# api keys
.env       <-- 요기 추가

# dependencies
/node_modules
...
```

3. `process.env` 객체를 통해 API 키에 접근

```react
const api_key: process.env.REACT_APP_API_KEY
```

#### axios get request 시 parameter 보내기

```react
axios.get('/fetch-url', {
    params: {
      ID: 12345;
      query: something; // 이렇게 parameter을 보낼 수 있다
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  
```

---

### [d) Altering data in server](https://fullstackopen.com/en/part2/altering_data_in_server)

```react
axios
  .get('http://example.com/probably_will_fail')
  .then(response => {
    console.log('success!')
 
  })
```

#### REST API - HTTP PUT/POST/PATCH request의 차이 [참고 링크](https://1ambda.github.io/javascripts/rest-api-put-vs-post/)

HTTP API 중 헷갈리는 POST, PUT, PATCH의 차이를 알아보자.
가장 중요한 키워드는 `멱등의` (idempotent), 즉 몇 번이고 같은 연산을 반복해도 같은 값이 나오는 것 *f(x) = f(f(x))*

**POST** 
클라이언트가 **리소스의 위치를 지정하지 않았을 때**, 리소스를 새롭게 생성하기 위한 연산

```react
OST /dogs HTTP/1.1
{ "name": "blue", "age": 5 }
HTTP/1.1 201 Created
```

위 연산은 반복적으로 수행했을 때,  첫번째는 `/dogs/2` 에 생기고, 그 다음번엔 `/dogs/3` 등 매번 다른곳에 새로운 리소스가 생성될 수 있으므로 **idempotent 하지 않다**.

**PUT** 
클라이언트가 **리소스의 위치를 명확하게 지정했을 때**, 리소스를 **새롭게 생성** 또는 **업데이트**하기 위한 연산

```react
PUT /dogs/3 HTTP/1.1
{ "name": "blue", "age": 5 } // property는 name과 age 뿐이라고 가정
```

위 연산은 반복적으로 수행했을 때,  몇 번을 수행하더라도 항상 같은 결과를 보장하므로 **idempotent 하다**.

**PATCH**
PUT이 특정 리소스의 모든 프로퍼티를 업데이트 (=replace) 하기 위해 사용된다면, PATCH는 특정 리소스의 **일부분만을 업데이트** 하고 싶을 때 사용한다. PATCH 역시 PUT처럼 클라이언트가 **리소스의 위치를 명확하게 지정**할 때 사용한다.

[정리]

(1) **POST** to a URL **creates a child resource** at a **server defined** URL
([RFC 2616 POST](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5))
(2) **PUT** to a URL **create/replaces the resource** in is entirely at the **client defined** URL
([RFC 2616 PUT](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.6))
(3) **PATCH** to a URL **updates part of the resource** at that **client defined** URL
([RFC 5789: Patch Method for HTTP](http://tools.ietf.org/html/rfc5789))

