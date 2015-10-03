var src = './src/'

var backend = src + 'backend/'
var frontend = src + 'frontend/';

var components = frontend + 'components/';

var dist = './dist/'

module.exports = {


    /* paths **********************************************/
    backend: {
        root: backend,
        server: backend + 'server.js'
    },
    frontend: {
        root: frontend,
        index: frontend + 'index.html'
    },
    dist: {
        root: dist,
        index: dist + 'index.html'
    },


    /* plugin specifics ***********************************/
    sass: {
        scss: frontend + 'sass/style.scss'
    }

}