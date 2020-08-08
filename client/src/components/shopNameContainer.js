import React, {Component} from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { Button, Modal, Form } from 'react-bootstrap';
import './shopNameContainer.css';


class ShopNameContainer extends Component{

    constructor(props) {
        super(props);

        this.state = { showOptions: false, showFileUploadModal: false, showMenuOption: false, showQRCodeModal: false, noOfTablesArr: [], currentTable: 1, showQRCodeForTables: false, showQRCodeForKitchen: false, kitchenAccessEmailList: [], emailToAdd: '', file: null}
    }

    //function to handle input change
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //file upload function    
    onFileUploadHandler = () => {
        const fd = new FormData();
        fd.append('shopMenu', this.state.file, this.props.shopId+this.state.file.name)
        axios.post(`${process.env.REACT_APP_BACKEND_API}/file_upload`, fd)
        .then(res => {
            console.log(res.data);
            this.setState({file: null, showFileUploadModal: !this.state.showFileUploadModal})
        })
    }
    
    showOptionFunction = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/menu/${this.props.shopId}`)
        .then(res => {
            if(res.data[0].menu.length === 0) {
                this.setState({
                    showOptions: !this.state.showOptions
                });

                this.props.hideSearchBar();
            } else {

                axios.get(`${process.env.REACT_APP_BACKEND_API}/tables_no?userEmail=${this.props.userEmail}&shopId=${this.props.shopId}`)
                .then(res => {
                    let arr = []
                    for(var i=0; i<res.data.noOfTables; i++) {
                        arr[i] = i+1;
                    }
                    this.setState({noOfTablesArr: arr})
                })

                this.getEmailListForKitchenAccessFunction();

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

                <li className="table-ind" onClick={() => {
                    this.setState({currentTable: tableNo})
                }}>{tableNo}</li>

            </div>
            );
        return (list);

    }

    renderEmailListForKitchenAccess = () => {
        if( this.state.kitchenAccessEmailList.length>0) {
        const list = this.state.kitchenAccessEmailList.map((email) =>
            <div key={email}>

                <li className="email-ind">
                    <span className="accesser-email">{email}</span>
                    <button type="button" onClick={ () => {this.deleteEmailFromKitchenAccessListFunction(email)
                                                           this.getEmailListForKitchenAccessFunction()}}>
                        Remove
                    </button>
                </li>

            </div>
            );
            return (list);
        } else { return (<div></div>) }
        

    }

    showTableQRCode = (tableNo) => {
        return (
            <div className="qr-code-div">
                <a href={"/show_menu/" + this.props.shopId + "/" + tableNo}>
                    <QRCode
                        id= "qr-code-for-shop"
                        value= {`${process.env.REACT_APP_FRONTEND}/show_menu/${this.props.shopId}/${tableNo}`}
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
                    <div className="drop-down-options" onClick= {() => {this.setState({showFileUploadModal: !this.state.showFileUploadModal})}}>
                        <b>Add Menu</b>
                    </div>
                </React.Fragment>
            )
        } else if(this.state.showMenuOption) {
            return(
                <React.Fragment>
                    <div className="drop-down-options">
                        <b onClick= {() => {this.setState({showQRCodeModal: !this.state.showQRCodeModal, showQRCodeForTables: !this.state.showQRCodeForTables})}}>
                            Get Menu QR code
                        </b>
                        <b onClick= {() => {this.setState({showQRCodeModal: !this.state.showQRCodeModal, showQRCodeForKitchen: !this.state.showQRCodeForKitchen})}}>
                            Get QR Code for Kitchen
                        </b>
                    </div>
                </React.Fragment>
            )
        }

    }

    showTableOrKitchenQRCodeInModal = () => {
        if (this.state.showQRCodeForTables) {
            return (
                <React.Fragment>
                    <div className="dropdown-table-no">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Table Number
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <ul>{this.renderTableNo()}</ul>
                        </div>
                    </div>
                    <div className="current-tableNo">
                        QR code of Table number  <span>{this.state.currentTable}</span>
                    </div>
                    {this.showTableQRCode(this.state.currentTable)}
                </React.Fragment>
            )
        } else if (this.state.showQRCodeForKitchen) {
            return (
                <div className="qr-code-div">
                    <button className="btn dropdown-toggle email-access-btn" type="button" id="dropdownEmailButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Emails with access
                    </button>
                    <div className="dropdown-menu email-dropdown" aria-labelledby="dropdownEmailButton">
                        <ul>{this.renderEmailListForKitchenAccess()}</ul>
                    </div>

                    <Form.Group controlId="formBasicName">
                        <Form.Control type="text" placeholder="Enter Email for Kitchen Access" name='emailToAdd' value={this.state.emailToAdd} onChange={this.handleInputChange}/>
                        <button className="add-email" type="button" onClick={ () => {this.addEmailToAccessListFunction(this.state.emailToAdd)
                                                               this.getEmailListForKitchenAccessFunction()
                                                               this.setState({emailToAdd: ''})}}>
                            ADD
                        </button>
                    </Form.Group>
                    <a href={`/kitchen/${this.props.userEmail}/${this.props.shopId}`}>
                        <QRCode
                            id= "qr-code-for-shop"
                            value= {`${process.env.REACT_APP_FRONTEND}/kitchen/${this.props.userEmail}/${this.props.shopId}`}
                            /*value= {`${process.env.REACT_APP_FRONTEND}/shop?ownerEmail=${this.props.userEmail}&shopId=${this.props.shopId}`}*/
                        />
                    </a>
                    <p>To Download QR, just right click and save image.</p>
                </div>
            )
        }
    }

    addEmailToAccessListFunction = (emailToAdd) => {
        axios.put(`${process.env.REACT_APP_BACKEND_API}/add/email_access`, {
            userEmail: this.props.userEmail,
            shopId: this.props.shopId,
            email: emailToAdd
        })
        .then(res => {
            console.log(res.data);
            //this.showShopAfterAdding();
        })
    }

    getEmailListForKitchenAccessFunction = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/get/email_access/list?userEmail=${this.props.userEmail}&shopId=${this.props.shopId}`)
        .then(res => {
            this.setState({kitchenAccessEmailList: res.data});
        })
    }

    deleteEmailFromKitchenAccessListFunction = (emailToRemove) => {
        axios.put(`${process.env.REACT_APP_BACKEND_API}/delete/email_access`, {
            userEmail: this.props.userEmail,
            shopId: this.props.shopId,
            email: emailToRemove
        })
        .then(res => {
            console.log(res.data);
        })
    }

    render() {
        return (
            <div>
                <div className="row restaurant-name-holder">
                  <div className="col-10">
                      <h5 className="restaurant-name-holder">{this.props.shopName}</h5>
                  </div>
                  <div className="col-2" onClick = {() => {this.showOptionFunction()}}>
                      <i className="fas fa-chevron-down"></i>{this.showDropDownOptions()}
                  </div>
                </div>


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
                        <Form>

                            <Form.Group controlId="formBasicEmail">
                                <Form.File
                                    className="position-relative"
                                    required
                                    name="file"
                                    label="File"
                                    id="validationFormik107"
                                    feedbackTooltip
                                    single="true"
                                    onChange={ (e) => {this.setState({file: e.target.files[0]})}}
                                />
                            </Form.Group>
                            <Form.Label>
                                The digital Menu will be uploaded within next 24 hours.
                            </Form.Label>

                            <Button variant="primary" onClick={this.onFileUploadHandler} className="sign-up-button">
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
                    onHide={() => {this.setState({showQRCodeModal: !this.state.showQRCodeModal,
                                                   showQRCodeForTables: false,
                                                   showQRCodeForKitchen: false})}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            QR Code For Your Kitchen
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.showTableOrKitchenQRCodeInModal()}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ShopNameContainer;
