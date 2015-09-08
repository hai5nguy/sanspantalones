var frontend = './src/frontend/';
var components = './src/frontend/components/';

module.exports = {

    base: frontend,

    del: {
        dist: ['./dist/**', '!./dist']
    },

    dist: './dist/',
    index: './dist/index.html',

    move: {
        source: [
            frontend + '**/*.js' ,
            frontend + '**/*.html'
        ]
    },

    sass: {
        scss: frontend + 'sass/style.scss'
    },

    server: {
        executable: './src/backend/server.js'
    },

    watch: [
        './src/**/*'
    ]

}