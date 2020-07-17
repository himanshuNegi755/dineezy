import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';
import './cartForItem.css';

class CartForItem extends Component{

    constructor(props) {
        super(props);
        
        this.state = { visibility: "visible", transform: "translateX(0)" }
        this.closeCartSideBar = this.closeCartSideBar.bind(this);
    }
    
    closeCartSideBar() {
        this.setState({
            visibility: "hidden",
            transform: "translateX(100)"
        })
    }
    
    render() {
        return (
            <div className="cart-overlay transparentBcg" style={{visibility: this.state.visibility}}>
                <div className="cart-side-bar showCart" style={{transform: this.state.transform}}>
                    <i class="far fa-window-close" onClick={this.closeCartSideBar}></i>
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
                    
                    <div className="cart-footer">
                        <h3>your total: ₹ 100</h3>
                        <button>Clear Cart</button>
                    </div>
                    
                </div>
            </div>
            
        );
    }
}


export default CartForItem;
