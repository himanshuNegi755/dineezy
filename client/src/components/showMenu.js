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

        this.state = { category: [], itemsByCategory: [], visibility: "hidden", transform: "translateX(100)" }

        this.loadCategoryFunction = this.loadCategoryFunction.bind(this);
        this.loadCategoryFunction();
        this.renderItemCategory = this.renderItemCategory.bind(this);
        this.loadItemFunction = this.loadItemFunction.bind(this);
        this.showCartSideBar = this.showCartSideBar.bind(this);
        this.closeCartSideBar = this.closeCartSideBar.bind(this);
    }

    loadCategoryFunction() {
        axios.get(`http://localhost:5000/item_categories/${this.props.match.params.shopId}`)
        .then(res => {
            //console.log(res.data)
            this.setState({category: res.data})
        })
    }

    loadItemFunction(itemCategory) {
        axios.get(`http://localhost:5000/items?shopId=${this.props.match.params.shopId}&category=${itemCategory}`)
        .then(res => {
            //console.log(res.data)
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
                            <li onClick={() => {this.loadItemFunction(itemCategory)}}>{itemCategory}</li>
                        </ul>
                    </div>
                );

        return (list);

        }
    }

    renderMenuItemList = () => {
        const list = this.state.itemsByCategory.map((menuItem) =>
            <div key={menuItem.menu._id}>
                <ItemCard itemName={menuItem.menu.itemName} vegOrNonVeg={menuItem.menu.vegOrNonVeg} price={menuItem.menu.price} description={menuItem.menu.description} itemId={menuItem.menu._id}/>
            </div>
        );

        return (list);
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

    render() {
        return (
            <div className="show-menu-main-div">

                <NavbarForSite/>

                <div className="menu-category row">
                    <div className="col-lg-11 col-md-10 col-sm-10">
                        {this.renderItemCategory()}
                    </div>
                  <div className="col-lg-1 col-md-2 col-sm-2 cart-option">
                      <span onClick={this.showCartSideBar}><i className="fas fa-cart-plus cart-icon"></i></span>
                      <span className="cart-items">0</span>
                  </div>
                </div>
                <div className="items-card">
                    {this.renderMenuItemList()}
                </div>
                    
                <div className="cart-overlay transparentBcg" style={{visibility: this.state.visibility}}>
                <div className="cart-side-bar showCart" style={{transform: this.state.transform}}>
                    <i class="far fa-window-close" onClick={this.closeCartSideBar}></i>
                    <ItemsInCart />                    
                    <div className="cart-footer">
                        <h3>your total: ₹ 100</h3>
                        <button>Clear Cart</button>
                    </div>
                    
                </div>
            </div>
                
                
            </div>
        );
    }
}

export default ShowMenu;
