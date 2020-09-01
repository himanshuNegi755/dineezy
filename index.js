var express = require('express');
var socketio = require('socket.io');
var logger = require('./config/logger');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./model/user');
require('./model/shop');
require('./model/menu');

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

//import routes
const authRoutes = require("./routes/auth-routes");
const phoneVerificationRoutes = require("./routes/phone-verification-routes");
const databaseApiRoutes = require("./routes/database-api-routes");

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

app.get('/shops', (req, res) => res.redirect(process.env.CLIENT_URI+'/shops' || 'http://localhost:3000/shops'));
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

// listining for port
var server = app.listen(PORT, function() {
    console.log(`DineEzy API running on port ${PORT}....`);
});

// socket setup
var io = socketio(server);

io.on('connection', function(socket){
    //console.log('made socket connection');
    
    socket.on('join', (data) => {
        if(data.tableNo){
            
            //socket.join(data.shopId);
            //('CH6IL9pF44T6kBujAAAA').emit('tableTaken', {tableNo: data.tableNo, status: 'taken'});
            //socket.emit('tableTaken', {tableNo: data.tableNo, status: 'taken'});
            console.log(data.shopId, data.tableNo);
        } else {
            console.log(data.shopId);
        }
        console.log(socket.id);
    })
    
    socket.on('disconnect', () => {
        console.log('user left');
    })
});