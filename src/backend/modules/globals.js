global.SP_ENVIRONMENT   = process.env.environment   || 'local';             //environment=production node src/backend/server.js
global.SP_PORT          = process.env.port          || 5000;                //port=8080 node src/backend/server.js


global.SP_PROJECT_FOLDER    = __dirname + '/../../../';
global.SP_NODE_MODULES      = __dirname + '/../../../node_modules/';
global.SP_MODULES_FOLDER    = __dirname + '/../modules/';
global.SP_FRONTEND_FOLDER   = __dirname + '/../../frontend/';

global.SP_DIST_FOLDER       = SP_PROJECT_FOLDER + 'dist/'

var Q = require(SP_NODE_MODULES + 'q');
var _ = require(SP_NODE_MODULES + 'underscore');

global.PROMISIFY = function(workFunction) {
    return function (params) {
        return Q.Promise(function (resolve, reject) {
            workFunction(params, resolve, reject);
        });
    }
}

global.BASEMODULE = function (initialAttributes) {
    var self = this;
    self.error = null;

    self._attributes = initialAttributes || {};
    self.get = function (name) {
        return  name ? self._attributes[name] : self._attributes
    }
    self.set = function (nameOrObject, value) {
        (arguments.length === 1) ? self._attributes = nameOrObject : self._attributes[nameOrObject] = value;
    }
    return self
}

global.BASECOLLECTION = function (initialItems) {
    var collection = this;
    collection._items = initialItems || [];
    collection.get = function (id) {
        return (id === undefined) ? this._items : _.findWhere(this._items, { _id: id });
    }
    collection.add = function (items) {
        this._items = this._items.concat(items);
    }
    collection.remove = function (id) {
        this._items = _.without(this._items, _.findWhere(this._items, { _id: id }));
    }
    return collection
}

