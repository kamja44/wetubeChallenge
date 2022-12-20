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
