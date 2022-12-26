git repository 설정 방법

1. git init

- 폴더 생성 후 사용하고자 하는 폴더에 git init명령어를 이용하여 git 저장소 초기화

2. repository 생성

- 사용할 git 저장소 생성

3. git remote add <name> <url>

- url으로 원격 저장소를 등록한다.
- git remote add origin <url> <- origin이 원격 저장소로 등록된다.

npm init

- package.json 설정 도와주는 npm 명령어
- 터미널에 따라 입력하면 된다.

node_modules

- npm으로 설치한 모든 패키지가 저장된다.

express

- npm i express
- express를 다운로드 받으며 express의 package.json의 dependencies도 다운로드 받는다.
- 즉, 의존하고 있는 패키지까지 모두 다운로드한다.

npm install

- dependencies에 필요한 패키지를 자동으로 다운로드한다.

dependencies

- 프로젝트를 구동시키기 위해 필요한 모듈들

devDependencies

- 개발자에게 필요한 모듈들

package-lock.json

- 패키지들을 안전하게 관리한다.
- 패키지가 수정 됐는지 해시값으로 체크한다.

.gitignore

- git이 형상관리하지 않을 파일(즉, 깃에 올리지 않을 파일)을 설정한다.
- /올리지 않을 파일 명 으로 사용한다.

babel

- 최신 JS 코드를 구형 JS 코드로 변환한다.
- npm install --save-dev @babel/core
- --save-dev <- dependencies가 아닌 devDependencies에 저장한다.

babel 사용법

1. 다운로드

- npm install --save-dev @babel/core

2. 바벨 설정 파일 생성

- babel.config.json이름으로 생성

3. 생성한 babel.config.json 파일에 설정 코드 입력

- {"presets" : ["@babel/preset-env"]}

4. preset 플러그인 다운로드

- npm i @bable/preset-env --save-dev
- preset은 babel을 위한 플러그인이다.

5. babel을 사용하기 위한 node 설치

- npm install @babel/node --save-dev

6. babel을 사용하기 위해 package.json의 scripts에서 babel 설정

- "scripts":{
  "dev" : "babel-node index.js"
  }
- index.js를 실행할 때 babel-node도 같이 적용되서 실행된다.

nodemon

- 작성한 파일이 수정되는지 감시해주는 패키지
- 파일이 수정되면 nodemon이 자동으로 재시작한다.

nodemon 사용법

1. nodemon 다운로드

- npm install nodemon --save-dev

2. nodemon을 사용하기 위해 package.json의 scripts에서 nodemon 설정

- "scripts":{
  "dev" : "nodemon --exec babel-node index.js"
  }
- 파일이 수정되면 nodemon이 자동으로 index.js 파일을 재시작한다.

src 폴더

- 코드와 로직을 가지고 있는 파일을 넣어둔다.

express 생성법

- import express from "express";
- const app = express(); // app은 변수 이름으로 무엇이 오든 상관없다.
  // express()를 사용하면 express application을 생성한다.
  서버는 항상 request(요청)를 listening하고있다.
  app.listen(port,callback function[서버가 시작될 때 작동하는 callback function]) // app <- express server는 항상 request를 listening 하고 있다.

app.get("/", callback)
// 누군가 /로 get request를 보낸다면 callback을 실행한다.

3.2 ~ 3.3
server로 request를 보내면 response를 해줘야한다.
즉, request를 받았으면 response를 return 해야한다.

app.get("/", (req, res) => console.log("hi"))
// Home으로 get request가 오면, express는 request, response Object를 넣어준다.

response방법

1. return res.end() <- response 연결을 종료한다.
2. return res.send("message") <- response 창에 message를 출력한 후 연결을 종료한다.

3.5
Middleware(Controller)에는 3가지 argument가 있다.
(request, response, next)

- next는 동작이 끝난 후 다음 함수를 실행한다.
  const gossipMiddleware = (req, res, next) => {
  console.log("I'm in the middle!");
  next();
  };
  const handleHome = (req, res, next) => {
  return res.end();
  }
  app.get("/", gossipMiddleware, handleHome);
  즉, 모든 controller는 middleware가 될 수 있다.
  즉, controller가 next함수를 호출한다 = middleware || controller에서 함수를 return해버리면 controller

  3.6
  app.use

- global Middleware
- 어느 URL에도 작동하는 middleware

항상 global Middleware가 먼저오고 그 다음 normal middleware가 와야한다.
즉, app.use가 먼저, app.get이 나중에 온다.

3.10

- 관습적으로, 응답을 해주는 마지막 controller에는 next argument를 사용하지 않는다.

  3.11
  morgan

- node.js용 request logger middleware이다.
- morgan은 좀 더 정교한 middleware이다.
  morgan사용법

1. 다운로드

- npm i morgan

2. morgan 함수 호출(app.use()사용하여 morgan 호출)
   import morgan from"morgan";
   app.use(morgan())

- morgan 안에는 5가지 옵션이 있다.(combined, common, dev, short, tiny)
- morgan은 middleware를 return해준다.

  4.2
  Router.get

- const globalRouter = express.Router();
- const handleHome = (req, res) => res.send("Home");
- globalRouter.get("/", handleHome);
- app.use("/", globalRouter);

1. globalRouter라는 이름의 router생성
2. /로 접근할 때 globalRouter에 있는 컨트롤러를 찾는다.(globalRouter는 /라는 url을 갖고 있다.)
3. glboalRouter가 /로 접근할 떄 handleHome 미들웨어를 실행한다.
4. handleHome middleware로 인하여 Home가 출력된다.

4.3
export default 변수명(상수명)

- 변수 or 상루를 export 하여 다른 파일에서 import하여 사용할 수 있도록 설정한다.
- 즉, export default globalRouter
- globalRouter를 export 하고 다른 파일에서 import globalRouter from "globalRouter가 존재하는 파일 위치"를 작성하면 import한 파일에서 globalRouter를 사용할 수 있다.
- export default는 단 하나의 변수 or 상수만 export할 수 있다.

export const(let) 변수명

- export default는 하나의 파일에서 하나의 변수 or 상수만 export할 수 있다.
- 즉, 여러개의 변수 or 상수를 export하기 위해서는 export하고자 하는 const(let) 앞에 export를 붙인다.
- import 할 때는 object를 열어서 import한다.

- userController.js 파일
- export const join = (req, res) => res.send("Join");
- globalRouter.js 파일에서 userController.js 파일의 join을 import 할 때
- import {join} from "join 상수가 위치하는 경로";

- export default로 export한 변수 or 상수를 import 할 때는 원하는 이름으로 import 할 수 있다.
- export const(let)으로 export한 변수 or 상수는 export할 때의 변수명과 같은 이름으로 사용해야 한다.

globalRouter의 controller를 분리시키지 않는 이유

- globalRouter는 단순히 URL을 정리하는 기능만 수행한다
- 즉, globalRouter는 controller를 사용하지 않는다.

  4.7
  URL parameter

- videoRouter.get("/:id", see);
- :id처럼 :가 붙으면 파라미터이다.
- :가 없으면 text로 인식한다.
- 파라미터를 사용하면 url안에 변수를 포함시킬 수 있다.
- 파라미터를 지정하면 request의 params에서 지정한 파라미터를 확인할 수 있다.
- 즉, localhost:4000/videos/1234 URL로 이동 시 request.params에서 {id:"1234"}를 얻을 수 있다.

- videoRouter.js 파일에서 upload 밑에 :id를 둔 이유
- :id 라우터 밑에 upload 라우터가 있다고 가정하면
- /videos/upload URL로 이동할 시 upload를 변수로 인식한다.
- 즉, upload 라우터가 아닌 :id 라우터가 작동한다.
- 그렇기에 parameter를 사용하는 :id 라우터는 uplaod 라우터보다 밑에 둔다.

  4.8
  Regular Expression[정규식]

- 문자열로부터 특정 정보를 추출해내는 방법이다.

정규식 테스트 사이트

- https://www.regexpal.com
  Express Routing(정규식 표현) 사이트
- https://expressjs.com/en/guide/routing.html (영문)
- https://expressjs.com/ko/guide/routing.html (한글)
  videoRouter.get("/:id(\\d+)", see);
- videoRouter를 사용할 때 id 파라미터는 숫자만 허용한다.
- 즉, /upload 라우터와 /:id(\\d+)라우터의 순서를 신경쓸 필요가 없다.
- /:id(\\d+)로 사용한 이유는 파라미터에 id란 이름을 붙이기 위해서이다.
- 즉, /(\\d+)로 작동 한다.

  5.0 ~ 5.1
  PUG

- HTML Template Engine
- 모든건 소문자로 작성하고, 속성이 있다면 괄호안에 작성한다.
- 자식은 부모속성보다 안쪽에 있어야 한다.(들여쓰기)

PUG Document

- https://pugjs.org/language/inheritance.html

  PUG 사용법

1. 다운로드

- npm i pug

2. express에게 HTML Template Engine을 PUG로 사용하겠다고 명시(server.js 파일에서 뷰 엔진 설정(view engine))

- app.set("view engien", "pug");

3. express는 기본적으로 /views 폴더에서 뷰를 찾는다. 즉, /views 폴더 아래의 PUG파일을 생성한다.

4. express는 기본적으로 현재 작업 디렉토리에서 /views라는 디렉토리를 찾는다.

- package.json이 서버를 실행시킬 때(어디서 노드를 호출하는지 즉, node.js를 실행시키는 위치) package.json의 위치가 현재디렉토리이다.
- 즉, package.json은 src 밖에 존재하므로 views 디렉토리의 위치는 cwd(현재 디렉토리)/views이다.(실제 파일은 cwd/src/views)이다.
- 현재 서버는 src폴더 밖에서 실행하기에 express가 디렉토리를 찾기위한 경로를 바꿔줘야한다.
- app.set("views", process.cwd() + "/src/views");

  Controller에서 PUG 접근 방법

- res.end() or res.send() 대신 res.render()을 사용한다.
- res.render("view 이름") -> view 이름은 render할 PUG파일의 이름을 의미한다.

  5.2
  PUG에서 변수 사용하는 방법(PUG에서 자바스크립트 사용하는 방법)

- #{}
- EX) 현재 년도 출력 #{new Date().getFullYear()}}

partials 폴더

- 각 PUG파일마다 공통으로 사용되는(header, footer 등) 코드를 넣어서 관리한다.
- partials폴더의 파일을 PUG파일에 추가하는 방법(include PUG파일 경로)
- ex) watch.pug파일에 footer.pug 파일을 추가할 때(경로는 watch.pug파일을 기준으로 하는 상대경로이다.)
- include partials/footer.pug

  5.3
  HTML Extending(PUG Extending)

- HTML 확장

HTML Extending 방법

1. 기본이 되는 HTML 파일 작성
2. 확장받을 파일에서 extends한다.

- ex)
- 기본파일 = base.pug, 확장받을 파일 = watch.pug
- watch.pug에서 extends base.pug 작성

HTML 확장 시 content 추가 방법

- base.pug 파일에서 변경될 부분을 block content(변수명) 으로 작성한다.
- 즉, base.pug파일에 content를 위한 공간이 생성된다.
- 그 후, 확장받을 파일에 가서 block content를 작성하고
- 들여쓰기 후 내용을 작성한다.
  ex) base.pug파일을 확장하는 home.pug파일
- block content
- 들여쓰기 h1 Home!

- 확장할 때 block의 이름을 content로 지정했다면, 확장받는 HTML 파일의 block 이름도 content로 서로 같아야 한다.

  5.4
  Controller에서 템플릿으로 변수를 보내는 방법

- res.render("home", {변수명 : "변수 값"})
- 이렇게 home파일에 변수값을 전달할 수 있다.
- home 파일에서는 전달받은 변수값을 #{}(자바스크립트 코드 이용하는 방식)를 이용하여 전달받은 변수 값을 사용할 수 있다.
- home파일은 base.pug파일을 확장하기에 base.pug파일에서 #{}를 이용하여 변수명을 사용한다.
- 변수를 여러개 전달할 수있다.
- {tomato: "tomato", kimch : "kimch"}

  5.6
  MVP styles

- 간단하게 CSS를 적용시킬 수 있다.
- base.pug 파일에 적용시켜야 한다.
- link(rel="stylesheet" href="https://unpkg.com/mvp.css")
