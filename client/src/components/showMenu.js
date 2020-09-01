import React, {useState, useEffect} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Button } from 'react-bootstrap';
import './showMenu.css';
import NavbarForSite from './navbar';
import ItemCard from './itemCard';
import ItemsInCart from './itemsInCart';

let socket;

const ShowMenu = (props) => {

    const [category, setCategory] = useState([]);
    const [itemsByCategory, setItemsByCategory] = useState([]);
    const [visibility, setVisibility] = useState('hidden');
    const [transform, setTransform] = useState('translateX(100)');
    const [itemsInCart, setItemsInCart] = useState([]);
    const [noOfItemsInCart, setNoOfItemsInCart] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const ENDPOINT = `http://localhost:8000`;
    const [cartItemIdArr, setCartItemIdArr] = useState([]);

    useEffect(() => {
        //console.log(this.props.match.params);
        axios.get(`${process.env.REACT_APP_BACKEND_API}/item_categories/${props.match.params.shopId}`)
        .then(res => {
            setCategory(res.data);
        })

        socket = io(ENDPOINT);
        socket.emit('join', {shopId: props.match.params.shopId, tableNo: props.match.params.tableNo});

    }, [props.match.params.shopId, props.match.params.tableNo, ENDPOINT]);

    useEffect(() => {

        let noOfItemsInCartVar = 0;
        let totalPriceVar = 0;

        itemsInCart.forEach(cartItem => {
            noOfItemsInCartVar+=cartItem.itemQuantity;
            totalPriceVar+=cartItem.itemQuantity*cartItem.itemPrice;
        });

        setNoOfItemsInCart(noOfItemsInCartVar);
        setTotalPrice(totalPriceVar);

    }, [itemsInCart])

    const loadItemFunction = (itemCategory) => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/items?shopId=${props.match.params.shopId}&category=${itemCategory}`)
        .then(res => {
            setItemsByCategory(res.data);
        })
    }

    const renderItemCategory = () => {
        switch(category.length) {
            case 0:
                return (
                    <React.Fragment>
                        <div className="btn-div">
                            <h5>Loading</h5>
                        </div>
                    </React.Fragment>
                )
            default:
                const list = category.map((itemCategory) =>
                    <div key={itemCategory}>
                        <ul>
                            <li className="category-ind"onClick={() => {loadItemFunction(itemCategory)}}>{itemCategory}</li>
                        </ul>
                    </div>
                );

        return (list);

        }
    }

    const addItemsInCart = (itemObj) => {
        setCartItemIdArr([...cartItemIdArr, itemObj.itemId]);
        setItemsInCart([...itemsInCart, itemObj]);

        setVisibility("visible");
        setTransform("translateX(0)");
    }

    const renderMenuItemList = () => {
        const list = itemsByCategory.map((menuItem) =>
            <div key={menuItem.menu._id}>
                <ItemCard itemName={menuItem.menu.itemName} vegOrNonVeg={menuItem.menu.vegOrNonVeg} price={menuItem.menu.price} description={menuItem.menu.description} itemId={menuItem.menu._id} addItem={addItemsInCart} showAddToCartButton={cartItemIdArr.includes(menuItem.menu._id)} itemAvailability={menuItem.menu.availability} itemStatusNew={menuItem.menu.newItem} itemStatusPopular={menuItem.menu.popular} itemStatusChefSpecial={menuItem.menu.chefSpecial} itemVolume={menuItem.menu.volume} itemSubcategory={menuItem.menu.subcategory}/>
            </div>
        );

        return (list);
    }

    const removeItemFromCart = (itemId) => {
        let itemIdArr = cartItemIdArr.filter(item => item !== itemId);
        setCartItemIdArr(itemIdArr);

        let itemArray = itemsInCart.filter(item => item.itemId !== itemId);
        setItemsInCart(itemArray);
    }

    const updateQuantity = (itemId, change) => {

        var itemArray = [...itemsInCart];
        var indexOfObjectToChangeQuantity = itemArray.findIndex(x => x.itemId === itemId);
        if (indexOfObjectToChangeQuantity !== -1) {
            if(change === "+") {
                itemArray[indexOfObjectToChangeQuantity].itemQuantity+=1;
                setItemsInCart(itemArray);
            } else {
                if (itemArray[indexOfObjectToChangeQuantity].itemQuantity>0) {
                    itemArray[indexOfObjectToChangeQuantity].itemQuantity-=1;
                    if(itemArray[indexOfObjectToChangeQuantity].itemQuantity === 0) {
                       removeItemFromCart(itemId);
                    } else {
                        setItemsInCart(itemArray);
                    }
                }
            }
        }
    }

    const renderCartItems = () => {
        const list = itemsInCart.map((cartItem) =>
            <div key={cartItem.itemId}>
                <ItemsInCart itemName={cartItem.itemName} price={cartItem.itemPrice} quantity={cartItem.itemQuantity} deleteItem={removeItemFromCart} changeQuantity={updateQuantity} itemId={cartItem.itemId}/>
            </div>
        );

        return (list);
    }

    const clearCartFunction = () => {
        //let cartItems = itemsInCart.map(cartItem => cartItem.itemName);
        //cartItems.forEach(itemName => removeItemFromCart(itemName));
        setCartItemIdArr([]);
        setItemsInCart([]);

    }

    return (
        <div className="show-menu-main-div">

            <NavbarForSite/>

            <div className="category-menu row">
                <div className="col-lg-1 col-md-2 col-sm-3 cart-option" onClick={ () => {
                        setVisibility('visible');
                        setTransform('translateX(0)');
                    }}>
                    <i className="fas fa-cart-plus cart-icon"></i>
                    <span className="cart-items">{noOfItemsInCart}</span>
                </div>
                <div className="col-lg-11 col-md-9 col-sm-9 ">
                    <div className="default-list">{renderItemCategory()}</div>
                    <div className="dropdown category-drop">
                      <button className="btn btn-secondary dropdown-toggle category-btn" type="button" id="categorydropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Category
                      </button>
                      <div className="dropdown-menu category-list" aria-labelledby="categorydropdown">
                        <div className="small-sc-list">{renderItemCategory()}</div>
                      </div>
                    </div>
                </div>
            </div>
            <div className="items-card">
                {renderMenuItemList()}
            </div>

            <div className="cart-overlay transparentBcg" style={{visibility: visibility}}>
                <div className="cart-side-bar showCart" style={{transform: transform}}>
                    <i className="back-btn fas fa-arrow-circle-left fa-2x" onClick={() => {
                            setVisibility("hidden");
                            setTransform("translateX(100)");
                        }}></i>
                        {renderCartItems()}
                    <div className="cart-footer">
                        <h3>your total: ₹ {totalPrice}</h3>
                        <Button className="clear-cart" onClick={clearCartFunction}>Clear cart</Button>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default ShowMenu;
