# egg-v3-ts-template

基于`egg.js@3`精心打造的TS项目模板。

## 背景

时至今日，egg项目的维护青黄不接，`v4`版本虽然很期待但始终难产，核心维护者只剩下苏千大佬一人。笔者一直习惯了egg的写法，不太喜欢`nest.js`或`midway.js`的依赖注入，但是目前的官方模板有一些问题：

* 按照官网的意思，v3版本单独指向了一个地址，那么意味着 eggjs.org 指向的是应该是v4版本，但其实文档还是v3的；
* 按照官网提示`npm init egg --type=simple`安装的项目是tegg@4版本，这个版本缺乏相关文档；
* npm上面`egg@latest`版本仍然是`v3`，`egg@4`仅靠一个带着上百人团队的P9大佬亲自贡献代码，实在是等不及也不敢等；

所以基于v3版沉淀一个自己常用的TS项目模板，包含了路由注解、参数注入、数据库ORM等部分，已在多个生产级别项目中应用，可放心使用。

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 16.x
- Typescript 4.x