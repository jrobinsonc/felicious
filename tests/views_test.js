const $ = require('../gulpfile');
const runSequence = require('run-sequence').use($.gulp);

Feature('Building HTML');

Scenario('for production', (I) => {

    $.config.dev = false;

    runSequence('clean', 'views', () => {
        I.checkFile('index.html', $.config.dev);
    });

});

Scenario('for development', (I) => {

    $.config.dev = true;

    runSequence('clean', 'views', () => {
        I.checkFile('index.html', $.config.dev);
    });

});
