var gulp = require('gulp');
var express = require('gulp-express');
var del = require('del');


gulp.task('clean', function (cb) {

    del(['./dist/**', '!./dist']).then(function () {
        cb();
    }, function (error) {
        cb(error);
    });

});

gulp.task('move', [ 'clean' ], function () {
    var filesToMove = [
        './src/frontend/index.html',
        './src/frontend/test.html'
    ]
    return gulp.src(filesToMove).pipe(gulp.dest('./dist'));
});



gulp.task('server', [ 'move' ], function () {
    express.run([ './src/backend/server.js' ]);

    gulp.watch([ './dist/**' ], function (event) {
        if (event && event.type === 'changed') {
            console.log('File changed: ', event.path);
            express.notify(event);
        }
    });
});


gulp.task('watch:index', function () {
     var htmlFiles = [
         './src/frontend/index.html'
     ];
     gulp.watch(htmlFiles, ['move']);
});



gulp.task('default', ['server', 'watch:index']);

