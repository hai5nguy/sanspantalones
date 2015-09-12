var gulp            = require('gulp');
var gls             = require('gulp-live-server');
var del             = require('del');
var watch           = require('gulp-watch');
var sass            = require('gulp-sass');
var concat          = require('gulp-concat');
var inject          = require('gulp-inject');
var htmlReplace     = require('gulp-html-replace');
var wiredep         = require('wiredep').stream;
var angularFilesort = require('gulp-angular-filesort');
var Q               = require('q');

var config          = require('./gulp-config.js');

var server;

gulp.task('local', [ 'watch' ], startServer);
gulp.task('watch', [ 'build'], watchForSourceChanges );
gulp.task('build', [ 'sass', 'inject' ], buildDistFolder);

gulp.task('rebuild', [ 'build'], notifyServer);

/***/
gulp.task('sass', [ 'copy' ], processSassFiles);

/***/
gulp.task('inject', [ 'inject:bower', 'copy']);
gulp.task('inject:bower', [ 'inject:angular' ], injectBowerIntoIndex);
gulp.task('inject:angular', [ 'inject:livereload' ], injectAngularIntoIndex);
gulp.task('inject:livereload', [ 'copy' ], injectLiveReloadIntoIndex )

/***/
gulp.task('copy', [ 'clean' ], copyFilesToDist);
gulp.task('clean', wipeDistributionFolder);


/***/
/* local ****************************************************************/

function startServer(cb) {
    server = gls.new(config.server.executable);
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
function buildDistFolder() {
    //all the building are already done in the dependencies, this just needs to return
    //a promise for watch to work correctly

    return Q.Promise(function (resolve, reject, notify) {
        resolve();
    });
}
function notifyServer() {
    return gulp.src(config.index).pipe(server.notify());
}

/* sass *****************************************************************/

function processSassFiles() {
    return gulp.src(config.sass.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.dist));
}

/* inject ***************************************************************/

gulp.task('newinject', [ 'copy' ], newinjectblah)
function newinjectblah() {

    return gulp.src('./src/index.html')
        .pipe(injectBower());
        .pipe(gulp.dest('./dist/'))

}

function injectBower() {
    return wiredep({
    });
}

function injectBowerIntoIndex() {
    return gulp.src('./dist/index.html')
        .pipe(wiredep({
            ignorePath: '/../../../'
        }))
        .pipe(gulp.dest('./dist/'));
}
function injectAngularIntoIndex() {

    var index = gulp.src('./dist/index.html');

    var angularFiles = gulp.src('./src/frontend/**/*.js').pipe(angularFilesort());

    var destination = gulp.dest('./dist');

    return index.pipe(inject(angularFiles, { name: 'angular', ignorePath: '/src/frontend' } ))
                .pipe(destination);
}
function injectLiveReloadIntoIndex() {
    var d = new Date();
    var timestamp = d.valueOf();

    return gulp.src('./dist/index.html')
        .pipe(htmlReplace({ 'livereload': '//localhost:35729/livereload.js?v=' + timestamp }))
        .pipe(gulp.dest('./dist/'));
}


/* copy *****************************************************************/

function copyFilesToDist() {
    return gulp
        .src(config.move.source, { base: config.base })
        .pipe(gulp.dest(config.dist))
}
function wipeDistributionFolder(cb) {
    del(config.del.dist).then(function () {
        cb();
    }, function (error) {
        cb(error);
    });
}
