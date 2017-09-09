/**
 * Compress images.
 *
 * Install:
 * yarn add -D gulp-pug
 */

const pug = require('gulp-pug');
const errorHandler = require('../libs/error-handler');

module.exports = (gulp, globalConfig) => {

    const taskConfig = {
        watch: [
            `${globalConfig.srcDir}/views/**/*`
        ]
    };

    gulp.task('views', () => {
        return gulp.src([`${globalConfig.srcDir}/views/**/*`, `!${globalConfig.srcDir}/views/{partials,partials/**}`])
            .pipe(pug())
            .on('error', errorHandler)
            .pipe(gulp.dest(`${globalConfig.destDir}`));
    });

    return taskConfig;
};


