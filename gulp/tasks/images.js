/**
 * Compress images.
 *
 * Install:
 * yarn add -D gulp-imagemin gul-newer
 */

const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');

module.exports = (gulp, globalConfig) => {

    const taskConfig = {
        watch: [`${globalConfig.srcDir}/images/**/*`]
    };

    // Prevent to load sprites images.
    taskConfig.watch.push(`!${globalConfig.srcDir}/images/{sprites,sprites/**}`);

    const destDir = `${globalConfig.destDir}/images/`;

    gulp.task('images', () => {
        return gulp.src(taskConfig.watch)
            .pipe(newer(destDir))
            .pipe(imagemin({
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(destDir));
    });

    return taskConfig;
};
