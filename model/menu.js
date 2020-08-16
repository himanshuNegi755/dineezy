var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menu = new Schema({
    shopId: String,
    menu: [ {itemName: String,
             vegOrNonVeg: {type: String, default: 'veg'},
             price: Number,
             description: String,
             category: String,
             availability: {type: Boolean, default: true}
            } ]
});

mongoose.model('Menu', menu);