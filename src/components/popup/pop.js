import React from 'react';
// import './css/messageBox.css';

export default function PopUp(props){
    return (props.trigger) ? (
        <div className="popup">

            <div >
                <p>"Send successfully"</p>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>Close </button>
            </div>
        </div>
    ) : "";
}