import React, {useState, useEffect} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './kitchenPage.css';
import NavbarForSite from './navforkitchen';
import Footer from '../footer';

let socket;

const ShopPage = (props) => {

    //const [noOfTables, setNoOfTables] = useState(1);
    const [currentTable, setCurrentTable] = useState(1);
    const [tableTakenArr, setTableTakenArr] = useState([]);
    const ENDPOINT = `http://localhost:8000`;
    const [ordersArr, setOrdersArr] = useState([]);

    useEffect(() => {
        let tableArr = []
        axios.get(`${process.env.REACT_APP_BACKEND_API}/tables_no?userEmail=${props.match.params.email}&shopId=${props.match.params.shopId}`)
        .then(res => {
            for (var i=0; i<res.data.noOfTables; i++) {
                tableArr[i] = {'tableNo': i+1, 'status': 'not taken'};
            }
            setTableTakenArr(tableArr);
        })
        socket = io(ENDPOINT);
        socket.emit('join', {shopId: props.match.params.shopId});       
        
    }, [props.match.params.email, props.match.params.shopId, ENDPOINT]);
    
    useEffect(() => {
        socket.on('tableTaken', (data) => {
            setOrdersArr([...ordersArr, data]);
        })
        console.log(ordersArr);
    }, []);
    
    const loadTablesFunction = () => {
        
        const list = tableTakenArr.map((table) =>
            <div key={table.tableNo}>
                <li className="tableNo-ind" onClick={ () => {setCurrentTable(table.tableNo)}}>
                    {table.tableNo} {table.status}
                </li>
            </div>
            );
            return (list);

    }

    return (
        <div className="parent-div">
            <NavbarForSite email={props.match.params.email} shopId={props.match.params.shopId}/>
            <div className="main-container row">
                <div className="col-lg-3 col-md-4 tableNo-col">
                    <div className="tableNo-heading">Tables Numbers</div>
                    <div className="tableNo-list">
                        {loadTablesFunction()}
                    </div>
                </div>
                <div className="col-lg-9 col-md-8 menu-col">

                    <div className="tableNo-name row">
                        <div className="col-lg-9 col-md-8 col-sm-8 tableNo-text">
                            <i className="far fa-clipboard"></i> Table No {currentTable}.
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
