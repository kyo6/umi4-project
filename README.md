# README

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://umijs.org/docs/max/introduce)


本文章以UMI搭建React项目为背景：详细介绍Umi(+Husky+Commitlint+Changelog)整个流程：

![x.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97925a06c4704059a07169f84e39eb6e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=851&h=841&s=97102&e=png&a=1&b=fcfcfc)

## 一、准备

1.  包管理器：npm,yarn,pnpm均可 搭建项目时，本人使用的node和各包管理器版本如下：推荐使用`pnpm`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0b0aac6c923435497272fe57d041f1f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=178&h=357&s=12376&e=png&b=181818)

2.  UMI版本：[`UMI3`官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fv3.umijs.org%2Fzh-CN%2Fdocs%2Fgetting-started "https://v3.umijs.org/zh-CN/docs/getting-started")
    
    创建一个空文件夹，执行命令
    

```sql
pnpm dlx @umijs/create-umi-app
```

## 二、安装依赖

-   安装依赖

```
pnpm install
```

-   初始化仓库

```csharp
git init
```

当使用`git init`初始化仓库时，会生成一个`.git`文件目录，并且在`·git/hooks`中生成钩子示例脚本，进入`.git/hooks`后会看到客户端钩子的官方示例，他们都是以`.sample`结尾的文件名。本文章重点用到的则是客户端钩子中的`pre-commit`(提交代码前检验)和`commit-msg`(代码提交信息校核)，其他钩子详情见[git钩子官网](https://link.juejin.cn/?target=https%3A%2F%2Fgit-scm.com%2Fbook%2Fzh%2Fv2%2F%25E8%2587%25AA%25E5%25AE%259A%25E4%25B9%2589-Git-Git-%25E9%2592%25A9%25E5%25AD%2590 "https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90")

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f210567282b406eb4dfb541717684d1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=347&h=402&s=22603&e=png&b=181818)

~如果手动将钩子文件后缀删掉(如：将`pre-commit.sample`改为`pre-commit`)，那么每次commit的时候都会触发pre-commit钩子，~ 流程如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/916183b5f5904c6b9e472d0d8d75b4d8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=800&h=360&s=41646&e=png&b=18141d)

**注意：其他协作者克隆仓库时，客户端钩子不会被克隆下来** 原因如下官方文档截图，也就是说这样手动修改后缀名只能在本地使用，因为`.git`文件不会提交到远程仓库，所以这里我们不用git自带的gitHooks，使用`Husky`代替gitHooks ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/231542e717e84407b25c30bed2c53499~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=884&h=218&s=28788&e=png&b=fcfcf9)

## 三、安装`Husky`

```sql
pnpm add --save-dev husky
```

init命令生成husky配置（注意：`husky v9`版本才有lint命令，同时版本不同，生成的配置文件有区别，差异在[Husky官网](https://link.juejin.cn/?target=https%3A%2F%2Ftypicode.github.io%2Fhusky%2Fget-started.html "https://typicode.github.io/husky/get-started.html")有介绍）

```bash
pnpm exec husky init
```

该命令做了以下事情：

1.  生成`.husky/` 文件，并在其目录创建了 `pre-commit` 脚本文件；

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/721eda2255cd4a3cabc2b536e061e805~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=589&h=88&s=2997&e=png&b=181818)

2.  将 `git config core.hooksPath` 指向了 `.husky/_`（意思就是`.husky`接管了`.git/hooks`）
3.  并更新 `package.json` 中的 `prepare: husky` 脚本

-   添加自定义pre-commit脚本 ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3656b7453894da6a0bf5ea9cbae4a85~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1477&h=279&s=41948&e=png&b=1e1e1e) 那么这样就可以在提交代码的时候对暂存区的代码做自定义操作了

## 四、配置 eslint、stylelint、prettier

[umi-fabric](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40umijs%2Ffabric "https://www.npmjs.com/package/@umijs/fabric")一个包含 prettier，eslint，stylelint 的配置文件合集（如果公司内部制定了一套标准，可模仿下面步骤安装依赖或者直接在配置文件中添加配置）

**1\. 安装依赖**

```sql
pnpm add @umijs/fabric -D
```

删除初始化umi项目时自动生成的`.prettierrc`

添加 `.eslintrc.js`

```java
module.exports = {
  extends: require.resolve('@umijs/fabric/dist/eslint'),
}
```

添加 `.stylelintrc.js`

```java
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/stylelint')],
}
```

添加 `.prettierrc.js`

```java
const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
};
```

**2\. 配置lint-staged**

在package.json中添加如下配置：

```json
"lint-staged": {
    "*.{js,jsx,less,md,json}": [
      "prettier --write"
    ],
    "*.{less,css,html}": [
      "stylelint --fix"
    ],
    "*.ts?(x)": [
      "prettier --parser=typescript --write",
      "eslint --fix"
    ]
  },
```

**3\. 验证git commit，是否触发代码校验**

这里修改了一个less和一个tsx文件，commit的时候就对tsx文件做了eslint校验，对less文件做了stylelint校验： ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09aaf2c68fb9439c9e739be0c7345587~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1600&h=945&s=157863&e=png&b=1c1c1c)

_**ps: 如果这个过程有报错，或者缺少依赖，则根据相应报错处理就行了，值得注意的是eslint\\stylelint\\prettier大版本号得与@umijs/fabric依赖的版本号对应上**_

最新版本都有较大的Breaking Change，例如：

-   `eslint v9.x`使用[新的默认配置格式 (`eslint.config.js`)](https://link.juejin.cn/?target=https%3A%2F%2Feslint.nodejs.cn%2Fdocs%2Flatest%2Fuse%2Fmigrate-to-9.0.0%23flat-config "https://eslint.nodejs.cn/docs/latest/use/migrate-to-9.0.0#flat-config")，[Node.js < v18.18、v19 不再支持](https://link.juejin.cn/?target=https%3A%2F%2Feslint.nodejs.cn%2Fdocs%2Flatest%2Fuse%2Fmigrate-to-9.0.0%23drop-old-node "https://eslint.nodejs.cn/docs/latest/use/migrate-to-9.0.0#drop-old-node")等等
-   `stylelint v16.x`也有[重大变更](https://link.juejin.cn/?target=https%3A%2F%2Fstylelint.io%2Fmigration-guide%2Fto-16%23breaking-changes "https://stylelint.io/migration-guide/to-16#breaking-changes")
-   `prettier`[官网](https://link.juejin.cn/?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Fconfiguration "https://prettier.io/docs/en/configuration")

因此@umijs/fabric安装成功后，可去node\_modules看看相应相关依赖的版本 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edc55bd65e3c49778c72a17975076ec5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1087&h=642&s=108001&e=png&b=1d1d1d)

**4\. vscode安装对应插件**

安装以下三个插件

-   最新版本Eslint插件内置的默认配置已经够用了，基本无需额外配置

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1b5b95467414db5a6dae89ba45d3488~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=581&h=89&s=9553&e=png&b=043a5e)

-   Stylelint 默认只对css、postcss做校验，因此需要额外配置`stylelint.validate`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5839215ee86d48da8be076f097166992~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=585&h=93&s=9945&e=png&b=043a5e)

-   Prettier：如果当前本地项目没有安装 prettier 包，或者也没有 prettier 配置文件，那么 VSCode 会使用 prettier-vscode 插件捆绑的 prettier 的默认格式化选项（前提得配置默认格式化程序为Prettier）。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d0c94cb4ca44c5c92a1278197a83d8f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=676&h=93&s=9937&e=png&b=043a5e)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d512193d334641059a9f0a6470e92d89~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1046&h=266&s=27631&e=png&b=232323)

settings.json添加如下配置

```json
{
  // 保存时自动格式化
  "editor.formatOnSave": true,
  // 默认格式化工具（这里是prettier）
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 保存时其他操作（这里是分别做eslint和stylelint校验）
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
  // stylelint相关配置
  "stylelint.validate": ["css", "less", "postcss", "scss", "sass", "vue"],
}
```

**到目前为止，其实就是保证了git commit在pre-commit阶段时，通过一套共同的标准：prettier对代码做格式化、eslint校验.ts/js(x)、stylelint校验样式文件，全都校验通过才会commit成功**

那么接下来就去配置commit-msg钩子

## 五、安装commitizen

使用commitizen的目的是规范化提交信息。

全局安装

```csharp
pnpm add commitizen -g
```

添加`cz-conventional-changelog`适配器

```css
commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact
```

成功后，会在package.json中生成如下配置

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fa64d07876743b5a5346a321b8f5879~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=795&h=120&s=7399&e=png&b=1f1f1f) 具体操作可查看官网：[github.com/commitizen/…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fcommitizen%2Fcz-cli "https://github.com/commitizen/cz-cli")

这时就可用`git cz`替代`git commit`了，提交时有以下六个步骤：

### 1.选择提交类型(必填)

Select the type of change that you're committing: (Use arrow keys)  
选择要提交的更改类型：（使用箭头键）

|    类型    |                                                                                   描述                                                                                   |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|   feat   |                                                                           A new feature 新功能                                                                            |
|   fix    |                                                                               A bug fix                                                                                |
|   docs   |                                                                    Documentation only changes 仅文档更改                                                                    |
|  style   |                    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) 不影响代码含义的更改（空格、格式设置、缺少分号等）                    |
| refactor |                                             A code change that neither fixes a bug nor adds a feature 既不修复 bug 也不添加功能的代码更改                                             |
|   perf   |                                                           A code change that improves performance 提高性能的代码更改                                                            |
|   test   |                                                    Adding missing tests or correcting existing tests 添加缺失的测试或更正现有测试                                                    |
|  build   |              Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) 影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）               |
|    ci    | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) 对 CI 配置文件和脚本的更改（示例范围：Travis、Circle、BrowserStack、SauceLabs） |
|  chore   |                                                  Other changes that don't modify src or test files 不修改 src 或测试文件的其他更改                                                  |
|  revert  |                                                                   Reverts a previous commit 还原以前的提交                                                                    |

### 2.选择 scope 模块名(选填)

What is the scope of this change (e.g. component or file name): (press enter to skip)  
此更改的范围是什么（例如组件或文件名）：（按回车键跳过）

### 3.填写精炼的提交信息(必填)

Write a short, imperative tense description of the change (max 86 chars):  
写一个简短的祈使式时态描述（最多 86 个字符）：

### 4.填写补充信息(选填)

Provide a longer description of the change: (press enter to skip)  
提供更改的更详细描述：（按 Enter 键跳过）

### 5.选择是否有破坏性更新(默认no)

Are there any breaking changes?  
是否有任何重大更改？

### 6.是否关联是 open 状态的 issue(默认no)

Does this change affect any open issues?  
此更改是否会影响任何未解决的问题？

可以关闭 github issue，**但注意 commit 信息里面的末尾也要加 '(#issue编号)'** ，这样在 github 体验更好

## 六、commitlint 安装配置

上面提到了commitizen的目的是规范化提交，那么[commitlint](https://link.juejin.cn/?target=https%3A%2F%2Fcommitlint.js.org%2Freference%2Fconfiguration.html "https://commitlint.js.org/reference/configuration.html")就是检验是否遵守了提交约定，搭配`commit-msg`钩子使用，就可以校验提交信息了

```bash
pnpm add @commitlint/cli@17.0.0 @commitlint/config-conventional@17.0.0 -D

echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

echo 'pnpm commitlint --edit "$1"' > .husky/commit-msg
```

**注意版本问题：本项目使用的`@commitlint/cli`、`@commitlint/config-conventional`v17版本，高版本语法不兼容**

## 七、standard-version（自动生成changelog、打tag）

npm run \[version\] 更新版本号会添加一次提交，且 commit 信息就是版本号，不符合 commitizen 规范。[standard-version](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fstandard-version "https://github.com/conventional-changelog/standard-version") 就很好的解决了这个问题。安装后，只需要 npm run release，就可以有 npm run version 的功能，而且提交信息是标准的 commitizen 规范，而且自动生成 changelog 自动打 tag，自动 commit。你只需要 push 即可。

```csharp
pnpm add standard-version -D
```

scripts 设置

```json
// scripts
"release": "standard-version"
```

以下是执行release的过程，首先修改package.json的version号，追加commit记录到CHANGELOG.md，提交本次修改记录（会触发husky钩子函数）

```scss
$ pnpm release

> @0.0.3 release E:\Demo\umi-project-2
> standard-version

√ bumping version in package.json from 0.0.3 to 0.0.4
√ created CHANGELOG.md
√ outputting changes to CHANGELOG.md
√ committing package.json and CHANGELOG.md
[STARTED] Preparing...
[SUCCESS] Preparing...
[STARTED] Running tasks...
[STARTED] Running tasks for *.{js,jsx,less,md,json}
[STARTED] Running tasks for *.ts?(x)
[SKIPPED] No staged files match *.ts?(x)
[STARTED] prettier --write
[SUCCESS] prettier --write
[SUCCESS] Running tasks for *.{js,jsx,less,md,json}
[SUCCESS] Running tasks...
[STARTED] Applying modifications...
[SUCCESS] Applying modifications...
[STARTED] Cleaning up...
[SUCCESS] Cleaning up...

√ tagging release v0.0.4
i Run `git push --follow-tags origin master` to publish
```

需要注意的是：**CHANGELOG.md 是追加写入内容的，如果你之前没有对应的内容或删了之前的内容，会导致生成的内容较少，或者不完整。**

### release 特定版本，参考[standard-version](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fstandard-version "https://github.com/conventional-changelog/standard-version")文档

### 对于版本号信息，参考 [npm version](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.npmjs.com%2Fcli%2Fv7%2Fcommands%2Fnpm-version "https://docs.npmjs.com/cli/v7/commands/npm-version") 文档
