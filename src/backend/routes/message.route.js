var Q               = require(SP_NODE_MODULES + 'q');
var MessageModule   = require(SP_MODULES_FOLDER + 'message.module.js');

module.exports = function (server) {

    server.get('/api/v1/message', function (req, res) {

        var messages = new MessageModule.Collection({ req: req });

        messages.load({ page: req.query.page, size: req.query.size }).then(function () {
            res.json(messages.get());
        }, function () {
            res.status(500).send(messages.error);
        });
        
    });

    server.post('/api/v1/message', function (req, res) {

        var message = new MessageModule({ req: req });

        message.create({ text: req.body.text }).then(function () {
            res.json(message.get());
        }, function () {
            res.status(500).send(message.error);
        });

    });

    
}  //module.exports

