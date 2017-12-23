/**
 * Parse and minify JavaScript
 *
 * Install:
 * yarn add -D gulp-sass-lint gulp-sass gulp-if gulp-sourcemaps gulp-postcss cssnano autoprefixer
 */

const sassLint = require('gulp-sass-lint');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const errorHandler = require('../libs/error-handler');

module.exports = (gulp, globalConfig) => {

    const taskConfig = {
        watch: [`${globalConfig.srcDir}/css/**/*`]
    };

    // Don't load sprites.
    taskConfig.watch.push(`!${globalConfig.srcDir}/css/{sprites,sprites/**}`);

    gulp.task('styles-lint', () => {
        return gulp.src(taskConfig.watch)
            .pipe(sassLint({
                configFile: '.sass-lint.yml'
            }))
            .pipe(sassLint.format())
            .pipe(gulpif(!globalConfig.dev, sassLint.failOnError()));
    });

    gulp.task('styles', ['styles-lint'], () => {
        const postcssPlugins = [
            // http://browserl.ist/?q=last+2+versions
            autoprefixer({
                browsers: ['last 2 versions']
            })
        ];

        if (!globalConfig.dev) {
            postcssPlugins.push(cssnano({
                autoprefixer: false
            }));
        }

        return gulp.src(`${globalConfig.srcDir}/css/main.scss`)
            .pipe(gulpif(globalConfig.dev, sourcemaps.init()))
            .pipe(sass({
                includePaths: ['./node_modules', globalConfig.tmpDir]
            }).on('error', errorHandler))
            .pipe(postcss(postcssPlugins))
            .pipe(gulpif(globalConfig.dev, sourcemaps.write('./')))
            .pipe(gulp.dest(`${globalConfig.destDir}/css/`));

    });

    return taskConfig;
};
