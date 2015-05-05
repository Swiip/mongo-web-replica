var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('gulp-webpack');

function webpackLauncher(watch) {
  return gulp.src('src/index.js')
    .pipe(webpack({
      watch: true,
      module: {
        loaders: [ { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime'} ]
      },
      output: {
        filename: 'index.js'
      }
    }))
    .pipe(gulp.dest('dist/'));
}

gulp.task("webpack", function() {
  return webpackLauncher(false);
});

gulp.task("watch", function() {
  return webpackLauncher(true);
});
