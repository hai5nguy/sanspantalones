/* 
This is the samples route.  The purpose of a route is to connect the front end rest calls to other modules.  This one connects to the Apple Module.  No other logic should be in here.  Routes should only be the 'glue' between the front end and the backend modules.

IMPORTANT!
All routes must be required in into routes.js for them to attach to express.

*/

var Q           = require(SP_NODE_MODULES + 'q');
var AppleModule = require(SP_MODULES_FOLDER + 'Samples/Apple.Module.js');

module.exports = function (server) {

    server.get('/api/v1/samples/apple/:id', function (req, res) {

        var id = req.args.id;

        var apple = new AppleModule();

        apple.load({ id: id }).then(function () {
            res.json(apple.get());
        }, function () {
            res.status(500).send(apple.error);
        });

    });
    
    server.get('/api/v1/samples/blah', function (req, res) {

        var apples = new AppleModule.Collection({
            req: req
        });
        
        apples.load().then(function () {
            res.json(apples.get());
        }, function () {
            res.status(500).send(apples.error);
        });
        
    });

    server.post('/api/v1/samples/apple', function (req, res) {

        var apple = new AppleModule();

        apple.makeAnApple({ name: req.body.name }).then(function () {
            res.json(apple.get());
        }, function () {
            res.status(500).send(apple.error);
        });

    });

    
}  //module.exports

