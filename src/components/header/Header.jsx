import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import { CgMenuRight } from "react-icons/cg";

export default function Header() {
    return (
        <div className="header">
            <div className="header-left-container">
                <h1>WeHire</h1>
            </div>
            <div className="header-right-container">
                <div className="header-right-wrapper">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/jobs">Jobs</Link>
                        </li>
                        <li>
                            <Link to="/register">Join Now</Link>
                        </li>
                        <li>
                            <Link to="#" className="signin-button">Sign In</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="menu-bar">
                <CgMenuRight cursor="pointer"/>
            </div>
        </div>
    )
}
