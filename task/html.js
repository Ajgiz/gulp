const { dest, src } = require("gulp");

const plumber = require("gulp-plumber");
const fileInclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const gulpSize = require("gulp-size");
const notify = require("gulp-notify");
const path = require("../config/path");
const webpHtml = require("gulp-webp-html");

const html = () => {
  return src(path.html.src)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "html",
        }),
      })
    )
    .pipe(fileInclude())

    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulpSize({ pretty: true, title: "size html:" }))
    .pipe(webpHtml())
    .pipe(dest(path.html.dest));
};

module.exports = html;
