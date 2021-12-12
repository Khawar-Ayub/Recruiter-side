import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import { CgMenuRight } from "react-icons/cg";
import logo from "../../images/logo.png"

export default function Header() {
    const [header, setHeader] = useState("header");
    const listenScrollEvent = () => {
        window.scrollY > 10
          ? setHeader("header2")
          : setHeader("header");
      }
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      window.addEventListener("scroll", listenScrollEvent)
      return () =>
        window.removeEventListener('scroll', listenScrollEvent);
    },[])
    return (
        <div className={header}>
            <div className="header-left-container">
                <img src={logo} alt="WeHire" />
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
                            <Link to="/signup">Join Now</Link>
                        </li>
                        <li>
                            <Link to="/signin" className="signin-button">Sign In</Link>
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
