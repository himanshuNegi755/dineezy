import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import './itemsInCart.css';

class ItemsInCart extends Component{
    
    render() {
        return (
            <div className="items-in-cart">
                <div className="item-name">{this.props.itemName}</div>
                <div className="item-qty">{this.props.quantity}</div>
                <div className="item-price">₹ {this.props.price}</div>

                <Button className="cart-btn remove-btn" onClick={() => {this.props.deleteItem(this.props.itemName)}}>Remove</Button>
                <Button className="cart-btn minus-btn" onClick={() => {this.props.changeQuantity(this.props.itemName, "-")}}><i className="fas fa-minus"></i></Button>
                <Button className="cart-btn plus-btn" onClick={() => {this.props.changeQuantity(this.props.itemName, "+")}}><i className="fas fa-plus"></i></Button>

            </div>

        );
    }
}

export default ItemsInCart;
