const { dest, src } = require("gulp");

const plumber = require("gulp-plumber");
const fileInclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const gulpSize = require("gulp-size");
const browserSync = require("browser-sync").create();
const notify = require("gulp-notify");
const path = require("../config/path");
const webpHtml = require("gulp-webp-html");
const { prod } = require('../config/mode');

const html = () => {
  return src(path.html.src)
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      })
    )
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(
      htmlmin({
        collapseWhitespace: prod,
      })
    )
    .pipe(gulpSize({ pretty: true, title: "size html:" }))
    .pipe(dest(path.html.dest));
};

module.exports = html;
