/**
 * Create sprites of images.
 *
 * Install:
 * yarn add -D gulp.spritesmith gulp-imagemin vinyl-buffer glob
 */

const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const errorHandler = require('../libs/error-handler');
const path = require('path');
const glob = require('glob');
const q = require('q');
const fs = require('fs');

module.exports = (gulp, globalConfig) => {

    const taskConfig = {
        watch: [`${globalConfig.srcDir}/images/sprites/*/*.png`]
    };

    gulp.task('sprites', () => {
        const deferred = q.defer();

        glob(`${globalConfig.srcDir}/images/sprites/*`, {}, (err, nodesList) => {

            const spritesDirs = [];

            for (let i = 0, len = nodesList.length; i < len; i++) {
                const nodePath = nodesList[i];
                const isDir = fs.statSync(nodePath).isDirectory();

                if (false === isDir) {
                    continue;
                }

                spritesDirs.push(nodePath);
            }

            const numSprites = spritesDirs.length;
            let workDone = 0;
            const checkFinish = () => {
                workDone += 0.5;

                if (workDone >= numSprites) {
                    deferred.resolve();
                }
            };

            checkFinish();

            for (let i = 0; i < numSprites; i++) {
                const dir = spritesDirs[i];
                const name = path.basename(dir);

                const spriteData = gulp.src(`${dir}/*.png`)
                    .pipe(spritesmith({
                        imgName: `${name}.png`,
                        cssName: `${name}.scss`,
                        cssSpritesheetName: name,
                        cssVarMap: function (sprite) {
                            sprite.name = `${name}-image-${sprite.name}`;
                        },
                        cssOpts: {
                            // functions: false
                        }
                    }))
                    .on('error', (errObj) => {
                        // TODO : There should be a test against this.
                        if (errObj.message === 'Invalid file signature') {
                            errorHandler(new Error('Some of the provided images are not valid PNGs.'));
                        } else {
                            errorHandler(errObj);
                        }
                    });

                spriteData.img
                    .pipe(buffer())
                    .pipe(imagemin())
                    .pipe(gulp.dest(`${globalConfig.destDir}/images/`))
                    .on('end', checkFinish);

                spriteData.css
                    .pipe(gulp.dest(`${globalConfig.tmpDir}/sprites`))
                    .on('end', checkFinish);
            }
        });

        return deferred.promise;
    });

    return taskConfig;
};
