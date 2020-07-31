import React from 'react';
import './navbar.css';
//import GoogleButton from '../googleButton';
//import LogoutButton from '../logoutButton';
import DMLogo from '../../images/dmLogo.svg';

const NavbarForSite = (props) => {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <a id="navbar-brand" href="/">
                <span>
                    <img id="brand-logo" src={DMLogo} alt="Company Logo"/>
                </span>
            </a>
            <span className="restaurant-name">{props.shopName}<i className="fas fa-cauldron"></i></span>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#footer">Help ?</a>
                </li>
            </ul>

        </nav>

        );
}


export default NavbarForSite;
