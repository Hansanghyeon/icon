## app (App)

[sidv93/react-ts-lib: Component library setup with React, Typescript and Rollup](https://github.com/sidv93/react-ts-lib) rollup 보일러플레이트를 사용해서 아이콘 jsx를 라이브러리화

## gen (Generator)

아이콘은 항시 바뀔 수있고 원본은 SVG 파일이기 때문에 SVG 파일을 통해서 react 컴포넌트를 만들 수 있는 자동화를 구축

다른 패키지들은 모두 esm을 사용한다. 하지만 generator에서는 commonJS를 사용하기 때문에 프로젝트를 분리하였다.

- [@svgr/core](https://github.com/gregberge/svgr)
  - react typescript 형식으로 변환
- plop을 이용한 generator
  - https://stackoverflow.com/questions/20280601/insert-html-in-a-handlebar-template-without-escaping
    - hbs를 이용해서 html을 바로 템플릿으로 변경할때 escaping된다. `{{{}}}`을 이용해서 재대로 출력할 수 있게 된다.
  - hygen은 여러 파일을 템플릿을 통해 만들어내는 것이 안된다.
    - https://github.com/jondot/hygen/issues/322

### using

```bash
yarn generate
# alias yarn gen
```

### copy로 사용할 데이터

icons 프로젝트에서 copy데이터에 필요

### update

1. `assets/` 경로에 svg를 넣는다
2. `lib`안에 components 를 삭제한다
3. yarn gen 후 svg-tsx 선택, yarn gen 후 svg-copy-data를 선택한다.
4. yarn build
5. yarn publish --message="feat(0.2.2): arrow-narrow-left 추가" => message내용과 버전 다르게
6. app-icon 으로 가서 yarn dev를 하여 업데이트가 되었는지 확인