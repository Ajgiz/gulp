const { dest, src } = require("gulp");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const path = require("../config/path");
const concat = require("gulp-concat");
const cssImport = require("gulp-cssimport");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const gulpSize = require("gulp-size");
const mediaQueries = require("gulp-group-css-media-queries");
const { dev } = require("../config/mode");

const css = () => {
  return src(path.css.src, { sourcemaps: dev })
    .pipe(
      plumber({
        
        errorHandler: notify.onError(),
      })
    )
    .pipe(concat("common.css"))
    .pipe(cssImport())
    .pipe(autoprefixer())
    .pipe(mediaQueries())
    .pipe(dest(path.css.dest, { sourcemaps: dev }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(csso())
    .pipe(gulpSize({ title: "size css:" }))
    .pipe(dest(path.css.dest, { sourcemaps: dev }));
};

module.exports = css;
