import React from 'react';
import { connect } from 'react-redux';
import './frontPage.css';
import NavbarForSite from './navbar';
import Footer from './footer';
import NOTch from '../images/no-touch.svg'
import MobChk from '../images/onMobile.svg'
import MenuGerms from '../images/menu-germs.jpg'
import Service from '../images/service.jpg'
import ScanMenu from '../images/menu-scan.jpg'

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
                        <a href="http://localhost:5000/auth/google" className="signUp-button-from-pricing">
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
                        <a href="http://localhost:5000/auth/google" className="signUp-button-from-pricing">
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

                <section className="front-parent-div">

                    <div id="front-carousel" className="carousel slide" data-ride="carousel">
                      <ol className="carousel-indicators">
                        <li data-target="#front-carousel" data-slide-to="0" className="active"></li>
                        <li data-target="#front-carousel" data-slide-to="1"></li>
                        <li data-target="#front-carousel" data-slide-to="2"></li>
                      </ol>
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img className="d-block"
                          src={ScanMenu}
                          alt="First slide"/>
                          <div className="carousel-caption">
                            <h3>A faster and efficient way to order in a restaurant.</h3>
                            <p>Scan the QR code on the table, order what you want on your mobile. No more miscalculations in bills.</p>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <img
                          className="d-block"
                          src={Service}
                          alt="Second slide"/>
                          <div className="carousel-caption">
                            <h3>No delay in customer service.</h3>
                            <p>Less worries about any complaint regarding customer services.</p>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <img
                          className="d-block"
                          src= {MenuGerms}
                          alt="Third slide"/>
                          <div className="carousel-caption">
                            <h3>What's wrong with a menu card?</h3>
                            <p>According to a study, a restaurant menu can contain <strong>185,000</strong> germs per sq cm.
                            For reference, a public toilet has about <strong>500 - 1,000</strong> germs per sq cm.</p>
                          </div>
                        </div>
                      </div>
                      <a className="carousel-control-prev slide-btn" href="#front-carousel" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                      </a>
                      <a className="carousel-control-next slide-btn" href="#front-carousel" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                      </a>
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
                            <h3>14 Days trial</h3>
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
                            <h2 className="price-text">₹ 149 / mo</h2>
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
                            <h2 className="price-text">₹ 1199 / yr</h2>
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
