var gulp = require('gulp');
require('del');

gulp.task('default', startLocalEnvironment);

gulp.task('build-dev', buildDev);

function startLocalEnvironment(cb) {
    require('./gulp/local/tasks.js');
    gulp.start('local');
    cb();
}

function buildDev(cb) {
    require('./gulp/build-dev.js');
    gulp.start('build-for-sanspantalonesdev');
    cb();
}

// function buildDev(cb) {
//     del(['./gulp/dist/**', '!./gulp/dist'], { force: true }).then(function () {
//         cb();
//     }, function (error) {
//         cb(error);
//     });

// }



