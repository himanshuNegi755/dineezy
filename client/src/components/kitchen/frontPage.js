import React from 'react';
import './frontPage.css';
import { connect } from 'react-redux';
import NavbarForSite from './navbar';
import Footer from '../footer';
import GoogleButton from '../googleButton';

const FrontPage = (props) => {
    
    const renderContentForGoogleButton = () => {
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
                        <GoogleButton />
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment>
                        <div>
                        </div>
                    </React.Fragment>
                )
        }
    }
    
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
                    {renderContentForGoogleButton()}
                </form>
            </div>
            <div id="footer">
                <Footer />
            </div>
        </div>
        );
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(FrontPage);
