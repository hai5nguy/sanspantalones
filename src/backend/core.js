var Q = require('../../node_modules/q');
var _ = require('../../node_modules/underscore');

global.PROMISIFY = function(workFunction) {
    return function (args) {
        return Q.Promise(function (resolve, reject, notify) {
            workFunction(args, resolve, reject, notify);
        });
    }
}

global.BASEITEM = function (initialAttributes) {
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
    collection.remove = function (id) {  //needs to be rewritten to be more flexible
        this._items = _.without(this._items, _.findWhere(this._items, { _id: id }));
    }
    return collection
}
