var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menu = new Schema({
    shopId: String,
    menu: [ {itemName: String,
             vegOrNonVeg: {type: String, default: 'veg'},
             price: Number,
             description: String,
             category: String,
             availability: {type: Boolean, default: true},
             volume: {half: Number, full: Number},
             subcategory: [{itemName: String, half: Number, full: Number}]
            } ]
});

mongoose.model('Menu', menu);