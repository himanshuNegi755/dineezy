import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addItem } from '../store/actions/itemActions';
import { Card, Button } from 'react-bootstrap';

import './cartoverlay.css';

class ItemCard extends Component{

    constructor(props) {
        super(props);

        this.addItemFunction = this.addItemFunction.bind(this);
    }

    addItemFunction() {
        this.props.addItem({
            itemName: this.props.itemName,
            itemPrice: this.props.price,
            itemQuanity: 1
        })
    }

    render() {
        return (
            <Card style={{ width: '100%' }} className="card-for-item" bg="light">
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
                    <Button className="add-to-cart" onClick= {this.addItemFunction}>Add to Cart</Button>
                </Card.Footer>
            </Card>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (itemObj) => { dispatch(addItem(itemObj)) }
    }
}

export default connect(null, mapDispatchToProps)(ItemCard);
