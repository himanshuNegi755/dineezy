import React from 'react';
import './frontPage.css';
import NavbarForSite from './navbar';
import Footer from '../footer';

const FrontPage = (props) => {
    
    return (
        <div className="main-div">
            <div className="nav-div-fixed">
                <NavbarForSite email={props.match.params.email} shopId={props.match.params.shopId}/>
            </div>
            <div className="kitchen-signIn">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <br/>
                    <button type="submit" className="btn">Sign In</button>
                </form>
            </div>
            <div id="footer">
                <Footer />
            </div>
        </div>
        );
}

export default FrontPage;
