Express request, response Docs

- https://expressjs.com/en/4x/api.html#req

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

  5.7
  h1=pageTitle

- h1태그에 pageTitle(변수)를 삽입한다.
- 변수를 #{pageTitle}형식으로 사용해도 같지만, #{pageTitle}은 다른 Text들과 같이 사용할 때 사용한다.
- 즉, 변수 하나만 사용할 경우 h1=pageTitle로 사용해도 된다.

  conditionals

- 조건문(if else)
  conditionals 사용법
  if 조건
  띄어쓰기 태그
  else if
  띄어쓰기 태그
  else
  띄어쓰기 태그

  5.8
  Iteration

  - 반복문
  - Controller에서 배열을 변수로 전달했을 경우 배열 사용법(Controller에서 videos라는 배열 전달)
  - ul
    띄어쓰기 each video in videos
    띄어쓰기 띄어쓰기 li=video
  - 전달받은 videos배열에서 각 요소를 video로 사용한다.
  - 즉, videos 배열에는 1,2,3,4,5,6,7,8,9,10이 들어있다면
  - 첫 번째 반복 시 video는 1, 두 번째 반복시 video는 2 ... 이다. 즉, video는 element이다.
  - 즉, video는 반복상의 현재 값이다.
  - 전달받은 배열 videos는 Controller가 전달하는 배열과 이름이 같아야 한다.
  - 배열 안에 아무값도 존재하지 않는다면. else문 사용이 가능하다.
  - each video in videos
    띄어쓰기 li=video
    else
    띄어쓰기 li Sorry nothing found.

Pug Iteration Docs

- https://pugjs.org/language/iteration.html

  5.9
  mixin

- 데이터를 받을 수 있는 partial
- 즉, 데이터를 받을 수 있는 일종의 미리 만들어진 HTML block
- partial과 마찬가지로 mixins 폴더를 만들어서 사용한다.

  mixins 사용법

  1. views 폴더에서 mixins폴더 생성 후 mixin파일 생성(ex| mixins/video.pug)
  2. mixin을 사용할 곳(ex| home.pug)에 mixin 파일을 include한다.

  - ex) mixins폴더의 video.pug
  - include mixins/video

  3. mixin을 사용할 곳(ex| home.pug)에서 mixin을 사용하기 위해 +mixin이름(mixin객체)를 넣어준다.

  - home.pug에서는 +video(video) <- video라는 이름으로 mixin을 생성하고 video객체(데이터)를 넣어준다.

  4. partials폴더에 mixin을 생성한다.(video.pug)
  5. video.pug에 mixin mixin이름(받을 데이터)를 작성한다.
  6. 들여쓰기 후 HTML을 작성한다.
     ex) home.pug(mixin을 사용하는 pug 파일)
     extends base.pug
     include mixins/video.pug
     block content
     띄어쓰기 h2 Welcome here you will see the trending Video
     띄어쓰기 each video in videos
     띄어쓰기 띄어쓰기 +video(video)
     띄어쓰기 else
     띄어쓰기 띄어쓰기 li Sorry nothing found.

  ex) video.pug(mixin)
  mixin video(info)
  띄어쓰기 div
  띄어쓰기 띄어쓰기 h4=info.title
  띄어쓰기 띄어쓰기 ul
  띄어쓰기 띄어쓰기 띄어쓰기 li #{info.rating}/5.
  띄어쓰기 띄어쓰기 띄어쓰기 li #{info.comments} comments.
  띄어쓰기 띄어쓰기 띄어쓰기 li Posted #{info.createAt}.
  띄어쓰기 띄어쓰기 띄어쓰기 li #{info.views} views.

  6.0

- variable과 text를 섞어서 작성하는 방식은 attribute에서는 사용 불가능하다.
- li #{video.rating}/5와 같은 방식은 가능
- a(href="/videos/#{video.id}")와 같은 방식은 불가능
- template literal사용하여 attribute를 사용한다.
- a(href=`/videos/${video.id}`)

const {id} = req.params; <- ES6 문법
const id = req.params.id; <- ES5 문법
위의 두 코드는 동일하다.

6.1

- 상대경로 절대경로
  href="/경로" <- root + /경로 즉, 절대경로
  href="경로" <- 상대경로 즉, 현재경로 + /경로

  6.2
  form태그

- form의 input을 post로 전달할 때 name속성을 지정하지 않으면 전달되지 않는다.
- action 속성은 데이터를 어느 URL로 보낼지 지정할 수 있다.
- action 속성을 사용하지 않으면 현재 URL로 데이터를 보낸다.
- method 속성을 이용해서 GET방식인지 POST방식인지 선택할 수 있다.
- method를 POST로 하여 POST로 데이터를 송신할 경우 controller에서 post 함수를 만들어 줘야 한다.
- ex) videoRouter.post("url", function);
- GET 메소드를 사용하면 form에 있는 정보가 URL에 들어간다.
- POST 메소드를 사용하면 form에 있는 정보가 URL에 들어가지 않는다.
- 즉, DB관련 작업 = POST, 검색과 같은 데이터를 주고 받는 작업 = GET

  6.3
  get, post 함수 하나의 route 함수로 사용하기

- videoRouter.get("/:id(\\d+)/edit", getEdit);
- videoRouter.post("/:id(\\d+)/edit", postEdit);
- videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
- 위의 한줄의 route함수는 위의 get, post 함수와 동일한 역할을 한다.

res.redirect()

- 브라우저가 redirect("url")하도록 한다.

POST로 보낸 데이터를 이용하는 방법

1. express.urlencoded를 설정한다.(server.js)

- express application이 form의 value들을 이해할 수 있게 하는 설정, JS형식으로 데이터 변환
- app.use(express.urlencoded({extended : true})) <- router보다 먼저 사용한다.

2. post로 데이터를 전달하면 req.body에서 얻을 수 있다.

postEdit Controller에서 title값 update 시키기

- const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
- id와 title을 가져오고, 전역 변수인 videos배열(현재 video)의 타이틀을 변경된 타이틀로 변경한다.

챌린지

- req.query를 이용하여 사용자가 입력한 값을 가져올 수 있다.

  6.7 ~ 6.8
  MongoDB

- MongoDB 설치(community edition)
- cmd에서 mongod명령을 실행하면 MongoDB설치가 되었는지 확인할 수 있다.
- cmd에서 mongo명령어를 입력하면 mongoDB shell을 이용할 수 있다.

  Mongoose

- node.js와 mongoDB를 연결한다.
  mongoose 설치
- npm i mongoose

db.js

- DB설정파일
- DB설정파일을 이용하기 위해 server.js파일에서 db.js파일을 파일채로 import한다.

db.js파일의 db.on과 db.once의 차이점

- on <- 이벤트가 여러번 실행가능하다.
- once <- 이벤트가 한번만 실행된다.

  6.9
  CRUD

- CREATE
- READ
- UPDATE
- DELETE

src/models/Video.js

- 비디오 model.js 생성
- model은 mongoose에게 data의 구조를 설명하는 역할을 한다.

  6.10
  Schema

- DB의 형식을 정의한다.

Video model 생성
const Video = mongoose.model(모델명(video), 스키마명(videoSchema));
Video 생성 후 export
export 후 server.js에서 import

6.11
init.js 파일

- 모든걸 초기화하는 역할
- db와 Video 모델을 import
- server에서 export한 app을 improt하여 서버(app) 실행
- 즉, server.js는 express 된 것들과 server의 configuration에 관련된 코드만 처리하는 파일로 설정한다.
- app을 실항하는 파일이 server.js에서 init.js로 변경되었으니 package.json의 script 변경

Controller에서 Video model(database)사용법

1. Controller에서 export한 Video model을 import한다.
2. Controller와 DB를 연결한다.(mongoose document 참조)

- Video.find();
- Video.find({});의 {} <- Search terms
- Search terms가 비어있으면 모든 형식을 찾는다.
- 즉, Search terms가 비어있으므로 모든 형식의 Video를 찾고 Callback 함수를 호출한다.

  6.13
  Callback Function, Promise, async await

- await를 function앞에 적으면 callback이 필요하지 않다고 명시한다.
- callback을 이용하면 함수의 동작이 끝난 후 특정 동작을 시작한다.
- await을 이용하면 함수의 동작이 끝날때까지 JS가 기다린다.
- await는 해당 function이 asynchronous일 때만 가능하다.
  Error 제어
- try catch문 사용

  6.15 ~ 6.16
  DB에 데이터를 저장하는 방법

1. document 생성(document = 데이터를 가지고 있는 비디오)

- const video = new Video({})

2. 생성한 document(video)안에 video model의 구성요소 담기(video 스키마의 구조와 동일하다.)

- const video = new Video({
  title,
  description,
  createdAt: Date.now(),
  meta: {
  views:0,
  rating:0
  }
  });

3. video모델을 저장한다.

- video.save()
- save는 promise를 return한다. <- async await을 사용한다.

console에서 DB 확인하기[help 명령어를 이용하여 명령어 종류 확인 가능]

1. mongo 명령어를 이용하여 mongo db 접속

- mongo

2. show dbs명령어를 이용하여 db list 출력

- show dbs

3. use 사용할 DB이름 명령어를 이용하여 사용할 DB로 접속

- use wetubeChallenge

4. show collections 명령어를 이용하여 document의 종류 출력

- show collections

5. db.document.find() 명령어를 이용하여 document안의 데이터 확인 가능

- db.videos.find()

Video model에서 Object를 생성하는 2가지 방법

1.  await Video.create({
    title, description, createAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#{word}`),
    meta: { views: 0, rating: 0 },
    });

2.  const video = new Video({
    title, description, createAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#{word}`),
    meta: { views: 0, rating: 0 },
    });
    await video.save()

6.17
Video model의 data를 required로 만들기, default값 설정

- createdAt: {type: Date, required: true, default: Date.now}
- Video.js(Video 모델)에서 createdAt을 default값을 설정했기에 videoController.js에서 createdAt를 삭제한다.

try catch 문을 이용하여 error를 제어하면 error의 \_message 속성을 이용하여 에러 메시지를 볼 수 있다.

- await code에 에러가 발생하면 JS는 더 이상 코드를 실행시키지 않는다.

  6.19

- videoRouter의 regularExpression 수정
- 0~9, a~f까지의 문자사용, 24개의 문자로 이루어짐

Mongoose의 findOne

- 자신이 보내는 모든 condition을 적용시킨다.
- ex) 조회수가 25인 영상 찾기

Mongoose의 findById

- id로 영상을 찾아낼 수 있는 기능 지원

  6.20
  views/edit.pug

- value= video.hashtags.join()
- video의 hashtags배열을 ,로 구분된 문자열로 반환한다.
- join() 함수 안에 문자를 집어넣어 원하는 문자로 구분한 문자열 반환이 가능하다.

  6.21
  JS startsWith()

- 문자가 특정 문자로 시작하는지 확인할 수 있다.
  hashtags.split(",")
  .map((word) => (word.startsWith("#") ? word : `#${word}`));

  6.22
  Mongoose Video.findByIdAndUpdate(id,update할 내용)

- video.title = title
- video.description = description
- video.hashtags = hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#{word}`));
  위의 3줄의 코드를 Mongoose의 findByIdAndUpdate 함수를 사용하면 다음과 같이 사용할 수 있다.
  await Video.findByIdAndUpdate(id, {
  title, description, hashtags : hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#{word}`));
  });

videoController.js파일의 postEdit Controller의 video 함수 수정

- Video.findById(id) -> Video.exists({\_id: id})
- Video 모델의 id는 \_id이다.
- 즉, Video.\_id와 request.params.id가 같은 경우를 찾는다.
- Video.exists 함수는 video Object가 아닌 true or false를 반환한다.

  6.23
  Mongo DB 삭제

  1. show dbs
  2. use DB이름
  3. db.videos.remove({})
     Mongoose의 middleware
     -Mongoose의 middleware는 무조건 model이 생성되기 전에 만들어야한다.

Video.js의 videoSchema pre middleware

- 즉, pre middleware를 save이벤트에 적용시킨다.

- videoSchema.pre("save", async function () {
  this.hashtags = this.hashtags[0]
  .split(",")
  .map((word) => (word.startsWith("#") ? word : `#${word}`));
  });
- this는 자기가 가지고 있는 데이터를 의미한다.
- hashtags는 String array로 선언되었기에 hashtags는 array의 0번째 인덱스에 들어있다.
- 즉, 자기가 가지고 있는 0번째 hashtags배열을 ,를 기준으로 나누고 #을 붙인다.

Mongoose Middleware Docs

- https://mongoosejs.com/docs/middleware.html

  6.24
  Mongoose static

- 사용자 정의 함수 만들기
- Video 모델에서 생성한다.
- static의 첫 번째 argument는 함수 이름이다.
- static의 두 번째 argument는 동작할 기능이다.
- videoSchema.static("formatHashtag", function(hashtags){
  return hashtags
  .split(",")
  .map((word) => (word.startsWith("#") ? word : `#${word}`))
  });

- videoController.js 파일에서 사용한다.
- hashtags: Video.formatHashtags(hashtages);

  6.25
  Mongoose Model.find({}).sort()

- sort() 함수를 이용하여 정렬 기준을 정할 수 있다.

form을 보내면 그 내용을 request.body로 받을 수 있다.
URL로 보낸 정보들은 request.query로 받을 수 있다.

6.26
MongoDB의 정규표현식을 이용한 비디오 검색
welcome이라는 이름을 가진 비디오를 찾을 때

- welcome
- 대소문자 무시 welcome/i
- g = global welcome/g
- welcome으로 끝나는 단어 welcome$
- welcome으로 시작하는 단어 ^welcome
- regular expression을 사용하기 위해서는 regular expression의 약자인 $regex를 사용해야 한다.
- ex) title:{
  $regex: <- new RegExp(keyword, "i") regular expression의 약자(i는 대소문자 무시) 즉, title이 keyword를 포함한 영상을 찾는다.
  $regex: <- new RegExp(`^${keyword}`, "i") <- keyword로 시작하는 영상만 찾기
  $regex: <- new RegExp(`${keyword}$`, "i") <- keyword로 끝나는 영상만 찾기
  }

MongoDB regex Docs

- https://docs.mongodb.com/manual/reference/operator/query/regex/

  7.0
  User 모델 추가하기

1. Create User Model(src/models/User.js)
2. init.js파일에 User 모델 import 시키기

User model의 unique <- 단 하나의 값만 가진다. 즉, 중복 X

- new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  username: {type:String, required: true, unique: true}
  })

globalRouter -> rootRouter

- globalRouter.js -> rootRouter.js
- server.js 파일의 globalRouter -> rooterRouter로 수정

VS CODE 단축키

- ALT + SHIFT + I <- 지정한 곳(드래그)에 다중 커서 만들기

  7.2
  MongoDB에서 데이터 지우기

- db.model명.remove({})

password 해싱

1. bcrypt 설치

- npm i bcrypt

2. bcrypt 함수 사용

- bcrypt.hash(패스워드, saltRounds(해시함수를 몇 번 반복할지), function(err, hash){
  // 출력값
  }) <콜백함수가 아닌 async await도 가능(model/User.js의 userSchema.pre 참조)>
- 즉, user를 저장하기전 middleware를 이용하여 bcrypt함수(해싱함수)를 사용한다.
- User모델의 middleware에서 this는 Usermodel에서 create되는 User를 가르킨다.
- User모델의 해시 함수는 async await를 사용하기에 콜백이 필요없다.

  rainbow table

- 해싱된 password를 이요한 해킹 공격

  7.3
  userController에서 email과 username 중복 걸러내기

$or operator

- 각 조건이 true일 때 실행되게 만든다.
- usercontrolelr의 postJoin에서 중복되는 email과 usernaem의 중복을 고를 떄 코드가 중복되기에 $or operator을 이용하여 중복 줄이기

userController에서 email과 username 중복 동시에 걸러내기($or operator 사용)

- const exists = await User.exists({$or: [{username},{email}]});

username과 email 중복 체크 전 password체크

- if(password !== password2){
  return res.render("join",{
  pageTitle,
  errorMessage: "Password confirmation does not match.",
  });
  }

  7.4
  Status Code Wiki

- https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C

render할 때 status코드 추가하기

- return res.status(statusCode).render();

  7.6
  DB에 저장된 해시된 패스워드와 사용자가 입력한 패스워드를 해시 후 서로 같은지 비교하여 비밀번호 같은지 확인

bcrypt의 compare함수
bcrypt.compare(password, hash)

- password = 유저가 입력한 패스워드
- hash = DB에 저장된 해시값
- 결과값으로 true, false가 나온다.

  7.7
  Session

  - 백엔드와 브라우저 간 어떤 활동을 했는지 기억한다.
  - 즉, 브라우저와 백엔드 사이의 메모리

Stateless(무상태)

- 한 번 연결이 되었다가 끝남 즉, 백엔드와 프론트엔드 사이에 state가 없다.

Session 미들웨어

1. express-session 설치

- npm i express-session

2. server.js 파일에 session import

- import session from "express-session"

3. router 코드 앞에 초기화

- app.use(session({}))

4. session({})안에 secret, resave, saveUninitialized 작성

- app.use(session({
  secret:"Hello!",
  // secret는 아무도 모르는 문자열로 작성
  resave:true,
  saveUninitialized: true,
  }))

5. session 미들웨어는 브라우저에게 text를 보낸다.

- session 미들웨어가 브라우저에게 보낸 text는 개발자도구(F12) -> application -> cookies에서 확인할 수 있다.

쿠키 정보는 request의 headers와 request의 session의 id에서 확인할 수 있다.

app.use((req,res,next) => {
req.sessionStore.all((error, sessions) => {
console.log(sessions);
next();
})
})

- request의 sessionStore에는 백엔드가 기억하고있는 쿠키(유저)들을 확인할 수 있다. 즉, 누가 백엔드에 요청을 했는지 알 수 있다.
- 즉, 세션이란 백엔드가 id(쿠키)를 통해서 기억하는 방식이다.
- Session store는 session을 저장하는 곳이다. 서버를 껏다 키면 Session store도 초기화된다.

- 백엔드에 요청을 보낼때 마다 브라우저가 쿠키를 보낸다.

  7.8
  express(express-session)가 세션을 메모리에 저장하고 있기 때문에 server를 재시작하면 세션은 사라진다. 즉, 세션을 DB와 연결하여 server를 재시작하여도 세션이 존재하게 해야한다.

백엔드가 쿠키를 가지고 브라우저를 구분하는 방법

- 브라우저가 백엔드에게 제공받은 쿠키는 백엔드에서 세션 id로 사용된다. 즉, 브라우저가 요청을 보낼 때마다 그 id(세션 id)를 같이 보내줘서 브라우저와 일치하는 세션이 뭔지 알 수 있다. -> 세션과 세션id는 브라우저를 기억하는 방식 중 하나이다.

세션 id를 가지고 있으면 세션 object에 정보를 추가할 수 있다.

쿠키를 이용하여 브라우저 식별 순서

1. 서버가 브라우저의 요청이 있으면 세션id(쿠키)를 전달한다.
2. 브라우저가 요청을 보낼 때마다 쿠키에서 세션 id를 가져와 같이 보낸다.
3. 서버가 세선id(쿠키)를 읽고 브라우저를 식별한다.

app.get("/add-one",(req,res,next) => {
req.session.원하는 이름 = value
return res.send(`${req.session.id}`);
})

- req.session.원하는 이름 = value를 이용하여 session 정보에 data를 추가할 수 있다.
- 추가한 데이터는 req.session.원하는 이름 으로 출력할 수 있다.

Cookie 정리

1. 브라우저가 서버에 요청을 보낸다.
2. 서버는 브라우저에게 Cookie를 준다.
3. 브라우저가 서버에 다시 접근할 때 서버에게 받은 Cookie를 같이 보낸다.
4. 서버는 세션에 저장된 id와 브라우저가 보낸 cookie를 이용하여 브라우저를 구분할 수 있다.

7.9
pug template는 locals Object에 접근할 수 있다.
locals Object는 middleware의 response에 있다.
즉, locals Object는 전역 변수이다.(locals Object를 전역 변수로 사용하기 위해서는 middleware를 router에 적용시켜야 한다.)
즉, locals Object는 pug template에 import된 Object이다.

sessionMiddleware를 localMiddleware보다 앞에서 작성해야 localMiddleware에서 req.session에 접근할 수 있다.

Boolean() 함수를 이용하여 true인지 false인지 구분할 수 있다.

pug teamplate에서 req.locals Object를 사용하기 위해선 locals Object의 객체명만 적으면 된다.
ex) req.locals.kamja = 44 <- h1=kamja

localMiddleware를 이용하여 pug template과 res.local Object를 공유할 수 있다.

7.11
Recap
request.session에 데이터를 넣으면
ex) request.session.user = "kamja"
request.session의 user를 controller 어디서나 사용할 수 있다.

7.12
Session data는 쿠키안에 저장되는게 아닌 서버에 저장된다. 쿠키에는 Session id만 저장된다.

session middleware의 store 속성

- default로 설정된 것과는 다른 store를 설정할 수 있다.
- store: MongoSotre.create({})한다.
- MongoStore를 생성할 때 option으로 mongoUrl을 보낸다.

connect-mongo

- 세션을 MongoDB에 저장한다.

1. connect-mongo 다운로드

- npm i connect-mongo

2. server.js에 MongoStore import

- import MongoStore from "connect-mongo"

3. MongoStore create

- mongoDB의 URL을 가지고 있는 configuration object를 생성한다.

4. MongoStore의 option으로 mongoUrl보내기

- store: MongoStore.create({
  mongoUrl: "mongoUrl"
  });

5. 생성된 session은 MongoDB의 collections에서 확인할 수 있다.

- session은 id, 만료일자, session정보를 가지고 있다.

session의 store속성(store: MongoStore.create({}))부분을 지우면 세션은 서버의 메모리에 저장된다. 즉, 서버를 재시작 할 때마다 메모리가 지워진다.

7.13
로그인한 사용자에게만 세션을 할당할 수 있도록 session middleware의 resave 옵션과 saveUninitialized 옵션을 false로 설정한다.
saveUninitialzed

- 세션이 새로 만들어지고 수정된 적이 없을 때 즉, 초기화 되지 않은 세션
- 세션은 userController.js 파일의 postLogin 상수의 req.session.loggedIn = true; req.session.user = user; 부분에서 초기화된다 즉, 세션을 수정(로그인)할 때만 세션을 DB에 저장하고 쿠키를 넘겨준다.
- 즉, saveUninitialzed 옵션을 false로 설정하면 세션을 초기화(로그인)한 사용자에게만 쿠키를 할당하도록 설정한다.(익명 사용자에게는 세션을 할당하지 않는다.)

  7.14 ~ 7.15
  Cookie's property

- session middleware에서 cookie:{} 중괄호 안에 옵션을 사용할 수 있다.
  secret

- 사용자가 쿠키에 sign 할 때 사용하는 string
- 쿠키에 sign하는 이유는 backend가 쿠키를 줬다는걸 보여주기 위함이다.
- session Hijecking 공격을 방지하기 위해 secret 옵션을 길고 무작위로 작성해야 한다.
- 즉, secret옵션의 string을 가지고 우리가 만든 쿠키임을 증명할 수 있다.

  Domain

- 쿠키를 만든 backend가 누구인지 알려준다.(브라우저는 Domain에 따라 쿠키를 저장하도록 되어있다.)
- 쿠키는 Domain에 있는 backend로만 전송된다.
- 즉, Domain은 쿠키가 어디에서 왔는지, 어디로 가야하는지 알려준다.

  Expires

- 만료일자
- 만료일자를 지정하지 않으면 session cookie로 설정된다. session cookie로 설정될 경우, 사용자가 종료하면 session cookie는 종료된다. 즉, 사용자가 종료하지 않으면 session cookie는 계속 존재한다.

  Max-Age

- 쿠키가 얼마나 오래 존재할 수 있는지 명시한다. 값은 1/1000초 단위이다.

환경변수

- session middleware의 secret과 MongoStore.create의 mongoUrl의 string들이 보여지면 안되기에 환경변수로 설정한다.

1. 가장 바깥 경로(src 바깥 즉, package.json과 같은 경로(옆))에 .env 파일을 생성한다.
2. .gitignore 파일 안에 .env를 추가한다.
3. .env 파일에는 코드에 들어가면 안되는 값들(보여지면 안되는 값들)을 추가한다.
   3-1. .env 파일에 추가하는 모든건 관습적으로 대문자로 작성해야 한다.
   3-2. 코드에 들어가면 안되는 값들의 예로는 API Key, DB URL등이 있다.
   3-3 .env 파일에 들어갈 변수 작성 예
   ex) kamja=asdfo2ifd09viosd

4. .env파일에 작성한 값을 사용하기 위해 process.env.변수명 을 작성하여 사용한다.
5. .env 파일을 읽기 위하여 dotenv 패키지를 설치한다.

- npm i dotenv
- dotenv 패키지는 .env 파일을 읽고 각각의 변수들을 process.env 안에 넣어준다.

6. 코드의 가장 위에 dotenv패키지를 설정한다.(프로그램이 가장 먼저 시작되는 파일 가장 위 즉, package.json 파일의 scripts속성을 보면 시작할 때 가장 먼저 init.js파일을 사용한다. 즉, init.js파일의 최상단에 require("dotenv").config()를 사용해야 한다.)

- require("dotenv").config()
- require("dotenv").config()코드를 읽기 전 process.env.변수명 코드를 사용한다면 변수명을 읽을 수 없다.

dotenv 패키지를 require("dotenv").config() 방식으로 사용한다면 process.env.변수명을 사용하는 모든 파일의 최상단에 require("dotenv").config() 코드를 명시해야 하기에 import 방식으로 수정한다.

- require("dotenv").config() -> import "dotenv/config";
- 즉, node가 가장 먼저 사용하는 파일인 init.js파일의 최상단에 import "dotenv/config"를 작성한다.

  7.16 ~ 7.17
  Social Login(github)

Social Login 흐름

1. 사용자를 소셜(깃, 카카오 등)으로 보낸다.
2. 사용자는 소셜에 이메일 패스워드 등을 제공한다.
3. 소셜이 정보공유를 승인한 후 사용자를 웹사이트로 돌려보낸다. 즉, 소셜은 사용자를 token과 함께 redirect 시킨다.
4. 사용자가 받아온 token을 이용하여 사용자의 정보를 소셜로부터 받아온다.
5. token이 만료된다.

Github OAuth Docs

- https://docs.github.com/ko/developers/apps/building-oauth-apps/scopes-for-oauth-apps

Github Login 연동시키기

1. Github의 Developer settings 들어가기

- github.com/settings/apps

2. OAuth Apps -> New OAuth App 누르기
3. Application name, Homepage URL, Authorization callback URL 설정

- Application name = wetubeChallenge
- Homepage URL = http://localhost:4000/
- Authorization callback URL = http://localhost:4000/users/github/finish (꼭 이 URL이 아니여도 된다. 추후 설명)

4. 생성된 OAuth Apps에서 Client ID가 있는지 확인
5. Github로 데이터를 보내기 위해 template(pug)에서 Github로 연결시키기(연결시킬때 url에 4.에서 확인한 Client ID를 같이 보내야 한다.)

- https://github.com/login/oauth/authorize?client_id=543c3d329541f1c9dcb1

6. 기본 제공 데이터보다 더 많은 데이터를 원할경우 &scope 속성을 사용한다. 즉, 사용자에게 얻을 정보를 &scope 속성을 사용하여 지정할 수 있다. 여러개의 데이터를 얻을 경우 공백을 이용한다.
   ex) user와 email정보를 얻고 싶을 때

- &scope=read:user user:email

JS
new URLSearchParams(option).toString();

- URLSearchParams(option).toString()을 사용하면 option에 있는 값들을 URL에 넣을 수 있는 형식으로 변환 후 문자형으로 변경한다.
- 즉, userController.js파일에서
- const baseUrl = "https://github.com/login/oauth/authorize"
- const config = {
  client_id: "543c3d329541f1c9dcb1",
  allow_signup: false,
  scope: "read:user user:email"
  }
- const params = new URLSearchParams(config).toString();
- const finalUrl = `${baseUrl}?${params}`;
- 즉, finalUrl은 위의 5. 6.번에서 Github로 연동시킬 URL이 된다.
- 그 후 finalUrl로 redirect시킨다.

7. Github 연동 화면으로 넘어간 후 Authorize 닉네임 버튼을 클릭(권한 부여 수락)하면 3.에서 설정한 Authorization callback URL로 redirect 시켜주며, user의 code를 URL(Authorization callback URL)에 같이 첨부하여 보낸다.

7.18 ~ 7.19

8. Github에서 받은 토큰을 Access 토큰으로 바꿔준다.

client_id를 어디서든 사용이 가능하게 env 파일에 설정하고, userController.js 파일의 config 상수의 client_id를 process.env.GH_CLIENT로 변경한다.
client_secret

- 오로지 백엔드에만 존재해야한다. 즉, 코드 어디에서도 보이면 안된다.
- 즉, 사용자가 권한을 허락한 후 받은 정보들을 종합하여 URL 생성 후 POST REQUEST한다. 즉, fetch함수를 사용하여 생성한 URL로 정보를 요청한다.
- const config = {
  client_id: process.env.GH_CLIENT,
  client_secret: process.env.GH_SECRET,
  code:req.query.code,
  }
- client_id와 client_secret는 생성된 OAuth Apps에서 확인할 수 있다.(client_secret가 없다면. client_secret를 생성해야한다.)
- POST REQUEST 시킬 baseURL은 "https://github.com/login/oauth/access_token"이다.
- fetch함수를 사용해서 finalURL로 데이터를 요청한 후 받아온 데이터를 JSON 형식으로 변환한다.
- fetch함수를 사용할 때 headers 속성안에 Accpet:"application/json" 속성을 사용하지 않으면 json형식이 아닌 text 형식으로 데이터를 받아온다.
- node-js(18버전 이하)에서 fetch함수를 사용하기 위해서 npm i node-fetch@2를 한 후 fetch함수를 사용할 파일의 최상단에 import fetch from "node-fetch"를 적어준다.
- fetch함수로 finalUrl에 POST REQUEST를 시키면 Github는 요청한 데이터(Access Token)를 보내준다. 받은 데이터를 JSON 형식으로 변환한다.

9. Github가 제공한 Access Token을 가지고 Github API를 이용하여 user정보를 얻는다.

- Github가 제공한 json 데이터에 access_token이 있는 경우 Github API를 이용한다.
- const json=await data.json();
  if("access_token" in json){
  const {access_token} = json;
  const userRequest = await fetch("Github API URL",{
  headers{
  Authorization: `token ${access_token}`,
  }
  })
  }
- fetch 함수를 이용하여 Github API URL에 데이터를 요청할 때 header속성에 Authorization 속성에 access_token을 넣어줘야 한다.
- fetch 함수를 이용하여 Github API URL에 데이터를 요청하면 Github의 프로필 정보를 가져올 수 있다.

  7.20
  email이 null로 오기에 emailData를 받아오기 위한 fetch 함수를 작성한다.

- const emailData = await(
  await fetch(`${apiUrl}/user/emails`,{
  headers:{
  Authorization: `token ${access_token}`,
  },
  })
  ).json();
- emailData에서 받은 데이터 중 verified이면서 primary인 데이터를 찾는다.

- userData와 emailData는 access_token이 볼 수 있게 허락했기에 작동한다.(scope 부분에서 원하는 권한 요청(user데이터와 email데이터))

JS find()

- 제공된 조건을 만족하는 배열의 첫 번째 요소를 반환한다. undefined가 반환된다면 조건을 만족하는 값이 없다.

  7.21

- Github로 계정을 생성한 유저는 email만 있고 password가 없다.
- 웹사이트에서 계정을 생성한 유저는 email과 password가 있다.
- 웹사이트에서 로그인한 유저와 깃허브에서 로그인한 유저 모두 email이 있기에 email이 DB에 존재한다면 로그인시킨다. 즉, 한 유저가 웹사이트에서 kamja@email.com으로 계정을 생성하고, 깃허브 이메일이 kamja@email.com인 계정으로 연동을 했을 때 이메일이 kamja@email.com으로 같으니 로그인시킨다.
- const existingUser = await User.findOne({email: emailObj.email});
- if(existingUser){
  req.session.loggedIn = true;
  req.session.user = user;
  returen res.redirect("/");
  }
- 만일 계정이 없다면 else문을 사용하여 계정을 생성한다.
  -user가 깃허브로 로그인했는지 여부를 알기 위해 user스키마에 socialOnly를 추가한다.(Model/User.js)

  7.22
  req.session.destroy()

- request의 session을 로그아웃할 때 제거한다.

  8.0
  Recap

- localsMiddleware에는 loggedIn 변수가 있다.
- loggedIn 변수는 session에 user가 있는지 확인한다. 즉, base.pug에서 로그인 유무를 판단할 때 loggedIn 변수를 사용한다.(loggedIn변수는 session에 있기에 글로벌에서 사용 가능하다.)

- form의 action을 지정하지 않으면 같은 url(지금의 url)로 데이터를 보낸다.
- middleware.js파일의 res.locals.user의 값이 없는 경우를 대비하여 || {}를 추가한다.

  8.1
  protectorMiddleware

- 사용자가 로그인 상태가 아니라면 로그인 페이지로 redirect시키고, 로그인 상태라면 next()함수를 호출하여 다음 작업 진행

publicOnlyMiddleware

- 로그인한 사용자가 로그인 페이지로 접근하는 것을 막는 미들웨어 즉, 로그인 되지 않은 사용자라면 next()함수를 호출하여 다음작업 진행, 로그인 된 사용자라면 home으로 redirect

Middleware 사용법(적용법)[get, post]

- ex) userRouter에 protectorMiddelware 적용
- userRouter.get("/logout", protectorMiddleware, logout);
- /logout URL로 get요청을 받으면, protectorMiddleware호출, protectorMiddelware가 next()함수를 return하면 logout Controller 실행, protectorMiddleware에서 return하면 return문을 수행하고 미들웨어 종료
- post요청도 get과 동일하게 사용

Middleware 사용법(적용법)[route]

- ex) userRouter에 protectorMiddleware적용
- userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
- all(미들웨어) <- get요청과 post요청 모두 all 함수 안의 미들웨어를 사용한다.
- /edit URL로 접근하면, protectorMiddleware를 실행한 후 get(), post() 함수를 실행한다.
- all() 함수는 get,post와 같은 http method에 모두 적용이 가능하다.

  8.2
  profile을 edit(update)해도 form에서 update되지않는 문제 but DB는 업데이트 되어있음

- 1. edit-profile.pug 파일에서 value를 loggedInUser의 값으로 입력
- 2. loggedInUser는 localsMiddleware에서 생성된다.(localMiddleware에서 loggedInUser를 req.session.user로 정의한다.)
- 3. localsMiddleware는 login할 때 작동하는 Middleware이다. 즉, req.session.user는 로그인 할 때(userController의 postLogin) 생성된다.
- 4. 즉, user는 업데이트 되었지만 session이 업데이트 되지 않았다. <- session이 DB와 연결되어 있지 않기에 발생하는 현상 <- session을 업데이트 하여 문제 해결할 수 있다.

  8.3

Session은 DB(Mongo Store)에 저장되어있다.

JS ES6
...req.session.user

- res.session.user 안의 내용을 밖으로 꺼내준다.

session 업데이트 방법

- const {
  session: {
  user: { \_id },
  },
  body: { name, email, username, location },
  } = req;
  const updatedUser = await User.findByIdAndUpdate(\_id, {
  name,
  email,
  username,
  location,
  }, {new: true});
  req.session.user = updatedUser;

findByIdAndUpdate는 update 되기 전의 데이터를 return 해준다.
findByIdAndUpdate를 사용할 때 new:true를 설정해주면 findByIdAndUpdate가 업데이트된 데이터를 return 한다. 즉, mongoose에게 가장 최근 업데이트된 object를 요청한다.

8.3
Code Challenge

- user가 uesrname or email을 변경하려 할 때 중복검사

MongoDB 삭제 후 스키마 재시작 방법

1. mongo
2. use dbName
3. db.dropDatabase();

Session은 express-session을 import하여 사용할 수 있다.

- server.js파일의 app.use(session)을 통해 express의 request 메소드에 session을 추가한다.

  8.5
  DB 완전히 삭제 방법

1. use 사용할DB명
2. db.sessions.remove({})

- session을 DB에 저장했기에 session도 삭제

3. db.users.remove({})

password 변경 방법

1. 현재 password가 정확히 일치하는지 확인

- const ok = await bcrypt.compare(oldPassword, password);
  if (!ok) {
  return res.status(400).render("users/change-password", {
  pageTitle: "Change Password",
  errorMessage: "The current password is incorrect",
  });
  }

2. 새로운 password와 변경할 password가 일치하는지 확인

- if (newPassword !== newPasswordConfirmation) {
  return res.status(400).render("users/change-password", {
  pageTitle: "Change Password",
  errorMessage: "The password does not match the confirmation",
  });
  }

3. user 모델에서 현재 user를 찾고 user정보 업데이트

- user 정보(\_id정보)는 req.session.user에서 찾을 수 있다.
- const user await User.findById({\_id});
  user.password = newPassword;
  await user.save();

4. 변경된 session정보를 update한다.

- req.session.user.password = user.password
- 세션의 비밀번호를 DB에 저장되어 있는 비밀번호로 업데이트한다.

  8.6
  file upload방법(avatar img)

1. template에 label과 input(type="file")작성

-      label(for="avatar") Avatar
        input(type="file", id="avatar", name="avatar", accept="image/*")
- label과 input을 같이 작성하는 이유 -> label을 클릭해도 input이 작동한다. 단, label의 for값과 input의 id값이 서로 일치해야한다.
- image파일만 업로드 할 수 있게 accept속성을 사용한다.

2. multer middleware를 사용하여 파일 업로드 기능을 추가한다.

- npm i multer
- multer는 multipart가 아닌 form을 처리하지 않기에 form을 multipart form으로 만든다. multipart form으로 만들기 위해서는 form에 enctype 속성을 추가하면 된다. 즉, form이 다르게 encode된다. 즉, file을 백엔드로 보내기 위해 필요한 encoding type이다.
- ex)form(method="post", enctype="multipart/form-data")

3. multer middleware 생성

- multer(옵션)
- 옵션 1. dest or storage = 파일을 저장할 위치
- 옵션 2. fileFilter = 허용되는 파일을 제어하는 함수
- 옵션 3. limits = 업로드된 데이터의 한계
- 옵션 4. preservePath = 기본 이름 대신 파일의 전체 경로 유지
- multerMiddleware는 req,res를 사용하지 않는다. 대신 multer()를 사용한다.
- middleware.js파일에서 multermiddleware
- export const uploadFiles = multer({dest: "uploads/"});
- 사용자가 보낸 파일을 uploads/폴더에 저장하도록 설정한다.

4. 생성한 multer middleware를 controller가 아닌 router에 사용한다. 즉, 파일을 업로드 할 edit profile 라우터에 multer middleware를 사용한다.(get이 아닌 post에(백엔드와 소통해야 하기에 post router에 사용한다.))

- userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(uploadFiles.single("avatar"), postEdit);
- uploadFiles 미들웨어(multer middleware)의 속성 <- 여러개의 파일이 올 수 있기에 사용한다. edit-profile에서는 한 개의 파일만 전달받기 때문에 single 속성을 사용한다.
- multer middle 속성에는 any, array, fields, none, single등이 있다.
- 즉, multer middleware를 사용한 후 postEdit Controller를 실행한다.

- multerMiddle 동작과정

1. postEdit Controller 동작 전 multer middleware가 실행되어 template의 input에서 오는 avatar 파일을 uploads 폴더에 저장한다.
2. Controller인 postEdit에 upload한 파일의 정보를 전달한다.
3. 2.의 과정을 거치면 request에 file정보가 추가된다. 즉, request.file을 사용할 수 있다. 즉, request.file에는 "avatar"정보가 들어있고 request.body에도 "avatar"정보가 들어간다.

8.7
avatarUrl 업데이트

- 사용자가 avatarUrl을 업데이트하지면 file:path는 undefined인 상태로 avatarUrl이 업데이토되는 문제 발생 <- file이 undefined가 아닐경우 file.path로 avatarUrl설정 file이 undefined인 경우 기존user가 가지고 있는 avatarUrl로 avatarUrl을 설정한다.

* DB에는 파일을 저장하면 안된다. \*
* 폴더에 파일을 저장한 후 DB에는 파일의 위치만 저장한다. \*

loggedInUser는 현재 로그인 된 사용자이다.

- middlewares.js 파일의 localsMiddleware에서 확인가능
- localsMiddleware를 통해 template에 정보 전달 가능 즉, 우리가 locals에 저장하는 모든 정보는 views에서 사용이 가능하다.
- res.locals.loggedInUser에 req.session.user || {}를 저장하고 있기에 session에 저장된 user 정보를 모든 template에서 사용할 수 있다.

avatarImg 오류

1.  edit-profile.pug 파일에서 img(src=loggedInUser.avatarUrl, width="100", height="100")을 사용하여 avatarImg를 표현하려고 했는데 url이 상대주소로 작동하여 url 경로에 오류 발생

2 . img(src=`/${loggedInUser.avatarUrl}`, width="100", height="100")로 설정하여 상대경로를 절대경로로 설정 but 오류 지속 <- express는 uplaods 폴더가 존재하는지 모른다. 즉, express한테 누군가 uplaods폴더에 접근한다고 명시한 적이 없다.

8.8
static Files

- static File로 지정한 페이지와 폴더는 브라우저가 접근할 수 있다.

Stacic File 만들기(/uploads 폴더)

1. server.js파일에 global router 만들기

- app.use("/uploads")

2. 생성한 global router에 express.static() 함수 사용하기

- 생성한 static()에는 노출시키고 싶은 폴더의 이름을 명시한다. 즉, static(static폴더명)
- app.use("/uploads", express.static("uplaods"))

  8.6 ~ 8.8 Recap

1. 파일을 서버에 저장하고 있다.

- 서버가 업데이트 되면 기존에 있던 파일들은 삭제된다. 즉, 서버가 재시작되면 기존에 있단 파일들 이 삭제된다. -> 파일을 서버에 저장하는것이 아닌 다른 곳에 저장함으로써 문제 해결 가능(서버 배포시 작업) 즉, 서버를 재시작해도 기존 파일은 그대로 존재한다.

2. DB에는 파일을 저장하면 안된다. 즉, DB에는 파일 자체가 아니라 파일의 위치를 저장해야한다.

8.9

sampleVideo 구하기

- Sample-videos.com

Video upload하기

1. upload form에 label과 input 생성

- label(for="video") Video File
  input(type="file", accept="video/\*", id="video", required, id="video", name="video")
- input태그의 name속성은 multer middleware 사용을 위해 사용한다.
- form의 속성에 enctype를 추가해야한다!!!!
- form(method="POST", enctype="multipart/form-data")

2. videoRouter에 uploadFiles 미들웨어 적용(uploadFiles 미들웨어를 avatarUpload 미들웨어와 videoUplaod 미들웨어로 분할) 즉, videoRouter는 videoUpload 미들웨어를 사용한다.

- export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
  files: 50000000,
  }
  })
- limits <- 파일 업로드 크기 제한

3. videoController.js 파일의 postUplaod 컨트롤러 및 Video 모델 수정
   postUpload

- const file = req.file; <- file 상수 추가
- video생성 시 fileUrl 생성부분 추가
- fileUrl: file.path
  Video.js
- videoSchema의 구성요소 중 fileUrl 추가
- fileUrl: {type: String, required: true}

4. watch.pug 파일 수정

- video(src=`/${video.fileUrl}`, controls)
- watch.pug는 videoController의 watch 컨트롤러가 렌더한다. watch컨트롤러에서는 video모델에서 시청하고자 하는 video의 id를 찾아 video Object를 video상수에 저장한 후 watch페이지 렌더링 시 video Object를 반환한다.
- video태그의 controls속성을 사용하면 video를 컨트롤 할 수 있는 controller를 사용할 수 있다.

* ES6 Tips!!!

- const {path:fileUrl} = req.file;
- req.file.path에서 path를 빼낸 후 path를 fileUrl이란 상수의 이름으로 사용하겠다. 즉, fileUrl은 req.file.path가 된다.

  8.10 ~ 8.11
  8.10
  Video model에는 누가 video를 업로드했는지 확인하기 위해 owner 항목 추가
  User model에는 사용자가 가지고 있는 video를 확인하기 위해 video list 추가
  즉, video 모델은 owner 하나만 가져야 하고, user 모델은 여러 개의 video를 가질수 있게 만든 후 user 모델과 video 모델을 연결한다.

base.pug의 `/users/${loggedInUser._id}`(나의 프로필)로 접속하기위해 라우터 및 컨트롤러 생성

userRouter.get("/:id", see);

- seeController은 누구나 접근 가능해야 하기에 id를 세션이 아닌 params에서 가져온다.

  8.11
  user모델과 video 모델 연결

1. video 모델에 owner 속성 추가

- type:ObjectId는 JS에서 지원하지 않기에 mongoose의 ObjectID type을 이용한다.
- type; mongoose.Schema.Types.ObjectId
- owner의 ref 속성은 어떤 model과 연결할지 설정할 때 사용하는 속성이다. 즉, mongoose에게 owner 속성이 어떤 model(여기서는 User)의 objectId라고 명시한다. 즉, 여기서는 User모델과 Video모델을 연결하기에 ref="User"라고 명시한다.(User모델은 User스키마를 "User"라는 이름으로 export한다. 즉, export한 모델 이름을 적어준다.)

2. postUpload 컨트롤러에서 render할 때 user 정보 보내기

- const {user} = req.session;
- Video 모델의 정보를 create할 때 owner: \_id 추가(owner속성은 required)

3. 해당 영상의 주인이 아니라면 edit 링크와, delete 링크 숨기기
   watch.pug 파일

- if(String(loggedInUser.\_id) === String(video.owner))
  띄어쓰기 a(href=`${video.id}/edit`) Edit Video &rarr;
  띄어쓰기 br
  띄어쓰기 a(href=`${video.id}/delete`) Delete Video &rarr;
- String(매개변수) <- 매개변수의 값을 문자열로 변환한다.(loggedInUser.\_id와 video.owner의 형식이 서로 다르기 때문에 문자열로 변환 후 비교한다.)

4. 해당 영상을 소유한 user 찾기
   videoController.js 파일에서 User 모델을 import한다.

- improt User from "../model/User.js"
- const owner = await User.findById(video.owner);

5. watch 컨트롤러에서 동작이 끝낸후 렌더할 때 찾은 user(owner) 같이 보내기

- if(video){
  return res.render("watch", {pageTitle: video.title, video, owner})
  }

6. watch.pug 파일에 동영상 소유자 명시

- div
- 들여쓰기 small Uploaded by #{owner.name}

* videoController.ks 파일의 postUpload Controller

- req.session.user는 현재 로그인된 사용자이다.
- try문에서 Video를 생성할 때 owner를 만들어주는데 owner의 속성(\_id)는 현재 로그인된 사용자의 id(req.session.user.\_id)이다. 즉, video의 owner로 현재 로그인 중인 유저의 id를 사용한다. 즉, 로그인한 후 video를 업로드하면 업로드한 사람의 id가 video의 owner가 된다.
