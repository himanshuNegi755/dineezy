import React, {Component} from 'react';
import { Carousel, Card } from 'react-bootstrap';
import './frontPage.css';
import NavbarForSite from './navbar';
import Footer from './footer';

class FrontPage extends Component{
      
    render() {
        
        return (
            <div className="main-div">
                <div>
                    <NavbarForSite />
                </div>
                
                <div className="main-container">
                    <div className="row"> 
                        <div className="col">
                        </div>
                        <Carousel className="carousel-class col-sm-12 col-md-8">
                            <Carousel.Item>
                                <img
                                  className="d-block w-100"
                                  src="https://www.rotundakingston.co.uk/wp-content/uploads/2018/06/kung-fu-800x400px.jpg"
                                  alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="https://i2.wp.com/www.caffeladro.com/wp-content/uploads/2017/11/blog2017tday-800x400px.jpg?ssl=1"
                                alt="Second slide"
                                />
                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="https://www.webbsdirect.co.uk/images/stores/Bakery-Counter-800x400px.jpg"
                                alt="Third slide"
                                />
                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                        <div className="col">
                        </div>                    
                    </div>
                    <div className="pricing-div">
                        <div className="pricing-heading">
                            <h1>Pricing</h1>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                
                                <Card
                                  bg="info"
                                  text={'info' === 'light' ? 'dark' : 'white'}
                                  style={{ width: '18rem' }}
                                  className="card-component"
                                >
                                  <Card.Header>Monthly</Card.Header>
                                  <Card.Body>
                                    <Card.Title>Free 15 Day Trail </Card.Title>
                                    <Card.Text>
                                      ₹ 150 per month
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                                
                            </div>
                            <div className="col-md-6">
                                
                                <Card
                                  bg="info"
                                  text={'info' === 'light' ? 'dark' : 'white'}
                                  style={{ width: '18rem' }}
                                  className="card-component"
                                >
                                  <Card.Header>Yearly</Card.Header>
                                  <Card.Body>
                                    <Card.Title>Free 15 Day Trail </Card.Title>
                                    <Card.Text>
                                      ₹ 1200 a year
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}


export default FrontPage;