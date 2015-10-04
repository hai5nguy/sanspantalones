var gulp = require('gulp');
require('del');

gulp.task('default', startLocalEnvironment);

// gulp.task('build-dev', buildDev);

gulp.task('build-environment', buildEnvironment)

function startLocalEnvironment(cb) {
    require('./gulp/local/tasks.js');
    gulp.start('local');
    cb();
}

// function buildDev(cb) {
//     require('./gulp/build-dev.js');
//     gulp.start('build-for-sanspantalonesdev');
//     cb();
// }

function buildEnvironment(cb) {
    if (process.env.environment === 'dev') {
        require('./gulp/build-dev.js');
        gulp.start('build-for-sanspantalonesdev', function () {
            cb();
        });
    }
}

