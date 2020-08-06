import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './navforkitchen.css';
//import LogoutButton from '../logoutButton';
import DMLogo from '../../images/dineezyLogo.svg';

const NavbarForSite = (props) => {

    const [shopName, setShopName] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/shop_name_from_shopId?ownerEmail=${props.email}&shopId=${props.shopId}`)
        .then(res => {
            //console.log(res.data.shopName);
            setShopName(res.data.shopName);
        })
    }, [props.email, props.shopId])

    const renderContent = () => {
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
                         <div>
                         </div>
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment>
                        <li className="nav-item">
                            <a className="nav-link" href={`/kitchen/orders/${props.email}/${props.shopId}`}>
                                <strong>
                                    Orders
                                </strong>
                            </a>
                        </li>
                    </React.Fragment>
                )
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark row">
            <div className="col-lg-3 col-md-3 col-sm-3"><a id="navbar-brand" href="/">
                <span>
                    <img id="brand-logo" src={DMLogo} alt="Company Logo"/>
                </span>
            </a></div>
            <div className="restaurant-name col-lg-6 col-md-5 col-sm-5">{shopName} Kitchen</div>

            <div className="col-lg-3 col-md-4 col-sm-4 kitchen-part"><ul className="navbar-nav ml-auto">

                {renderContent()}

                <li className="nav-item">
                    <a className="nav-link" href="#footer">Help ?</a>
                </li>
            </ul></div>
        </nav>

        );
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}


export default connect(mapStateToProps)(NavbarForSite);
