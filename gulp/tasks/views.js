/**
 * Compress images.
 *
 * Install:
 * yarn add -D gulp-pug
 */

const pug = require('gulp-pug');
const errorHandler = require('../libs/error-handler');
const htmlmin = require('gulp-htmlmin');

module.exports = (gulp, globalConfig) => {

    const taskConfig = {
        watch: [
            `${globalConfig.srcDir}/views/**`
        ]
    };

    gulp.task('views', () => {
        return gulp.src([`${globalConfig.srcDir}/views/**/*`, `!${globalConfig.srcDir}/views/{partials,partials/**}`])
            .pipe(pug())
            .on('error', errorHandler)
            .pipe(htmlmin({
                collapseWhitespace: true,
                processConditionalComments: true
            }))
            .pipe(gulp.dest(`${globalConfig.destDir}`));
    });

    return taskConfig;
};


