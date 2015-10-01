var Q           = require(SP_NODE_MODULES + 'q');

var APPLE_COLLECTION = 'apples'

module.exports = function (args) {
    return {
        create: PROMISIFY(create)
    }

    function create(args, resolve, reject) {
        DB_SERVER.collection(APPLE_COLLECTION).insertOne({ name: args.name }, function (error, result) {
            if (!error) {
                resolve(result[0]);
            } else {
                reject(error);
            }
        });
    }

}

