import React from 'react'
import './main.css'
//import MainImage1 from '../../../images/champion.png'
import MainImage from '../../../images/hero.png'
import Image2 from '../../../images/bubble.png'
import { Link } from 'react-router-dom'

export default function Main() {
    return (
        <div className="main">
            <div className="main-left-container">
                <div className="main-left-box">
                    <div className="main-left-wrapper">
                        <h1>Your Passion Begins Here !</h1>
                        <p>Join Millions Other in the Future of Work,<br/>
                        The easiest way to get your new job.</p>
                        <div className="main-search-bar">
                            <input type="text" id="search" placeholder="Job Title, Keywords or Company" />
                            <Link to="#">Search</Link>
                        </div>
                    </div>
                </div>
                <div className="bubbleImage-container">
                    <img src={Image2} alt="bubble" />
                </div>
            </div>
            <div className="main-right-container">
                <img src={MainImage} alt="happy jobs" />
            </div>
        </div>
    )
}
