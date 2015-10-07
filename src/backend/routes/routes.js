/* 
The main routes file

All routes that want to be attached to express must be required in here.
 */

module.exports = function (app) {
    require('./message.route.js')(app);
    require('./samples.route.js')(app);
}
