import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './itemCard.css';
import NonVeg from '../images/nonVeg.svg';
import Vegg from '../images/Veg.svg';
import Eggi from '../images/Egg.svg';

const ItemCard = (props) => {

    const showVegOrNonVegImage = (vegOrNonVeg) => {
        if(vegOrNonVeg === "non-veg") {
            return (
                <img src={NonVeg} alt="non-veg"/>
            )
        } else if(vegOrNonVeg === "egg") {
            return(
                <img src={Eggi} alt="egg"/>
            )
        } else {
            return (
                <img src={Vegg} alt="veg"/>
            )
        }
    }

        return (
            <Card style={{ width: '49%' }} className="card-for-item" bg="light">
                <Card.Body>
                    <Card.Title>
                        <div className="item-name">{props.itemName}</div>
                        <div className="vnv-id">{showVegOrNonVegImage(props.vegOrNonVeg)}</div>
                    </Card.Title>
                    <Card.Text className="item-description">
                        {props.description}
                    </Card.Text>
                    <Card.Text  className="item-price">
                        ₹ {props.price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button className="add-to-cart" onClick={ () => {
                            props.addItem({itemName: props.itemName, itemPrice: props.price, itemQuantity: 1});
                            props.showCart();}}>
                        Add to Cart
                    </Button>
                </Card.Footer>
            </Card>
        );
}

export default ItemCard;
