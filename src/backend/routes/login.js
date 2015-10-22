module.exports = function (app, passport) {
    console.log('hello from routes index');
      /* GET login page. */
    //app.get('/signin', function(req, res) {
      //  res.redirect('/#/signin');
    //});
  
    app.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/testing123', // redirect to the secure profile section
          failureRedirect : '/signup', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
    }));

    app.post('/signin', passport.authenticate('local-login', {
          successRedirect : '/testing123', // redirect to the secure profile section
          failureRedirect : '/signup', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
    }));

}

