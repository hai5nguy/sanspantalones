var gulp    = require('gulp');
var gls     = require('gulp-live-server');
var del     = require('del');
var watch   = require('gulp-watch');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');

var config = require('./gulp-config.js');

var server = gls.new(config.server.executable);

/*******************************************************************************/

gulp.task('default', ['server']);

/*******************************************************************************/

gulp.task('server', [ 'build-dist', 'watch' ], function (cb) {
    server.start().then(function () {
        cb();
    }, function (error) {
        cb(error);
    });
});


gulp.task('watch', [ 'build-dist' ], function () {

    watch(config.watch, function (event) {
        gulp.start('rebuild-dist')
    });

});

gulp.task('rebuild-dist', [ 'build-dist' ], function (cb) {
    gulp.src(config.index).pipe(server.notify());
    cb();
});

gulp.task('build-dist', [ 'move', 'sass' ]);

gulp.task('move', [ 'wipe-dist' ], function () {
    return gulp
        .src(config.move.source, { base: config.base })
        .pipe(gulp.dest(config.dist))
});

gulp.task('sass', [ 'wipe-dist' ], function () {
    return gulp.src(config.sass.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.dist));
});


gulp.task('wipe-dist', function (cb) {

    del(config.del.dist).then(function () {
        cb();
    }, function (error) {
        cb(error);
    });

});

/*******************************************************************************/

gulp.task('psuh_To_Dev_Becusae_I_Konw_Waht_Im_Diong_And_Hai_Is_A_Dcik_For_Maikng_Me_Cpoy_And_Psate_Tihs', function () {
    //to be continue...
});


