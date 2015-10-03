var gulp            = require('gulp');
// var gls             = require('gulp-live-server');
var del             = require('del');
// var watch           = require('gulp-watch');
var sass            = require('gulp-sass');
// var concat          = require('gulp-concat');
var inject          = require('gulp-inject');
var replace         = require('gulp-replace');
var wiredep         = require('wiredep').stream;
var angularFilesort = require('gulp-angular-filesort');
// var exec            = require('child_process').exec;

var config          = require('./gulp.config.dev.js');

// var server;

// /***/
gulp.task('deploy-dev', [ 'build' ], deployToHeroku);


var DIST = '../../dist/';
var FRONTEND = '../../src/frontend/';

// gulp.task('watch', [ 'build'], watchForSourceChanges );
// gulp.task('mongo', startMongo);

gulp.task('build', [ 'sass', 'inject' ]);

gulp.task('sass', [ 'copy' ], processSassFiles);
gulp.task('inject', [ 'copy' ], injectIntoIndex);

gulp.task('copy', [ 'clean' ], copyFilesToDist);

gulp.task('clean', wipeDistributionFolder);

function processSassFiles() {
    return gulp.src(FRONTEND + 'sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(DIST));
}

/* inject ***************************************************************/

function injectIntoIndex() {
    var d = new Date();
    var timestamp = d.valueOf();

    var index = FRONTEND + 'index.html';

    return gulp.src(index)
        .pipe(injectBower())
        .pipe(injectAngular())
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




