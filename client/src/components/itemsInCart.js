import React from 'react';
import { Button } from 'react-bootstrap';
import './itemsInCart.css';

const ItemsInCart = (props) => {

    return (
        <div className="items-in-cart">
            <div className="row">
              <div className="item-name col-9">{props.itemName}</div>
              <div className="col-3"><span className="xPlate">H/F</span></div>
            </div>
            <div className="row">
              <div className="item-price col-3">₹ {props.price}</div>
              <div className="multi-x col-2">x</div>
              <div className="item-qty col-2">{props.quantity}</div>
              <div className="multi-x col-2">=</div>
              <div className="item-price col-3"><span className="xPrice">₹ {props.price}</span></div>
            </div>
            <div className="row">
              <div className="calc-btn col-3"><Button className="cart-btn remove-btn" onClick={() => {props.deleteItem(props.itemId)}}>Remove</Button></div>
              <div className="calc-btn col-3"><Button className="cart-btn minus-btn" onClick={() => {props.changeQuantity(props.itemId, "-")}}><i className="fas fa-minus"></i> 1</Button></div>
              <div className="calc-btn col-3"><Button className="cart-btn plus-btn" ><i className="fas fa-plus"></i> 1/2</Button></div>
              <div className="calc-btn col-3"><Button className="cart-btn plus-btn" onClick={() => {props.changeQuantity(props.itemId, "+")}}><i className="fas fa-plus"></i> 1</Button></div>
            </div>

        </div>
    );
}

export default ItemsInCart;
