/**
 * Install
 * yarn add -D gulp gulp-util run-sequence del browser-sync
 */

const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const del = require('del');
const browserSync = require('browser-sync').create();

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
        `!${config.tmpDir}/.gitkeep`
    ]);
});

gulp.task('build', ['clean'], (done) => {

    tasksSequence.push(done);

    runSequence.apply(null, tasksSequence);
});

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

    for (let i = 0, len = tasksConfigList.length; i < len; i++) {
        const task = tasksConfigList[i];

        gulp.watch(task.watch, [task.name, browserSync.reload]);
    }
});

gulp.task('default', () => {
    gulp.start(config.dev ? 'serve' : 'build');
});

/**
 * Load defined tasks
 */
const tasksConfigList = [];

for (let i = 0, len = tasksSequence.length; i < len; i++) {
    const taskName = tasksSequence[i];
    const taskConfig = require(`./gulp/tasks/${taskName}`)(gulp, config);

    taskConfig.name = taskName;

    tasksConfigList.push(taskConfig);
}

module.exports = {
    gulp: gulp,
    config: config
};
