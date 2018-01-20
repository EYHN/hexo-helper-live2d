# Contributing


## Issues

- Most of the time, if this plugin is not working correctly for you it is a simple **configuration** issue.

- **Search on the internet** and **among closed issues** in advance would do a great help for us.

- Please **keep focus on the topic** of any issue, and use **English** as far as possible so that everyone will understand you.

- **If you have discovered a bug or have a feature suggestion, feel free to create an issue on Github.**


## Contributing directly to the source code

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github) 

See workflow for more code developing information.


## Submitting Changes

After getting some feedback, push to your fork and submit a pull request. We
may suggest some changes or improvements or alternatives, but for small changes
your pull request should be accepted quickly.

Some things that will increase the chance that your pull request is accepted:

- Follow the existing coding style
- Write a good commit message use `npm run commit`
- Make sure that your code can work properly.


## Documentation

live2d-widget.js's feature is now becoming richer and richer, and documentation is a huge time sink.
We greatly appreciate any time spent fixing typos or clarifying sections in the
documentation.

From opening a bug report to creating a pull request: every contribution is
appreciated and welcome. If you're planning to implement a new feature or change
the api please create an issue first. This way we can ensure that your precious
work is not in vain.



## Workflow: modify the code

- We use **[EditorConfig](http://editorconfig.org/)** to define and maintain consistent coding styles, so have a look first.

- Please use the latest version of Node.js to work with.

### 1. Install environments

- Use `npm run inst:dev` to install all the environments.

### 2. Make changes

- Modify files in `/src/`

- Use `npm run build:dev` to build client js files **with debug files and watchdog.**.

### 3. Debug until you make sure that your code works properly.

### 4. Commit those changes

- **Use `npm run build:prod` to build final client js.**
**Important!!! The step must be done before commit!!!**

- Use `git add *`, or choose the file you want to commit.

- Use `npm run commit` to commit, **Never use `git commit`!!!**

### 5. Push the changes

- Use `git push` to push the changes to the github server.

### 6. Push to the webbranch

- Use `push-gh-pages.bat` or `push-gh-pages.sh`


## Workflow(author): Release a new version

*Let the Collaborator or author do it.*

### 1. Bump the version

- bump the version in `package.json`

- delete `package-lock.json`

- run `npm install` to generate new `package-lock.json`

### 2. Commit package.json and package-lock.json

- Use `npm run commit` to commit, **Never use `git commit`!!!**

### 3. Tag and release a new version

- In the Github page.

### 4. Update changelog

- Use `npm run changelog`

### 5. Publish the package to npm.

- Use `npm publish` to publish it.
