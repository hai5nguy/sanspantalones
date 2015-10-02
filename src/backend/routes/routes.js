/* 
The main routes file

All routes that want to be attached to express must be required in here.
 */

module.exports = function (server) {
    require('./message.route.js')(server);
    require('./samples.route.js')(server);
}
