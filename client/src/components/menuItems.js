import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './menuItems.css';
import NonVeg from '../images/nonVeg.svg';
import Vegg from '../images/Veg.svg';
import Eggi from '../images/Egg.svg';

const MenuItems = (props) => {
    
    const showVegOrNonVegImage = (vegOrNonVeg) => {
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
                <Button variant="success" className="button-for-editing-items save-btn" onClick={ () => {props.editItem(props.itemName)}}>Edit</Button>
                <Button variant="danger" className="button-for-editing-items delete-btn" onClick={ () => {props.deleteItemFromMenu(props.itemId);}}>Delete</Button>
            </Card.Footer>
        </Card>
    );
}

export default MenuItems;
