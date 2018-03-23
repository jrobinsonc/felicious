const $ = require('../gulpfile');

Feature('Compressing images');

Scenario('for production', async (I) => {

    $.config.dev = false;

    $.gulp.start('images');

    await I.checkFile('images/logo.png', $.config.dev);

});

Scenario('for development', async (I) => {

    $.config.dev = true;

    $.gulp.start('images');

    await I.checkFile('images/logo.png', $.config.dev);

});
