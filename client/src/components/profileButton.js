import React from 'react';
import { Button } from 'react-bootstrap';
import './profileButton.css';

const ProfileButton = () => {
        return (
                <a href="/profile">
                    <Button variant="primary" className="profile-button">
                        <b className="profile-text">Profile</b>
                    </Button>
                </a>
        );
}


export default ProfileButton;
