import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import './itemsInCart.css';

class ItemsInCart extends Component{

    render() {
        return (
            <div className="items-in-cart">
                <div className="item-name">Milk Shake</div>
                <div className="item-qty">1</div>
                <div className="item-price">₹ 100</div>

                <Button className="cart-btn remove-btn">Remove</Button>
                <Button className="cart-btn minus-btn"><i class="fas fa-minus"></i></Button>
                <Button className="cart-btn plus-btn"><i class="fas fa-plus"></i></Button>

            </div>

        );
    }
}


export default ItemsInCart;
