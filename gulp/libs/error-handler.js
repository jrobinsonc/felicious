const gutil = require('gulp-util');

module.exports = function (errObj) {
    let message = gutil.colors.red('Error');

    if ('plugin' in errObj) {
        message += ` in plugin '${gutil.colors.cyan(errObj.plugin)}'`;
    }

    message += `\n\n${errObj.toString()}\n\n`;
    message += gutil.colors.gray(errObj.stack);
    message += '\n\n';

    gutil.log(message);

    if (typeof this.emit === 'function') {
        this.emit('end');
    }
};
