import React from 'react';
import { connect } from 'react-redux';
import { Nav } from 'react-bootstrap';
import './navbar.css';
import GoogleButton from './googleButton';
import LogoutButton from './logoutButton';
import ProfileButton from './profileButton';
import DMLogo from '../images/dmLogo.svg';

const NavbarForSite = (props) => {

    const renderContent = () => {
        switch(props.user) {
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
                        <li className="nav-item">
                            <GoogleButton />
                        </li>
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment>
                            <li className="nav-item"><ProfileButton/></li>
                            <li className="nav-item"><LogoutButton /></li>
                    </React.Fragment>
                )
        }
    }

    const renderMidContent = () => {
        switch(props.user) {
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

        return (

          <nav className="navbar navbar-expand-lg navbar-dark">
            <a id="navbar-brand" href="/">
                <span>
                    <img id="brand-logo" src={DMLogo} alt="Company Logo"/>
                </span>
            </a>

            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#myNavigation" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="myNavigation">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/#pricing-section">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#footer">Contact</a>
                </li>
                <li className="nav-item">
                    {renderMidContent()}
                </li>
                    {renderContent()}

              </ul>

            </div>
          </nav>

        );
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(NavbarForSite);
