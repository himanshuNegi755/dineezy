var mongoose = require('mongoose');
// model
var Shop = mongoose.model('Shop');
var Menu = mongoose.model('Menu');
const {ObjectId} = require('mongodb');


module.exports = app => {
    
  app.put('/shop', function(request, response) {
    Shop.updateOne({ownerEmail: request.body.userEmail}, {$push: {shop: {shopName: request.body.shopName, shopAddress: {value: request.body.shopAddress}, noOfTables: request.body.noOfTables}}}, function(err, shop) {
        if (err) {
            response.status(500).send({error: "Could not complete the shop registration"});
        } else {
            //db.users.find({awards: {$elemMatch: {award:'National Medal', year:1975}}})
            //var shopIdVar = 
            Shop.find({"shop.shopName": request.body.shopName}, { _id: 0, ownerEmail: 0, shop: {$elemMatch: {shopName: request.body.shopName}}}).exec(function(err, shopId) {
                //response.send(shopId)
                console.log(shopId[0].shop[0]._id);
                
                new Menu({shopId: shopId[0].shop[0]._id}).save().then((newMenu) => {
                    //console.log(shop._id);
                    console.log(newMenu);
                 })
            })
            
            response.send(shop); 
        }
    });
  });
    
  app.get('/shop/get_shops/:userEmail', function(request, response) {
    Shop.find({ownerEmail: request.params.userEmail}, {_id:0, shop: 1}).exec(function(err, shop) {
        if(err) {
            response.status(500).send({error: "No Shop List"});
        } else {
            response.send(shop);
        }
    });
  });
    
  app.put('/menu', function(request, response) {
    Menu.updateOne({shopId: request.body.shopId}, {$push: {menu: {itemName: request.body.itemName, vegOrNonVeg: request.body.vegOrNonVeg, price: request.body.price, description: request.body.description, category: request.body.category}}}, function(err, menu) {
        if (err) {
            response.status(500).send({error: "Could not update the menu"});
        } else {
            response.send(menu); 
        }
    });
  });
 
  app.get('/menu/:shopId', function(request, response) {
    Menu.find({shopId: request.params.shopId}, {_id:0, menu: 1}).exec(function(err, menu) {
        if(err) {
            response.status(500).send({error: "No Menu For this Shop"});
        } else {
            //menu[0].menu
            response.send(menu);
        }
    });
  });
    
  app.put('/menu/item/delete', function(request, response) {
    Menu.updateOne({shopId: request.body.shopId}, {$pull : {"menu": {"_id": {$in : ObjectId(request.body.itemId)}}}}, function(err, menu) {
        if (err) {
            console.log(err);
            response.status(500).send({error: "Could not find the item"});
        } else {
            response.send(menu);
        }
    })
});
    
  app.put('/menu/item_update', function(request, response) {
    Menu.updateOne({shopId: request.body.shopId, "menu._id": request.body.menuItemId}, {$set: {"menu.$.itemName": request.body.itemName, "menu.$.vegOrNonVeg": request.body.vegOrNonVeg, "menu.$.price": request.body.price, "menu.$.description": request.body.description, "menu.$.category": request.body.category}}, function(err, menuItem) {
        if (err) {
            response.status(500).send({error: "Could not update the menu Item"});
        } else {
            response.send(menuItem); 
        }
    });
  });
    
};