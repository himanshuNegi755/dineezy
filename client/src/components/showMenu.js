import React, {Component} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './showMenu.css';
import NavbarForSite from './navbar';
import ItemCard from './itemCard';
import ItemsInCart from './itemsInCart';


class ShowMenu extends Component{

    constructor(props) {
        super(props);

        this.state = { category: [], itemsByCategory: [], visibility: "hidden", transform: "translateX(100)", itemsInCart: [], noOfItemsInCart: 0, totalPrice: 0 }

        this.loadCategoryFunction = this.loadCategoryFunction.bind(this);
        this.loadCategoryFunction();
        this.renderItemCategory = this.renderItemCategory.bind(this);
        this.loadItemFunction = this.loadItemFunction.bind(this);
        this.showCartSideBar = this.showCartSideBar.bind(this);
        this.closeCartSideBar = this.closeCartSideBar.bind(this);
        this.renderCartItems = this.renderCartItems.bind(this);
    }

    loadCategoryFunction() {
        console.log(this.props.match.params);
        axios.get(`http://localhost:5000/item_categories/${this.props.match.params.shopId}`)
        .then(res => {
            //console.log(res.data)
            this.setState({category: res.data})
        })
    }

    loadItemFunction(itemCategory) {
        axios.get(`http://localhost:5000/items?shopId=${this.props.match.params.shopId}&category=${itemCategory}`)
        .then(res => {
            console.log(res.data)
            this.setState({itemsByCategory: res.data})
        })
    }

    renderItemCategory = () => {
        switch(this.state.category.length) {
            case 0:
                return (
                    <React.Fragment>
                        <div className="btn-div">
                            <h5>Loading</h5>
                        </div>
                    </React.Fragment>
                )
            default:
                const list = this.state.category.map((itemCategory) =>
                    <div key={itemCategory}>
                        <ul>
                            <li className="category-ind"onClick={() => {this.loadItemFunction(itemCategory)}}>{itemCategory}</li>
                        </ul>
                    </div>
                );

        return (list);

        }
    }

    addItemsInCart = (itemObj) => {
        this.setState({
            itemsInCart: [...this.state.itemsInCart, itemObj]
        })

        this.calculateTotalItemAndPrice();
    }

    renderMenuItemList = () => {
        const list = this.state.itemsByCategory.map((menuItem) =>
            <div key={menuItem.menu._id}>
                <ItemCard itemName={menuItem.menu.itemName} vegOrNonVeg={menuItem.menu.vegOrNonVeg} price={menuItem.menu.price} description={menuItem.menu.description} itemId={menuItem.menu._id} showCart={this.showCartSideBar} addItem={this.addItemsInCart}/>
            </div>
        );

        return (list);
    }

    removeItemFromCart = (itemName) => {
        let itemArray = this.state.itemsInCart.filter(item => item.itemName !== itemName);
        this.setState({itemsInCart: itemArray});
    }

    updateQuantity = (itemName, change) => {

        var itemArray = [...this.state.itemsInCart];
        var indexOfObjectToChangeQuantity = itemArray.findIndex(x => x.itemName ===itemName);
        if (indexOfObjectToChangeQuantity !== -1) {
            if(change === "+") {
                itemArray[indexOfObjectToChangeQuantity].itemQuantity+=1;
                this.setState({itemsInCart: itemArray});
                this.calculateTotalItemAndPrice();
            } else {
                if (itemArray[indexOfObjectToChangeQuantity].itemQuantity>0) {
                    itemArray[indexOfObjectToChangeQuantity].itemQuantity-=1;
                    if(itemArray[indexOfObjectToChangeQuantity].itemQuantity === 0) {
                       this.removeItemFromCart(itemName);
                       this.calculateTotalItemAndPrice();
                    } else {
                        this.setState({itemsInCart: itemArray});
                        this.calculateTotalItemAndPrice();
                    }
                }
            }
        }
    }

    closeCartSideBar() {
        this.setState({
            visibility: "hidden",
            transform: "translateX(100)"
        })
    }

    showCartSideBar() {
        this.setState({
            visibility: "visible",
            transform: "translateX(0)"
        })

    }

    renderCartItems = () => {
        const list = this.state.itemsInCart.map((cartItem) =>
            <div key={cartItem.itemName}>
                <ItemsInCart itemName={cartItem.itemName} price={cartItem.itemPrice} quantity={cartItem.itemQuantity} deleteItem={this.removeItemFromCart} changeQuantity={this.updateQuantity}/>
            </div>
        );

        return (list);
    }

    calculateTotalItemAndPrice = () => {
        let noOfItemsInCartVar = 0;
        let totalPriceVar = 0;

        this.state.itemsInCart.forEach(cartItem => {
            noOfItemsInCartVar+=cartItem.itemQuantity;
            totalPriceVar+=cartItem.itemQuantity*cartItem.itemPrice;
        });

        this.setState({
            noOfItemsInCart: noOfItemsInCartVar,
            totalPrice: totalPriceVar
        })
    }

    clearCartFunction = () => {
        let cartItems = this.state.itemsInCart.map(cartItem => cartItem.itemName);
        cartItems.forEach(itemName => this.removeItemFromCart(itemName));
    }

    render() {
        return (
            <div className="show-menu-main-div">

                <NavbarForSite/>

                <div className="category-menu row">
                    <div className="col-lg-1 col-md-2 col-sm-2 cart-option" onClick={this.showCartSideBar}>
                        <i className="fas fa-cart-plus cart-icon"></i>
                        <span className="cart-items">0</span>
                    </div>
                    <div className="col-lg-11 col-md-10 col-sm-10 ">
                        <div className="default-list">{this.renderItemCategory()}</div>
                        <div className="dropdown category-drop">
                          <button className="btn btn-secondary dropdown-toggle category-btn" type="button" id="categorydropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Category
                          </button>
                          <div className="dropdown-menu category-list" aria-labelledby="categorydropdown">
                            <div className="small-sc-list">{this.renderItemCategory()}</div>
                          </div>
                        </div>
                    </div>
                </div>
                <div className="items-card">
                    {this.renderMenuItemList()}
                </div>

                <div className="cart-overlay transparentBcg" style={{visibility: this.state.visibility}}>
                    <div className="cart-side-bar showCart" style={{transform: this.state.transform}}>
                        <i className="back-btn fas fa-arrow-circle-left fa-2x" onClick={this.closeCartSideBar}></i>
                            {this.renderCartItems()}
                        <div className="cart-footer">
                            <h3>your total: ₹ {this.state.totalPrice}</h3>
                            <Button className="clear-cart" onClick={this.clearCartFunction}>Clear cart</Button>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default ShowMenu;
