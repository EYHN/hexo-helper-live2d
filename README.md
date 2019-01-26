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

[![Backers on Open Collective](https://opencollective.com/hexo-helper-live2d/backers/badge.svg)](#backers)
 [![Sponsors on Open Collective](https://opencollective.com/hexo-helper-live2d/sponsors/badge.svg)](#sponsors) 

Read this in other languages: [English](README.md), [简体中文](README.zh-CN.md).

<br>

Add the Sseexxyyy live2d to your hexo!

Demo: [https://l2dwidget.js.org/dev.html](https://l2dwidget.js.org/dev.html)

Author's original Blog: [https://huaji8.top/post/live2d-plugin-2.0/](https://huaji8.top/post/live2d-plugin-2.0/)

## Installation

### Hexo

Install module:

```bash

npm install --save hexo-helper-live2d

```

> try `yarn add hexo-helper-live2d` for better installation experience.
[Yarn](https://yarnpkg.com/en/)

<details><summary>Still using legacy version?</summary><br>

- If you want to use new injector, which will inject to all pages:

Please delete `{{ live2d() }}` or `<%- live2d() %>` before `</body>` in
`layout/layout.ejs` or `layout/_layout.swig`.

- If you want to use the old replace mode, which only replace `live2d` tag:

Keep `{{ live2d() }}` or `<%- live2d() %>`, and turn the `tagMode` config to `true`.

We recommend you to use `npm install --save hexo-helper-live2d@3.x` to force
install the latest version.

</details>

<details><summary>Tag mode</summary><br>

Please insert `{{ live2d() }}`(swig) or `<%- live2d() %>`(ejs) before `</body>` in whichever pages you want to insert. And turn `tagMode` config to `true`, and then live2dwidget will only be on those who have `live2d` tag.

</details>

### Others, for jekyll, wordpress, etc

See [live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js) WIP.

## Config

Add configuration in hexo's `_config.yml` file or theme's `_config.yml`.

An Example:

``` yml
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  log: false
  model:
    use: live2d-widget-model-wanko
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true
```

## Detail settings

Settings is divided into helper-specific ones and general ones,
You can merge these two into your `_config.yml` file.

### Helper-specific

``` yml
# Live2D
## https://github.com/EYHN/hexo-helper-live2d
live2d:
  enable: true
  # enable: false
  pluginRootPath: live2dw/ # Root path of plugin to be on the site (Relative)
  pluginJsPath: lib/ # JavaScript path related to plugin's root (Relative)
  pluginModelPath: assets/ # Relative model path related to plugin's root (Relative)
  scriptFrom: local # Default
  # scriptFrom: jsdelivr # jsdelivr CDN
  # scriptFrom: unpkg # unpkg CDN
  # scriptFrom: https://cdn.jsdelivr.net/npm/live2d-widget@3.x/lib/L2Dwidget.min.js # Your custom url
  tagMode: false # Whether only to replace live2d tag instead of inject to all pages
  log: false # Whether to show logs in console
  model:
    use: live2d-widget-model-wanko # npm-module package name
    # use: wanko # folder name in (hexo base dir)/live2d_models/
    # use: ./wives/wanko # folder path relative to hexo base dir
    # use: https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json # Your custom url
```

> To see Chinese explainations, please have a look at [Chinese document](README.zh-CN.md).

### General Settings

Recentlly may changes quickly, but don't worry, it won't make huge changes.

See [live2d-widget.js API](https://l2dwidget.js.org/docs/class/src/index.js~L2Dwidget.html#instance-method-init)

An example:

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

## Models

There are many ways to use different models:

### a. live2d_models's subfolder name

1. Create a `live2d_models` folder at your blog's root directory.

2. Create a folder by the name of your model.

3. Copy your model to this folder.

4. Type the folder name into `model.use` in `_config.yml`.

<details><summary>An Example:</summary><br>

Your model is named `mymiku`.

Then, create a folder at  `/` (Which should exists `_config.yml`, `sources`,
 `themes` ) named `mymiku`.

Copy your model to `/live2d_models/mymiku/`.

Up to now, there should be an `.model.json` file (for example, `mymiku.model.json`)

in the directory of `/live2d_models/mymiku/`.

Type `mymiku` into `model.use` in `_config.yml`.

</details>

### b. custom path relative to hexo base dir

You can just type your model folder's path which is **relative to hexo base dir**.

An example: `./wives/wanko`

### c. npm module's name

#### use exist ones

We alreday have tons of models, [check this out](https://github.com/xiazeyu/live2d-widget-models)

<details><summary>Click me if you are lazy</summary><br>

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

You can use `npm install {your model's package name}` to install,

and type it into `model.use` in `_config.yml` to use it.

#### make your own ones

- Create an folder, use your node environment run `npm init`, we recommend
   you to name it like

`live2d-widget-model-xxx`.

- Create an `assets` folder in the folder you just created, copy your model
   files into it.

Here's an example:

[live2d-widget-model-wanko](https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko)

- Use `npm publish` to publish it.

- Then use `npm install --save live2d-widget-model-xxx`,

and you can just type your package name(`live2d-widget-model-wanko`) into `model.use`

### d. Your own CDN

If you are disappointed without CDN, you can just type your own `.model.json`
url into `model.use`.

<br>

Enjoy!:beer:

Cheer for the 3.0 version and the new year!~

> This is my first hexo plugin, star :star: and watch :eyeglasses:,
pull request is also welcomed.

## Screenshots

[TBD.](https://huaji8.top/post/live2d-plugin-2.0/)

## Contribute

### Please pay enough attention to this document if you want to commit your changes or submit issues

This may help you a lot. All kinds of contributions are welcome.

[CONTRIBUTING](.github/CONTRIBUTING.md)

## Releated projects

- [live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js)

- [live2d-widget-models](https://github.com/xiazeyu/live2d-widget-models)

- [Cubism SDK WebGL 2.1](http://sites.cybernoids.jp/cubism-sdk2_e/webgl2-1)

## Contributors

![contributors][contributors]

## About me

[![author][author]][author-url]
[![author QQ][author-qq]][author-qq-url]
[![author email][author-email]][author-email-url]

[![collaborator0][collaborator0]][collaborator0-url]
[![collaborator0 QQ][collaborator0-qq]][collaborator0-qq-url]
[![collaborator0 email][collaborator0-email]][collaborator0-email-url]

## Imported

[![current-device][current-device]][current-device-url]

<br>

Open sourced under the GPL v2.0 license.

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

## Contributors

This project exists thanks to all the people who contribute. 
<a href="https://github.com/EYHN/hexo-helper-live2d/graphs/contributors"><img src="https://opencollective.com/hexo-helper-live2d/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/hexo-helper-live2d#backer)]

<a href="https://opencollective.com/hexo-helper-live2d#backers" target="_blank"><img src="https://opencollective.com/hexo-helper-live2d/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/hexo-helper-live2d#sponsor)]

<a href="https://opencollective.com/hexo-helper-live2d/sponsor/0/website" target="_blank"><img src="https://opencollective.com/hexo-helper-live2d/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/hexo-helper-live2d/sponsor/1/website" target="_blank"><img src="https://opencollective.com/hexo-helper-live2d/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/hexo-helper-live2d/sponsor/2/website" target="_blank"><img src="https://opencollective.com/hexo-helper-live2d/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/hexo-helper-live2d/sponsor/3/website" target="_blank"><img src="https://opencollective.com/hexo-helper-live2d/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/hexo-helper-live2d/sponsor/4/website" target="_blank"><img src="https://opencollective.com/hexo-helper-live2d/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/hexo-helper-live2d/sponsor/5/website" target="_blank"><img src="https://opencollective.com/hexo-helper-live2d/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/hexo-helper-live2d/sponsor/6/website" target="_blank"><img src="https://opencollective.com/hexo-helper-live2d/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/hexo-helper-live2d/sponsor/7/website" target="_blank"><img src="https://opencollective.com/hexo-helper-live2d/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/hexo-helper-live2d/sponsor/8/website" target="_blank"><img src="https://opencollective.com/hexo-helper-live2d/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/hexo-helper-live2d/sponsor/9/website" target="_blank"><img src="https://opencollective.com/hexo-helper-live2d/sponsor/9/avatar.svg"></a>


