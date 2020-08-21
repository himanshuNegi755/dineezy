import React from 'react';
import { connect } from 'react-redux';
import './frontPage.css';
import NavbarForSite from './navbar';
import Footer from './footer';
import MenuGerms from '../images/menu-germs.jpeg';
import Service from '../images/service.jpeg';
import ScanMenu from '../images/menu-scan.jpeg';

const FrontPage = (props) => {

    const renderPricingContent = () => {
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
                        <a href={`${process.env.REACT_APP_BACKEND_API}/auth/google`} className="signUp-button-from-pricing">
                            <button type="button" className="btn btn-dark btn-lg btn-block">Sign Up</button>
                        </a>

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

    const renderFreeContent = () => {
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
                        <a href={`${process.env.REACT_APP_BACKEND_API}/auth/google`} className="signUp-button-from-pricing">
                            <button type="button" className="btn btn-outline-light btn-lg btn-block">Sign Up</button>
                        </a>

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
                    <NavbarForSite />
                </div>

                <section className="front-title-div">

                    <h1>A safe and efficient POS for restaurants.</h1>
                    <h3>Go digital with ordering by just a scan.</h3>

                </section>

                <section className="front-parent-div">
                    <div className="row front-row">
                      <div className="col-5 ">
                          <img className="d-block"
                          src={ScanMenu}
                          alt="First slide"/>
                          <h3 className="h3-left">A faster and efficient way to order in a restaurant.</h3>
                      </div>
                      <div className="col-7 p-right">
                        <p>Scan the QR code on the table, order what you want on your mobile. No more miscalculations in bills.</p>
                      </div>
                    </div>
                    <div className="row front-row">
                      <div className="col-7 p-left">
                          <p>Less worries about any complaint regarding customer services.</p>
                      </div>
                      <div className="col-5">
                          <img className="d-block"
                          src={Service}
                          alt="Second slide"/>
                          <h3 className="h3-right">No delay in customer service.</h3>
                      </div>
                    </div>
                    <div className="row front-row">
                      <div className="col-5 ">
                          <img
                          className="d-block"
                          src= {MenuGerms}
                          alt="Third slide"/>
                          <h3 className="h3-left">What's wrong with a menu card?</h3>
                      </div>
                      <div className="col-7 p-right">
                          <p>According to a study, a restaurant menu can contain <strong>185,000</strong> germs per sq cm.
                          For reference, a public toilet has about <strong>500 - 1000</strong> germs per sq cm.</p>
                      </div>
                    </div>
                </section>

                <section id="pricing-section">
                    <div>
                        <h1 className="pricing-heading">Pricing</h1>
                    </div>

                    <div className="row">
                      <div className="pricing-col col-lg-4 col-md-6">
                        <div className="card pricing-card">
                          <div className="card-header">
                            <h3>21 Days trial</h3>
                          </div>
                          <div className="card-body">
                            <h2 className="price-text">Free</h2>
                            <p className="trial-text">After the trail version you'll love to try our monthly and yearly packs.</p>
                            {renderFreeContent()}
                          </div>
                        </div>
                      </div>

                      <div className="pricing-col col-lg-4 col-md-6">
                        <div className="card pricing-card">
                          <div className="card-header">
                            <h3>Monthly Pack</h3>
                          </div>
                          <div className="card-body">
                            <h2 className="price-text">N/A</h2>
                            <p>Payment at the beginning of the month</p>
                            <p>Validity : 30 Days from the day of payment.</p>
                            {renderPricingContent()}
                          </div>
                        </div>
                      </div>
                      <div className="pricing-col col-lg-4">
                        <div className="card pricing-card">
                          <div className="card-header">
                            <h3>Yearly Pack</h3>
                          </div>
                          <div className="card-body">
                            <h2 className="price-text">N/A</h2>
                            <p>Payment at the beginning of the year</p>
                            <p>Validity : 365 days from the day of payment</p>
                            {renderPricingContent()}
                          </div>
                        </div>
                      </div>
                    </div>

                </section>


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
