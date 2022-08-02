import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { login } from "../../../action";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Profile from '../../../images/avatar.jpg';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { logout } from "../../../action";
import './nav-side-bar.css';
import Cookies from "js-cookie";

export default function NavSidebar() {
    const [error, seterror] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
  } = useForm();
    const handleLogout = async () => {
        Cookies.remove("accessTokenRecruiter");
        navigate('/');
      };
  return (
    <>
        <div className="recruiter-nav-sidebar-sidebar">
            <div className="recruiter-nav-sidebar-logo-details">
            <i className='bx bxl-c-plus-plus'></i>
            <span className="recruiter-nav-sidebar-logo_name">WeHire</span>
            </div>
            <ul className="recruiter-nav-sidebar-nav-links">
                <li>
                <Link to="/dashboardrecruiter" className="recruiter-nav-sidebar-active">
                    <i className='bx bx-grid-alt' ></i>
                    <span className="recruiter-nav-sidebar-links_name">Dashboard</span>
                </Link>
                </li>
                <li>
                <Link to="/jobsnew">
                    <i className='bx bx-box' ></i>
                    <span className="recruiter-nav-sidebar-links_name">Jobs</span>
                </Link>
                </li>
                <li>
                <Link to="/questionpool">
                    <i className='bx bx-list-ul' ></i>
                    <span className="recruiter-nav-sidebar-links_name">Questions</span>
                </Link>
                </li>
                <li>
                <Link to="/test">
                    <i className='bx bx-pie-chart-alt-2' ></i>
                    <span className="recruiter-nav-sidebar-links_name">Test</span>
                </Link>
                </li>
                <li>
                <Link to="#">
                    <i className='bx bx-message' ></i>
                    <span className="recruiter-nav-sidebar-links_name">Messages</span>
                </Link>
                </li>
                <li>
                <Link to="/updateprofile">
                    <i className='bx bx-cog' ></i>
                    <span className="recruiter-nav-sidebar-links_name">Update Profile</span>
                </Link>
                </li>
                <li className="recruiter-nav-sidebar-log_out">
                <Link onClick={handleLogout} to="#">
                    <i className='bx bx-log-out'></i>
                    <span  className="recruiter-nav-sidebar-links_name">Log out</span>
                </Link>
                </li>
            </ul>
        </div>
        <section className="recruiter-nav-sidebar-home-section">
        <nav>
            <div className="recruiter-nav-sidebar-sidebar-button">
                <i className='bx bx-menu sidebarBtn'></i>
                {/* <span className="recruiter-nav-sidebar-dashboard">Dashboard</span> */}
            </div>
             <div className="recruiter-nav-sidebar-search-box">
                <h1>RECRUITER PANEL</h1>
                {/* <input type="text" placeholder="Search..."/> */}
                {/* <i className='bx bx-search' ></i> */}
            </div>
            <div className="recruiter-nav-sidebar-profile-details">
                <img src={Profile}/>
                <span className="recruiter-nav-sidebar-recruiter_name">Khawar Ayub</span>
                <i className='bx bx-chevron-down' ></i>
            </div>
            </nav>
        </section>
    </>
  )
}
