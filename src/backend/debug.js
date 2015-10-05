if (SP_ENVIRONMENT !== 'local') return;

var _           = require(SP_NODE_MODULES + 'underscore');
var prettyjson  = require(SP_NODE_MODULES + 'prettyjson');

Object.defineProperty(global, '__stack', {
  get: function(){
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__lineNumber', {
  get: function(){
    return __stack[2].getLineNumber();
  }
});

Object.defineProperty(global, '__fileName', {
  get: function(){
    return __stack[2].getFileName();
  }
});

Object.defineProperty(global, '__functionName', {
  get: function(){
    return __stack[2].getFunctionName();
  }
});

/***************/



global.debug = function(functionality) {
    
    if (functionality === true || isTrackingFunctionality(functionality)) {
        console.log('');
        console.log('=== ' + functionality + ' ===========================================================');
        var message = '';
        for (var i = 1; i < arguments.length; i++) {
            console.log(prettyjson.render(arguments[i]));
            //message += JSON.stringify(arguments[i]) + ' _____ ';
        }
        //console.log(message);
    }
}

global.djson = function (obj) {
    console.log(JSON.stringify(obj));
}

global.d = function(debugValue) {
    console.log('===' + __fileName + ' - ' + __functionName + ' - ' + __lineNumber + ' ==============================================================');
    for (var i = 0; i < arguments.length; i++) {
        console.log(prettyjson.render(arguments[i]));
        console.log('---');
    }
}

global.t = function(message) {
    var msg = message ? ' - ' + message.red : '';
    var names = __fileName.split(/[/\\]/);
    var file = names[names.length - 1];
    console.log('-> ' + file + ' - ' + __lineNumber + ' - ' + __functionName + msg);
}

global.cage = function() {
    console.log('FFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCKKKKKKKKKKKKKKKKKKKKKKK!!!!!!!!!!!');
    console.log('FFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCKKKKKKKKKKKKKKKKKKKKKKK!!!!!!!!!!!');
    console.log('FFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCKKKKKKKKKKKKKKKKKKKKKKK!!!!!!!!!!!');
    console.log('FFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCKKKKKKKKKKKKKKKKKKKKKKK!!!!!!!!!!!');
    console.log('FFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCKKKKKKKKKKKKKKKKKKKKKKK!!!!!!!!!!!');
    console.log('FFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCKKKKKKKKKKKKKKKKKKKKKKK!!!!!!!!!!!');
    console.log('FFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCKKKKKKKKKKKKKKKKKKKKKKK!!!!!!!!!!!');
    console.log('FFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCKKKKKKKKKKKKKKKKKKKKKKK!!!!!!!!!!!');
    console.log('FFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCKKKKKKKKKKKKKKKKKKKKKKK!!!!!!!!!!!');
    console.log('FFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCKKKKKKKKKKKKKKKKKKKKKKK!!!!!!!!!!!');
}