import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteItem } from '../store/actions/itemActions';
import './itemsInCart.css';

class ItemsInCart extends Component{

    constructor(props) {
        super(props);

        this.deleteItemFunction = this.deleteItemFunction.bind(this);
    }
    
    deleteItemFunction() {
        //this.props.deleteItem(this.props.itemName);
    }
    
    render() {
        return (
            <div className="items-in-cart">
                <div className="item-name">{this.props.itemName}</div>
                <div className="item-qty">{this.props.quantity}</div>
                <div className="item-price">₹ {this.props.price}</div>

                <Button className="cart-btn remove-btn" onClick={this.deleteItemFunction}>Remove</Button>
                <Button className="cart-btn minus-btn"><i class="fas fa-minus"></i></Button>
                <Button className="cart-btn plus-btn"><i class="fas fa-plus"></i></Button>

            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: (itemName) => { dispatch(deleteItem(itemName)) }
    }
}

export default connect(null, mapDispatchToProps)(ItemsInCart);
