var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

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

gulp.task('scripts', function() {
  gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['sass', 'scripts', 'watch']);
