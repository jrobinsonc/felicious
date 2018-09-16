/* global Feature, Scenario */

const $ = require('../gulpfile');

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
