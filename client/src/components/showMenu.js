import React, {Component} from 'react';
import axios from 'axios';
import './showMenu.css';
import NavbarForSite from './navbar';
import ItemCard from './itemCard';


class ShowMenu extends Component{

    constructor(props) {
        super(props);

        this.state = { category: [], itemsByCategory: [], itemQuantity: [] }

        this.loadCategoryFunction = this.loadCategoryFunction.bind(this);
        this.loadCategoryFunction();
        this.renderMidContent = this.renderMidContent.bind(this);
        this.loadItemFunction = this.loadItemFunction.bind(this);
        this.loadItemFunction();
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


    renderMidContent = () => {
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
                <ItemCard itemName={menuItem.menu.itemName} vegOrNonVeg={menuItem.menu.vegOrNonVeg} price={menuItem.menu.price} description={menuItem.menu.description} itemId={menuItem.menu._id} itemQuantity={this.state.quantity}/>
            </div>
        );

        return (list);
    }

    increaseItemQuantity() {

    }

    render() {
        return (
            <div className="show-menu-main-div">

                <NavbarForSite/>

                <div className="menu-category">
                    {this.renderMidContent()}
                </div>

                <div className="items-card">
                    {this.renderMenuItemList()}
                </div>
            </div>
        );
    }
}

export default ShowMenu;
