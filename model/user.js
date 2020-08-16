var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    userName: String,
    googleId: String,
    userEmail: String,
    userImage: String,
    userPhoneNo: [ { value: String, verified: {type: Boolean, default: false}} ],
    noOfShop: {type: Number, default: 1}
});

mongoose.model('User', user);