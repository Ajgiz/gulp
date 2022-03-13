const { watch, series, parallel } = require("gulp");

const browserSync = require("browser-sync").create();
const clear = require("./task/clear");
const html = require("./task/html");
const path = require("./config/path");
const scss = require("./task/scss");
const js = require("./task/script");
const img = require("./task/img");
const font = require("./task/font");
const { prod } = require("./config/mode");

const server = () => {
  browserSync.init({
    port: 5000,
    server: {
      baseDir: path.root,
    },
  });
};

const watcher = () => {
  watch(path.html.watch, html).on("all", browserSync.reload);
  watch(path.scss.watch, scss).on("all", browserSync.reload);
  watch(path.js.watch, js).on("all", browserSync.reload);
  watch(path.img.watch, img).on("all", browserSync.reload);
  watch(path.font.watch, font).on("all", browserSync.reload);
};

const build = series(clear, parallel(html, scss, js, img, font));
const dev = series(build, parallel(watcher, server));

exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;

exports.default = prod ? build : dev;
