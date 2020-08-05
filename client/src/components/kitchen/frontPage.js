import React from 'react';
import './frontPage.css';
import { connect } from 'react-redux';
import NavbarForSite from './navforkitchen';
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
                        <button>
                          <GoogleButton />
                        </button>
                        <p>Make sure you have access to the kitchen section beforehand.</p>
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment>
                        <div>
                            <p>You are logged in to the kitchen section. Go to the <strong>Orders</strong> tab in the navigation bar above to check orders.</p>
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
              <div className="kitchen-text">                
                {renderContentForGoogleButton()}
              </div>
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
