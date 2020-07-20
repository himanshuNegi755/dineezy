import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';
import './itemCard.css';
import NonVeg from '../images/nonVeg.svg';
import Vegg from '../images/Veg.svg';
import Eggi from '../images/Egg.svg';

class ItemCard extends Component{

    showVegOrNonVegImage = (vegOrNonVeg) => {
        if(vegOrNonVeg === "non-veg") {
            return (
                <img src={NonVeg} alt="non-veg"/>
            )
        } else {
            return(
                <img src={Vegg} alt="veg"/>
            )
        }
    }

    addAndShowCart = () => {
        this.props.addItem({itemName: this.props.itemName, itemPrice: this.props.price, itemQuantity: 1});
        this.props.showCart();
    }

    render() {
        return (
            <Card style={{ width: '49%' }} className="card-for-item" bg="light">
                <Card.Body>
                    <Card.Title>
                        <div className="item-name">{this.props.itemName}</div>
                        <div className="vnv-id">{this.showVegOrNonVegImage(this.props.vegOrNonVeg)}</div>
                    </Card.Title>
                    <Card.Text className="item-description">
                        {this.props.description}
                    </Card.Text>
                    <Card.Text  className="item-price">
                        ₹ {this.props.price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button className="add-to-cart" onClick={this.addAndShowCart}>Add to Cart</Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default ItemCard;
