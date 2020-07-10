import React from 'react';
import { Button } from 'react-bootstrap';
import './profileButton.css';

const ProfileButton = () => {
        return (
            <div>
                <a href="/profile">
                    <Button variant="primary" className="log-out-button">
                        <b>Profile</b>
                    </Button>
                </a>
            </div>
        );
}


export default ProfileButton;
                