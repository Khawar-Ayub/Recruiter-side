import React from 'react'
import './section1.css'
import section1Image from '../../../images/hero.png'
import Image2 from '../../../images/bubble.png'
import { Link } from 'react-router-dom'

export default function Section1() {
    return (
        <div className="section1">
            <div className="section1-left-container">
                <div className="section1-left-box">
                    <div className="section1-left-wrapper">
                        <h1>Your Passion Begins Here !</h1>
                        <p>Join Millions Other in the Future of Work,<br/>
                        The easiest way to get your new job.</p>
                        <div className="section1-search-bar">
                            <input type="text" id="search" placeholder="Job Title, Keywords or Company" />
                            <Link to="#">Search</Link>
                        </div>
                    </div>
                </div>
                <div className="bubbleImage-container">
                    <img src={Image2} alt="bubble" />
                </div>
            </div>
            <div className="section1-right-container">
                <img src={section1Image} alt="happy jobs" />
            </div>
        </div>
    )
}
