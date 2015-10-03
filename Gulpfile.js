var gulp = require('gulp');

gulp.task('default', startLocalEnvironment);

gulp.task('build-dev', deployToDev);

function startLocalEnvironment(cb) {
    require('./gulp/local/tasks.js');
    gulp.start('local');
    cb();
}

function deployToDev(cb) {
    require('./gulp/build-dev.js');
    gulp.start('build-for-sanspantalonesdev');
    cb();
}



