/**
 * Create sprites of images.
 *
 * Install:
 * yarn add -D gulp.spritesmith gulp-imagemin vinyl-buffer glob
 */

const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const path = require('path');
const glob = require('glob');

module.exports = (gulp, globalConfig) => {

    const taskConfig = {
        watch: [`${globalConfig.srcDir}/images/sprites/**/*`]
    };

    gulp.task('sprites', (done) => {
        glob(`${globalConfig.srcDir}/images/sprites/*`, {}, (err, spritesDirs) => {
            const numSprites = spritesDirs.length;
            let workDone = 0;
            const checkFinish = () => {
                workDone += 0.5;

                if (workDone === numSprites) {
                    done();
                }
            };

            for (let i = 0, len = numSprites; i < len; i++) {
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
                    }));

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
