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
var exec            = require('child_process').exec;

var SRC = './src/'
var DIST = './dist/'

var BACKEND = SRC + 'backend/'
var FRONTEND = SRC + 'frontend/';

var server;

/***/
gulp.task('start-local-environment', [ 'watch', 'mongo' ], startServer);

gulp.task('watch', [ 'build'], watchForSourceChanges );
gulp.task('mongo', startMongo);

gulp.task('build', [ 'sass', 'inject' ]);

gulp.task('sass', [ 'copy' ], processSassFiles);
gulp.task('inject', [ 'copy' ], injectIntoIndex);

gulp.task('copy', [ 'clean' ], copyFilesToDist);

gulp.task('clean', wipeDistributionFolder);

/***/
gulp.task('rebuild', [ 'build'], notifyServer);

/* local ****************************************************************/

function startServer(cb) {
    server = gls.new(BACKEND + 'server.js');
    server.start().then(function (result) {
        if (result && result.code === 1) {
            killLiveReloadServerIfRunning();
            console.error("Unable start server.");
        }
    });

    if (typeof cb === 'function') { 
        cb();
    }
}

function watchForSourceChanges() {
    watch(FRONTEND + '**/*', function (event) {
        gulp.start('rebuild');
    });

    watch(BACKEND + '**/*', function (event) {
        console.log('Backend changes detected, restarting server...');
        server.stop().then(function () {
            startServer();
        });
    });

}
function notifyServer() {
    return gulp.src(DIST + 'index.html').pipe(server.notify());
}


/* mongo ****************************************************************/

function startMongo(cb) {

    exec('mongo admin --eval "db.shutdownServer()"', function () {

        var mongo = exec('mongod --dbpath ./localdb/db/');
        mongo.stdout.on('data', function (data) {
            if (data.indexOf('waiting for connections on port') !== -1) {
                cb();
            }
            if (data.indexOf('dbexit') !== -1) {
                console.error('Unable to start mongo!');
                cb(data);
            }
        });
    });
    
}

/* sass *****************************************************************/

function processSassFiles() {
    return gulp.src(FRONTEND + 'sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(DIST));
}

/* inject ***************************************************************/

function injectIntoIndex() {
    var d = new Date();
    var timestamp = d.valueOf();

    return gulp.src(FRONTEND + 'index.html')
        .pipe(injectBower())
        .pipe(injectAngular())
        .pipe(injectLiveReload())
        .pipe(injectStyleSheetLink())
        .pipe(gulp.dest(DIST));


    function injectBower() {
        return wiredep({
            ignorePath: '../../'
        });
    }

    function injectAngular() {
        var angularFiles = gulp.src(FRONTEND + '**/*.js').pipe(angularFilesort());
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
    var sources = [
        FRONTEND + '**/*.js' ,
        FRONTEND + '**/*.html',
        '!' + FRONTEND + 'index.html'  //moved by inject task
    ];

    return gulp
        .src(sources, { base: FRONTEND })
        .pipe(gulp.dest(DIST))
}

function wipeDistributionFolder(cb) {
    del(['./dist/**', '!./dist']).then(function () {
        cb();
    }, function (error) {
        cb(error);
    });
}


/************************************************************************/
/* this is require because sometimes the tiny-lr server from 
gulp-live-server doesn't exit gracefully */

function killLiveReloadServerIfRunning() {
    require('http').get('http://localhost:35729/kill').on('error', function () {
        //i don't care about errors here
    });
}



