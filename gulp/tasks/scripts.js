/**
 * Parse and minify JavaScript
 *
 * Install:
 * yarn add -D babel-preset-es2015 babelify gulp-eslint gulp-if vinyl-source-stream browserify vinyl-buffer gulp-uglify gulp-sourcemaps
 */

const eslint = require('gulp-eslint');
const eslintOptions = require('../../.eslintrc.js');
const gulpif = require('gulp-if');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const errorHandler = require('../libs/error-handler');

module.exports = (gulp, globalConfig) => {

    const taskConfig = {
        watch: [`${globalConfig.srcDir}/js/**/*`]
    };

    gulp.task('scripts-lint', () => {
        taskConfig.watch.push('gulpfile.js');
        taskConfig.watch.push('tasks/*.js');

        return gulp.src(taskConfig.watch)
            .pipe(eslint(eslintOptions))
            .pipe(eslint.format())
            .pipe(gulpif(!globalConfig.dev, eslint.failAfterError()));
    });

    gulp.task('scripts', ['scripts-lint'], () => {
        const bundleStream = browserify({
            debug: globalConfig.dev,
            plugin: []
        }).transform('babelify', {
            presets: ['es2015'],
            babelrc: false
        });

        bundleStream
            .add(`${globalConfig.srcDir}/js/main.js`)
            .bundle()
            .on('error', errorHandler)
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(gulpif(globalConfig.dev, sourcemaps.init({
                loadMaps: true // loads map from browserify file
            })))
            .pipe(uglify(gulpif(globalConfig.dev, {
                mangle: false,
                output: {
                    beautify: true,
                    comments: 'all'
                },
                compress: false
            }, {})))
            .on('error', errorHandler)
            .pipe(gulpif(globalConfig.dev, sourcemaps.write()))
            .pipe(gulp.dest(`${globalConfig.destDir}/js/`));

        return bundleStream;
    });

    return taskConfig;
};
