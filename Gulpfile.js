var gulp    = require('gulp');
var express = require('gulp-express');
var del     = require('del');
var watch   = require('gulp-watch');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');

var config = require('./gulp-config.js');

/*******************************************************************************/

gulp.task('default', ['server']);

/*******************************************************************************/

gulp.task('server', [ 'rebuild-dist' ], function (cb) {

    express.run(config.server.executable);
    watch(config.server.dist, function (event) {
        express.notify(event)
    });
    watch(config.server.src, function () {
        gulp.start('rebuild-dist');
    });
    cb();

});

gulp.task('rebuild-dist', [ 'move', 'sass' ]);

gulp.task('move', [ 'wipe-dist' ], function () {
    return gulp
        .src(config.move.source, { base: config.base })
        .pipe(gulp.dest(config.dist))
});

gulp.task('sass', [ 'wipe-dist' ], function () {
    return gulp.src(config.sass.source)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat(config.sass.css))
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


