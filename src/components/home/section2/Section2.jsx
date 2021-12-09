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
                        <h2>Find your passion and<br/> achieve success</h2>
                        <p>Find a job that suits your interests and talents.<br/>
                            A high Salary is not the top priority.
                            Most importantly,<br/> you can work according to your heart's desire.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
