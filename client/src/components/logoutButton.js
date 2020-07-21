import React from 'react';
import { Button } from 'react-bootstrap';
import './logoutButton.css';

const LogoutButton = () =>{
    return (
        <div>
            <a href="http://localhost:5000/auth/logout">
                <Button variant="primary" className="log-out-button">
                    <b>LOG OUT</b>
                </Button>
            </a>
        </div>
    );
}

export default LogoutButton;
                