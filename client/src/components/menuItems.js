import React, {Component} from 'react';
import axios from 'axios';
import { Button, Table, InputGroup, FormControl } from 'react-bootstrap';
import './menuItems.css';

class MenuItems extends Component{

    constructor(props) {
        super(props);

        this.state = { itemName: this.props.itemName, vegOrNonVeg: this.props.vegOrNonVeg, price: this.props.price, description:
                     this.props.description, category: this.props.category }

        this.onTextChanged = this.onTextChanged.bind(this);
        this.changeItemDetails = this.changeItemDetails.bind(this);
        this.deleteItemAndReloadMenu = this.deleteItemAndReloadMenu.bind(this);
    }

    onTextChanged = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    changeItemDetails() {
        axios.put('http://localhost:5000/menu/item_update', {
            shopId: this.props.shopId,
            menuItemId: this.props.itemId,
            itemName: this.state.itemName,
            vegOrNonVeg: this.state.vegOrNonVeg,
            price: this.state.price,
            description: this.state.description,
            category: this.state.category
            })
        .then(res => {
            console.log(res.data);
            //this.props.loadComponentAgain();

        })
    }

    deleteItemAndReloadMenu() {
        this.props.deleteItemFromMenu(this.props.itemId);
        this.props.menuReload(this.props.shopId);
    }

    render() {
        return (
            <div className="menu-item-design">

                <div className="rows-for-items row">
                  <div className="col-lg-3 col-md-3 col-sm-4 item-detail">Item name</div>
                  <div className="col-lg-9 col-md-9 col-sm-8 item-input">
                    <InputGroup>
                        <FormControl
                            placeholder="Item Name"
                            aria-label="Item Name"
                            aria-describedby="basic-addon1"
                            value={this.state.itemName}
                            name='itemName'
                            onChange={this.onTextChanged}
                        />
                    </InputGroup>
                  </div>
                </div>
                <div className="rows-for-items row">
                  <div className="col-lg-3 col-md-3 col-sm-4 item-detail">Veg Or Non-Veg</div>
                  <div className="col-lg-9 col-md-9 col-sm-8 item-input">
                    <InputGroup>
                        <select class="custom-select form-control" placeholder="Item Category" aria-label="Item Category" aria-describedby="basic-addon1"
                        value={this.state.vegOrNonVeg} name='vegOrNonVeg' onChange={this.onTextChanged} id="inputGroupSelect">
                          <option selected>Choose...</option>
                          <option value="veg">veg</option>
                          <option value="non-veg">non-veg</option>
                        </select>
                    </InputGroup>
                  </div>
                </div>
                <div className="rows-for-items row">
                  <div className="col-lg-3 col-md-3 col-sm-4 item-detail">Price</div>
                  <div className="col-lg-9 col-md-9 col-sm-8 item-input">
                    <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>₹</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Item Price"
                            aria-label="Item Price"
                            aria-describedby="basic-addon1"
                            value={this.state.price}
                            name='price'
                            onChange={this.onTextChanged}
                        />
                    </InputGroup>
                  </div>
                </div>
                <div className="rows-for-items row">
                  <div className="col-lg-3 col-md-3 col-sm-4 item-detail">Description</div>
                  <div className="col-lg-9 col-md-9 col-sm-8 item-input">
                    <InputGroup>
                        <FormControl
                            placeholder="Description or ingredients"
                            aria-label="Item Description"
                            aria-describedby="basic-addon1"
                            value={this.state.description}
                            name='description'
                            onChange={this.onTextChanged}
                        />
                    </InputGroup>
                  </div>
                </div>
                <div className="rows-for-items row">
                  <div className="col-lg-3 col-md-3 col-sm-4 item-detail">Category</div>
                  <div className="col-lg-9 col-md-9 col-sm-8 item-input">
                    <InputGroup>
                        <FormControl
                            placeholder="Item Category"
                            aria-label="Item Category"
                            aria-describedby="basic-addon1"
                            value={this.state.category}
                            name='category'
                            onChange={this.onTextChanged}
                        />

                    </InputGroup>
                  </div>
                </div>

                <Button variant="success" className="button-for-editing-items save-btn" onClick={this.changeItemDetails}>Save</Button>
                <Button variant="danger" className="button-for-editing-items delete-btn" onClick={this.deleteItemAndReloadMenu}>Delete</Button>

            </div>
        );
    }
}

export default MenuItems;
