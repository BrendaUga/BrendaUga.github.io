var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');

gulp.task('sass', function() {
  gulp.src('resources/scss/*.scss')
      .pipe(sass())
      .pipe(cleancss())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
  gulp.watch('resources/scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
