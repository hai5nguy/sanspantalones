var Q           = require(SP_NODE_MODULES + 'q');

var Database    = require(SP_MODULES_FOLDER + 'database/database.module.js');

module.exports = function (args) {
    var args = args || {};
    var self = new BASEITEM(args.initialAttributes);
    self.req = args.req;

    self.create = PROMISIFY(create);


    function create(args, resolve, reject) {

        Database.Message.create({ message: args.message }).then(function (newMessage) {
            self.set(newMessage);
            resolve();
        }, function (err) {
            self.error = {
                message: 'Something went terribly wrong with the database module.',
                database_error: err
            };
            reject();
        })
    }

    return self;
}
