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

> 3.0即将来临！

[English README](./readme.md) by [@gwzz](https://github.com/gwzz) & [@xiazeyu](https://github.com/xiazeyu)

<br>

为你的hexo添加色气满满的live2d吧！

示例: [https://huaji8.top/post/live2d-plugin-2.0/](https://huaji8.top/post/live2d-plugin-2.0/)


## Installation 食用方法

安装模块: 

```
npm install --save hexo-helper-live2d
```

> Tips: 遇到npm的相关错误，试试 `npm cache verify` 或 `npm cache clean` 呗~

并将下面的代码加入主题。

通常添加在 `layout/layout.ejs` 或 `layout/_layout.swig` 中的 `</body>` 之前

ejs: 

``` ejs
<%- live2d() %>
```

swig (next主题): 

``` swig
{{ live2d() }}
```


## Config 配置

有2种方法

#### Method 1 第一种

在 hexo 的 `_config.yml` 中添加参数: 

``` yml
live2d:
  model: nipsilon
```

#### Method 2 第二种

在 hexo 主题 的 `_config.yml` 中添加参数: 

``` yml
live2d:
  model: nipsilon
```

> 第二种配置会覆盖第一种


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


- `model`: 模型名称 默认值: z16
  - chitose
  - Epsilon2.1
  - Gantzert_Felixander
  - haru01
  - haru02
  - haruto
  - hibiki
  - hijiki
  - izumi
  - koharu
  - miku
  - nico
  - ni-j
  - nipsilon
  - nito
  - shizuku
  - tororo
  - tsumiki
  - Unitychan
  - wanko
  - z16

- `width`: 宽度  *( 实数 ) 默认值: 150*
- `height`: 高度  *( 实数 ) 默认值: 300*
- `scaling`: 分辨率缩放倍率 越大马赛克效应越小 **目前存在BUG，详细参考#32 在BUG解决前，请将数值设置为1**  *( 1 = 100% ) 默认值: 2*
- `opacityDefault`: 初始的透明度 *(Beta)*  *( 0 - 1 ) 默认值: 0.7*
- `opacityHover`: 鼠标悬浮时透明度 *(Beta)*  *( 0 - 1 ) 默认值: 1*
- `mobileShow`: 是否在移动设备上显示  *( true / false ) 默认值: true*
- `mobileScaling`: 移动设备缩放倍率  *( 1 = 100% ) 默认值: 0.5*
- `position`: 模型左右侧放置位置 `left` 左 或 `right` 右  *( left / right ) 默认值: right*
- `horizontalOffset`: `<canvas>` 元素的水平方向偏移 如果嫌模型位置不正确 可以调整这个参数  *( 实数 ) 默认值: 0*
- `verticalOffset`: `<canvas>` 元素的竖直方向偏移 如果嫌模型位置不正确 可以调整这个参数  *( 实数 ) 默认值: -20*
- `id`: `<canvas>` 元素的id  *( 字符串 ) 默认值:live2dcanvas*
- `deviceJsSource`: current-device 脚本的来源.  *( local / official / 字符串 ) 默认值: local*
  - 你可以选择以下三种方式:
  - `local`: **默认 推荐** 使用本地来源，已使用webpack压缩。
  - `official`: 使用官方来源。 [https://unpkg.com/current-device/umd/current-device.min.js](https://unpkg.com/current-device/umd/current-device.min.js)
  - `(your CDN url path)`: 输入你的CDN地址。尾部需要包含 `.js`。


## Custom model 增加自己喜欢的模型

1. 在博客的根目录下新建 `live2d_models` 文件夹

2. 在此文件夹中以自定义模型的名称新建一个模型

3. 将你的模型复制到该文件夹下

**注意！模型json路径必须为  `/live2d_models/{name}/{name}.model.json`**

示例：

你的模型为 `mymiku`

那么在 `/` 目录下(即博客的安装目录，该目录下应存在 `_config.yml` 、`sources` 、 `themes` 等内容) 新建名为 `mymiku` 的文件夹

将你的模型复制到 `/live2d_models/mymiku/` 下

此时在 `/live2d_models/mymiku/` 下应存在 `mymiku.model.json` 文件


~~请参见[(#22)](https://github.com/EYHN/hexo-helper-live2d/issues/22)~~


<br>

Enjoy!:beer:

> 我第一个hexo插件,点个star,点个watch吧,尽情地交pr吧。

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)


## Screenshots 截图:

**注意！截图上方的名称可能非实际模型名，请进入“设置项”查看"model"的真实值**

#### Epsilon2.1
![](https://huaji8.top/img/live2d/Epsilon2.1.gif)

#### Gantzert_Felixander
![](https://huaji8.top/img/live2d/Gantzert_Felixander.gif)

#### haru
![](https://huaji8.top/img/live2d/haru.gif)

#### miku
![](https://huaji8.top/img/live2d/miku.gif)

#### ni-j
![](https://huaji8.top/img/live2d/ni-j.gif)

#### nico
![](https://huaji8.top/img/live2d/nico.gif)

#### nietzche
![](https://huaji8.top/img/live2d/nietzche.gif)

#### nipsilon
![](https://huaji8.top/img/live2d/nipsilon.gif)

#### nito
![](https://huaji8.top/img/live2d/nito.gif)

#### shizuku
![](https://huaji8.top/img/live2d/shizuku.gif)

#### tsumiki
![](https://huaji8.top/img/live2d/tsumiki.gif)

#### wanko
![](https://huaji8.top/img/live2d/wanko.gif)

#### z16
![](https://huaji8.top/img/live2d/z16.gif)

#### hibiki
![](https://huaji8.top/img/live2d/hibiki.gif)

#### koharu
![](https://huaji8.top/img/live2d/koharu.gif)

#### haruto
![](https://huaji8.top/img/live2d/haruto.gif)

#### Unitychan
![](https://huaji8.top/img/live2d/Unitychan.gif)

#### tororo
![](https://huaji8.top/img/live2d/tororo.gif)

#### hijiki
![](https://huaji8.top/img/live2d/hijiki.gif)


## Contribute 贡献

如果你想提交代码，请务必仔细阅读。

[CONTRIBUTING](./CONTRIBUTING.md)


## About me 关于我

[![Author](https://img.shields.io/badge/author-cneyhn-green.svg?style=flat-square)](https://delusion.coding.me/)

[![QQ](https://img.shields.io/badge/QQ-1106996185-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes)

[![Email](https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg?style=flat-square)]()

## Imported 引入

[current-device](https://github.com/matthewhudson/current-device)


<br>

Open sourced under the GPL v2.0 license.

根据 GPL V2.0 许可证开源。


[npm]: https://badge.fury.io/js/hexo-helper-live2d.svg
[npm-url]: https://www.npmjs.com/package/hexo-helper-live2d

[deps]: https://img.shields.io/david/EYHN/hexo-helper-live2d.svg
[deps-url]: #

[devdeps]:  https://img.shields.io/david/dev/EYHN/hexo-helper-live2d.svg
[devdeps-url]: #

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
