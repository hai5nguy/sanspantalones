var path = require('path');


module.exports = {
    
    folder: {
        bower: SP_PROJECT_FOLDER + 'bower_components/',
        dist: SP_PROJECT_FOLDER + 'dist/',
        img: SP_FRONTEND_FOLDER + 'img/'
    },
    route: {
        index: function (req, res) {
            res.sendFile(path.resolve(SP_DIST_FOLDER + 'index.html'));
        }
    }

}