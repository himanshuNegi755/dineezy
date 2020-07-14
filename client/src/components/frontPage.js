import React, {Component} from 'react';
import { Carousel, Card } from 'react-bootstrap';
import './frontPage.css';
import NavbarForSite from './navbar';
import Footer from './footer';
import NOTch from './images/no-touch.svg'
import MobChk from './images/onMobile.svg'

class FrontPage extends Component{

    render() {

        return (
            <div className="main-div">
                <div>
                    <NavbarForSite />
                </div>

                <section className="front-parent-div">

                    <div id="front-carousel" class="carousel slide" data-ride="carousel">
                      <ol class="carousel-indicators">
                        <li data-target="#front-carousel" data-slide-to="0" class="active"></li>
                        <li data-target="#front-carousel" data-slide-to="1"></li>
                        <li data-target="#front-carousel" data-slide-to="2"></li>
                      </ol>
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img className="d-block w-100"
                          src="https://www.rotundakingston.co.uk/wp-content/uploads/2018/06/kung-fu-800x400px.jpg"
                          alt="First slide"/>
                          <div class="carousel-caption">
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                          </div>
                        </div>
                        <div class="carousel-item">
                          <img
                          className="d-block w-100"
                          src="https://i2.wp.com/www.caffeladro.com/wp-content/uploads/2017/11/blog2017tday-800x400px.jpg?ssl=1"
                          alt="Second slide"/>
                          <div class="carousel-caption">
                            <h3>Second slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                          </div>
                        </div>
                        <div class="carousel-item">
                          <img
                          className="d-block w-100"
                          src="https://www.webbsdirect.co.uk/images/stores/Bakery-Counter-800x400px.jpg"
                          alt="Third slide"/>
                          <div class="carousel-caption">
                            <h3>Third slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                          </div>
                        </div>
                      </div>
                      <a class="carousel-control-prev" href="#front-carousel" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                      </a>
                      <a class="carousel-control-next" href="#front-carousel" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                      </a>
                    </div>

                </section>

                <section id="about-section">
                    <h1 class="about-heading">Perks of a digital menu.</h1>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 about-col">
                            <img class="about-img" src={NOTch} alt="Less Contact Image"/>
                            <h3>Less contact, less germs.</h3>
                            <p class="about-text">According to a study, a restaurant menu can contain 185,000 germs per square centimeter.
                            For reference, a public toilet has about 500 - 1,000 germs per square centimeter.</p>
                        </div>
                        <div class="col-lg-4 col-md-4 about-col">
                            <img class="about-img" src={MobChk} alt="Order on Mobile Image"/>
                            <h3>No delay in customer service.</h3>
                            <p class="about-text">As a customer, no more waiting for a waiter in a crowded day you can order in the digital menu itself.
                             As a restaurant, less worries about any complaint regarding bad services.</p>
                        </div>
                        <div class="col-lg-4 col-md-4 about-col">
                            <i class="fas fa-calculator fa-5x about-img"></i>
                            <h3>No miss calculations.</h3>
                            <p class="about-text">No more confusions while taking bills. All the items will be recorded and saved untill the payment is done.</p>
                        </div>
                    </div>
                </section>

                <section id="pricing-section">
                    <div>
                        <h1 className="pricing-heading">Pricing</h1>
                    </div>

                    <div class="row">
                      <div class="pricing-col col-lg-4 col-md-6">
                        <div class="card">
                          <div class="card-header">
                            <h3>14 Days trial</h3>
                          </div>
                          <div class="card-body">
                            <h2 class="price-text">Free</h2>
                            <p class="trial-text">After the trail version you'll love to try our monthly and yearly packs.</p>
                            <button type="button" class="btn btn-outline-dark btn-lg btn-block">Sign Up</button>
                          </div>
                        </div>
                      </div>

                      <div class="pricing-col col-lg-4 col-md-6">
                        <div class="card">
                          <div class="card-header">
                            <h3>Monthly Pack</h3>
                          </div>
                          <div class="card-body">
                            <h2 class="price-text">₹ 150 / mo</h2>
                            <p>Payment at the beginning of the month</p>
                            <p>Validity : 30 Days from the day of payment.</p>
                            <button type="button" class="btn btn-dark btn-lg btn-block">Sign Up</button>
                          </div>
                        </div>
                      </div>
                      <div class="pricing-col col-lg-4">
                        <div class="card">
                          <div class="card-header">
                            <h3>Yearly Pack</h3>
                          </div>
                          <div class="card-body">
                            <h2 class="price-text">₹ 1200 / yr</h2>
                            <p>Payment at the beginning of the year</p>
                            <p>Validity : 365 days from the day of payment</p>
                            <button type="button" class="btn btn-dark btn-lg btn-block">Sign Up</button>
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
}


export default FrontPage;
