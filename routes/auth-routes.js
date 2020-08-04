var passport = require('passport');
const logger = require('../config/logger');

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

    
  app.get('/', (req, res) => res.redirect(process.env.CLIENT_URI || 'http://localhost:3000'));
    
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      logger.info('logged in successfully');
      res.redirect("/");
    }
  );

  app.get("/api/current_user", (req, res) => {
        res.send(req.user);
  });

  app.get("/auth/logout", (req, res) => {
    req.logout();
    logger.info('user logged out successfully');
    res.redirect('/');
  });
};