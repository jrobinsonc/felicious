const $ = require('../gulpfile');
const runSequence = require('run-sequence').use($.gulp);

Feature('Compressing images');

Scenario('for production', (I) => {

    $.config.dev = false;

    runSequence('clean', 'images', () => {
        I.checkFile('images/logo.png');
    });

});

Scenario('for development', (I) => {

    $.config.dev = true;

    runSequence('clean', 'images', () => {
        I.checkFile('images/logo.png');
    });

});
