global.SP_ENVIRONMENT           = process.env.environment               || 'local';                                     //environment=production node src/backend/server.js
global.SP_PORT                  = process.env.port                      || 5000;                                        //port=8080 node src/backend/server.js
global.SP_DB_CONNECTION_STRING  = process.env.dbConnectionString        || 'mongodb://localhost:27017/sanspantalones';

global.SP_PROJECT_FOLDER    = __dirname + '/../../';
global.SP_NODE_MODULES      = __dirname + '/../../node_modules/';
global.SP_MODULES_FOLDER    = __dirname + '/modules/';
global.SP_FRONTEND_FOLDER   = __dirname + '/../frontend/';

global.SP_DIST_FOLDER       = SP_PROJECT_FOLDER + 'dist/'


