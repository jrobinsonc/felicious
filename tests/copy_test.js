/* global Feature, Scenario */

const $ = require('../gulpfile');

Feature('Copying root files');

Scenario('for production', async (I) => {

    $.config.dev = false;

    $.gulp.start('copy');

    await I.checkFile('favicon.ico', $.config.dev);

});

Scenario('for development', async (I) => {

    $.config.dev = true;

    $.gulp.start('copy');

    await I.checkFile('favicon.ico', $.config.dev);

});
