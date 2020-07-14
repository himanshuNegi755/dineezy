var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./model/user');
require('./model/shop');
require('./model/menu');
var keys = require('./config/keys');
var cookieSession = require('cookie-session');

const corsOptions = {
  credentials: true,
  origin: true
}

require('./config/passport-setup');

var passport = require('passport');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors(corsOptions));

app.use(cookieSession({
    name: 'login',
    maxAge: 60*60*1000*24,  // 7*24* add later after completion of site
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth-routes")(app);
require("./routes/phone-verification-routes")(app);
require("./routes/database-api-routes")(app);

// listining for port
app.listen(PORT, function() {
    console.log("Digi Menu API running on port " + PORT + "....");
});