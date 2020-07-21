import React from 'react';
import { Button } from 'react-bootstrap';
import './itemsInCart.css';

const ItemsInCart = (props) => {
    
    return (
        <div className="items-in-cart">
            <div className="item-name">{props.itemName}</div>
            <div className="item-qty">{props.quantity}</div>
            <div className="item-price">₹ {props.price}</div>

            <Button className="cart-btn remove-btn" onClick={() => {props.deleteItem(props.itemName)}}>Remove</Button>
            <Button className="cart-btn minus-btn" onClick={() => {props.changeQuantity(props.itemName, "-")}}><i className="fas fa-minus"></i></Button>
            <Button className="cart-btn plus-btn" onClick={() => {props.changeQuantity(props.itemName, "+")}}><i className="fas fa-plus"></i></Button>
        </div>
    );
}

export default ItemsInCart;
