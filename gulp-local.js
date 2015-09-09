var gulp        = require('gulp');
var gls         = require('gulp-live-server');
var del         = require('del');
var watch       = require('gulp-watch');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var inject      = require('gulp-inject');
var htmlReplace = require('gulp-html-replace');

var config = require('./gulp-config.js');

var server = gls.new(config.server.executable);

gulp.task('local', [ 'build-dist', 'watch' ], function (cb) {
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

gulp.task('build-dist', [ 'inject', 'move', 'sass' ]);

gulp.task('rebuild-dist', [ 'build-dist' ], function (cb) {
    gulp.src(config.index).pipe(server.notify());
    cb();
});

gulp.task('inject', [ 'move', 'inject:livereload' ] );

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


gulp.task('inject:livereload', [ 'wipe-dist' ], function () {

    var d = new Date();
    var timestamp = d.valueOf();

    return gulp.src('./src/frontend/index.html')
        .pipe(htmlReplace({ 'livereload': '//localhost:35729/livereload.js?v=' + timestamp }))
        .pipe(gulp.dest('./dist/'));

});


gulp.task('wipe-dist', function (cb) {

    del(config.del.dist).then(function () {
        cb();
    }, function (error) {
        cb(error);
    });

});


