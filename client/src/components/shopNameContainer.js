import React, {Component} from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import './shopNameContainer.css';


class ShopNameContainer extends Component{    
    
    constructor(props) {
        super(props);
        
        this.state = { showOptions: false, showFileUpload: false}
        this.showDropDownOptions = this.showDropDownOptions.bind(this);
        this.showFileUploadModal = this.showFileUploadModal.bind(this);
        this.showOptionFunction = this.showOptionFunction.bind(this);
    }
    
    showOptionFunction() {
        this.setState({
            showOptions: !this.state.showOptions
        });
        this.props.menuForShop(this.props.shopId);
    }
    
    showDropDownOptions() {
        if(this.state.showOptions) {
            return(
                <React.Fragment>
                    <div className="drop-down-options">
                        <ul>
                            <li onClick = {() => {this.setState({showFileUpload: !this.state.showFileUpload})}}><b>Add Menu</b></li>
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
            <div className="shop-name-holer-div">
                <h5 onClick = {() => {this.showOptionFunction()}}>{this.props.shopName}</h5>
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
                
            </div>
        );
    }
}

export default ShopNameContainer;