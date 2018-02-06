var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var rename = require('gulp-rename');
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
  var jsMinifyLocation = ['public/js/*.js', '!public/js/*.min.js'];
  gulp.src(jsMinifyLocation)
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['sass', 'scripts', 'watch']);
