# ts-library-starter

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Intro

Starter kit with zero-config for building a library in TypeScript.  
A friendly guide program that supports multiple languages. Help you complete the configuration from development, testing to release.  

![EN_1](https://calimanco.github.io/ts-library-starter/Screenshot/EN_1.png)

---

[中文版](https://github.com/calimanco/ts-library-starter/blob/main/README.md)

## Requirement

- The version of Git CLI is 2.7.1 or higher;
- Some tools require Nodejs version 10.18 or higher;
- The NPM CLI version is kept up to date.

## Usage

```bash
# Clone to the folder where you want to start the library.
git clone https://github.com/calimanco/ts-library-starter.git YOURFOLDERNAME
# Enter the folder.
cd YOURFOLDERNAME
# Run npm install and follow the interactive guide to answer questions. That's all!
npm install
# Clean up dependencies after installation (optional).
npm run clear-init-dependencies
```

```javascript
// Use the generated library.
import library from 'your-library-name'
// Or if your es6 module only export default.
const library = require('your-library-name')
// Or writing <script src="dist/YOURLIBRARYNAME.umd.js"></script> in html then you will find yourLibraryName variable in the global.
```

## Features

- The guide program supports multiple languages. Existing Chinese and English, more languages can be added easily.
- Zero configuration, the guide program will automatically complete the configuration (all options have default values).
- Use Prettier and ESLint to ensure code quality.
- Use Jest for unit testing, output coverage reports, and publish to Coveralls.
- Use RollupJS for compilation and packaging.
- Use TypeDoc to generate documentation and deploy to gh-pages.
- Use lint-staged and commitizen to semantically submit.
- Use semantic-release to standardize release.
- Support Travis automated integration (build, test, release).
- Use play-anywhere to quickly show demos (optional).


## NPM 命令

- `npm run lint`  Run static code check in the src and test directories.
- `npm run lint:md`  Run static code check in all Markdown files.
- `npm run build`  First remove the dist directory, then compile and package, and generate documentation.
- `npm start` / `npm run start` / `npm run dev`  Run `npm run build` in "watch" mode.
- `npm test`/`npm run test`  Run the test suite and generate a unit test coverage report.
- `npm run test:watch`  Run the test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch).
- `npm run test:prod`  Run `npm run lint` first, then test, and generate a unit test coverage report (no cache).
- `npm run deploy-docs`  Deploy the document to gh-pages, it is recommended to use it only in the integrated environment, see [Automatic Integration](#travis) for details.
- `npm run report-coverage`  Submit the unit test coverage report to coveralls. It is recommended to use it only in the integrated environment. For details, see [Automatic Integration](#travis).
- `npm run commit`  Run a static code check on the changed files in the git staging area first, and then perform a semantic submission.
- `npm run semantic-release`  To release the master branch of git, it is recommended to use it only in the integrated environment, see [Automatic Integration](#travis) for details.
- `npm run compiled`  Compile TypeScript and output the result (non-packaged).
- `npm run dev:web`  Run the demo show (optional).

## Guide Program (Command Line)

After running `npm install`, the boot script in the init directory will be started.  
It will ask multiple questions to help you complete the configuration of the library.

### Process

- Configuration package.json, rollup.config.js, .travis.yml, etc.;
- Modify and rename the files in the src and test;
- Generate a new README file;
- Initialize the demo environment (optional);
- Clean up directories and files;
- Update package.json and .gitignore;
- Initialize Git and complete the first submission (only submit `.gitignore`);

![EN_2](https://calimanco.github.io/ts-library-starter/Screenshot/EN_2.png)
![EN_3](https://calimanco.github.io/ts-library-starter/Screenshot/EN_3.png)


### Defaults

- `libraryName`  From the "kebabCase" conversion of the folder name of the library, for example, "MyProgram" will be converted to "my-program".
- `author`：From running `git config user.name` output.
- `email`：From running `git config user.email` output.
- `branch`：Github's suggestion is called main.

### Add Language Support



## Explanation

// TODO

## LICENSE

MIT
