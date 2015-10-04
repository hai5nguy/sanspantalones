var gulp            = require('gulp');
var del             = require('del');
var sass            = require('gulp-sass');
var inject          = require('gulp-inject');
var replace         = require('gulp-replace');
var wiredep         = require('wiredep').stream;
var angularFilesort = require('gulp-angular-filesort');


var DIST = './dist/';
var FRONTEND = './src/frontend/';

gulp.task('build-for-sanspantalonesdev', [ 'sass', 'inject', 'image' ]);

gulp.task('sass', [ 'copy' ], processSassFiles);
gulp.task('inject', [ 'copy' ], injectIntoIndex);
gulp.task('image', [ 'copy' ], processImages);

gulp.task('copy', [ 'clean' ], copyFilesToDist);

gulp.task('clean', wipeDistributionFolder);


/* sass ******************************************************************/

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

/* images ***************************************************************/

function processImages() {

    return gulp.src(FRONTEND + 'img/**')
        .pipe(gulp.dest(DIST + 'img/'));

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

function wipeDistributionFolder() {
    return del(['./dist/**', '!./dist']);
}




