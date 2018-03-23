const $ = require('./gulpfile');
const runSequence = require('run-sequence').use($.gulp);

exports.config = {
    tests: './tests/*_test.js',
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
    mocha: {},
    name: 'FElicious'
};
