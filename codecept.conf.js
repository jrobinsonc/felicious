const $ = require('./gulpfile');
const runSequence = require('run-sequence').use($.gulp);

exports.config = {
    tests: './tests/*_test.js',
    grep: 'for production', // By default, it will only test for production unless you specify otherwise.
    timeout: 10000,
    output: './tests/output',
    helpers: {
        FileSystem: {}
    },
    include: {
        I: './tests/steps_file.js'
    },
    bootstrap: (done) => {
        runSequence('clean', done);
    },
    teardown: (done) => {
        // $.gulp.start('default');
        done();
    },
    mocha: {},
    name: 'FElicious'
};
