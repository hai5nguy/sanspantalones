var Q           = require(SP_NODE_MODULES + 'q');
var AppleModule = require(SP_MODULES_FOLDER + 'Samples/Apple.Module.js');

module.exports = function (server) {
    
    server.get('/api/v1/testing/apples', function (req, res) {
        var apples = new AppleModule.Collection({
            req: req
        });
        
        apples.load().then(function () {
            res.json(apples.get());
        }, function () {
            res.status(500).send(apples.error);
        });
        
    });
    
}  //module.exports

