import React from 'react';
import './navbar.css';
//import GoogleButton from '../googleButton';
//import LogoutButton from '../logoutButton';
import DMLogo from '../../images/dineezyLogo.svg';

const NavbarForSite = (props) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark row">
            <div className="col-3"><a id="navbar-brand" href="/">
                <span>
                    <img id="brand-logo" src={DMLogo} alt="Company Logo"/>
                </span>
            </a></div>
            <div className="restaurant-name col-6">{props.shopName} Kitchen</div>

            <div className="col-3"><ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#"><strong>Table Orders</strong></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#footer">Help ?</a>
                </li>
            </ul></div>
        </nav>

        );
}


export default NavbarForSite;
