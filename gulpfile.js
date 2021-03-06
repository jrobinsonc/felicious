const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const browserSync = require('browser-sync').create();
const gutil = require('./gulp/libs/utils');

const config = {
    dev: gutil.env.dev === true,
    tmpDir: './.tmp',
    srcDir: './src',
    destDir: './dist'
};

// These tasks will run in this specific order.
// If you want to disable any of this tasks only comment the line.
const tasksSequence = [
    'copy',
    'sprites',
    'images',
    'styles',
    'scripts',
    'views'
];

gulp.task('clean', () => {
    return del([
        `${config.destDir}/**/*`,
        `!${config.destDir}/.gitkeep`,
        `${config.tmpDir}/**/*`,
        `!${config.tmpDir}/.gitkeep`,
        './coverage'
    ]);
});

/* istanbul ignore next */
gulp.task('build', ['clean'], (done) => {
    tasksSequence.push(done);

    runSequence(...tasksSequence);
});

/* istanbul ignore next */
gulp.task('serve', ['build'], () => {
    browserSync.init({
        server: {
            baseDir: config.destDir,
            serveStaticOptions: {
                extensions: ['html']
            }
        },
        ghostMode: false,
        notify: false
    });

    for (let i = 0, len = tasksConfigList.length; i < len; i += 1) {
        const task = tasksConfigList[i];

        gulp.watch(task.watch, [task.name, browserSync.reload]);
    }
});

/* istanbul ignore next */
gulp.task('default', () => {
    gulp.start(config.dev ? 'serve' : 'build');
});

/**
 * Load defined tasks
 */
const tasksConfigList = [];

for (let i = 0, len = tasksSequence.length; i < len; i += 1) {
    const taskName = tasksSequence[i];
    const taskConfig = require(`./gulp/tasks/${taskName}`)(gulp, config);

    taskConfig.name = taskName;

    tasksConfigList.push(taskConfig);
}

module.exports = {
    gulp,
    config
};
