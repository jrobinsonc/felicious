const $ = require('../gulpfile');
const runSequence = require('run-sequence').use($.gulp);

Feature('Building sprites');

Scenario('for production', (I) => {

    $.config.dev = false;

    runSequence('clean', 'sprites', () => {
        I.checkFile('images/social.png', $.config.dev);
    });

});

Scenario('for development', (I) => {

    $.config.dev = true;

    runSequence('clean', 'sprites', () => {
        I.checkFile('images/social.png', $.config.dev);
    });

});
