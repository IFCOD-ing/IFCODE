![main-image](readme-assets/mainImage.png)

<br>

# 💻  IF (CODE)

![Generic badge](https://img.shields.io/badge/version-0.1.0-green.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/e4b6f69b-eaaf-465e-8a50-218a405dca2f/deploy-status)](https://app.netlify.com/sites/easymemd/deploys)

`#CodeEditor` `#html #css #javascript` `#react`

---

html, css, javascript 프로그래밍 언어 사용해보신적 있나요??

**IF (CODE)** 를 통해 한번 html, css, javascript 그리고 외부 라이브러리를 통해 나만의 코드를 작성 해보시죠.

더 나아가 React까지 경험해 볼 수 있는 온라인 코드에디터, **IF(CODE)**

<br>

# 📖 Contents

# 💡 Motivation
평소에 jsbin, codepen, codesandbox 등등 다양한 코드에디터를 사용해보다가 나도 이런 코드에디터들을 어떻게 실행되는걸까?! 

EASYME.md를 통해 조금이라도 개발자들이 README를 작성하는데 겪는 불편함이 해소되길 바라는 마음으로 만들게 되었습니다.

<br>

# 🔗 Link

- [https://www.ifcode.online/](https://www.ifcode.online/)

<br>

# 🔍 Preview

![title](readme-assets/preview.gif)

<br>

# 🛠 Features
- File Tree Structure
    - 왼쪽 메뉴바에서 파일 구조를 구성 할 수 있습니다.
    - 각각 js, css, html 파일 생성 및 파일 이름 수정 그리고 삭제 할 수 있습니다.
    - 각 파일들을 폴더로 관리 할 수 있습니다. 해당 폴더도 생성, 이름 수정 삭제 할 수 있습니다.

- 외부 라이브러리 관리
    - 외부라이브러리는 CDN 주소를 입력하게 되면 해당 라이브러리를 사용할 수 있도록 디펜던시에 추가 됩니다.
    - skypack(https://www.skypack.dev/) CDN 이용

- 코드 편집기
    - 각 파일 구조에서 생성된 파일들을 클릭하면 각 파일들을 탭으로 관리되면 현재는 .js, .css, .html 파일 별로 코드 편집기에 해당 프로그래밍 언어로 스타일이 적용되어 있습니다.
    - .js 파일에서 다른 js 파일 import / export 하여 사용할 수 있고 디펜던시에 등록되어진 외부라이브러릴 가져와 사용 할 수 있습니다.
    - 해당 파일들을 모두 작성한 뒤에 run 버튼을 누르면 react는 정해진 진입점(entryPoint)가 있어 해다 파일부터 읽어 iframe를 사용하여 화면에 보여줍니다. 자바스크립트는 html 파일에 등록된 script 태그를 읽어 해당 코드를 실해하여 화면에 보여줍니다.
- 로그 터미널
  - console.log 를 보여주는 터미널 창입니다.

<br>

# ⚠️ Requirement

최신 Chrome Browser 사용을 권장합니다.

<br>

# ⚙️ Installation

## Client

```
git clone https://github.com/EASYME-md/client
cd client
npm install
npm start
```

<br>

# 🪛 Project Control

- Version Control: Git, Github
- Task Control: Notion, Figma

<br>

# 🚀 Deployment

- Client: Netlify

<br>

# 🧗 Challenges

2주 동안 기능 개발을 하면서 겪은 어려움 또는 도전은 아래와 같습니다.

<br>

## 1. javscript 파일, import / export

### 1) commonJS 모듈로 변환
사용자가 입력한 코드 import, export 구문은 선언문이여서 제가 직접적으로 해당 코드를 컨트롤 하기가 어려운점이 있어 파일 가져오기 / 내보내기를 같은 기능을 하는 require() 즉, 함수 실행문을 사용하는 commonJS 모듈로 trasnpile 하여 사용.

해당 코드를 transpile은 @babel/standardalone 라이브러리르 사용하여 transpile 하였습니다.
해당 라이브러리를 선택한 이유는 특정 자바스크립트 코드만 transpile 할 수 있기 때문에 선택 하였습니다.

1) src/index.js
- 변환전
```
  import a from "src/a.js";

  console.log(a);
```

- 변환후
```
  var _a = _interopRequireDefault(require("src/a.js"));

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  console.log(_a.default);
```

2) src/a.js
- 변환 전
```
  const a = 1;

  export default a;
```
- 변환 후
```
  Object.defineProperty(exports, "__esModule", { value: true });

  exports.default = void 0;

  var a = 1;
  var _default = a;

  exports.default = _default;
```

### 2) 자바스크립트 파일 모듈화
아래와 같이 각 js파일을 객체를 사용하여 파일에 대한 정보(경로, 파일이름) 및 작성된 코드 그리고 내보내기 되어진 값을 객체에 담는다.

작성된 코드를 func 함수에 다시 선언한 이유는 각 모듈(파일)은 함수 스코프에 가두어 각 파일마다의 스코프를 생성을 위해서이다.

그리고 브라우저에서는 commonJS 모듈을 사용 할 수 없기 때문에 func 함수의 매개변수로 선언되어진 require 함수를 매개변수로 전달한다.

```
  const modules = [
    {
      fileName: "src/a.js",
      func: function(require, exports) {
        var _a = _interopRequireDefault(require("src/a.js"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
      },
      exports: {},
    }
  ];
```

### 3) require 함수 및 exports (내보내기) 구현
```
  const modules = [
    {
      fileName: "src/index.js",
      func: function (require, exports) {
        "use strict";

        var _a = _interopRequireDefault(require("src/a.js"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        console.log(_a.default);
      },
      exports: {}
    },
    {
      fileName: "src/a.js",
      func: function (require, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });

        exports.default = void 0;

        var a = 1;
        var _default = a;

        exports.default = _default;
      },
      exports: {}
    }
  ];

  const require = function(file) {
    const module = modules.find(({ fileName }) => fileName === file);

    if (!module) {
      throw new Error('Can not find "' + file + '" file.');
    }

    module?.func(require, module.exports);
    return module.exports;
  };

  modules[0]?.func(require, module[0]?.exports);
```

배열로 선언된 의존성그래프에 따라서 각 모듈의 func 함수(js 파일 코드)가 실행될때 매개변수로 전달된 require 함수가 실행된다.

해당 파일의 require 함수 실행 과정은 아래와 같다.
1. require("src/a.js") 실행
2. 모듈로화된 의존성 그래프에 해당 file이 존재하면 해당 모듈을 반환한다.
3. fileName인 "src/a.js" 모듈의 func 함수를 실행한다. 해당 함수를 실행 할때
    require 함수와 해당 모듈 객체의 exports 프로퍼티를 전달한다.
4. 전달된 exports 프로퍼티 객체에 해당 파일에서 export 되어진 값들이 할당 된다. 
5. module.func 함수가 실행이 완료되면 각 모듈의 exports 프로퍼티에 내보내지는 값들이 할당 되어 있기 때문에 해당 exports 객체 자체가 require 함수의 반환 값이 된다. 

`정리`  
require 함수가 실행될때 해당 js 파일의 export 값들을 객체의 exports 객체의 할당 되기 때문에 해당 exports 프로퍼티를 반환을 하게 된다면 해당 파일의 내보진 값들을 사용 할 수 있습니다.

<br>

## 2. 외부 라이브러리 import
처음엔 외부 라이브러리를 구현하기 위해서 아래처럼 html 파일에서 script 태그와 CDN 링크를 통하여 구현 하려고 했습니다. 
```
<!DOCTYPE html>
<html>
  <head>
    ...
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
  </head>
  <body>
    ...
  </body>
</html>
```
위 처럼 구현 하게 된다면 아래처럼 import 구문 없이 바로 사용 할 수는 있지만 제게 계획한 require 함수 파일 모듈을 형태로 사용되어지는것이 아니고 import 구문 없이 아래처럼 사용 할 수는 있습니다. 
```
  ReactDom.render();
```

제가 계획했던것은 아래처럼 import 구문처럼 사용자가 사용할 수 있게 해주는 것이였습니다. 
```
  import React from "react";
```

그래서 skypack CDN 이라는 것을 찾게 되었습니다. 해당 CDN 형식은 import 구문을 활용하여 사용할 수 있었습니다. 
```
 import react from 'https://cdn.skypack.dev/react';
```

그래서 사용자가 'https://cdn.skypack.dev/react' CDN을 디펜던시에 추가 하게 된다면 key: react, value: "https://cdn.skypack.dev/react" 형태로 저장이 되어 import 시 "react" 이라면 "https://cdn.skypack.dev/react"로 맵핑하여 실행 되도록 구현 하였습니다. 

그런데 현재 모든 js 파일을 commonJS 형태로 변환하여 모듈화를 진행하였는데 skypack 공식문서를 찾아보니 아직 commonJS 모듈을 지원하지는 않고 es6 모듈만 지원 한다고 해서 외부 라이브러리만 require 모듈이 아닌 es6 모듈을 사용하도록 하나의 파일에서 분리하여 transpile 하였습니다.

외부 라이브러리(디펜던시)에 해당되면 es6모듈로 아니면 모두 require 구문으로 
```
...
  func: function(require, exports) {
    import React from "react";

    var _a = _interopRequireDefault(require("src/a.js"));

    (...생략...)
  }
...
```

`문제점`  
1. import 구문은 해당 파일에 가장 상단에 위치해야 하고 if문이나 함수 구문 즉, 블록에 내부에서는 선언될수는 없다. 

대응 방안: 해당 문제로 인하여 dynamic import("CDN")를 사용하여 구현 하기로 했다.

하지만 해당 방법도 문제가 있었습니다. 동정 import 구문은 promise를 반환한다는 것이다. 그것도 pending 상태로 그래서 await async 구문을 사용하여 해결을 하려고 했지만 동일한 결과가 나온것이다. 

`이유`  
동적 import 구문이 현재 아래처럼 script 태그 내부에서 실행 되게끔 구현되어 있는데 해당 script 태그의 모든 코드가 실행된 후에 import로 값을 가져온다는 점이였다. 
그래서 내가 import된 값을 필요한 시점은 모든 코드가 실행되기 전이기 때문에 항상 pending 상태였다.  
```
<script type="module"> 
 (여기서 실행)
</script>
```

`해결 방안`  
1. import 구문을 해당 script 태그 가장 상단으로 선언하고 해당 import된 값을 객체로 매핑하여 사용하자.

```
  <script type="module">
    import * as _qEsDLrP3ld from "https://cdn.skypack.dev/react";

    const info = {
      _qEsDLrP3ld,
    };

    const dependencies = [
      {
        fileName: "react",
        name: "_qEsDLrP3ld",
      }
    ];

    const require = function(file) {
      const dependency = dependencies.find(({ fileName }) => fileName === file);

      if (dependency) {
        if (info[dependency.name].default) {
          return info[dependency.name].default
        } else {
          return info[dependency.name]
        }
      }

      (..생략..)
    };
  </script>
```

해당 외부라이브러리도 js파일과 같이 의존성그래프를 만들어서 관리를 하였습니다.
그리고 import 시 와일드카드를 사용하여 해당 모든 반환된 값을 할당한다.

해당 변수는 "-" 하이폰 특수문자는 들어가서는 안되서 nanoid 라이브러리를 이용하여 커스텀한 변수 이름을 생성하여 관리를 하였고 해당 외부 라이브러리를 객체로 관리한다. 

이전에 선언한 require 함수에 디펜던시 부분을 추가하여 해당 디펜던시 객체이 해당 프로퍼티가 있다면 early return을 하여 외부 라이브러리 값을 return 을 하였습니다.

<br>

# 🙏 프로젝트 소감

이번 프로젝트인 코드에디터를 만들면서 htmlparser나 babel을 사용하여 각 코드를 구문분석하여 
관리도 해보았고 해당 구문 분석이라는 것을 한번더 알게 된 계기가 되었고 코드가 실행되는 흐름을 잘 파악하는 좋은 계기가 된것 같습니다. 

