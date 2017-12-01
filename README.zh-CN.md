[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![devdeps][devdeps]][devdeps-url]

[![downloads][downloads]][downloads-url]
[![downloads-month][downloads-month]][downloads-month-url]

[![GitHub stars][GitHub stars]][GitHub stars-url]
[![GitHub forks][GitHub forks]][GitHub forks-url]
[![GitHub issues][GitHub issues]][GitHub issues-url]

[![Commitizen friendly][Commitizen friendly]][Commitizen friendly-url]
[![PRs Welcome][PRs Welcome]][PRs Welcome-url]
[![license][license]][license-url]



# hexo-helper-live2d

> 3.0 即将来临！
希望是2017年12月31日吧~

[English README](./readme.md) by [@gwzz](https://github.com/gwzz) & [@xiazeyu](https://github.com/xiazeyu)

<br>

为你的hexo添加色气满满的live2d吧！

崭新的示例和代码在线生成器: [https://eyhn.in/hexo-helper-live2d/](https://eyhn.in/hexo-helper-live2d/)

作者的示例: [https://huaji8.top/post/live2d-plugin-2.0/](https://huaji8.top/post/live2d-plugin-2.0/)


## Installation 食用方法

### Hexo

安装模块:

```
npm install --save hexo-helper-live2d
```

<details><summary>遇到npm的相关错误 ?</summary><br>

> 试试 `npm cache verify` 或 `npm cache clean` 呗~

</details>

<details><summary>使用过旧版本 ?</summary><br>

请删除在 `layout/layout.ejs` 或 `layout/_layout.swig` 文件内，位于 `</body>` 前的 `{{ live2d() }}` or `<%- live2d() %>` 。

</details>

### Webpack

<details><summary>当想要进行更高级的开发和使用时，请展开此节。</summary><br>

安装模块:

```
npm install --save hexo-helper-live2d
```

导入模块:

```
import loadlive2d from 'hexo-helper-live2d';

// TBD.
```

</details>


## Config 配置

在 hexo 的 `_config.yml` 中添加参数: 

示例:

``` yml
live2d:
  model: nipsilon
```


## Settings 配置项

``` yml
# Live2D
## https://github.com/EYHN/hexo-helper-live2d
live2d:
  model: z16 # 模型名称 默认值: z16
  width: 150 # 宽度 默认值: 150
  height: 300 # 高度 默认值: 300
  scaling: 1 # 分辨率缩放倍率 默认值: 2
  opacityDefault: 0.7 # 初始的透明度 默认值: 0.7
  opacityHover: 1 # 鼠标悬浮时的透明度 默认值: 1
  mobileShow: true # 是否在移动设备上显示 默认值: true
  mobileScaling: 0.5 # 移动设备缩放倍率 默认值: 0.5
  position: right # 模型左右侧放置位置 默认值: right
  horizontalOffset: 0 # 元素的水平偏移 默认值: 0
  verticalOffset: -20 # 元素的底部偏移 默认值: -20
  id: live2dcanvas # 元素的id 默认值: live2dcanvas
  deviceJsSource: local # current-device 脚本的来源 默认值: local
```

|选项|默认值|可选值|描述|
|:-----|:-----------:|:------------:|:----------|
|model|`z16`|*部分字符串* 见下方|模型名称|
|width|`150`|*实数*|模型宽度|
|height|`300`|*实数*|模型高度|
|scaling|`2`|*实数 1 = 100%*|分辨率缩放倍率 越大马赛克效应越小 **目前存在BUG，详细参考#32 在BUG解决前，请将数值设置为1**|
|opacityDefault|`0.7`|*实数 0 - 1*|初始的透明度 *(Beta)*|
|opacityHover|`1`|*实数 0 - 1*|鼠标悬浮时透明度 *(Beta)*|
|mobileShow|`true`|*`true` / `false`*|是否在移动设备上显示|
|mobileScaling|`0.5`|*实数 1 = 100%*|移动设备缩放倍率|
|position|`right`|*`left` / `right`*|模型左右侧放置位置 `left` 左 或 `right` 右|
|horizontalOffset|`0`|*实数*|水平方向偏移<br>如果嫌模型位置不正确 可以调整这个参数|
|verticalOffset|`-20`|*实数*|竖直方向偏移<br>如果嫌模型位置不正确 可以调整这个参数|
|id|`live2dcanvas`|*string*|元素的id|
|deviceJsSource|`local`|*`local` / `official` / `string`*|current-device 脚本的来源<br>你可以选择以下三种方式:<br>`local`: **默认 推荐** 使用本地来源，已使用webpack压缩。<br>`official`: 使用官方来源。 [https://unpkg.com/current-device/umd/current-device.min.js](https://unpkg.com/current-device/umd/current-device.min.js)<br>`(your CDN url path)`: 输入你的CDN地址。尾部需要包含 `.js`。|

<details><summary>当前支持的模型:</summary><br>

  - `chitose`
  - `Epsilon2.1`
  - `Gantzert_Felixander`
  - `haru01`
  - `haru02`
  - `haruto`
  - `hibiki`
  - `hijiki`
  - `izumi`
  - `koharu`
  - `miku`
  - `nico`
  - `ni-j`
  - `nipsilon`
  - `nito`
  - `shizuku`
  - `tororo`
  - `tsumiki`
  - `Unitychan`
  - `wanko`
  - `z16`

</details>

## Custom model 增加自己喜欢的模型

1. 在博客的根目录下新建 `live2d_models` 文件夹

2. 在此文件夹中以自定义模型的名称新建一个模型

3. 将你的模型复制到该文件夹下

**注意！模型json路径必须为  `/live2d_models/{name}/{name}.model.json`**

<details><summary>示例:</summary><br>

你的模型为 `mymiku`

那么在 `/` 目录下(即博客的安装目录，该目录下应存在 `_config.yml` 、`sources` 、 `themes` 等内容) 新建名为 `mymiku` 的文件夹

将你的模型复制到 `/live2d_models/mymiku/` 下

此时在 `/live2d_models/mymiku/` 下应存在 `mymiku.model.json` 文件

</details>

<br>~[(#22)](https://github.com/EYHN/hexo-helper-live2d/issues/22) 曾经和此问题有关。~

<br>

Enjoy!:beer:

> 我第一个hexo插件,点个star,点个watch吧,尽情地交pr吧。

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)


## Screenshots 截图

**注意！截图上方的名称可能非实际模型名，请进入“设置项”查看"model"的真实值**

<details><summary>Epsilon2.1</summary><br>

![](https://huaji8.top/img/live2d/Epsilon2.1.gif)

</details>
<details><summary>Gantzert_Felixander</summary><br>

![](https://huaji8.top/img/live2d/Gantzert_Felixander.gif)

</details>
<details><summary>haru</summary><br>

![](https://huaji8.top/img/live2d/haru.gif)

</details>
<details><summary>miku</summary><br>

![](https://huaji8.top/img/live2d/miku.gif)

</details>
<details><summary>ni-j</summary><br>

![](https://huaji8.top/img/live2d/ni-j.gif)

</details>
<details><summary>nico</summary><br>

![](https://huaji8.top/img/live2d/nico.gif)

</details>
<details><summary>nietzche</summary><br>

![](https://huaji8.top/img/live2d/nietzche.gif)

</details>
<details><summary>nipsilon</summary><br>

![](https://huaji8.top/img/live2d/nipsilon.gif)

</details>
<details><summary>nito</summary><br>

![](https://huaji8.top/img/live2d/nito.gif)

</details>
<details><summary>shizuku</summary><br>

![](https://huaji8.top/img/live2d/shizuku.gif)

</details>
<details><summary>tsumiki</summary><br>

![](https://huaji8.top/img/live2d/tsumiki.gif)

</details>
<details><summary>wanko</summary><br>

![](https://huaji8.top/img/live2d/wanko.gif)

</details>
<details><summary>z16</summary><br>

![](https://huaji8.top/img/live2d/z16.gif)

</details>
<details><summary>hibiki</summary><br>

![](https://huaji8.top/img/live2d/hibiki.gif)

</details>
<details><summary>koharu</summary><br>

![](https://huaji8.top/img/live2d/koharu.gif)

</details>
<details><summary>haruto</summary><br>

![](https://huaji8.top/img/live2d/haruto.gif)

</details>
<details><summary>Unitychan</summary><br>

![](https://huaji8.top/img/live2d/Unitychan.gif)

</details>
<details><summary>tororo</summary><br>

![](https://huaji8.top/img/live2d/tororo.gif)

</details>
<details><summary>hijiki</summary><br>

![](https://huaji8.top/img/live2d/hijiki.gif)

</details>

## Contribute 贡献

**如果你想提交代码或Issue，请务必仔细阅读**

[CONTRIBUTING](./CONTRIBUTING.md)

## Releated projects 相关项目

- [Cubism SDK WebGL 2.1](http://sites.cybernoids.jp/cubism-sdk2_e/webgl2-1)

- [pixi-live2d](https://github.com/avgjs/pixi-live2d)

- [CubismJsComponents](https://github.com/Live2D/CubismJsComponents)


## About me 关于我

[![Author][author]][author-url]

[![QQ][qq]][qq-url]

[![Email][email]][email-url]


## Imported 引入脚本

[![current-device][current-device]][current-device-url]

<br>

根据 GPL V2.0 许可证开源。

[npm]: https://badge.fury.io/js/hexo-helper-live2d.svg?label=hexo-helper-live2d
[npm-url]: https://www.npmjs.com/package/hexo-helper-live2d

[deps]: https://img.shields.io/david/EYHN/hexo-helper-live2d.svg
[deps-url]: javascript:void(0);

[devdeps]:  https://img.shields.io/david/dev/EYHN/hexo-helper-live2d.svg
[devdeps-url]: javascript:void(0);

[license]: https://img.shields.io/github/license/EYHN/hexo-helper-live2d.svg
[license-url]: https://github.com/EYHN/hexo-helper-live2d/blob/master/LICENSE

[PRs Welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[PRs Welcome-url]: http://makeapullrequest.com

[downloads]:  https://img.shields.io/npm/dt/hexo-helper-live2d.svg
[downloads-url]: https://www.npmjs.com/package/hexo-helper-live2d

[downloads-month]: https://img.shields.io/npm/dm/hexo-helper-live2d.svg
[downloads-month-url]: https://www.npmjs.com/package/hexo-helper-live2d

[Commitizen friendly]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[Commitizen friendly-url]: http://commitizen.github.io/cz-cli/

[GitHub stars]: https://img.shields.io/github/stars/EYHN/hexo-helper-live2d.svg
[GitHub stars-url]: https://github.com/EYHN/hexo-helper-live2d/stargazers

[GitHub forks]: https://img.shields.io/github/forks/EYHN/hexo-helper-live2d.svg
[GitHub forks-url]: https://github.com/EYHN/hexo-helper-live2d/network

[GitHub issues]: https://img.shields.io/github/issues/EYHN/hexo-helper-live2d.svg
[GitHub issues-url]: https://github.com/EYHN/hexo-helper-live2d/issues

[author]: https://img.shields.io/badge/author-cneyhn-green.svg
[author-url]: https://delusion.coding.me/

[qq]: https://img.shields.io/badge/QQ-1106996185-blue.svg
[qq-url]: http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes

[email]: https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg
[email-url]: mailto:cneyhn@gmail.com

[current-device]: https://img.shields.io/npm/v/current-device.svg?label=current-device
[current-device-url]: https://github.com/matthewhudson/current-device
