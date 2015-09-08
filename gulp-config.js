var frontend = './src/frontend/';
var components = './src/frontend/components/';

module.exports = {

    base: frontend,

    del: {
        dist: ['./dist/**', '!./dist']
    },

    dist: './dist/',

    move: {
        source: [
            frontend + '**/*.js' ,
            frontend + '**/*.html'
        ]
    },

    sass: {
        css: 'style.css',
        source: [ 
            frontend + 'sass/style.scss',
            frontend + '**/*.sass'
        ]
    },

    server: {
        dist: './dist/**/*',
        executable: [ './src/backend/server.js' ],
        src: [ './src/**/*' ]
    }

}