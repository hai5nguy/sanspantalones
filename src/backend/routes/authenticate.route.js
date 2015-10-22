module.exports = function(app, passport){

var path = require('path');
  
  /* GET home page. */
  app.get('/', function(req, res) {
    if(!req.isAuthenticated()){
      res.redirect('/signin');
    } else {
      var user = req.email;
      if (user !== undefined){
        user = user.toJSON();
      }
    }
    res.sendFile(path.join(__dirname, '../frontend' ,'index.html'));
  });
  
  /* GET login page. */
  app.get('/signin', function(req, res) {
    res.render('signin.ejs', {flashMessage: req.flash('loginMessage')});
  });
  
  /* POST login page. */
  app.post('/signin', passport.authenticate('local-login', {
          successRedirect : '/', // redirect to the secure profile section
          failureRedirect : '/testing123', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));
  
  /* GET signup page. */
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', {flashMessage: req.flash('signupMessage')});
  });
  
  /* POST signup page. */
  app.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/', // redirect to the secure profile section
          failureRedirect : '/testing123', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));
      
  /*Logout */
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/signin');
  });
  
}


