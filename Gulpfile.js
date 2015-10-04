var gulp = require('gulp');
require('del');

gulp.task('default', startLocalEnvironment);

gulp.task('build-environment', buildEnvironment);   //this will be ran by heroku, leave alone

function startLocalEnvironment(cb) {
    require('./gulp/local/tasks.js');
    gulp.start('local');
    cb();
}

function buildEnvironment(cb) {
    var environment = process.env.environment;
    if (environment === 'dev') {
        require('./gulp/build-dev.js');
        gulp.start('build-for-sanspantalonesdev', function () {
            cb();
        });
    } else if (environment === 'qa') {
        //build for qa, final prod code, needs to match production or staging.  data is the same as dev data
    } else if (environment === 'staging') {
        //build for staging, final prod code, and sample production data
    } else if (environment === 'prod') {
        //build for production, final live prod code, and live prod data
    }
}

