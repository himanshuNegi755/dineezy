import React from 'react';
import './footer.css';

const Footer = () => {
        return (
          <footer className="footer">
              <div className="container-fluid contact-details">
                  <h4 className="contact-us">CONTACT US</h4>
                  <p className="contact-text">For any queries please mail us and we will reply as soon as possible with a solution.</p>
                  <br></br>
                  <a className="contact-icons" href="mailto:thekatohome@gmail.com"><i className="fas fa-envelope fa-2x" aria-hidden="true"></i> </a>
                  <a className="contact-icons" href="https://wa.me/message/MRZMBG4DLYZ2I1"><i class="fab fa-whatsapp fa-2x contact-icons"></i> </a>
                  <hr className="contact-divider"></hr>
                  <p className="copyright">© COPYRIGHT 2020 DINEEZY.</p>
              </div>
          </footer>
        );
}
export default Footer;
