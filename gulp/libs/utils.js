module.exports = {
    colors: require('ansi-colors'),
    log: require('fancy-log'),
    env: require('minimist')(process.argv.slice(2))
};
