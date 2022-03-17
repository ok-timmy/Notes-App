const jwt = require('jsonwebtoken');


// Require Auth Middleware

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
  
    if(token){
      jwt.verify(token, "Timmy's Secret", (err, decodedToken) => {
        if(err) {
          res.send(err);
          console.log(err.message);
          res.redirect('/api/auth/login');
        }else{
          console.log(decodedToken);
          next();
        }
      })
    }
  }

  module.exports = {requireAuth};