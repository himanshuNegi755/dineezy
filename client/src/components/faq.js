import React from 'react';
import './faq.css';

const FAQ = () => {
    
    const showFAQAns = (id_value) => {
        var faqAns = document.getElementById(id_value);
        if(faqAns.style.display === 'none'){
            faqAns.style.display = 'block';
        } else {
            faqAns.style.display = 'none';
        }
    }

    return (
        <div>
            <div>
                <h2>FAQs</h2>
            </div>
            <div>
                <ul className="faq-ul">
                    <li className="faq-list-item" onClick={() => {showFAQAns('1')}}>
                        → Who are we?
                        <div className="ans" style={{display: 'none'}} id="1">
                            We provide QR based contactless restaurant management & ordering system at very competitive pricing.
                        </div>
                    </li>
                    <li className="faq-list-item" onClick={() => {showFAQAns('2')}}>
                        → Who/Why should we use your platform?
                        <div className="ans" style={{display: 'none'}} id="2">
                            <div>◇ If you want to reduce your costs and adopt the “atmanirbhar” way of ordering.</div>
                            <div>◇ If you are a new restaurant/cafe starting out and want to try out the “contactless” way of ordering.</div>
                            <div>◇ If you want to digitize your menu for your customers to order the "CONTACTLESS" way. IT IS COMPLETELY FREE.</div>   
                        </div>
                    </li>
                    <li className="faq-list-item" onClick={() => {showFAQAns('3')}}>
                        → How do we compare to others?
                        <div className="ans" style={{display: 'none'}} id="3">
                            Well we don't, all the other POS restaurant management services in the market today comes at a greater cost while also providing and catering to a large customer base. This makes their software very complicated and comes with a bit of learning curve. While we here at Dineezy are keen on providing the most exquisite user experience for your customers.
                        </div>
                    </li>
                    <li className="faq-list-item" onClick={() => {showFAQAns('4')}}>
                        → I still have some questions!
                        <div className="ans" style={{display: 'none'}} id="4">
                            ◇ You can contact us at <a href="#footer">here</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default FAQ;