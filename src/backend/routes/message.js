var Q               = require(SP_NODE_MODULES + 'q');
var MessageModule   = require(SP_MODULES_FOLDER + 'message.module.js');

module.exports = function (server) {

    server.post('/api/v1/message', function (req, res) {

        var message = new MessageModule();

        message.create({ message: req.body.message }).then(function () {
            res.json(message.get());
        }, function () {
            res.status(500).send(message.error);
        });

    });

    
}  //module.exports

