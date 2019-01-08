# hexo-helper-live2d

[![npm package][npm-package]][npm-package-url]
[![dependencies][dependencies]][dependencies-url]
[![devDependencies][devDependencies]][devDependencies-url]

[![downloads-total][downloads-total]][downloads-total-url]
[![downloads-month][downloads-month]][downloads-month-url]

[![stars][stars]][stars-url]
[![forks][forks]][forks-url]
[![issues][issues]][issues-url]

[![commitizen][commitizen]][commitizen-url]
[![PRs][PRs]][PRs-url]
[![license][license]][license-url]

阅读本文档的其他语言版本: [English](README.md), [简体中文](README.zh-CN.md).

<br>

向你的Hexo里放上一只萌萌哒二次元看板娘!

演示: [https://l2dwidget.js.org/dev.html](https://l2dwidget.js.org/dev.html)

原作大大的博客: [https://huaji8.top/post/live2d-plugin-2.0/](https://huaji8.top/post/live2d-plugin-2.0/)

## 安装

### Hexo

安装模块:

```bash

npm install --save hexo-helper-live2d

```

> 试试 `yarn add hexo-helper-live2d`, 据说高能的yarn会比垃圾npm少很多麻烦呢。
[Yarn](https://yarn.bootcss.com/)

<details><summary>仍在使用老版本?</summary><br>

- 如果您想使用最近的注入模式(将会在每个页面上显示):

请从 `layout/layout.ejs` 或 `layout/_layout.swig` 中删掉 `</body>` 前的
`{{ live2d() }}` 或 `<%- live2d() %>`.

- 如果您想使用旧的标签模式(仅替换 `live2d` 标签):

请保留`{{ live2d() }}` 或 `<%- live2d() %>`, 并将 `tagMode` 设置为 `true`.

我们推荐您使用 `npm install --save hexo-helper-live2d@3.x` 来强制安装最新版本.

</details>

<details><summary>标签模式</summary><br>

请在您想插入的页面的 `</body>` 前插入 `{{ live2d() }}`(swig) 或 `<%- live2d() %>`(ejs). 将 `tagMode` 设置为 `true`, 然后插件将只会在拥有live2d标签的页面出现.

</details>

### 其他的, for jekyll, wordpress, etc

参阅 [live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js) 仍在编写中.

## 配置

请向Hexo的 `_config.yml` 文件或主题的 `_config.yml` 文件中添加配置.

示例:

``` yml
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    use: live2d-widget-model-wanko
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true
```

## 详细的设置

设置分为helper特有的和公共的, 你需要把他们合并放到 `_config.yml` 中.

### helper特有

``` yml
# Live2D
## https://github.com/EYHN/hexo-helper-live2d
live2d:
  enable: true
  # enable: false
  scriptFrom: local # 默认
  pluginRootPath: live2dw/ # 插件在站点上的根目录(相对路径)
  pluginJsPath: lib/ # 脚本文件相对与插件根目录路径
  pluginModelPath: assets/ # 模型文件相对与插件根目录路径
  # scriptFrom: jsdelivr # jsdelivr CDN
  # scriptFrom: unpkg # unpkg CDN
  # scriptFrom: https://cdn.jsdelivr.net/npm/live2d-widget@3.x/lib/L2Dwidget.min.js # 你的自定义 url
  tagMode: false # 标签模式, 是否仅替换 live2d tag标签而非插入到所有页面中
  debug: false # 调试, 是否在控制台输出日志
  model:
    use: live2d-widget-model-wanko # npm-module package name
    # use: wanko # 博客根目录/live2d_models/ 下的目录名
    # use: ./wives/wanko # 相对于博客根目录的路径
    # use: https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json # 你的自定义 url
```

### General Settings

最近由于正在积极开发, 可能会有所变动. 不过安啦, 不会有太太太大幅度的修改.

参阅 [live2d-widget.js API](https://l2dwidget.js.org/docs/class/src/index.js~L2Dwidget.html#instance-method-init)

示例:

```yml
# Live2D
## https://github.com/xiazeyu/live2d-widget.js
## https://l2dwidget.js.org/docs/class/src/index.js~L2Dwidget.html#instance-method-init
live2d:
  model:
    scale: 1
    hHeadPos: 0.5
    vHeadPos: 0.618
  display:
    superSample: 2
    width: 150
    height: 300
    position: right
    hOffset: 0
    vOffset: -20
  mobile:
    show: true
    scale: 0.5
  react:
    opacityDefault: 0.7
    opacityOnHover: 0.2
```

## 模型

有许多方法来使用不同的模型:

### a. live2d_models子目录名称

1. 在您博客根目录下创建一个 `live2d_models` 文件夹.

2. 在此文件夹内新建一个子文件夹.

3. 将你的 Live2D 模型复制到这个子文件夹中.

4. 将子文件夹的名称输入 `_config.yml` 的 `model.use` 中.

<details><summary>示例</summary><br>

你的模型叫 `mymiku`.

在博客根目录 (应当有 `_config.yml` 、`sources` 、 `themes` ) 新建名为 `mymiku` 的子文件夹.

将模型复制到 `/live2d_models/mymiku/` 中.

现在, 在这里应当有一个 `.model.json` 文件 (例如 `mymiku.model.json`)

在 `/live2d_models/mymiku/` 中.

将 `mymiku` 输入到位于 `_config.yml` 的 `model.use` 中.

</details>

### b. 相对于博客根目录的自定义路径

您可直接输入**相对于博客根目录**的自定义路径到 `model.use` 中.

示例: `./wives/wanko`

### c. npm 模块名

#### 使用现有的

我们有许多现有的模型, [来看看](https://github.com/xiazeyu/live2d-widget-models)

<details><summary>点我如果你不想跳转</summary><br>

- `live2d-widget-model-chitose`
- `live2d-widget-model-epsilon2_1`
- `live2d-widget-model-gf`
- `live2d-widget-model-haru/01` (use `npm install --save live2d-widget-model-haru`)
- `live2d-widget-model-haru/02` (use `npm install --save live2d-widget-model-haru`)
- `live2d-widget-model-haruto`
- `live2d-widget-model-hibiki`
- `live2d-widget-model-hijiki`
- `live2d-widget-model-izumi`
- `live2d-widget-model-koharu`
- `live2d-widget-model-miku`
- `live2d-widget-model-ni-j`
- `live2d-widget-model-nico`
- `live2d-widget-model-nietzsche`
- `live2d-widget-model-nipsilon`
- `live2d-widget-model-nito`
- `live2d-widget-model-shizuku`
- `live2d-widget-model-tororo`
- `live2d-widget-model-tsumiki`
- `live2d-widget-model-unitychan`
- `live2d-widget-model-wanko`
- `live2d-widget-model-z16`

</details>

你需要先使用 `npm install 模型的包名` 来安装,

然后将包名输入位于 `_config.yml` 的 `model.use` 中.

#### 发布你自己的模型包

- 新建一个目录, 用你的Node环境执行 `npm init`, 我们推荐您使用 `live2d-widget-model-xxx` 的包名.

- 在刚刚创建的目录下创建 `assets` 子目录, 把你的模型放进去.

示例:

[live2d-widget-model-wanko](https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko)

- 使用 `npm publish` 来发布.

- 然后使用 `npm install --save live2d-widget-model-xxx` 来安装,

然后你就可以通过向 `model.use` 键入包名 (`live2d-widget-model-wanko`) 来使用了.

### d. 你的CDN

如果你是没有CDN会死星人,直接将 `.model.json` 的url地址输入 `model.use`.

<br>

干杯!:beer:

3.0 版终于来啦~祝大家新年快乐~

> 这是我的第一个Hexo插件, star :star: and watch :eyeglasses:, pull request 欢迎各位的 contribution.

## 截图

[TBD.](https://huaji8.top/post/live2d-plugin-2.0/)

## 贡献

### 请在提交Issue, 特别是PR前仔细阅读

这份文档可能会帮到你很多.

[CONTRIBUTING](.github/CONTRIBUTING.md)

## 相关项目

- [live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js)

- [live2d-widget-models](https://github.com/xiazeyu/live2d-widget-models)

- [Cubism SDK WebGL 2.1](http://sites.cybernoids.jp/cubism-sdk2_e/webgl2-1)

## 贡献者

![contributors][contributors]

## 关于我

[![author][author]][author-url]
[![author QQ][author-qq]][author-qq-url]
[![author email][author-email]][author-email-url]

[![collaborator0][collaborator0]][collaborator0-url]
[![collaborator0 QQ][collaborator0-qq]][collaborator0-qq-url]
[![collaborator0 email][collaborator0-email]][collaborator0-email-url]

## 依赖

[![current-device][current-device]][current-device-url]

<br>

在 GPL v2.0 license 下开源.

[npm-package]: https://badge.fury.io/js/hexo-helper-live2d.svg?label=hexo-helper-live2d
[npm-package-url]: https://www.npmjs.com/package/hexo-helper-live2d

[dependencies]: https://img.shields.io/david/EYHN/hexo-helper-live2d.svg
[dependencies-url]: javascript:void(0);

[devDependencies]:  https://img.shields.io/david/dev/EYHN/hexo-helper-live2d.svg
[devDependencies-url]: javascript:void(0);

[downloads-total]:  https://img.shields.io/npm/dt/hexo-helper-live2d.svg
[downloads-total-url]: https://www.npmjs.com/package/hexo-helper-live2d

[downloads-month]: https://img.shields.io/npm/dm/hexo-helper-live2d.svg
[downloads-month-url]: https://www.npmjs.com/package/hexo-helper-live2d

[stars]: https://img.shields.io/github/stars/EYHN/hexo-helper-live2d.svg
[stars-url]: https://github.com/EYHN/hexo-helper-live2d/stargazers

[forks]: https://img.shields.io/github/forks/EYHN/hexo-helper-live2d.svg
[forks-url]: https://github.com/EYHN/hexo-helper-live2d/network

[issues]: https://img.shields.io/github/issues/EYHN/hexo-helper-live2d.svg
[issues-url]: https://github.com/EYHN/hexo-helper-live2d/issues

[commitizen]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

[PRs]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[PRs-url]: http://makeapullrequest.com

[license]: https://img.shields.io/github/license/EYHN/hexo-helper-live2d.svg
[license-url]: https://github.com/EYHN/hexo-helper-live2d/blob/master/LICENSE

[author]: https://img.shields.io/badge/author-cneyhn-green.svg
[author-url]: https://delusion.coding.me/

[author-qq]: https://img.shields.io/badge/QQ-1106996185-blue.svg
[author-qq-url]: tencent://message/?uin=1106996185&Site=Senlon.Net&Menu=yes

[author-email]: https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg
[author-email-url]: mailto:cneyhn@gmail.com

[collaborator0]: https://img.shields.io/badge/collaborator-xiazeyu-green.svg
[collaborator0-url]: https://xiazeyu.coding.me/

[collaborator0-qq]: https://img.shields.io/badge/QQ-2320732807-blue.svg
[collaborator0-qq-url]: tencent://message/?uin=2320732807&Site=Senlon.Net&Menu=yes

[collaborator0-email]: https://img.shields.io/badge/Emali%20me-xiazeyu_2011@126.com-green.svg
[collaborator0-email-url]: mailto:xiazeyu_2011@126.com

[current-device]: https://img.shields.io/npm/v/current-device.svg?label=current-device
[current-device-url]: https://github.com/matthewhudson/current-device

[contributors]: https://opencollective.com/hexo-helper-live2d/contributors.svg?width=890&button=true
