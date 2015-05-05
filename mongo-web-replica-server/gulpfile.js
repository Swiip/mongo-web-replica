var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');

gulp.task('babel', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({ optional: [ 'runtime' ] }))
    .pipe(gulp.dest('dist'));
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'dist/index.js',
    watch: ['dist/*']
  });

  gulp.watch('src/**/*.js', ['babel']);
});
