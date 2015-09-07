var frontend = './src/frontend/';
var components = './src/frontend/components/';

module.exports = {


    components: {
        html: [ frontend + 'components/**/*.html' ],
        js: [ frontend + 'components/**/*.js']
    },
    del: {
        dist: ['./dist/**', '!./dist']
    },

    dist: {
        root: './dist/',
        components: './dist/components'
    },
    frontend: {
        html: [ frontend + '*.html' ],
        js: [ frontend + '*.js']
    },
    server: {
        executable: [ './src/backend/server.js' ],
        watchFolders: [ './dist/**', './bower_components/**' ]
    },

    watch: {
        base: frontend,
        dist: './dist',
        html: [ 
            frontend + '*.html', 
            components + '**/*.html'
        ],
        js: [
            frontend + '*.js',
            components + '**/*.js'
        ]
        
    }

}