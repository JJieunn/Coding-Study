# TypeScript CRUD Example

## 📍 소개
- Coding Study 2번 과제
- TypeScript와 TypeORM으로 구현한 post CRUD 간단 예제입니다.

<br />

## 📍 프로젝트 구조
```
📦.
 ┣ 📂db
 ┣ 📂src
 │    ┣ 📂configs
 │    ┣ 📂dto
 │    ┣ 📂entities
 │    ┣ 📂routes
 │    ┣ 📂middlewares
 │    ┣ 📂controllers
 │    ┣ 📂services
 │    ┣ 📂models
 │    ┣ 📜app.ts
 │    ┗ 📜server.ts 
 │
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜tsconfig.json
```
<br />

## 📍 적용 기술
- 사용 언어 : `TypeScript`
- 프레임워크 : `Express`
- 런타임 환경 : `Node.js`
- 데이터베이스 : `MySQL`
- ORM : `TypeORM`

<br />

## 📍 개인 목표
- TypeScript로 간단한 CRUD 구현
- TypeORM의 entity, createQueryBuilder 활용
  - TypeORM의 대표적인 특징인 createQueryBuilder 기능 
  - 지난 3차 기업 과제에서 사용했던 TypeORM을 한번 더 사용함으로 익숙해지기 위함
- asyncWrap으로 controller에서 반복되는 try - catch 분리
  - 그동안 부족했던 에러 핸들링과 코드 분리를 좀 더 연습해보기 위함

<br />

## 📍 구현 기능 
- DTO를 이용해 req로 들어오는 data의 타입 지정
- 로그인 기능이 없어 대신 headers에 userId 값을 넣었으며, 이 값이 저장될 user_id column의 type과 맞추고자 Number() 사용
- TypeORM의 DataSource로 DB connection, entity 연동
- createQueryBuilder를 이용해 게시글 CRUD 구현
- Forbidden, Not Found 에러 처리를 위해 Error 클래스를 extends 시켜 별도의 파일에 분리 
- 특정 게시글 정보, 수정, 삭제 할 때 postId를 기준으로 게시글을 count 하여 '0'일 경우 해당 게시글이 없다 판단하여 404 Not Found 에러 처리
- 게시글 수정, 삭제할 때 userId 값과 postId 값을 모두 조건으로 하는 게시글을 count 하여 '0'일 경우 글에 대한 권한이 없다고 보고 403 Forbidden 에러 처리

<br /> 

## 📍 문제 - 해결
- **[문제1: 에러 핸들링]**
  - JavaScript와 달리 name, message, (stack)으로 정해진 Error interface에 statusCode를 추가할 수 없던 문제
<img width="311" alt="const err = new Error (POST NOT EXIST)" src="https://user-images.githubusercontent.com/108418225/197773271-a8a88072-3e86-4b85-a745-4dd60b91b411.png">

- **[해결1: Error extends]** 
  - class Error를 확장(extends)하여 createError 파일로 분리, 사용 

---
<br />

- **[문제2: any 타입의 사용]** 
  - TypeScript 이해 부족인 상황, catch의 err의 type 주석, service단 함수 결과값의 객체 속성 문제로 무분별하게 any 타입이 사용됨 
<img width="408" alt="await postServ" src="https://user-images.githubusercontent.com/108418225/197774861-75a8bf4e-342f-41bb-ac05-a43f614d610d.png">
<img width="408" alt="image" src="https://user-images.githubusercontent.com/108418225/197776560-ac183ad7-4775-4913-a9f3-a1c491d20787.png">

- **[해결2: asyncWrap 사용, throw Error 이동]** 
  - 마침 반복되는 try - catch 또한 문제였던 상황이라 catch의 err는 asyncWrap으로 하나의 파일에 분리하여 any 사용을 줄이고 유효성 검증에 쓰이는 throw error는 model단의 해당 함수 내부로 이동, 타입의 문제를 없앰

---
<br />

- **[문제3: FK column에 값이 INSERT 되지 않음]** 
  - user_id 관계가 생긴 것이 posts description에 보임에도 해당 값이 INSERT 되지 않는 문제
<img width="400" alt="image" src="https://user-images.githubusercontent.com/108418225/197779268-663b32e0-be5b-4573-95c3-5a6985aaa517.png">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/108418225/197779930-a9c640e5-9e1f-423f-91a3-643a102603b0.png">

- **[해결3: 동일한 이름의 별도 column 설정이 필요]** 
<img width="400" alt="user 1d number" src="https://user-images.githubusercontent.com/108418225/197778958-45f63218-3644-49c1-b973-0801b0f7f9e7.png">
<img width="398" alt="image" src="https://user-images.githubusercontent.com/108418225/197780454-f8b4bc19-58d3-47dc-9c1a-10904551e137.png"> 

  - @ManyToOne과 @JoinColumn으로 만든 것은 참조 관계를 형성시켜주는 것이고 실제로 값이 들어가기 위해선 동일한 명칭의 @Column user_id가 필요함 

---
<br />

- **[더 고민해봐야 할 문제]**
  - updateData가 일부 속성만 들어올 때의 update 처리
  - createQueryBuilder를 사용할 때, created_at의 DATE_FORMAT, JOIN 테이블의 column 값(user.nickname) 같이 조회하는 방법
  - entity 속성에 타입 assertion 문제
