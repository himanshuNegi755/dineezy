import React from 'react';
import { Button } from 'react-bootstrap';
import './logoutButton.css';

const LogoutButton = () =>{
    return (
            <a href={`${process.env.REACT_APP_BACKEND_API}/auth/logout`}>
                <Button variant="primary" className="log-out-button">
                    <b className="logOut-text">LOG OUT</b>
                </Button>
            </a>
    );
}

export default LogoutButton;
