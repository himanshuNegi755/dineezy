import React, {useState, useEffect} from 'react';
//import { Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import './shopPage.css';
import NavbarForSite from './navbar';
import Footer from '../footer';


const ShopPage = (props) => {

    const [noOfTables, setNoOfTables] = useState(1);
    const [currentTable, setCurrentTable] = useState(1);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/tables_no?userEmail=${props.match.params.email}&shopId=${props.match.params.shopId}`)
        .then(res => {
            //console.log(res.data.noOfTables);
            setNoOfTables(res.data.noOfTables);
        })
    }, [props.match.params.email, props.match.params.shopId])
    
    const loadTablesFunction = (noOfTables) => {
        let tableArr = []
        for (var i=1; i<=noOfTables; i++) {
            tableArr[i] = i;
        }

        const list = tableArr.map((tableNo) =>
            <div key={tableNo}>
                <li className="tableNo-ind" onClick={ () => {setCurrentTable(tableNo)}}>
                    {tableNo}
                </li>
            </div>
            );
            return (list);

    }

    return (
        <div className="parent-div">
            <NavbarForSite />
            <div className="main-container row">
                <div className="col-lg-3 col-md-4 tableNo-col">
                    <div className="tableNo-heading">Tables Numbers</div>
                    <div className="tableNo-list">
                        {loadTablesFunction(noOfTables)}
                    </div>
                </div>
                <div className="col-lg-9 col-md-8 menu-col">

                    <div className="tableNo-name row">
                        <div className="col-lg-9 col-md-8 col-sm-8 tableNo-text">
                            <i class="far fa-clipboard"></i> Table No {currentTable}.
                        </div>
                        <div className="col-lg-3 col-sm-4">
                            <button className="add-new-item-btn">
                                <span className="addItem-text">Add New Item</span>
                            </button>
                        </div>

                    </div>

                    <div className="chatBox">
                        Chat box here.
                    </div>
                </div>
            </div>

            <div id="footer">
                <Footer />
            </div>

        </div>
        );
}

export default ShopPage;
