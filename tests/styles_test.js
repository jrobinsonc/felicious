const $ = require('../gulpfile');
const runSequence = require('run-sequence').use($.gulp);

Feature('Building styles');

Scenario('for production', (I) => {

    $.config.dev = false;

    runSequence('clean', 'sprites', 'styles', () => {
        I.checkFile('css/main.css', $.config.dev);
    });

});

Scenario('for development', (I) => {

    $.config.dev = true;

    runSequence('clean', 'sprites', 'styles', () => {
        I.checkFile('css/main.css.map', $.config.dev);
        I.checkFile('css/main.css', $.config.dev);
    });

});
