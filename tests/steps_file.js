const fs = require('fs');
const path = require('path');
const gulpConfig = require('../gulpfile').config;

'use strict';

// in this file you can append custom step methods to 'I' object

/**
 * Load fixture
 *
 * @param {string} fileName - File to be checked
 * @param {string} env - Indicates environment
 *
 * @return {string} - Returns the contents of the file
 */
const loadFixture = (fileName, env) => {
    const filePath = path.join('tests/fixtures', env, fileName);

    return fs.readFileSync(filePath).toString();
};

/**
 * Wait until file exist
 *
 * @param {string} file - File to be checked
 * @param {integer} maxSeconds - Max amount of time in seconds
 * @param {callback} cb - Callback to be executed if file is found
 *
 * @return {void}
 */
const waitUntilFileExist = (file, maxSeconds, cb) => {

    const timeInterval = 10; // In milliseconds
    const maxTime = maxSeconds * 1000;
    const maxAttemps = maxTime / timeInterval;
    let attemps = 0;

    const interval = setInterval(() => {
        attemps++;

        const foundFile = fs.existsSync(file);

        if (foundFile || attemps >= maxAttemps) {
            clearInterval(interval);

            if (foundFile) {
                cb();
            } else {
                const seconds = maxTime / 1000;
                throw new Error(`File not found: ${file}, after ${seconds} seconds.`);
            }
        }

    }, timeInterval);
}

module.exports = function () {
    return actor({

        /**
         * Check if file exist
         *
         * @param {string} fileName - File inside the ./dist directory.
         * @param {bool} dev - Indicates either dev mode is active or not
         *
         * @return {void}
         */
        checkFile: function (fileName, dev) {

            const env = dev === true? 'development' : 'production';

            const dirPath = path.join(gulpConfig.destDir, path.dirname(fileName));
            const fileBaseName = path.basename(fileName);
            // const seconds = 2;

            // Sometimes the file is not generated enough fast to be checked
            // waitUntilFileExist(path.join(dirPath, fileBaseName), seconds, () => {
            this.amInPath(dirPath);

            this.seeFile(fileBaseName);

            this.seeFileContentsEqual(loadFixture(fileName, env));
            // });
        }

    });
};
