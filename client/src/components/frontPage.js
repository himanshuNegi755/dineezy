import React from 'react';
import { connect } from 'react-redux';
import './frontPage.css';
import NavbarForSite from './navbar';
import Footer from './footer';
import NOTch from '../images/no-touch.svg'
import MobChk from '../images/onMobile.svg'

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
                            <button type="button" className="btn btn-outline-dark btn-lg btn-block">Sign Up</button>
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
                <div>
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
                          <img className="d-block w-100"
                          src="https://www.rotundakingston.co.uk/wp-content/uploads/2018/06/kung-fu-800x400px.jpg"
                          alt="First slide"/>
                          <div className="carousel-caption">
                            <h3>Perks of a virtual menu.</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <img
                          className="d-block w-100"
                          src="https://i2.wp.com/www.caffeladro.com/wp-content/uploads/2017/11/blog2017tday-800x400px.jpg?ssl=1"
                          alt="Second slide"/>
                          <div className="carousel-caption">
                            <h3>Second slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <img
                          className="d-block w-100"
                          src="https://www.webbsdirect.co.uk/images/stores/Bakery-Counter-800x400px.jpg"
                          alt="Third slide"/>
                          <div className="carousel-caption">
                            <h3>Third slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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

                <section id="about-section">
                    <h1 className="about-heading">Perks of a digital menu.</h1>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 about-col">
                            <img className="about-img" src={NOTch} alt="Less Contact"/>
                            <h3>Less contact, less germs.</h3>
                            <p className="about-text">According to a study, a restaurant menu can contain 185,000 germs per square centimeter.
                            For reference, a public toilet has about 500 - 1,000 germs per square centimeter.</p>
                        </div>
                        <div className="col-lg-4 col-md-4 about-col">
                            <img className="about-img" src={MobChk} alt="Order on Mobile"/>
                            <h3>No delay in customer service.</h3>
                            <p className="about-text">As a customer, no more waiting for a waiter in a crowded day you can order in the digital menu itself.
                             As a restaurant, less worries about any complaint regarding bad services.</p>
                        </div>
                        <div className="col-lg-4 col-md-4 about-col">
                            <i className="fas fa-calculator fa-5x about-img"></i>
                            <h3>No miss calculations.</h3>
                            <p className="about-text">No more confusions while taking bills. All the items will be recorded and saved untill the payment is done.</p>
                        </div>
                    </div>
                </section>

                <section id="pricing-section">
                    <div>
                        <h1 className="pricing-heading">Pricing</h1>
                    </div>

                    <div className="row">
                      <div className="pricing-col col-lg-4 col-md-6">
                        <div className="card">
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
                        <div className="card">
                          <div className="card-header">
                            <h3>Monthly Pack</h3>
                          </div>
                          <div className="card-body">
                            <h2 className="price-text">₹ 150 / mo</h2>
                            <p>Payment at the beginning of the month</p>
                            <p>Validity : 30 Days from the day of payment.</p>
                            {renderPricingContent()}
                          </div>
                        </div>
                      </div>
                      <div className="pricing-col col-lg-4">
                        <div className="card">
                          <div className="card-header">
                            <h3>Yearly Pack</h3>
                          </div>
                          <div className="card-body">
                            <h2 className="price-text">₹ 1200 / yr</h2>
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
