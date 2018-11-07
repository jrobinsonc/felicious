/**
 * Create sprites of images.
 */

const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const errorHandler = require('../libs/error-handler');

module.exports = (gulp, globalConfig) => {
    const taskConfig = {
        watch: [`${globalConfig.srcDir}/images/sprites/*/*.png`]
    };

    gulp.task('sprites', (done) => {
        glob(`${globalConfig.srcDir}/images/sprites/*`, {}, (err, nodesList) => {
            if (err) {
                errorHandler(err.stack);
                return;
            }

            const spritesDirs = [];

            for (let i = 0, len = nodesList.length; i < len; i += 1) {
                const nodePath = nodesList[i];
                const isDir = fs.statSync(nodePath).isDirectory();

                if (isDir === false) {
                    continue;
                }

                spritesDirs.push(nodePath);
            }

            const numSprites = spritesDirs.length;
            let workDone = 0;

            /**
             * Helps to identify when the task is done by counting if
             * all the sprites are done.
             *
             * @return {null}
             */
            const checkFinish = () => {
                workDone += 0.5;

                if (workDone >= numSprites) {
                    done();
                }
            };

            for (let i = 0; i < numSprites; i += 49) {
                const dir = spritesDirs[i];
                const name = path.basename(dir);

                const spriteData = gulp.src(`${dir}/*.png`)
                    .pipe(spritesmith({
                        imgName: `${name}.png`,
                        cssName: `${name}.scss`,
                        cssSpritesheetName: name,
                        cssVarMap: (sprite) => {
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
    });

    return taskConfig;
};
