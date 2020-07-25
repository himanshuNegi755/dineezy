import React, {Component} from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { Button, Modal, Form } from 'react-bootstrap';
import './shopNameContainer.css';


class ShopNameContainer extends Component{

    constructor(props) {
        super(props);

        this.state = { showOptions: false, showFileUploadModal: false, showMenuOption: false, showQRCodeModal: false, noOfTablesArr: [], currentTable: 1}
    }

    showOptionFunction = () => {

        axios.get(`http://localhost:5000/menu/${this.props.shopId}`)
        .then(res => {
            if(res.data[0].menu.length === 0) {
                this.setState({
                    showOptions: !this.state.showOptions
                });
                
                this.props.hideSearchBar();
            } else {
                
                axios.get(`http://localhost:5000/tables_no?userEmail=${this.props.userEmail}&shopId=${this.props.shopId}`)
                .then(res => {
                    let arr = []
                    for(var i=0; i<res.data.noOfTables; i++) {
                        arr[i] = i+1;
                    }
                    this.setState({noOfTablesArr: arr})
                })
                
                this.props.menuForShop(this.props.shopId);
                this.props.showSearchBar();
                this.props.showCategory(this.props.shopId);
                this.setState({
                    showMenuOption: !this.state.showMenuOption
                });
            }

        })
    }    
    
    renderTableNo = () => {
        const list = this.state.noOfTablesArr.map((tableNo) =>
            <div key={tableNo}>

                <li className="category-ind" onClick={() => {
                    this.setState({currentTable: tableNo})
                }}>{tableNo}</li>

            </div>
            );
        return (list);

    }
    
    showTableQRCode = (tableNo) => {
        return (
            <div className="qr-code-div">
                <a href={"/show_menu/" + this.props.shopId + "/" + tableNo}>
                    <QRCode
                        id= "qr-code-for-shop"
                        value= {"http://localhost:3000/show_menu/" + this.props.shopId + "/" + tableNo}
                    />
                </a>

                <p>To Download QR, just right click and save image.</p>
            </div>
        )
    }

    showDropDownOptions = () => {
        if(this.state.showOptions) {
            return(
                <React.Fragment>
                    <div className="drop-down-options">
                        <ul>
                            <li onClick= {() => {this.setState({showFileUploadModal: !this.state.showFileUploadModal})}}>
                                <b>Add Menu</b>
                            </li>
                        </ul>
                    </div>
                </React.Fragment>
            )
        } else if(this.state.showMenuOption) {
            return(
                <React.Fragment>
                    <div className="drop-down-options">
                        <ul>
                            <li onClick= {() => {this.setState({showQRCodeModal: !this.state.showQRCodeModal})}}>
                                <b>Get Menu QR code</b>
                            </li>
                        </ul>
                    </div>
                </React.Fragment>
            )
        }

    }

    render() {
        return (
            <div>
                <h5 className="restaurant-name-holder" onClick = {() => {this.showOptionFunction()}}>{this.props.shopName}</h5>
                {this.showDropDownOptions()}

                <Modal
                    size="md"
                    aria-labelledby="file-upload-modal"
                    centered
                    show={this.state.showFileUploadModal}
                    onHide={ () => {this.setState({showFileUploadModal: !this.state.showFileUploadModal})}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Upload Your Menu
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group controlId="formBasicEmail">
                                <Form.File
                                    className="position-relative"
                                    required
                                    name="file"
                                    label="File"
                                    id="validationFormik107"
                                    feedbackTooltip
                                    multiple
                                />
                            </Form.Group>
                            <Form.Label>
                                The digital Menu will be uploaded within next 24 hours.
                            </Form.Label>

                            <Button variant="primary" onClick={this.onSubmit} className="sign-up-button">
                                Upload
                            </Button>
                        </Form>

                    </Modal.Body>
                </Modal>

                <Modal
                    size="md"
                    aria-labelledby="qr-code-modal"
                    centered
                    show={this.state.showQRCodeModal}
                    onHide={() => {this.setState({showQRCodeModal: !this.state.showQRCodeModal})}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            QR Code For Your Shop
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="dropdown-table-no">
                            <ul>{this.renderTableNo()}</ul>
                        </div>
                         {this.state.currentTable}
                        {this.showTableQRCode(this.state.currentTable)}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ShopNameContainer;
