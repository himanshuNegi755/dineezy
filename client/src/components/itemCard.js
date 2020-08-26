import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './itemCard.css';
import NonVeg from '../images/nonVeg.svg';
import Vegg from '../images/Veg.svg';
import Eggi from '../images/Egg.svg';
import PopularItem from '../images/popularItem.svg';
import NewItem from '../images/newItem.svg';
import SpecialItem from '../images/specialItem.svg';

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

    const showAddToCartButtonOrStatus = () => {
        if(props.itemAvailability) {
            if(props.showAddToCartButton) {
                return(
                    <div className="in-cart">In cart</div>
                    )
            } else {
                return(
                    <Button className="add-to-cart" onClick={ () => {
                            props.addItem({itemId: props.itemId, itemName: props.itemName, itemPrice: props.price, itemQuantity: 1});
                            }}>
                        Add to Cart
                    </Button>
                    )
            }
        } else {
            return(
                <div className="in-cart">Item Unavailable</div>
                )
        }
    }

        return (
            <Card className="show-menu-cards" bg="light">
                <Card.Body>
                    <Card.Title>
                        <div className="item-name">{props.itemName}</div>
                        <div className="vnv-id">{showVegOrNonVegImage(props.vegOrNonVeg)}</div>
                    </Card.Title>
                    <Card.Text className="item-description">
                        {props.description}
                    </Card.Text>
                    <Card.Text>
                        <div>{props.itemStatusNew ? <img className="itemNotif" src={NewItem} alt="new item"/> : null} {props.itemStatusPopular ? <img className="itemNotif" src={PopularItem} alt="popular item"/> : null} 
                        {props.itemStatusChefSpecial ? <img className="itemNotif" src={SpecialItem} alt="chef speciality"/> : null}</div>
                    </Card.Text>
                    
                    <Card.Text  className="item-price">
                        ₹ {props.price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {showAddToCartButtonOrStatus()}
                </Card.Footer>
            </Card>
        );
}

export default ItemCard;
