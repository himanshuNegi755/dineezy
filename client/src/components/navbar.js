import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import './navbar.css';
import GoogleButton from './googleButton';
import LogoutButton from './logoutButton';
import ProfileButton from './profileButton';


class NavbarForSite extends Component{    
    
    constructor(props) {
        super(props);
        
        this.renderContent = this.renderContent.bind(this);
        this.renderMidContent = this.renderMidContent.bind(this);
    }
    
    renderContent = () => {
        switch(this.props.user) {
            case null:
                return (
                    <React.Fragment>
                        <div className="btn-div">
                            <h5>Loading</h5>
                        </div>
                    </React.Fragment>
                )
            case false:
                return (
                    <React.Fragment>
                        <div>
                            <GoogleButton />
                        </div>
                        
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment>
                        <div>
                            <ProfileButton />
                        </div>
                        <div>
                            <LogoutButton />
                        </div>
                    </React.Fragment>
                )
        }
    }
    
    renderMidContent = () => {
        switch(this.props.user) {
            case null:
                return (
                    <React.Fragment>
                        <div className="btn-div">
                            <h5>Loading</h5>
                        </div>
                    </React.Fragment>
                )
            case false:
                return (
                    <React.Fragment>
                        <div>
                        </div>
                        
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment>
                        <Nav.Link href="/shops">Shops</Nav.Link>
                    </React.Fragment>
                )
        }
    }
    
    render() {
        
        return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="http://localhost:3000/"><b>Digi Menu</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#">About</Nav.Link>
                            <Nav.Link href="#">Pricing</Nav.Link>
                            {this.renderMidContent()}
                        </Nav>
                        
                        <Nav>
                            
                            {this.renderContent()}
                            
                        </Nav>
                        
                    </Navbar.Collapse>                
                </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(NavbarForSite);