import React, {useEffect, useState}  from 'react';
import { Link, Redirect, useParams} from 'react-router-dom';
import "./css/home.css";
import data from '../data';
import {useDispatch, useSelector} from 'react-redux';
import {listUsers} from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';

import MessageBox from '../components/MessageBox';
import PopUp from '../components/popup/pop';
export default function HomeScreen(props) {
    const param = new URLSearchParams(props.location.search);
    const page = param.get("page");
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);
    const { loading, error, users, pages } = userList;

    const [buttonPopUp, setButtonPopup] = useState(false);
    const flagButton = [false] * 20

    useEffect(() => {
        
        dispatch(listUsers(        
            page
            ));
        
    }, [dispatch, page]);
    
    const getFilterUrl = (filter) => {
        const filterPage = filter.page > 0 ? filter.page : filter.page === 0 ? 1 : page >= 0 ? page : 1;
        return `?page=${filterPage}`;
    }

    console.log(flagButton)

    return(
        <div className="home">
        {loading ? (
            <LoadingBox></LoadingBox>
            ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div>
            <button onClick={() => setButtonPopup(true)}>Send email</button>
            <PopUp trigger={buttonPopUp} setTrigger={setButtonPopup}> </PopUp>
            <table className="table_style table">
                <thead>
                <tr>
                  <th>ACCOUNT ID</th>
                  <th>Customer Journey Stage</th>
                  <th>CLV2.0</th>
                  <th>CLV1.0</th>
                  <th>Credit score</th>
                  <th>Campaign Recommendation</th>
                </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr key = {user.account_id}>
                            <td width= "5%">{user.account_id}</td>
                            <td width= "15%"> {user.customer_journey}</td>
                            <td width="40%" className="user_name">{user.clv_2_0}</td>
                            <td> {user.clv_1_0_label}</td>
                            <td width= "15%">{user.credit_score}</td>      
                            <td>{user.campain}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        
        )}
    </div>
    

    );


}