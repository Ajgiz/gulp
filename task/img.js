const { dest, src } = require("gulp");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const path = require("../config/path");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");

const img = () => {
  return src(path.img.src)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title:'img'
        }),
      })
    )
    .pipe(newer(path.img.dest))
    .pipe(webp())
    .pipe(dest(path.img.dest))
    .pipe(src(path.img.src))
    .pipe(newer(path.img.dest))
    .pipe(
      imagemin({
        verbose: true,
      })
    )
    .pipe(dest(path.img.dest));
};

module.exports = img;
