var frontend = './src/frontend/';
var components = './src/frontend/components/';

module.exports = {

    del: {
        dist: ['./dist/**', '!./dist']
    },

    rebuild: {
        base: frontend,
        dist: './dist/',
        filesToMove: [
            frontend + '**/*.js' ,
            frontend + '**/*.html'
        ]
    },

    server: {
        base: frontend,
        dist: './dist/**/*',
        executable: [ './src/backend/server.js' ],
        src: [ './src/**/*' ]
    }

}