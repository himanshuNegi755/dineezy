import React, {Component} from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { Button, Modal, Form } from 'react-bootstrap';
import './shopNameContainer.css';


class ShopNameContainer extends Component{

    constructor(props) {
        super(props);

        this.state = { showOptions: false, showFileUpload: false, showMenuOption: false, showQRCode: false}
        this.showDropDownOptions = this.showDropDownOptions.bind(this);
        this.showFileUploadModal = this.showFileUploadModal.bind(this);
        this.showOptionFunction = this.showOptionFunction.bind(this);
    }

    showOptionFunction() {

        axios.get(`http://localhost:5000/menu/${this.props.shopId}`)
        .then(res => {
            if(res.data[0].menu.length === 0) {
                this.setState({
                    showOptions: !this.state.showOptions
                });
            } else {
                this.props.menuForShop(this.props.shopId);
                this.setState({
                    showMenuOption: !this.state.showMenuOption
                });
            }

        })
    }

    showDropDownOptions() {
        if(this.state.showOptions) {
            return(
                <React.Fragment>
                    <div className="drop-down-options">
                        <ul>
                            <li onClick= {() => {this.setState({showFileUpload: !this.state.showFileUpload})}}>
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
                            <li onClick= {() => {this.setState({showQRCode: !this.state.showQrCode})}}>
                                <b>Get Menu QR code</b>
                            </li>
                        </ul>
                    </div>
                </React.Fragment>
            )
        }

    }

    showFileUploadModal() {
        this.setState({
            showFileUpload: !this.state.showFileUpload
        })
    }

    render() {
        return (
            <div>
                <h5 className="restaurant-name-holder" onClick = {() => {this.showOptionFunction()}}>{this.props.shopName}</h5>
                {this.showDropDownOptions()}

                <Modal
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.showFileUpload}
                    onHide={this.showFileUploadModal}
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
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.showQRCode}
                    onHide={() => {this.setState({showQRCode: !this.state.showQRCode})}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            QR Code For Your Shop
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="qr-code-div">
                            <a href={"/show_menu/" + this.props.shopId}>
                                <QRCode
                                    id= "qr-code-for-shop"
                                    value= {"http://localhost:3000/show_menu/" + this.props.shopId}
                                />
                            </a>

                            <p>To Download QR, just right click and save image.</p>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ShopNameContainer;
