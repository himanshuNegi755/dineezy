var express = require('express');
var logger = require('./config/logger');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./model/user');
require('./model/shop');
require('./model/menu');

//import routes
const authRoutes = require("./routes/auth-routes");
const phoneVerificationRoutes = require("./routes/phone-verification-routes");
const databaseApiRoutes = require("./routes/database-api-routes");

require('dotenv').config();

var keys = require('./config/keys');
var cookieSession = require('cookie-session');

const corsOptions = {
  credentials: true,
  origin: true
}

require('./config/passport-setup');

var passport = require('passport');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = process.env.PORT || 8000;

//console.log(process.env.PORT);

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

//set up routes
app.use('/api', authRoutes);
app.use('/api', phoneVerificationRoutes);
app.use('/api', databaseApiRoutes);

app.get('/', (req, res) => res.redirect(process.env.CLIENT_URI || 'http://localhost:3000'));

//unknown path
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    logger.log('error', `${err.message}, status: ${err.status}`);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});
/*if(process.env.NODE_ENV === 'production') {
    console.log('production')
    app.use(express.static('client/build'))
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}*/

// listining for port
app.listen(PORT, function() {
    console.log("Digi Menu API running on port " + PORT + "....");
});