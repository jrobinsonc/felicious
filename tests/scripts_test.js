const $ = require('../gulpfile');

Feature('Building scripts');

Scenario('for production', async (I) => {

    $.config.dev = false;

    $.gulp.start('scripts');

    await I.checkFile('js/main.js', $.config.dev);

});

Scenario('for development', async (I) => {

    $.config.dev = true;

    $.gulp.start('scripts');

    await I.checkFile('js/main.js', $.config.dev);
    await I.checkFile('js/main.js.map', $.config.dev);

});
