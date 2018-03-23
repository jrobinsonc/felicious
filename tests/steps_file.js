const fs = require('fs');
const path = require('path');
const gulpConfig = require('../gulpfile').config;

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
            const actorThis = this;

            return new Promise(resolve => {
                const maxAttemps = 20;
                let attemps = 0;
                const intervalSpan = 100;

                const dirPath = path.join(gulpConfig.destDir, path.dirname(fileName));
                const fileBaseName = path.basename(fileName);
                const env = dev === true ? 'development' : 'production';

                const interval = setInterval(() => {
                    attemps++;

                    const fileExists = fs.existsSync(path.join(dirPath, fileBaseName));

                    if (fileExists || attemps >= maxAttemps) {
                        clearInterval(interval);

                        resolve(fileExists);

                        actorThis.amInPath(dirPath);
                        actorThis.seeFile(fileBaseName);
                        actorThis.seeFileContentsEqual(loadFixture(fileName, env));
                    }

                }, intervalSpan);
            });
        }
    });
};
