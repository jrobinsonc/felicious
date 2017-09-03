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

    gulp.task('sprites', () => {

        glob(`${globalConfig.srcDir}/images/sprites/*`, {}, (err, spritesDirs) => {
            for (let i = 0, len = spritesDirs.length; i < len; i++) {
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
                    .pipe(gulp.dest(`${globalConfig.destDir}/images/`));

                spriteData.css
                    .pipe(gulp.dest(`${globalConfig.tmpDir}/sprites`));
            }
        });

    });

    return taskConfig;
};
