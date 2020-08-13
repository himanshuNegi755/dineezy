const users = [];
const shops = [];

const addUser = ({ id, shopId, tableNo }) => {
  /*shopId = shopId.trim().toLowerCase();
  tableNo = tableNo.trim().toLowerCase();*/

  const existingUserInTable = users.find((user) => user.shopId === shopId && user.tableNo === tableNo);

  //if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUserInTable) return { error: 'Table is taken.' };

  const user = { id, shopId, tableNo };

  users.push(user);

  return { user };
}

// method for creating new shop socket
/*const addShop = ({ id, shopId}) => {
    
  const existingShop = shops.find((shop) => shop.shopId === shopId);

  //if(!name || !room) return { error: 'Username and room are required.' };
  if(existingShop) return { error: 'Shop Already joined to a socket.' };

  const shop = { id, shopId };

  shops.push(shop);

  return { shop };
}*/

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

// method to remote shop from shops Array
/*const removeShop = (id) => {
  const index = shops.findIndex((shop) => shop.id === id);

  if(index !== -1) return shops.splice(index, 1)[0];
}*/

const getUser = (id) => users.find((user) => user.id === id);

//get shop from shops array
//const getShop = (id) => shops.find((shop) => shop.id === id);

//const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };