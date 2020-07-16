import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Nav } from 'react-bootstrap';
import './navbar.css';
import GoogleButton from './googleButton';
import LogoutButton from './logoutButton';
import ProfileButton from './profileButton';
import DMLogo from './images/dmLogo.svg';

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

          <nav className="navbar navbar-expand-lg navbar-dark">
            <a id="navbar-brand" href="http://localhost:3000/"><span><img id="brand-logo" src={DMLogo} alt="Company Logo"/></span></a>

            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#myNavigation" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="myNavigation">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="http://localhost:3000/#about-section">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://localhost:3000/#pricing-section">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#footer">Contact</a>
                </li>
                <li className="nav-item">
                    {this.renderMidContent()}
                </li>
              </ul>
                {this.renderContent()}
            </div>
          </nav>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(NavbarForSite);
