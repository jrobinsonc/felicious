const $ = require('../gulpfile');
const runSequence = require('run-sequence').use($.gulp);

Feature('Copying root files');

Scenario('for production', (I) => {

    $.config.dev = false;

    runSequence('clean', 'copy', () => {
        I.checkFile('favicon.ico', $.config.dev);
    });

});

Scenario('for development', (I) => {

    $.config.dev = true;

    runSequence('clean', 'copy', () => {
        I.checkFile('favicon.ico', $.config.dev);
    });

});
