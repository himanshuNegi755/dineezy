import React, {Component} from 'react';
import { Button, Card } from 'react-bootstrap';
import './menuItems.css';
import NonVeg from '../images/nonVeg.svg';
import Vegg from '../images/Veg.svg';
import Eggi from '../images/Egg.svg';

class MenuItems extends Component{

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

    render() {
        return (

                <Card style={{ width: '48%' }} className="card-for-item" bg="light">
                    <Card.Body>
                        <Card.Title>
                            <div className="item-name">{this.props.itemName}</div>
                            <div className="vnv-id">{this.showVegOrNonVegImage(this.props.vegOrNonVeg)}</div>
                        </Card.Title>
                        <Card.Text className="item-description">
                            {this.props.description}
                        </Card.Text>
                        <Card.Text>
                            <div className="item-price">₹ {this.props.price}</div>
                            <div className="cardBtn-div">
                              <button type="button" className="edit-btn card-btn" onClick={ () => {this.props.editItem(this.props.itemName)}}>
                                Edit
                              </button>
                              <button type="button" className="delete-btn card-btn" onClick={ () => {this.props.deleteItemFromMenu(this.props.itemId)}}>
                                Delete
                              </button>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>


        );
    }
}

export default MenuItems;
