var gulp            = require('gulp');
var gls             = require('gulp-live-server');
var del             = require('del');
var watch           = require('gulp-watch');
var sass            = require('gulp-sass');
var concat          = require('gulp-concat');
var inject          = require('gulp-inject');
var replace         = require('gulp-replace');
var wiredep         = require('wiredep').stream;
var angularFilesort = require('gulp-angular-filesort');

var config          = require('./gulp-config.js');

var server;

gulp.task('test', function () {
    server.stop().then(function () {
        startServer(function() {});
    });

    cb();
});

gulp.task('local', [ 'watch' ], startServer);
gulp.task('watch', [ 'build'], watchForSourceChanges );
gulp.task('build', [ 'sass', 'inject' ]);

gulp.task('rebuild', [ 'build'], notifyServer);

/***/
gulp.task('sass', [ 'copy' ], processSassFiles);

/***/
gulp.task('inject', [ 'copy' ], injectIntoIndex);

/***/
gulp.task('copy', [ 'clean' ], copyFilesToDist);
gulp.task('clean', wipeDistributionFolder);


/* local ****************************************************************/

function startServer(cb) {
    server = gls.new(config.backend.server);
    server.start().then(function () {
        cb();
    }, function (error) {
        cb(error);
    });
}
function watchForSourceChanges() {
    watch(config.watch, function (event) {
        gulp.start('rebuild');
    });
}
function notifyServer() {
    return gulp.src(config.dist.index).pipe(server.notify());
}

/* sass *****************************************************************/

function processSassFiles() {
    return gulp.src(config.sass.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.dist.root));
}

/* inject ***************************************************************/

function injectIntoIndex() {
    var d = new Date();
    var timestamp = d.valueOf();

    return gulp.src(config.frontend.index)
        .pipe(injectBower())
        .pipe(injectAngular())
        .pipe(injectLiveReload())
        .pipe(injectStyleSheetLink())
        .pipe(gulp.dest(config.dist.root));


    function injectBower() {
        return wiredep({
            ignorePath: '../../'
        });
    }

    function injectAngular() {
        var angularFiles = gulp.src(config.frontend.root + '**/*.js').pipe(angularFilesort());
        return inject(angularFiles, {
            name: 'angular',
            ignorePath: '/src/frontend/'
        });
    }

    function injectLiveReload() {
        var findString      = '<!-- livereload.js script goes here -->';
        var replaceString   = '<script src="//localhost:35729/livereload.js?v=' + timestamp + '"></script>';
        return replace(findString, replaceString)
    }

    function injectStyleSheetLink() {
        var findString         = '<!-- the style.css link goes here -->';
        var replaceString   = '<link type="text/css" rel="stylesheet" href="style.css?v=' + timestamp + '"></link>';
        return replace(findString, replaceString)
    }

}

/* copy *****************************************************************/

function copyFilesToDist() {
    return gulp
        .src(config.move.source, { base: config.frontend.root })
        .pipe(gulp.dest(config.dist.root))
}
function wipeDistributionFolder(cb) {
    del(config.del.target).then(function () {
        cb();
    }, function (error) {
        cb(error);
    });
}
