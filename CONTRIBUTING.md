# Contributing


## Issues

Most of the time, if this plugin is not working correctly for you it is a simple configuration issue.

**If you have discovered a bug or have a feature suggestion, feel free to create an issue on Github.**


## Contributing directly to the source code

**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github) 

See workflow for more information.


## Submitting Changes

After getting some feedback, push to your fork and submit a pull request. We
may suggest some changes or improvements or alternatives, but for small changes
your pull request should be accepted quickly.

Some things that will increase the chance that your pull request is accepted:

* ~~[Write tests](./test/README.md)~~
* Follow the existing coding style
* Write a good commit message use `npm run commit`


## Documentation

Hexo-helper-live2d is insanely feature rich and documentation is a huge time sink. We
greatly appreciate any time spent fixing typos or clarifying sections in the
documentation.

From opening a bug report to creating a pull request: every contribution is
appreciated and welcome. If you're planning to implement a new feature or change
the api please create an issue first. This way we can ensure that your precious
work is not in vain.


## Workflow: modify the code

- We use [EditorConfig](http://editorconfig.org/) to define and maintain consistent coding styles, so have a look first.

- It is also recommend to have these documents read:

- [(Chinese) Angular代码规范](http://www.reqianduan.com/1722.html)

### 1. Install environments

- `npm run devenv` to install all the necessery environments.

### 2. Make changes

#### clientJs: modify src/main.js

- `npm run dev` to build client js files **with debug files**.

- `npm run devw` to build client js files **with debug files** and **let webpack watch the file**.

#### serverJs: modify index.js


### 3. Make sure you passed all the tests.

- We believe in you, so test yourself. xD

### 4. Commit those changes

- **`npm run rel` to build final client js. Important!!! The step must be done!!!**

- `git add *`, or choose the file you want to commit.

- `npm run commit`, **Never use `git commit`!!!**

### 5. Push the changes

- `git push` to push the changes to the github server.


## Workflow(author): Release a new version

*Let the Collaborator or author do it.*

### 1. Bump the version

- bump the version in `package.json`

- delete `package-lock.json`

- run `npm install` to generate new `package-lock.json`

### 2. Commit package.json and package-lock.json

- `npm run commit`, **Never use `git commit`!!!**

### 3. Tag and release a new version

- In the Github page.

### 4. Update changelog

- `npm run changelog`

### 5. Publish the package to npm.

- `npm publish`

