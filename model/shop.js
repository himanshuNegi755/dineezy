var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shop = new Schema({
    ownerEmail: String,
    shop: [ {shopName: String,
             shopAddress: { value: String, verified: {type: Boolean, default: false}},
             //shopMenu: String
             noOfTables: Number,
             emailAccessList: [{type: String}]
            } ]
});

mongoose.model('Shop', shop);