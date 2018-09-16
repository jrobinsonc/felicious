/* global Feature, Scenario */

const $ = require('../gulpfile');

Feature('Building styles');

Scenario('for production', async (I) => {

    $.config.dev = false;

    $.gulp.start('styles');

    await I.checkFile('css/main.css', $.config.dev);

});

Scenario('for development', async (I) => {

    $.config.dev = true;

    $.gulp.start('styles');

    await I.checkFile('css/main.css', $.config.dev);
    await I.checkFile('css/main.css.map', $.config.dev);

});
