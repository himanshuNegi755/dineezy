import React, {Component} from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import './shopPage.css';
import NavbarForSite from './navbar';
import ShopNameContainer from './shopNameContainer';
import MenuItems from './menuItems';
import Footer from './footer';


class ProfilePage extends Component{

    constructor(props) {
        super(props);

        this.state = { userEmail: '', loggedIn: true, showModal: false, shopName: '', shopAddress: '', noOfTables: '',
                      shopList: [], menuItemList: [], shopIdVar: ""}

        this.showShopAddModal = this.showShopAddModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.showShopAfterAdding = this.showShopAfterAdding.bind(this);
        this.shopList = this.shopList.bind(this);
        this.menuItemList = this.menuItemList.bind(this);
        this.getMenuFunction = this.getMenuFunction.bind(this);
        this.deleteItemFunction = this.deleteItemFunction.bind(this);
    }

    showShopAddModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit() {
        this.setState({showModal: !this.state.showModal})

        axios.put('http://localhost:5000/shop', {
            userEmail: this.state.userEmail,
            shopName: this.state.shopName,
            shopAddress: this.state.shopAddress,
            noOfTables: this.state.noOfTables
        })
        .then(res => {
            console.log(res.data);
            this.showShopAfterAdding();
        })

    }

    showShopAfterAdding() {
        axios.get(`http://localhost:5000/shop/get_shops/${this.state.userEmail}`)
            .then(res => {
                //console.log(res.data[0].shop);
                this.setState({shopList: res.data[0].shop})
            })
    }

    componentDidUpdate(prevProps, prevState) {
        try{
            if(!prevState.userName) {
                this.setState({userName: this.props.user.userName,
                              userEmail: this.props.user.userEmail})
                axios.get(`http://localhost:5000/shop/get_shops/${this.state.userEmail}`)
                    .then(res => {
                        //console.log(res.data[0].shop);
                        this.setState({shopList: res.data[0].shop})
                    })
            }
        } catch(err) {
            this.setState({loggedIn: false})
        }
    }

    getMenuFunction(shopId) {
        this.setState({shopIdVar: shopId});
        axios.get(`http://localhost:5000/menu/${shopId}`)
        .then(res => {
            //console.log(res.data[0].menu)
            this.setState({menuItemList: res.data[0].menu})
        })
    }

    deleteItemFunction(itemIdAttribute) {
        axios.put('http://localhost:5000/menu/item/delete/', {
                shopId: this.state.shopIdVar,
                itemId: itemIdAttribute
            })
        .then(res => {
            console.log(res.data);
            //this.props.loadComponentAgain();

        })
    }

    shopList = () => {
        const list = this.state.shopList.map((shop) =>
            <div key={shop._id}>
                <ShopNameContainer shopName={shop.shopName} menuForShop={this.getMenuFunction}
                    shopId={shop._id}/>
            </div>
        );

        return (list);
    }

    menuItemList = () => {
        const list = this.state.menuItemList.map((menuItem) =>
            <div key={menuItem._id}>
                <MenuItems itemName={menuItem.itemName} vegOrNonVeg={menuItem.vegOrNonVeg} price={menuItem.price} description={menuItem.description} category={menuItem.category} deleteItemFromMenu={this.deleteItemFunction}
                itemId={menuItem._id} shopId={this.state.shopIdVar} menuReload={this.getMenuFunction}/>
            </div>
        );

        return (list);
    }

    render() {
        if(!this.state.loggedIn) {
            return <Redirect to='/' />;
        }

        return (
            <div className="parent-div">
                <NavbarForSite />
                <div className="main-container row">
                    <div className="col-md-4 retaurant-col">
                        <Button variant="danger" className="add-restaurant-button" onClick={() => {this.showShopAddModal()}}>Add Restaurant</Button>

                        <div className="restaurant-list">
                            <h3 className="col-heading">Restaurants</h3>
                            {this.shopList()}
                        </div>
                    </div>
                    <div className="col-md-8 menu-col">
                        <div className="div-to-show-menu">
                            {this.menuItemList()}
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>


                <div>
                    <Modal
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.showModal}
                        onHide={this.showShopAddModal}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    SHOP DETAILS
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Shop Name</Form.Label>
                                        <Form.Control type="text" placeholder="Shop Name" name='shopName' value={this.state.shopName} onChange={this.handleInputChange}/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control as="textarea" rows="3" placeholder="Address" name='shopAddress' className="address-text-area" value={this.state.shopAddress} onChange={this.handleInputChange}/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Number Of Table</Form.Label>
                                        <Form.Control type="number" placeholder="Number Of Tables" min="1" name='noOfTables' value={this.state.noOfTable} onChange={this.handleInputChange}/>
                                    </Form.Group>
                                    <Button variant="primary" onClick={this.onSubmit} className="sign-up-button">
                                        Submit
                                    </Button>
                                </Form>

                            </Modal.Body>
                        </Modal>
                </div>


            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(ProfilePage);
