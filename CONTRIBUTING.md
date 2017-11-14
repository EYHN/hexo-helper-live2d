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

## Workflow

### 1. Install environments

- `npm run devenv`

### 2. Make changes

- `npm run build` to build client js files.

- `npm run dev` to build client js files with debug files.

### 3. Commit those changes

- `git add *`, or choose the file you want to commit.

- `npm run commit`, **Never use `git commit` again**

### 4. Push the changes

- `git push`

### 5. ~~Make sure you passed the tests.~~

- ~~`npm run test`~~

### 6. Bump version in package.json

### 7. Update Changelogs

- `npm run changelog`

### 8. Commit package.json and CHANGELOG.md files

### 9. Tag

### 10. Push again

- `git push`

