### 背景

目前队内新项目，我们都使用了自己的公共库、自己一套的 `eslint` 规范及 `git commit` 相关的检查，如果有新项目我们还要从老的项目一个一个把配置拷贝过来，效率比较低。

为了解决这些痛点，我们需要有自己的脚手架，帮我们完成这些耗时的工作。

为什么需要脚手架？主要有 3 点原因：

- 减少重复性的工作，不再需要复制其他项目再删除无关代码，或者从零创建一个项目和文件
- 根据交互动态生成项目和配置文件等
- 多个协作更为方便，不需要所文件传来传去

### 调研

![](http://www.longstudy.club/100/ztjy01.png)

### 安装

```
npm install --global ztjy-cli
```

### 命令使用

**查看版本**

```
ztjy -v  或 ztjy --version
```

**查看当前模板**

```javascript
ztjy ls
```

![](http://www.longstudy.club/100/ztjy02.png)

说明：

**如果是公司内网环境选择使用不带 github 开头的模板**

**初始化项目**

我们可以使用 `init` 命令选择一个模板来初始化我们新的项目。

```
ztjy init
```

执行 `init` 首先会让用户选择一个模板初始化，如果是公司内网选择不带 `github` 开头模板

![](http://www.longstudy.club/100/ztjy03.png)

选择对应的模板后，接着会让用户填写项目的名称及版本，对应 `package.json` 中的 `name` 和 `description`，如下所示：

![](http://www.longstudy.club/100/ztjy05.png)

> **注意**:如果下载失败，可能原因是网络问题，可以多执行多次试试。

下载成功后，在当前目录下就可以看到我们指定的 `my-vue-template` 项目。

**添加模板**

如果现有模板没有我们想要的，我们可以 `add` 命令添加新的模板：

```
ztjy add
```

![](http://www.longstudy.club/100/ztjy06.png)

执行 `add` 命令后，依次会让我们输入项目的名称、描述及下载 地址。

这里的下载地址需要符合指定的格式，模板是使用 `download-git-repo` 库下载的，所以具体的地址格式可以参考：

https://gitlab.com/flippidippi/download-git-repo

**删除模板**

如果模板已经不需要了，我们可以使用 `del` 命令删除：

```javascript
ztjy del 模板名称
```

![](http://www.longstudy.club/100/ztjy07.png)

### 三方库介绍

```javascript
<!-- 终端样式库 -->
"chalk": "^3.0.0",
<!-- 命令行交互 -->
"commander": "^5.0.0",
<!-- 从git拉模板 -->
"download-git-repo": "^3.0.2",
<!-- fs操作拓展 -->
"fs-extra": "^9.0.0",
<!-- 模板引擎 -->
"handlebars": "^4.7.3",
<!-- 命令行交互 -->
"inquirer": "^7.1.0",
<!-- 加载效果，图标 -->
"ora": "^4.0.3"
```
