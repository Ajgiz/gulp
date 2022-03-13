const { dest, src } = require("gulp");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const path = require("../config/path");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const gulpSize = require("gulp-size");
const mediaQueries = require("gulp-group-css-media-queries");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const webpCss = require("gulp-webp-css");
const { dev } = require('../config/mode');

const scss = () => {
  return src(path.scss.src, { sourcemaps: dev })
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      })
    )
    .pipe(sassGlob())
    .pipe(webpCss())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(mediaQueries())
    .pipe(dest(path.scss.dest, { sourcemaps: dev }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(csso())
    .pipe(gulpSize({ title: "size scss:" }))
    .pipe(dest(path.scss.dest, { sourcemaps: dev }));
};

module.exports = scss;
