var gulp    = require('gulp');
var express = require('gulp-express');
var del     = require('del');
var watch   = require('gulp-watch');

var config = require('./gulp-config.js');

/*******************************************************************************/
gulp.task('default', ['server']);


/*******************************************************************************/

gulp.task('server', [ 'rebuild-dist' ], function (cb) {

    express.run(config.server.executable);
    watch(config.server.dist, function (event) {
        express.notify(event)
    });
    watch(config.server.src, function () {
        console.log('shit has changed');
        gulp.start('rebuild-dist');
    });
    cb();

});

gulp.task('rebuild-dist', [ 'wipe-dist' ], function () {

    console.log('uhhh rebuild');

    return gulp
        .src(config.rebuild.filesToMove, { base: config.rebuild.base })
        .pipe(gulp.dest(config.rebuild.dist));

});


gulp.task('wipe-dist', function (cb) {

    del(config.del.dist).then(function () {
        cb();
    }, function (error) {
        cb(error);
    });

});



/*******************************************************************************/



// 
// gulp.task('server', ['server-setup', 'watch:html', 'watch:js', 'watch:deletion' ]);

// gulp.task('watch:js', ['wipe-dist'], function (cb) {
//     gulp.src(config.watch.js, { base: config.watch.base })
//         .pipe(watch(config.watch.js, { base: config.watch.base }))
//         .pipe(del[config.del.dist]);
//         .pipe(gulp.dest(config.watch.dist));

//     cb();
// });

// gulp.task('watch:html', ['wipe-dist'], function (cb) {
//     gulp.src(config.watch.html, { base: config.watch.base })
//         .pipe(watch(config.watch.html, { base: config.watch.base }))
//         .pipe(gulp.dest(config.watch.dist));

//     cb();
// });


// gulp.task('server-setup', [ 'wipe-dist'], function (cb) {

//     express.run(config.server.executable);
//     gulp.watch(config.server.watchFolders, express.notify);
//     cb();

// });



// gulp.task('rebuild-dist', [ 'wipe-dist' ], function () {

//     return gulp
//         .src(config.rebuild.filesToMove, { base: config.rebuild.base })
//         .pipe(gulp.dest(config.rebuild.dist));

// });


// gulp.task('wipe-dist', function (cb) {

//     del(config.del.dist).then(function () {
//         cb();
//     }, function (error) {
//         cb(error);
//     });

// });


// gulp.task('watch:deletion', function (cb) {
//     gulp.watch(['./src/**/*'], function (event) {
//         if (event && event.type === 'deleted') {
//             console.log('stopping');
//             express.stop();
//             gulp.start('server');
//         }

//     });
//     cb();
// });


// /*******************************************************************************/




// function handleFileDeletionBecauseGulpDestIsStupid(vinylInstance) {

//     setTimeout(function () {
//         console.log('inside timer')
//     }, 5000);

//     console.log('yo');



//     // if (vinylInstance && vinylInstance.event === 'unlink') {
//     //     return del(config.del.dist).then(function() {
//     //         return config.watch.dist
//     //     }, function () {
//     //         console.log('this should never happen, tell hai');
//     //         return config.watch.dist
//     //     });
//     // } else {
//     //     return config.watch.dist
//     // }

// }




/*******************************************************************************/



// gulp-task('watch-frontend-html', function () {

// });

// gulp-task('watch-frontend', function () {

//     gulp.watch(config.frontend.index, [  ])
//     //index.html
    

//     // gulp.watch(config.frontend., [ 'rebuild-dist' ]);
// });

// gulp-task('rebuild-dist', function () {
//     del(config.del.dist).then(function () {
//         gulp.src(config.frontend.rootfiles).pipe(gulp.dest(config.dist));
//     });
// });



// gulp.task('process-sass', function () {

// });


// gulp.task('sass', function () {
//     return gulp.src(config.sass)
//         .pipe(watch(config.sass));
// });




// gulp.task('watch-components', function (cb) {


//     gulp.watch(config.components.sass, [ 'process-sass' ]);
//     gulp.watch(config.components.js, [ 'process-js' ]);
//     gulp.watch(config.components.html, [ 'process-html' ]);
// });

// gulp.task('watch-frontend', ['watch-components'], function () {
    



//     //components
//     //
//     //images
//     //
//     //rootfiles


//     gulp.watch(config.frontend.rootFiles, function () {
//         gulp.src(config.frontend.rootFiles).pipe(gulp.dest(config.dist));
//     });

//     gulp.watch(config.components.js )

//     gulp.watch(config.frontend.js, [ 'process-js' ]);


//     gulp.watch(config.components.allButSass, server.notify);

//     gulp.watch(config.components.sass, [ 'process-sass' ]);


//     gulp.watch(config.frontend.components, server.notify);

// });

// gulp.task('watches', ['watch:html'], function () {
//      var htmlFiles = [
//          './src/frontend/index.html'
//      ];
//      gulp.watch(htmlFiles, ['move']);
// });

// gulp.task('watch:index:js', function (cb) {
//     del(config.dist.indexjs).then(function () {
        
//     }, function (error) {
//         cb(error);
//     });

//     gulp.watch();
// });


gulp.task('psuh_To_Dev_Becusae_I_Konw_Waht_Im_Diong_And_Hai_Is_A_Dcik_For_Maikng_Me_Cpoy_And_Psate_Tihs', function () {
    //to be continue...
});


