var gulp = require('gulp');
var csso = require('gulp-csso');
const minify = require('gulp-minify');
var concat = require('gulp-concat');
var del = require('del');

/**
 * CSS minification and concatination tasks
 */

var vendorCssFiles = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
  'node_modules/@fortawesome/fontawesome-free/css/v4-shims.min.css',
  'node_modules/animate.css/animate.min.css',
  'node_modules/bootstrap-select/dist/css/bootstrap-select.min.css'
];

var myCssFiles = ['src/css/*.css'];

gulp.task('cleanCss', function () {
  return del('dist/css');
});

gulp.task('concatVendorCssFiles', function () {
  return gulp.src(vendorCssFiles)
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('minifyMyCss', function () {
  return gulp.src(myCssFiles)
    .pipe(concat('my.min.css'))
    .pipe(csso())
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('concatCss', function () {
  return gulp.src(['dist/css/vendor.min.css', 'dist/css/my.min.css'])
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('buildCss', gulp.series('cleanCss', gulp.parallel('concatVendorCssFiles', 'minifyMyCss'), 'concatCss'));

/**
 * JS minification and concatination tasks
 */

var vendorJsFiles = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/jquery.easing/jquery.easing.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
  'node_modules/wowjs/dist/wow.min.js',
  'node_modules/bootstrap-select/dist/js/bootstrap-select.min.js',
  'node_modules/moment/min/moment.min.js',
  'node_modules/moment-timezone/builds/moment-timezone-with-data-1970-2030.min.js'
];

var myJsFiles = [
  'src/js/timezone.js',
  'src/js/service.js',
  'src/js/main.js'
];

gulp.task('cleanJs', function () {
  return del('dist/js');
});

gulp.task('concatVendorJsFiles', function () {
  return gulp.src(vendorJsFiles)
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('minifyMyJs', function () {
  return gulp.src(myJsFiles)
    .pipe(concat('my.js'))
    .pipe(minify({
      ext: {
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('concatJs', function () {
  return gulp.src(['dist/js/vendor.min.js', 'dist/js/my.min.js'])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('buildJs', gulp.series('cleanJs', gulp.parallel('concatVendorJsFiles', 'minifyMyJs'), 'concatJs'));
