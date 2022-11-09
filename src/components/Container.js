import React from 'react'
import './container.css';
import indexcover from '../images/indexcover.mp4'



export default function Container() {
  return (
    <>
        <div className="indexfirstbox">
            <video src={indexcover} alt='index art' className='indeximage' autoPlay loop muted/>
            <div className="textsecondcontainer"><br /><br /><br /><br />
            <div className="firsttext">India’s fastest growing shared platform community</div>
            <div className="secondtext">find | select | interact</div>
N            </div>
        </div>                  
    </>
    )
}

// 















