import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import "./css/home.css";
import data from '../data';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import { Button, Modal, Form } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
// import PopUp from '../components/popup/pop';

export default function HomeScreen(props) {
    const param = new URLSearchParams(props.location.search);
    const page = param.get("page");
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);

    const { loading, error, status,users, lastEvaluatedKey} = userList;

    const [prevUsers, setprevUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState('');

    const [loadMoreButton, setLoadMoreButton] = useState(false)
    const [emailContent, setEmailContent] = useState('');
    // setprevUsers((prevUsers) => [...prevUsers, ...users]);
   
    const handleClose = () => setShow(false);
    const handleShow = (email) => {
        setSelectedEmail(email);
        setShow(true);
    };


    useEffect(() => {
        // dispatch(
        //     setprevUsers((prevUsers) => [...prevUsers, ...users])
        // )
        
        dispatch(listUsers(
            lastEvaluatedKey
        ));
    }, [dispatch]);
    
    const getFilterUrl = (filter) => {
        const filterPage = filter.page > 0 ? filter.page : filter.page === 0 ? 1 : page >= 0 ? page : 1;
        return `?page=${filterPage}`;
    }

    const loadMore = () => {
        if (lastEvaluatedKey) {
            dispatch(listUsers(
                lastEvaluatedKey
            ));
          
        }
      };


    const sendEmail = () => {
        alert(`Sending email to ${selectedEmail}`);
        // Thực hiện logic gửi email ở đây (ví dụ: gọi API gửi email)
        handleClose();
    };

    return (
        <div className="home">
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <div  className="table-container">
                    <table className="table_style table user-table">
                        <thead>
                            <tr>
                                <th>Account Id</th>
                                <th>Customer Journey Stage</th>
                                <th>CLV2.0</th>
                                <th>CLV1.0</th>
                                <th>Credit score</th>
                                <th>Campaign Recommendation</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.account_id}>
                                    <td width="5%">{user.account_id}</td>
                                    <td width="15%"> {user.customer_journey}</td>
                                    <td width="15%"> {user.clv_1_0_label}</td>
                                    <td width="15%" className="user_name">{user.clv_2_0}</td>
                                    <td width="30%">{user.credit_score}</td>
                                    <td width="10%">{user.campaign}</td>
                                    <td className='object-button-send-email'>
                                        <button className='button-send-email' onClick={() => handleShow(user.account_id)}>Send Email</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Send Email</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Form>
                            Are you sure you want to send an email to {selectedEmail}?
                            <Form.Group controlId="formEmailContent">
                                <Form.Label>Email Content</Form.Label>
                                <Form.Control
                                as="textarea"
                                rows={3}
                                value={emailContent}
                                onChange={(e) => setEmailContent(e.target.value)}
                                />
                            </Form.Group>
                            </Form>
                               
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    No
                                </Button>
                                <Button variant="primary" onClick={sendEmail}>
                                    Yes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </table>
                    </div>
                    {loading && <p>Loading...</p>}
                        {!loading && lastEvaluatedKey && (
                            <Button onClick={loadMore}>Load More</Button>
                    )}
                </div>

            )}
        </div>


    );


}