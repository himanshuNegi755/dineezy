import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import './itemsInCart.css';

class ItemsInCart extends Component{
    
    render() {
        return (
            <div className="items-in-cart">
                <div className="item-name">Milk Shake</div>
                <div>
                    ₹ 100
                </div>
                <Button className="add-to-cart">Remove</Button>

                <div>
                    <i class="fas fa-chevron-up"></i>
                    <p>1</p>
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            
        );
    }
}


export default ItemsInCart;
