
[![npm version](https://badge.fury.io/js/hexo-helper-live2d.svg)](https://badge.fury.io/js/hexo-helper-live2d)

# hexo-helper-live2d

> Updated to Version 2.0

[简体中文文档](./readme-zh-CN.md)

<br>

Add the Sseexxyyy live2d to your hexo!

```
npm install -save hexo-helper-live2d
```

Demo： [https://huaji8.top/post/live2d-plugin-2.0/](https://huaji8.top/post/live2d-plugin-2.0/)

## Screenshots:

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

## Installation:

```
npm install -save hexo-helper-live2d
```

Add the next line to your hexo theme.

Usually added before `</body>` in `layout/layout.ejs` or `layout/_layout.swig`.

ejs:
``` ejs
<%- live2d() %>
```

swig:
``` swig
{{ live2d() }}
```

## Usage:

Two options:

#### Option 1

Add configuration in your theme.

``` ejs
<%- live2d({
	model: "nipsilon"
}) %>
```

#### Option 2

Add configuration in hexo's _config.yml file.

``` yml
live2d:
  model: nipsilon
  bottom: -60
```

> Notes: Option 2 has higher priority, it will overwrite Option 1.

## Configuration

- model (default: z16)
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
- width  default: 150
- height  default: 300
- className `<canvas>`  default: live2d
- id `<canvas>`  default: live2dcanvas
- bottom `<canvas>`  default: -20
	Change this variable to adjust the position of model 

Enjoy!:beer:

> This is my first hexo plugin, star :star: and watch :eyeglasses:.

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)


## Todo

- Implement interactive dialogs.

## About me

[![Author](https://img.shields.io/badge/author-cneyhn-green.svg?style=flat-square)](https://delusion.coding.me/)
[![QQ](https://img.shields.io/badge/QQ-1106996185-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes)
[![Email](https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg?style=flat-square)]()

## License

[![license](https://img.shields.io/github/license/EYHN/hexo-helper-live2d.svg?style=flat-square)](https://raw.githubusercontent.com/EYHN/hexo-helper-live2d/master/LICENSE)

Open sourced under the GPL v2.0 license.

