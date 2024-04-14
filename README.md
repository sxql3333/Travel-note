# 项目介绍

该项目包括两个主要模块：游记发布与展示的用户系统和内容合规的审核管理系统。
1.用户系统是一个 App 移动端项目，用户可以发布自己的游记，并查看和分享所有已成功审
核通过的游记。
2.审核管理系统是一个 PC 站点，具备不同角色的用户可以对用户发布的游记进行审核检
查、删除等操作。这个系统主要用于在游记上线之前对内容进行合规性的审核。

# 上手指南

安装步骤

1.克隆仓库

```
https://github.com/sxql3333/Travel-note.git
```

2.运行服务端

```
cd server
npm start
```

3.运行审核管理系统

```
cd Travel-note-management
npm start
```

4.运行App端

```
cd TravelApp
npm start
```

5.（如需）解决虚拟机与本地电脑桥接问题

```
adb reverse tcp:5000 tcp:5000
```

# 目录结构描述

├── readme.md           // 说明文档

├── server     // 后端文件夹

├── Travel-note-management     // 审核管理系统

├──TravelApp   //旅行游记App

# 构建工具

[React.js](https://react.dev/)

[Expo](https://expo.dev/)

[React Native ](https://expo.dev/)

[Node](https://nodejs.p2hp.com/learn)

[MongoDB](https://mongodb.net.cn/manual/)
