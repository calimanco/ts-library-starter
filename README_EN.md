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
- All scripts support cross-platform.
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

### Defaults

- `libraryName`  From the "kebabCase" conversion of the folder name of the library, for example, "MyProgram" will be converted to "my-program".
- `author`：From running `git config user.name` output.
- `email`：From running `git config user.email` output.
- `branch`：Github's suggestion is called main.

### Add Language Support

The guide program will first read the language package from the `init/lang` directory.  
The language pack is a json format file. The content of the newly donated json file can be read correctly as long as the key remains unchanged.  
If you are interested in this project, you are welcome to provide more localized translations.  

### Error Handle

The guide program will generally not be terminated because of an error in certain files, but will finish all the processes, and then report the wrong file and the reason.  
You can manually repair the error file according to the prompt information.  

![EN_4](https://calimanco.github.io/ts-library-starter/Screenshot/EN_4.png)

### Rollup

Rollup is used as a packaged program, and commonly used plug-ins have been configured. The following files will be generated in the dist directory by default:

- `yourLibraryName.umd.js`  Compatible with amd, cjs and iife, uncompressed, with sourcemap.
- `yourLibraryName.umd.min.js`  Compatible with amd, cjs and iife, compressed, with sourcemap.
- `yourLibraryName.es6.js`  ES module file, uncompressed, with sourcemap.

## Automatic Integration (Travis)

Please check the `.travis.yml` file for configuration, refer to Travis [document](https://docs.travis-ci.com/).

### Prerequisites

You need to have the following accounts and authorize your project Github repository.  

- [NPM](https://www.npmjs.com/)
- [Travis CI](https://travis-ci.com/)
- [Coveralls](https://coveralls.io/)

The following environment variables are required, please write them into the integrated environment.  
If you want to run related commands locally, it is also needed.  

- NPM_TOKEN  Getting via NPM, used for `npm run semantic-release`.
- COVERALLS_REPO_TOKEN  Getting via Coveralls ，used for `npm run report-coverage`。
- GH_TOKEN  Getting via Github ，used for `npm run deploy-docs`。


### Start

Just submit the code to Github, and it will be automatically pulled and run by Travis.  
It can also be triggered manually in Travis.  

### Document Deployment

The automatically generated documents will be deployed to the gh-pages branch of the Github repository, and the GitHub Pages will be enabled, and the entire branch will become a static web page.  
It will not be made public by default and can be accessed via `https://<yourGithubName>.github.io/{yourLibraryName}`.

### Release

Automatic release needs to meet certain conditions. The judgment is based on the submission information at the time of submitting. For specific judgment, refer to [semantic-release](https://github.com/semantic-release/semantic-release).  
It is recommended to use `npm run commit` for semantic submission, which can guide you to automatically generate compliance information.  

The release operation is as follows:  

- Automatically release to NPM;
- Create version Tag;
- Create a Github release, automatically fill in the Changelog, and upload `yourLibraryName.umd.js` and `yourLibraryName.umd.min.js` as Assets.

### Attention

- Please make sure your project repository address is written in `repository.url` of package.json.
- Please make sure that the package name is not used on NPM, you can use the `npm view YOURFOLDERNAME` command to check.

## Explanation

### Code Specification

The `JavaScript Standard Style` specification is adopted, and the `eslint-config-standard-with-typescript` extension specification is used for Typescript files.  
All unnecessary rules or rules that may conflict with Prettier are turned off.  

- [JavaScript Standard Style](https://standardjs.com/)
- [eslint-config-standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript)

Amendments to conflicting rules:  

#### no-void

The `@typescript-eslint/no-floating-promises` rule will prompt for a promise that is used alone "Promises must be handled appropriately or explicitly marked as ignored with the `void` operator.", but adding `void` will report an error due to the `no-void` rule, so `allowAsStatement: true` is added to `no-void` to resolve this conflict.  

#### @typescript-eslint/prefer-ts-expect-error

`@typescript-eslint/prefer-ts-expect-error` will change the comment of `@ts-ignore` to `@ts-expect-error`, which will be recognized as an error when jest is running, thus affecting the test results. So turn it off.  

### Skip Guide Program

In the following two cases, the guide program will not ask questions, and all use the default configuration.  

- When `process.env.CI` has a value, this situation generally occurs when it is called by some scaffolding tool.
- Use `npm install -y` to install.

### Clean up Dependencies

You can easily clean up the dependency of the bootloader.  

```bash
npm run clear-init-dependencies
```

After running, the "clear-init-dependencies" command will also be deleted from package.json.  

### Demo Environment

This is an optional feature. If it is not installed during initialization, please refer to `play-anywhere` [document](https://github.com/calimanco/play-anywhere).  

## LICENSE

MIT
