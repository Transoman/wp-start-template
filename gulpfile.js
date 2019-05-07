"use strict";

global.$ = {
  url: 'example.loc',
  path: {
    task: require('./gulp/path/tasks.js'),
    source: 'src/',
    build: 'app/content/themes/mytheme/'
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
  'clean',
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