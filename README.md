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

[简体中文文档](./README.zh-CN.md)

<br>

Add the Sseexxyyy live2d to your hexo!

Demo: [https://eyhn.in/hexo-helper-live2d/](https://xiazeyu.github.io/live2d-widget.js-doc/dev.html)

Author's Blog: [https://huaji8.top/post/live2d-plugin-2.0/](https://huaji8.top/post/live2d-plugin-2.0/)


## Installation

### Hexo

Install module:

```
npm install --save hexo-helper-live2d
```

<details><summary>Used legacy version before ?</summary><br>

Please delete `{{ live2d() }}` or `<%- live2d() %>` before `</body>` in `layout/layout.ejs` or `layout/_layout.swig`.

</details>

### Others, including webpack

See [live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js)

## Config

Add configuration in hexo's `_config.yml` file.

An Example:

``` yml
live2d:
  model: nipsilon
```


## Settings

``` yml
# Live2D
## https://github.com/EYHN/hexo-helper-live2d
live2d:
  enable: true
  jsPath: local # 'local'(1)||'jsdelivr'(2)||'unpkg'(3)||{Your own path, String}(4)
  hashLevel: soft # 'soft'(1)||'dep'(2)||'none'(3)
  model:
    use: live2d-widget-model-miku # {npm-module name}(1)||{folder name in live2d_models/}(2)||{Your own path, String}(3)
```

> To see Chinese explainations, please have a look at [Chinese document](./README.zh-CN.md).

<details><summary>Current supported models:</summary><br>

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

## Custom model

### a. live2d_models folder
1. Create a `live2d_models` folder at your blog's root directory.

2. Create a folder by the name of your model.

3. Copy your model to this folder.

**Attention! The path of the model's json must be  `/live2d_models/{name}/{name}.model.json`**

<details><summary>An Example:</summary><br>

Your model is named `mymiku`.

Then, create a folder at  `/` (Which should exists `_config.yml` 、`sources` 、 `themes` ) named `mymiku`.

Copy your model to `/live2d_models/mymiku/`.

Up to now, there should be `mymiku.model.json` in the directory of `/live2d_models/mymiku/`.

</details>

### b. npm modules

Release your package named like `live2d-widget-model-xxx`, and type it into `model.use` in `_config.yml`

<br>

Enjoy!:beer:

> This is my first hexo plugin, star :star: and watch :eyeglasses:, pull request is also welcomed.

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)


## Screenshots

**Attention! The name above the shown screenshoot may not be the true name of the model. Please go to the "Settings" to find the true value of "model"**

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

## Contribute

**Please pay enough attention to this document if you want to commit your changes or submit issues.**

[CONTRIBUTING](./CONTRIBUTING.md)

## Releated projects

- [live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js)

- [Cubism SDK WebGL 2.1](http://sites.cybernoids.jp/cubism-sdk2_e/webgl2-1)

- [pixi-live2d](https://github.com/avgjs/pixi-live2d)

- [CubismJsComponents](https://github.com/Live2D/CubismJsComponents)


## About me

[![Author][author]][author-url]

[![Author QQ][author-qq]][author-qq-url]

[![Author Email][author-email]][author-email-url]


[![Collaborator 0][collaborator0]][collaborator0-url]

[![Collaborator 0 QQ][collaborator0-qq]][collaborator0-qq-url]

[![Collaborator 0 Email][collaborator0-email]][collaborator0-email-url]


## Imported

[![current-device][current-device]][current-device-url]

<br>

Open sourced under the GPL v2.0 license.

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
