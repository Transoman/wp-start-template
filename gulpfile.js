"use strict";

global.$ = {
  url: 'example.loc',
  path: {
    task: require('./gulp/path/tasks.js'),
    source: './src/',
    build: './app/content/themes/mytheme/'
  },
  gulp: require('gulp'),
  browserSync: require('browser-sync').create(),
  del: require('del')
};

$.path.task.forEach(function (taskPath) {
  require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'fonts',
    'styles:dev',
    'img:dev',
    'js:dev',
    'svg'
  )
));

$.gulp.task('build', $.gulp.series(
  // 'clean',
  $.gulp.parallel(
    'fonts',
    'styles:build-min',
    'img:build',
    'js:build-min',
    'svg'
  )
));

$.gulp.task('default', $.gulp.series(
  'dev',
  $.gulp.parallel(
    'watch',
    'server'
  )
));

// 'use strict';

// var browserify = require('browserify'),
//     source = require('vinyl-source-stream'),
//     gulp = require('gulp'),
//     sass = require('gulp-sass'),
//     uglify = require('gulp-uglify'),
//     cleanCSS = require('gulp-clean-css'),
//     sourcemaps = require('gulp-sourcemaps'),
//     sourcePath = './src/',
//     buildPath = './app/content/themes/mytheme/build/';

// //scss
// gulp.task('scss', function () {
//     return gulp.src('./src/scss/style.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest(buildPath + 'css'));
// });

// gulp.task('scss:watch', function () {
//     return gulp.watch(sourcePath + 'scss/**/*.scss', ['scss']);
// });

// //js
// gulp.task('browserify', function() {
//     return browserify(sourcePath + 'js/main.js')
//         .bundle()
//         .pipe(source('main.js'))
//         .pipe(gulp.dest(buildPath + 'js'));
// });

// gulp.task('browserify:watch', function () {
//     return gulp.watch(sourcePath + 'js/**/*.js', ['browserify']);
// });

// //fonts
// gulp.task('copy:fonts', function () {
//     gulp.src(sourcePath + 'fonts/**/*', {base: sourcePath + 'fonts'})
//         .pipe(gulp.dest(buildPath + 'fonts'));
// });

// //minify
// gulp.task('minify:js', ['browserify'], function(){
//     return gulp.src(buildPath + 'js/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(uglify())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(buildPath + 'js'))
// });

// gulp.task('minify:css', ['scss'], function(){
//     return gulp.src(buildPath + 'css/*.css')
//         .pipe(cleanCSS({compatibility: 'ie9'}))
//         .pipe(gulp.dest(buildPath + 'css'));
// });


// //task groups
// gulp.task('default', ['copy:fonts', 'scss', 'browserify']);
// gulp.task('watch', ['copy:fonts', 'scss:watch', 'browserify:watch']);
// gulp.task('production', ['copy:fonts', 'scss', 'browserify', 'minify:js', 'minify:css']);