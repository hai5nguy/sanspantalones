var Q           = require(SP_NODE_MODULES + 'q');

var Database    = require(SP_MODULES_FOLDER + 'database/database.module.js');

module.exports = function (args) {
    var args = args || {};
    var self = new BASEITEM(args.initialAttributes);
    self.req = args.req;

    self.create = PROMISIFY(create);


    function create(args, resolve, reject) {

        Database.Message.create({ text: args.text }).then(function (newMessage) {
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

module.exports.Collection = function(args) {
    var args = args || {};
    var collection = new BASECOLLECTION(args.initialItems);
    collection.req = args.req;

    collection.load = PROMISIFY(load);
    

    function load(args, resolve, reject) {

        Database.Message.read({ page: args.page, size: args.size }).then(function (messages) {
            collection.set(messages);
            resolve();
        }, function (db_error) {
            collection.error = {
                message: 'Unable to load messages from database',
                database_error: db_error
            };
            reject();
        });

    }

    return collection;
}