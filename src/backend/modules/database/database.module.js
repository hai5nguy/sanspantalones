/*
This is the Database Module.  This module sits between other modules and the mongo server, whether local or hosted remotely.  The purpose of this module to provide a data layer between raw mongo commands and other modules.

Sample Data Flow:  
    1.  >> Apple.Module >> Database.Module >> Mongo Server.
    2.  >> FooModule >> Database.Module >> Mongo Server >> Database.Module >> FooModule
    3.  >> CowModule >> Database.Module >> Mongo Server >> Database.Module >> FooModule >> CowModule
    
 */

var Q                   = require(SP_NODE_MODULES + 'q');

var Apple               = require('./apple.collection.js');
var Message             = require('./message.collection.js');

module.exports  = {
    Fruits: Fruits(),
    Message: Message()
};

//namespacing
function Fruits() {
    return {
        Apple: Apple()
    }
}
