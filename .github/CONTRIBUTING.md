# Contributing

## Issues

- Most of the time, if this plugin is not working correctly for you it is
  a simple **configuration** issue.

- **Search on the internet** and **among closed issues** in advance would do
  a great help for us.

- Please **keep focus on the topic** of any issue~~, and use **English** as
  far as possible so that everyone will understand you.~~

- **If you have discovered a bug or have a feature suggestion,
  feel free to create an issue or pull request on Github.**

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
- run `npm run lint` before you commit it.
- Write a good commit message use `npm run commit`
- Make sure that your code can work properly.

## Documentation

hexo-helper-live2d's feature is now becoming richer and richer, and
documentation is a huge time sink. We greatly appreciate any time spent
fixing typos or clarifying sections in the documentation.

From opening a bug report to creating a pull request: every contribution is
appreciated and welcome. If you're planning to implement a new feature or change
the api please create an issue first. This way we can ensure that your precious
work is not in vain.

## Workflow: modify the code

- We use **[EditorConfig](http://editorconfig.org/)** to define and maintain
  consistent coding styles, so have a look first.

- Please use the latest version of Node.js to work with.

### 0. Fork at first

### 1. Install environments

- Use `npm run inst:dev` to **install all the environments**.

### 2. Make changes

- Modify files in the root directory or `/lib`

### 3. Debug until you make sure that your code works properly

### 4. Commit those changes

- Use `npm run lint` to check your code first.

- Use `git add --all`, or choose the file you want to commit.

- We recommend `npm run commit` to commit, **please follow the Angular style**

### 5. Push the changes

- Use `git push` to push the changes to the github server.

## Workflow(author): Release a new version

### Let the Collaborator or author do it

### 0. Test and lint

- run `npm run lint`

### 1. Refresh changelog

- run `npm run changelog`

### 2. Bump the version

- bump the version in `package.json`

- delete `package-lock.json`

- run `npm install` to generate new `package-lock.json`

### 3. Commit files

### 4. Tag and release a new version

- In the Github page.

### 5. Update changelog again

- Use `npm run changelog`, and commit it.

### 6. Publish the package to npm

- Use `npm publish` to publish it.
