var Q           = require(SP_NODE_MODULES + 'q');

var MESSAGE_COLLECTION_NAME = 'messages'

module.exports = function (args) {
    return {
        create: PROMISIFY(create)
    }

    function create(args, resolve, reject) {

        DB_SERVER.collection(MESSAGE_COLLECTION_NAME).insertOne({ message: args.message }).then(function (result) {
            resolve(result.ops[0]);
        }, function (error) {
            reject(error);
        });

    }

}

