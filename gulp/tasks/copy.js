/**
 * Copy necessary files from the root dir.
 */

module.exports = (gulp, globalConfig) => {

    const taskConfig = {
        watch: [
            `${globalConfig.srcDir}/*.*` // Only copy top-level files
        ]
    };

    // Copy all files at the root level
    gulp.task('copy', () => {
        return gulp.src(taskConfig.watch, {
            dot: true
        })
            .pipe(gulp.dest(globalConfig.destDir));
    });

    return taskConfig;
};
