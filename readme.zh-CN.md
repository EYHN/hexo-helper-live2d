
[![npm version](https://badge.fury.io/js/hexo-helper-live2d.svg)](https://badge.fury.io/js/hexo-helper-live2d)

# hexo-helper-live2d

> 现已更新 2.0！

[English README](./readme.md) by [@gwzz](https://github.com/gwzz) & [@xiazeyu](https://github.com/xiazeyu)

<br>

为你的hexo添加色气满满的live2d吧！

示例: [https://huaji8.top/post/live2d-plugin-2.0/](https://huaji8.top/post/live2d-plugin-2.0/)


## Installation 食用方法

安装模块: 

```
npm install -save hexo-helper-live2d
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

在 hexo主题 的 `_config.yml` 中添加参数: 

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
  mobileShow: true # 是否在移动设备上显示 默认值: true
  mobileWidth: 75 # 移动设备上的宽度 默认值: 75
  mobileHeight: 150 # 移动设备上的高度 默认值: 150
  position: right # 模型左右侧放置位置 默认值: right
  horizontalOffset: 0 # 元素的水平偏移 默认值: 0
  bottomOffset: -20 # 元素的底部偏移 默认值: -20
  className: live2d # 元素的类名 默认值: live2d
  id: live2dcanvas # 元素的id 默认值: live2dcanvas
```


- `model`: 模型名称 默认值: z16
  - Gantzert_Felixander
  - Epsilon2.1
  - haru
  - miku
  - ni-j
  - nico
  - nito
  - nipsilon
  - nietzsche
  - shizuku
  - tsumiki
  - wanko
  - z16
  - hibiki
  - koharu
  - haruto
  - Unitychan
  - tororo
  - hijiki

注意！ **模型json路径必须为 `node_modules/hexo-helper-live2d/assets/{name}/{name}.model.json`**

- `width`: 宽度 默认值: 150
- `height`: 高度 默认值: 300
- `mobileShow`: 是否在移动设备上显示 默认值: true
- `mobileWidth`: 移动设备上的宽度 默认值: 75
- `mobileHeight`: 移动设备上的高度 默认值: 150
- `position`: 模型左右侧放置位置 `left` 或 `right` 默认值: false
- `horizontalOffset`: `<canvas>` 元素的水平偏移 默认值: 0
- `bottomOffset`: `<canvas>` 元素的底部偏移 默认值: -20
- `className`: `<canvas>` 元素的类名 默认值: live2d
- `id`: `<canvas>` 元素的id 默认值: live2dcanvas
  如果嫌模型位置不正确 可以调整这个参数


## Custom model 增加自己喜欢的模型

请参见[(#22)](https://github.com/EYHN/hexo-helper-live2d/issues/22)

<br>

Enjoy!:beer:

> 我第一个hexo插件,点个star,点个watch吧,尽情地交pr吧。

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)


## Screenshots 截图:

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


## Todo

- 接入每日一句(json) 接入互动对话框(#16)

## About me 关于我

[![Author](https://img.shields.io/badge/author-cneyhn-green.svg?style=flat-square)](https://delusion.coding.me/)
[![QQ](https://img.shields.io/badge/QQ-1106996185-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes)
[![Email](https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg?style=flat-square)]()


## License 许可证

[![license](https://img.shields.io/github/license/EYHN/hexo-helper-live2d.svg?style=flat-square)](https://raw.githubusercontent.com/EYHN/hexo-helper-live2d/master/LICENSE)


## Included 引用

[device.js](https://github.com/matthewhudson/device.js)


<br>

Open sourced under the GPL v2.0 license.

根据 GPL V2.0 许可证开源。
