---
title: "什么是Npx"
date: "2022-07-17"
---


## 关于 npx：

npx 可以自动帮助我们在命令行里执行包的命令，比如我们需要通过 create-react-app 创建一个 react 项目，我们会这样：

``` javascript
npm install -g create-react-app
create-react-app my-app
```

如果我们使用 npx 可以直接这样：

``` javascript
npx create-react-app my-app
```

这条命令会临时帮助安装 create-react-app 包，命令完成后create-react-app 会删掉，不会出现在 global 中。下次再执行，还是会重新**临时安装**。注意：命令执行完成后就会自动删除该包。<br />过程就是 `npx` 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 `PATH` 里找。如果依然找不到，就会帮你临时安装！
