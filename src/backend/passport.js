var LocalStrategy   = require('passport-local').Strategy;
var mongo           = require('mongodb').MongoClient;
var bcrypt          = require('bcrypt-nodejs'); 

// expose this function to our app using module.exports
module.exports = function(passport) {
    
    //connect to mongo
    mongo.connect(SP_DB_CONNECTION_STRING, function(err, db){
        if (err) console.log(err);
        else console.log("Passport connected to MongoDB");
    
        //serialize user
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
    
        //deserialize the user
        passport.deserializeUser(function(id, done) {
            db.collection('users').findOne({'id': id},function(err,result){	
                done(err, result);
            });
        });
        
        // Local Signup
        passport.use('local-signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
            
            // Check to see if email address already exists
            db.collection('users').findOne({'email': email},function(err, result){
                if (err)
                    return done(err);
                if (result.length) {
                    return done(null, false);
                } else {
    
                    // create the user
                    var newUser = new Object();
                    
                    newUser.email = email;
                    newUser.password = bcrypt.hashSync(password);
                    newUser.firstName = req.body.firstName;
                    newUser.lastName = req.body.lastName;
                      
                    db.collection('users').insert({
                        'email': newUser.email, 
                        'password': newUser.password, 
                        'firstName': newUser.firstName, 
                        'lastName': newUser.lastName
                    } 
                    ,function(err, result){
                        newUser.id = 22  //change this
                        console.log(result);
                    
                        return done(null, newUser);
                    });	
                }	
            });
        }));
    
        //Local Login
        passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, email, password, done) { 
            
            db.collection('users').findOne({'email': email}, function(err,result){
                if (err){
                    return done(err);
                }
                if (!result.length) {
                    console.log('no user found');
                    return done(null, false);
                } 
                
                // if the user is found but the password is wrong
                if (!(bcrypt.compareSync(password, result[0].password))){
                    console.log('wrong password');
                    return done(null, false);
                }
                //return user
                console.log('success');
                return done(null, result[0]);			
            });
        }));
    });  
};