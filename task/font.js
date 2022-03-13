const { dest, src } = require("gulp");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const path = require("../config/path");
const newer = require("gulp-newer");
const fonter = require("gulp-fonter");
const fonterWoff2 = require("gulp-ttf2woff2");

const font = () => {
  return src(path.font.src)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title:'font'
        }),
      })
    )
    .pipe(newer(path.img.dest))
    .pipe(
      fonter({
        formats: ["ttf", "woff", "eot", "svg"],
      })
    )
    .pipe(dest(path.font.dest))
    .pipe(fonterWoff2())
    .pipe(dest(path.font.dest));
};

module.exports = font;
