import React from 'react';
import './faq.css';

const FAQ = () => {

    const showFAQAns = (id_value) => {
        var faqAns = document.getElementById(id_value);
        var faqArw = document.getElementById("d" + id_value);
        if(faqAns.style.display === 'none'){
            faqAns.style.display = 'block';
        } else {
            faqAns.style.display = 'none';
        }
        if(faqArw.style.transform === 'rotate(0deg)'){
            faqArw.style.transform = 'rotate(180deg)';
        } else {
            faqArw.style.transform = 'rotate(0deg)';
        }
    }

    return (
        <div>
            <div className="faq-heading">
                <h1>FAQs</h1>
            </div>
            <div className="faq-list row">
                    <div className="faq-list-item col-6">
                        <i className="fas fa-angle-down" style={{transform: 'rotate(0deg)'}} id="d1"></i><em onClick={() => {showFAQAns('1')}}> Who are we?</em>
                        <div className="ans" style={{display: 'none'}} id="1">
                            We provide QR based contactless restaurant management & ordering system at very competitive pricing.
                        </div>
                    </div>
                    <div className="faq-list-item col-6">
                        <i className="fas fa-angle-down" style={{transform: 'rotate(0deg)'}} id="d2"></i><em onClick={() => {showFAQAns('2')}}> Who/Why should we use your platform?</em>
                        <ul className="ans" style={{display: 'none'}} id="2">
                            <li> If you want to reduce your costs and adopt the “atmanirbhar” way of ordering.</li>
                            <li> If you are a new restaurant/cafe starting out and want to try out the “contactless” way of ordering.</li>
                            <li> If you want to digitize your menu for your customers to order the "CONTACTLESS" way. <strong>It is completely free</strong>.</li>
                        </ul>
                    </div>
                    <div className="faq-list-item col-6">
                        <i className="fas fa-angle-down" style={{transform: 'rotate(0deg)'}} id="d3"></i><em onClick={() => {showFAQAns('3')}}> How do we compare to others?</em>
                        <div className="ans" style={{display: 'none'}} id="3">
                            Well we don't, all the other POS restaurant management services in the market today comes at a greater cost while also providing and catering to a large customer base. This makes their software very complicated and comes with a bit of learning curve. While we here at Dineezy are keen on providing the most exquisite user experience for your customers.
                        </div>
                    </div>
                    <div className="faq-list-item col-6">
                        <i className="fas fa-angle-down" style={{transform: 'rotate(0deg)'}} id="d4"></i><em onClick={() => {showFAQAns('4')}}> I still have some questions!</em>
                        <div className="ans" style={{display: 'none'}} id="4">
                            You can contact us at <a href="#footer">here</a>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default FAQ;
