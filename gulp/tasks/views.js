/**
 * Compress images.
 */

const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
const errorHandler = require('../libs/error-handler');

module.exports = (gulp, globalConfig) => {
    const taskConfig = {
        watch: [
            `${globalConfig.srcDir}/views/**/*`
        ]
    };

    gulp.task('views', () => {
        return gulp.src([`${globalConfig.srcDir}/views/*.{html,pug}`])
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
