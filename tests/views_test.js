const $ = require('../gulpfile');
const runSequence = require('run-sequence').use($.gulp);

Feature('Building HTML');

Scenario('for production', async (I) => {

    $.config.dev = false;

    $.gulp.start('views');

    await I.checkFile('index.html', $.config.dev);

});

Scenario('for development', async (I) => {

    $.config.dev = true;

    $.gulp.start('views');

    await I.checkFile('index.html', $.config.dev);

});
