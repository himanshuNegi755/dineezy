const router = require('express').Router();
var passport = require('passport');
const logger = require('../config/logger');

router.get(
  "/auth/google",
  passport.authenticate("google", {
      scope: ["profile", "email"]
  })
);
    
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    logger.log('info', 'logged in successfully');
    res.redirect("/shops");
  }
);

router.get("/current_user", (req, res) => {
   res.send(req.user);
});

router.get("/auth/logout", (req, res) => {
  req.logout();
  logger.log('info', 'user logged out successfully');
  res.redirect('/');
});

module.exports = router;