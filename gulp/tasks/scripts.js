/**
 * Parse and minify JavaScript
 */

const eslint = require('gulp-eslint');
const gulpif = require('gulp-if');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const errorHandler = require('../libs/error-handler');
const eslintOptions = require('../../.eslintrc.js');

module.exports = (gulp, globalConfig) => {
    const taskConfig = {
        watch: [`${globalConfig.srcDir}/js/**/*`]
    };

    gulp.task('scripts-lint', () => {
        if (globalConfig.dev) {
            taskConfig.watch.push('*.js');
            taskConfig.watch.push('gulp/**/*.js');
        }

        return gulp.src(taskConfig.watch)
            .pipe(eslint(eslintOptions))
            .pipe(eslint.format())
            .pipe(gulpif(!globalConfig.dev, eslint.failAfterError()));
    });

    gulp.task('scripts', ['scripts-lint'], () => {
        const bundleStream = browserify({
            debug: globalConfig.dev,
            plugin: []
        }).transform('babelify');

        bundleStream
            .add(`${globalConfig.srcDir}/js/main.js`)
            .bundle()
            .on('error', errorHandler)
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(gulpif(globalConfig.dev, sourcemaps.init({
                loadMaps: true // Loads map from browserify file
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
            .pipe(gulpif(globalConfig.dev, sourcemaps.write('./')))
            .pipe(gulp.dest(`${globalConfig.destDir}/js/`));

        return bundleStream;
    });

    return taskConfig;
};
