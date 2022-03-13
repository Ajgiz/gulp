const { dest, src } = require("gulp");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const path = require("../config/path");
const babel = require("gulp-babel");
const webpack = require("webpack-stream");
const { dev, prod } = require("../config/mode");

const js = () => {
  return src(path.js.src, { sourcemaps: dev })
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title:'js'
        }),
      })
    )
    .pipe(babel())
    .pipe(
      webpack({
        mode: prod ? "production" : "development",
      })
    )
    .pipe(dest(path.js.dest, { sourcemaps: dev }));
};

module.exports = js;
