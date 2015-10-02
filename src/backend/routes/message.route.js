var Q               = require(SP_NODE_MODULES + 'q');
var MessageModule   = require(SP_MODULES_FOLDER + 'message.module.js');

module.exports = function (server) {

    server.get('/api/v1/message', function (req, res) {
        // var messages = new MessageModule.Collection();

        // var loadArgs = {
        //     page: req.query.page,
        //     size: req.query.size
        // }
        // 
        

        // messages.load({ page: req.query.id, size: req.query.size }).then(function () {
        //     t();



        // }, function () {
        //     t();
        // });
        // 
        // 
        d(req.query);

        res.json([
            { _id: 1, text: 'one' },
            { _id: 2, text: 'two' },
            { _id: 3, text: 'three' },
            { _id: 4, text: 'four' },
            { _id: 5, text: 'five' },
        ]);

    });

    server.post('/api/v1/message', function (req, res) {

        var message = new MessageModule();

        message.create({ message: req.body.message }).then(function () {
            res.json(message.get());
        }, function () {
            res.status(500).send(message.error);
        });

    });

    
}  //module.exports

