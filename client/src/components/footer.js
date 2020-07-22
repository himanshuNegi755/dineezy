import React from 'react';
import './footer.css';

const Footer = () => {
        return (
          <footer className="footer">
              <div className="container-fluid contact-details">
                  <h4 className="contact-us">CONTACT US</h4>
                  <p className="contact-text">For any queries please mail us and we will reply as soon as possible with a solution.</p>
                  <br></br>
                  <a href="https://www.facebook.com/"><i className="fab fa-facebook-square fa-2x contact-icons" aria-hidden="true"></i></a>
                  <a href="https://www.instagram.com/"><i className="fab fa-instagram fa-2x contact-icons" aria-hidden="true"></i></a>
                  <a href="mailto:thekatohome@gmail.com"><i className="fas fa-envelope fa-2x contact-icons" aria-hidden="true"></i></a>
                  <i className="fab fa-twitter fa-2x contact-icons"></i>
                  <hr className="contact-divider"></hr>
                  <p className="copyright">© COPYRIGHT 2020 VIRTUAL MENU.</p>
              </div>
          </footer>
        );
}

export default Footer;
