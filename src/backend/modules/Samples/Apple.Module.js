var Q           = require(SP_NODE_MODULES + 'q');

var Database    = require(SP_MODULES_FOLDER + 'Database.Module.js');

module.exports = function (args) {
    var args = args || {};
    var self = new BASEITEM(args.initialAttributes);
    self.req = args.req;

    self.load           = PROMISIFY(load);
    self.makeAnApple    = PROMISIFY(makeAnApple);


    function load(args, resolve, reject) {
        var anApple = { id: args.id, name: 'apple with id: ' + args.id };
        self.set(anApple);
        resolve();
    }

    function load2(args, resolve, reject) {
        Database.Fruits.Apple.read({ id: args.id }).then(function (result) {
            if (result && result.length) {
                result[0].message = 'this is an attached message to an apple read from the database.';
                self.set(result[0]);
                resolve();
            } else {
                self.error = { message: 'unable to get apple from database.'}
                reject();
            }
        })
    }

    function makeAnApple(args, resolve, reject) {
        Database.Fruits.Apple.create({ name: args.name }).then(function (newApple) {
            newApple.message = "This apple was created through the makeAnApple function";
            self.set(newApple);
            resolve();
        }, function (error) {
            self.error = error;
            reject();
        });
    }

    return self;
}

module.exports.Collection = function(args) {
    var args = args || {};
    var collection = new BASECOLLECTION(args.initialItems);
    collection.req = args.req;

    collection.load = PROMISIFY(load);
    

    function load(args, resolve, reject) {

        var fakeApples = [ { id: 1, name: 'gala' }, { id: 2, name: 'fuji' }, { id: 3, name: 'green' },
            { id: 4, name: 'dem' },
            { id: 5, name: 'some'}
        ];
        collection.add(fakeApples);

        resolve();

    }

    return collection;
}

