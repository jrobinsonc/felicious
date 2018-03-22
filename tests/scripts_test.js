const $ = require('../gulpfile');
const runSequence = require('run-sequence').use($.gulp);

Feature('Building scripts');

Scenario('for production', (I) => {

    $.config.dev = false;

    runSequence('clean', 'scripts', () => {
        I.checkFile('js/main.js', $.config.dev);
    });

});

Scenario('for development', (I) => {

    $.config.dev = true;

    runSequence('clean', 'scripts', () => {
        I.checkFile('js/main.js.map', $.config.dev);
        I.checkFile('js/main.js', $.config.dev);
    });

});
