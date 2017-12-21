# FElicious - Front-End Boilerplate

[![Build Status](https://travis-ci.org/jrobinsonc/felicious.svg?branch=master)](https://travis-ci.org/jrobinsonc/felicious)

This is a Front-End starter kit with Browserify, PostCSS, BrowserSync and more. A solution to build modern web applications with zero initial configuration.

[https://felicious.netlify.com/](https://felicious.netlify.com/)

## Features

Includes:

* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Babel](https://babeljs.io/)
* [Browserify](http://browserify.org/)
* [BrowserSync](https://www.browsersync.io/)
* [cssnano](http://cssnano.co/)
* [ESLint](http://eslint.org/)
* [imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)
* [PostCSS](https://github.com/postcss/postcss)
* [Pug](https://pugjs.org/)
* [UglifyJS](https://github.com/terinjokes/gulp-uglify)
* [SASS](http://sass-lang.com/)
* [spritesmith](https://github.com/twolfson/gulp.spritesmith)

## Requirements 

* [NodeJS](https://nodejs.org/en/download/) >=6.11
* [NPM](https://nodejs.org/en/download/) >=3

## Usage

1. First of all, install dependencies:

    ```
    yarn install
    ```

If `yarn install` is giving an error, try deleting the file `yarn.lock` and run `yarn install` again.

1. Then, to start development run:

    ```
    yarn start
    ```

    This will build the project and watch for changes running BrowserSync to reload your browser.

1. To build for production:

    ```
    yarn build
    ```

### Advanced usage

There are specific tasks you can use to build particular assets, for example, you can compress images running `gulp images`. Below you can see the list of available tasks:

*NOTE: You must have [Gulp](https://gulpjs.com/) globally installed to use these tasks.*

|Task|Details|
|-|-|
|styles|Transpile CSS|
|scripts|Transpile JS|
|images|Compress images|
|sprites|Generates sprites|
|views|Generate views|
|copy|Copy files from the root (like favicon.ico) to dist/|

#### DEV mode

If you need to run any of this tasks in DEV mode, you have to append `--dev`, for example, to transpile JavaScript without compress the result use `gulp scripts --dev`. Also, you can build the entire project using `gulp build --dev`.

## Questions?

If you have any questions, please feel free to ask through [new issue](https://github.com/jrobinsonc/felicious/issues/new).

## License

Licensed under the [MIT licence](https://github.com/jrobinsonc/felicious/blob/master/LICENSE).
