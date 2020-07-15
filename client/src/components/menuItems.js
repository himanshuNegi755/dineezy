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

                <Table striped bordered hover className="table-for-items">
                    <tbody>
                        <tr>
                            <td className="item-detail">Item Name</td>
                            <td className="item-input">
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
                            </td>
                        </tr>
                        <tr>
                            <td className="item-detail">Veg Or Non-Veg</td>
                            <td className="item-input">
                                <InputGroup>
                                    <FormControl
                                        placeholder="Item Name"
                                        aria-label="Item Name"
                                        aria-describedby="basic-addon1"
                                        value={this.state.vegOrNonVeg}
                                        name='vegOrNonVeg'
                                        onChange={this.onTextChanged}
                                    />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <td className="item-detail">Price</td>
                            <td className="item-input">
                                <InputGroup>
                                    <FormControl
                                        placeholder="Item Name"
                                        aria-label="Item Name"
                                        aria-describedby="basic-addon1"
                                        value={this.state.price}
                                        name='price'
                                        onChange={this.onTextChanged}
                                    />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <td className="item-detail">Description</td>
                            <td className="item-input">
                                <InputGroup>
                                    <FormControl
                                        placeholder="Item Name"
                                        aria-label="Item Name"
                                        aria-describedby="basic-addon1"
                                        value={this.state.description}
                                        name='description'
                                        onChange={this.onTextChanged}
                                    />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <td className="item-detail">Category</td>
                            <td className="item-input">
                                <InputGroup>
                                    <FormControl
                                        placeholder="Item Name"
                                        aria-label="Item Name"
                                        aria-describedby="basic-addon1"
                                        value={this.state.category}
                                        name='category'
                                        onChange={this.onTextChanged}
                                    />
                                </InputGroup>
                            </td>
                        </tr>
                      </tbody>
                </Table>

                <Button variant="success" className="button-for-editing-items save-btn" onClick={this.changeItemDetails}>Save</Button>
                <Button variant="danger" className="button-for-editing-items delete-btn" onClick={this.deleteItemAndReloadMenu}>Delete</Button>

            </div>
        );
    }
}

export default MenuItems;
