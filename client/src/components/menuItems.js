import React from 'react';
import { Card } from 'react-bootstrap';
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
      } else if(vegOrNonVeg === "egg") {
          return(
              <img src={Eggi} alt="egg"/>
          )
      } else {
          return(
              <img src={Vegg} alt="veg"/>

          )
      }
  }
  
  const showSubcategoryIfHave = () => {
      if(props.subcategory) {
          const list = props.subcategory.map((subcategoryItem) =>
            <div key={subcategoryItem._id}>
                {subcategoryItem.half ? <li>{subcategoryItem.itemName} H: {subcategoryItem.half} F: {subcategoryItem.full}</li> : <li>{subcategoryItem.itemName} {subcategoryItem.full}</li>}
            </div>
        );

        return (list);
      } else {
          return(<div className="item-price">₹ {props.price}</div>)
      }
  }


        return (

                <Card className="card-for-item" bg="light">
                    <Card.Body>
                        <Card.Title>
                            <div className="item-name">{props.itemName} {props.itemAvailability ? null : <i class="fas fa-low-vision na-icon"></i>}</div>
                            <div className="vnv-id">{showVegOrNonVegImage(props.vegOrNonVeg)}</div>
                        </Card.Title>
                        <Card.Text className="item-description">
                            {props.description}
                        </Card.Text>

                    </Card.Body>
                    <Card.Footer>
                      {showSubcategoryIfHave()}
                      <div className="cardBtn-div">
                        <button type="button" className="edit-btn card-btn" onClick={ () => {props.editItem(props.itemName)}}>
                          Edit
                        </button>
                        <button type="button" className="delete-btn card-btn" onClick={ () => {props.deleteItemFromMenu(props.itemId)}}>
                          Delete
                        </button>
                      </div>
                    </Card.Footer>
                </Card>


        );

}

export default MenuItems;
