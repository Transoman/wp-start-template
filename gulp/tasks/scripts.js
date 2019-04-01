let gp = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    scriptsPATH = {
      "input": $.path.source + "js/",
      "ouput": $.path.build + "js/"
    };

module.exports = function () {
  $.gulp.task('js:dev', () => {
    return browserify(scriptsPATH.input + 'common.js')
      .bundle()
      .pipe(gp.plumber())
      .pipe(source('common.js'))
      .pipe($.gulp.dest(scriptsPATH.ouput))
      .pipe($.browserSync.reload({
        stream: true
      }));
  });

  $.gulp.task('js:build-min', () => {
    return browserify(scriptsPATH.input + 'common.js')
      .bundle()
      .pipe(gp.plumber())
      .pipe(source('common.js'))
      .pipe(buffer())
      .pipe(gp.uglify())
      .pipe($.gulp.dest(scriptsPATH.ouput));
  });
};