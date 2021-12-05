import React from 'react'
import section2Image from '../../../images/champion.png'
import './section2.css'

export default function Section2() {
    return (
        <div className="section2">
            <div className="section2-container">
                <div className="section2-left-container">
                    <img src={section2Image} alt="champion" />
                </div>
                <div className="section2-right-container">
                    <div className="section2-right-wrapper">
                        <h2></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
