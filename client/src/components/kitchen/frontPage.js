import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './frontPage.css';
import NavbarForSite from './navbar';
import Footer from '../footer';

const FrontPage = (props) => {
    
    const [shopName, setShopName] = useState('');
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/shop_name_from_shopId?ownerEmail=${props.match.params.email}&shopId=${props.match.params.shopId}`)
        .then(res => {
            //console.log(res.data.shopName);
            setShopName(res.data.shopName);
        })
    }, [])
    
    return (
        <div className="main-div">
            <div className="nav-div-fixed">
                <NavbarForSite shopName={shopName}/>
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
