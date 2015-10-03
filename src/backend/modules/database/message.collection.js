var Q           = require(SP_NODE_MODULES + 'q');

var MESSAGE_COLLECTION_NAME = 'messages';

module.exports = function (args) {
    return {
        create: PROMISIFY(create),
        read: PROMISIFY(read)
    }

    function create(args, resolve, reject) {
        DB_SERVER.collection(MESSAGE_COLLECTION_NAME).insertOne({ text: args.text }).then(function (result) {
            resolve(result.ops[0]);
        }, function (error) {
            reject(error);
        });
    }

    function read(args, resolve, reject) {
        var messageCollection = DB_SERVER.collection(MESSAGE_COLLECTION_NAME);

        var limit = parseInt(args.size, 10) || 10;
        var page = parseInt(args.page, 10) || 1;
        
        var skip = (page - 1) * limit;

        messageCollection.find({})
            .skip(skip)
            .limit(limit)
            .toArray()
            .then(resolve, reject);
    }

}

