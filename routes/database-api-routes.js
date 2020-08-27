const router = require('express').Router();
var mongoose = require('mongoose');

// model
var Shop = mongoose.model('Shop');
var Menu = mongoose.model('Menu');
const {ObjectId} = require('mongodb');

const multer = require('multer');

//prerequisite for file upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // accept a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessing' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    cb(null, true);
  } else {
      // reject a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 //5 mb
  },
  fileFilter: fileFilter
});
    
//post/add new shop
router.put('/shop', function(request, response, next) {
        Shop.updateOne({ownerEmail: request.body.userEmail}, {$push: {shop: {shopName: request.body.shopName, shopAddress: {value: request.body.shopAddress}, noOfTables: request.body.noOfTables}}}, function(err, shop) {
            if (err) {
                const error = new Error('Could not complete the shop registration');
                next(error);
                //response.status(500).send({error: "Could not complete the shop registration"});
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
    
//get shop by email address
router.get('/shop/get_shops/:userEmail', function(request, response, next) {
        Shop.find({ownerEmail: request.params.userEmail}, {_id:0, shop: 1}).exec(function(err, shop) {
            if(err) {
                const error = new Error('No Shop List');
                next(error);
                //response.status(500).send({error: "No Shop List"});
            } else {
                response.send(shop);
            }
        });
    });
    
//add item to shop menu
router.put('/menu', function(request, response, next) {
        Menu.updateOne({shopId: request.body.shopId}, {$push: {menu: {itemName: request.body.itemName, vegOrNonVeg: request.body.vegOrNonVeg, price: request.body.price, description: request.body.description, category: request.body.category, volume: request.body.volume}}}, function(err, menu) {
            if (err) {
                const error = new Error('Could not update the menu');
                next(error);
                //response.status(500).send({error: "Could not update the menu"});
            } else {
                response.send(menu); 
            }
        });
    });
    
//get shop menu from shop id
router.get('/menu/:shopId', function(request, response, next) {
        Menu.find({shopId: request.params.shopId}, {_id:0, menu: 1}).exec(function(err, menu) {
            if(err) {
                const error = new Error('No Menu For this Shop');
                next(error);
                //response.status(500).send({error: "No Menu For this Shop"});
            } else {
                //menu[0].menu
                response.send(menu);
            }
        });
    });
    
//delete item from shop menu
router.put('/menu/item/delete', function(request, response, next) {
        Menu.updateOne({shopId: request.body.shopId}, {$pull : {"menu": {"_id": {$in : ObjectId(request.body.itemId)}}}}, function(err, menu) {
            if (err) {
                const error = new Error('Could not find the item');
                next(error);
                //response.status(500).send({error: "Could not find the item"});
            } else {
                response.send(menu);
            }
        })
    });
    
//update an item in shop menu
router.put('/menu/item_update', function(request, response, next) {
        Menu.updateOne({shopId: request.body.shopId, "menu._id": request.body.menuItemId}, {$set: {"menu.$.itemName": request.body.itemName, "menu.$.vegOrNonVeg": request.body.vegOrNonVeg, "menu.$.volume": request.body.volume, "menu.$.description": request.body.description, "menu.$.category": request.body.category, "menu.$.availability": request.body.availability, "menu.$.newItem": request.body.newItem, "menu.$.popular": request.body.popular, "menu.$.chefSpecial": request.body.chefSpecial}}, function(err, menuItem) {
            if (err) {
                const error = new Error('Could not update the menu Item');
                next(error);
                //response.status(500).send({error: "Could not update the menu Item"});
            } else {
                response.send(menuItem); 
            }
        });
    });
    
//get set of shop item_categories
router.get('/item_categories/:shopId', function(request, response, next) {
        Menu.distinct("menu.category", {shopId: request.params.shopId}).exec(function(err, menuCategory) {
            if(err) {
                const error = new Error('No categories for this shop');
                next(error);
                //response.status(500).send({error: "No Shop List"});
            } else {
                response.send(menuCategory);
            }
        });
    });
    
//get items by category from shop menu
router.get('/items', function(request, response, next) {
        Menu.aggregate([{$match: {shopId: request.query.shopId}}, {$unwind: "$menu"}, {$match: {"menu.category": request.query.category}}, {$project: {_id: 0, menu: 1}}]).exec(function(err, menu) {
            if(err) {
                const error = new Error('No Such item in Menu Category');
                next(error);
                //response.status(500).send({error: "No Such item in Menu"});
            } else {
                //menu[0].menu
                response.send(menu);
            }
        });
    });    
    
//get items Name for autocomplete
router.get('/items_name/for-autoComplete/:shopId', function(request, response, next) {
        Menu.find({shopId: request.params.shopId}, {_id:0, "menu.itemName": 1}).exec(function(err, itemNameList) {
            if(err) {
                const error = new Error('No Menu For this Shop');
                next(error);
                //response.status(500).send({error: "No Menu For this Shop"});
            } else {
                //menu[0].menu
                response.send(itemNameList[0].menu);
            }
        });
    });
    
//get no. of tables for a restaurant
router.get('/tables_no', function(request, response, next) {
        Shop.aggregate([{$match: {ownerEmail: request.query.userEmail}}, {$unwind: "$shop"}, {$match: {"shop._id": ObjectId(request.query.shopId)}}, {$project: {_id: 0, "shop.noOfTables": 1}}]).exec(function(err, shop) {
            if(err) {
                const error = new Error('No Such Shop');
                next(error);
                //response.status(500).send({error: "No Such Shop"});
            } else {
                response.send(shop[0].shop);
            }
        });
    });
    
//delete shop
router.put('/shop/delete', function(request, response, next) {
        Shop.updateOne({ownerEmail: request.body.userEmail}, {$pull : {"shop": {"_id": {$in : ObjectId(request.body.shopId)}}}}, function(err, shop) {
            if (err) {
                const error = new Error('No Such Shop');
                next(error);
                //console.log(err);
                //response.status(500).send({error: "Could not find the item"});
            } else {
                Menu.deleteOne({shopId: request.body.shopId}).exec(function(err, menu) {
                    console.log('menu deleted')
                })
                
                response.send(shop);
            }
        })
    });
    
//add email for kitchen access
router.put('/add/email_access', function(request, response, next) {
        Shop.updateOne({ownerEmail: request.body.userEmail, "shop._id": request.body.shopId}, {$addToSet: {"shop.$.emailAccessList": request.body.email}}, function(err, emailList) {
            if (err) {
                const error = new Error('Could not update the email List. Check your shopId or email');
                next(error);
                //response.status(500).send({error: "Could not update the email List. Check your shopId or email"});
            } else {
                response.send(emailList); 
            }
        });
    });
    
//get all the email list for kitchen access
router.get('/get/email_access/list', function(request, response, next) {
        Shop.aggregate([{$match: {ownerEmail: request.query.userEmail}}, {$unwind: "$shop"}, {$match: {"shop._id": ObjectId(request.query.shopId)}}, {$project: {_id: 0, "shop.emailAccessList": 1}}]).exec(function(err, emailList) {
            if(err) {
                const error = new Error('No Such Shop. Check your email and shopId');
                next(error);
                //response.status(500).send({error: "No Such Shop. Check your email and shopId"});
            } else {
                response.send(emailList[0].shop.emailAccessList);
            }
        });
    });
    
//delete the email from email list for kitchen access
router.put('/delete/email_access', function(request, response, next) {
        Shop.updateOne({ownerEmail: request.body.userEmail, "shop._id": request.body.shopId}, {$pull : {"shop.$.emailAccessList": {$in : request.body.email}}}, function(err, emailList) {
            if (err) {
                const error = new Error('Could not find the email. Check your email and shopId');
                next(error);
                //console.log(err);
                //response.status(500).send({error: "Could not find the email. Check your email and shopId"});
            } else {
                response.send(emailList);
            }
        })
    });

//file upload
router.post("/file_upload", upload.single('shopMenu'), (req, res, next) => {
    res.send('file uploaded');
});

//subcategory new item add to shop menu
router.put('/menu/sub', function(request, response, next) {
        Menu.updateOne({shopId: request.body.shopId}, {$push: {menu: {itemName: request.body.itemName, vegOrNonVeg: request.body.vegOrNonVeg, description: request.body.description, category: request.body.category, subcategory: request.body.subcategory}}}, function(err, menu) {
            if (err) {
                const error = new Error('Could not update the menu');
                next(error);
                response.send(err)
                //response.status(500).send({error: "Could not update the menu"});
            } else {
                response.send(menu); 
            }
        });
    });

//update a subcategory item in shop menu
router.put('/menu/item_update/sub', function(request, response, next) {
        Menu.updateOne({shopId: request.body.shopId, "menu._id": request.body.menuItemId}, {$set: {"menu.$.itemName": request.body.itemName, "menu.$.vegOrNonVeg": request.body.vegOrNonVeg, "menu.$.description": request.body.description, "menu.$.category": request.body.category, "menu.$.availability": request.body.availability, "menu.$.subcategory": request.body.subcategory, "menu.$.newItem": request.body.newItem, "menu.$.popular": request.body.popular, "menu.$.chefSpecial": request.body.chefSpecial}}, function(err, menuItem) {
            if (err) {
                const error = new Error('Could not update the menu Item');
                next(error);
                //response.status(500).send({error: "Could not update the menu Item"});
            } else {
                response.send(menuItem); 
            }
        });
    });

/////////////////////////// api operations for kitchen alone //////////////////////////////
    
//get shop name by owner email and shop id
router.get('/shop_name_from_shopId', function(request, response, next) {
        Shop.aggregate([{$match: {ownerEmail: request.query.ownerEmail}}, {$unwind: "$shop"}, {$match: {"shop._id": ObjectId(request.query.shopId)}}, {$project: {_id: 0, "shop.shopName": 1}}]).exec(function(err, shop) {
            if(err) {
                const error = new Error('No Such Shop');
                next(error);
                //response.status(500).send({error: "No Such Shop"});
            } else {
                response.send(shop[0].shop);
            }
        });
    });
    
module.exports = router;