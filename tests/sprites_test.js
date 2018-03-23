const $ = require('../gulpfile');

Feature('Building sprites');

Scenario('for production', async (I) => {

    $.config.dev = false;

    $.gulp.start('sprites');

    await I.checkFile('images/social.png', $.config.dev);

});

Scenario('for development', async (I) => {

    $.config.dev = true;

    $.gulp.start('sprites');

    await I.checkFile('images/social.png', $.config.dev);

});
