let gp = require('gulp-load-plugins')(),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    pngquant = require('imagemin-pngquant'),
    imgPATH = {
      "input": [$.path.source + 'images/**/*.{png,jpg,gif,svg}',
        '!' + $.path.source + 'images/svg/*'],
      "ouput": $.path.build + "/images/"
    };

module.exports = function () {
  $.gulp.task('img:dev', () => {
    return $.gulp.src(imgPATH.input)
     .pipe($.gulp.dest(imgPATH.ouput));
  });

  $.gulp.task('img:build', () => {
    return $.gulp.src(imgPATH.input)
      .pipe(gp.cache(gp.imagemin([
        gp.imagemin.gifsicle({interlaced: true}),
        gp.imagemin.jpegtran({progressive: true}),
        imageminJpegRecompress({
          loops: 5,
          min: 70,
          max: 75,
          quality: 'medium'
        }),
        gp.imagemin.svgo(),
        gp.imagemin.optipng({optimizationLevel: 3}),
        pngquant({quality: '65-70', speed: 5})
      ], {
        verbose: true
      })))
    .pipe($.gulp.dest(imgPATH.ouput));
  });
};