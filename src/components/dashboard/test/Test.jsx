import React from 'react'
import { useState } from 'react';
import NavSidebar from '../nav-sidebar/NavSidebar'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


import './test.css';

export default function Test() {
    let recruiterTests = {testName: "Game Development Technologies Test"}
    //  GET AL JOBS
    const [jobs, setJobs] = useState([]);
    const [error, seterror] = useState();
  const getAllJobs = async () => {
    
    // console.log("Moiz Khan");
        await axios
      .get(`http://13.232.134.204:5000/job/viewRecruiterJobs`,{
        headers: {
          "x-access-token": Cookies.get("accessTokenRecruiter")
        }})
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setJobs(res.data.jobs);
          console.log(res.data);
        } else {
          seterror(res.data.message);
        }
      })
      .catch((err) => {
        // seterror(err.response.data.message);
        console.log(err);
      });
      console.log("Moiz Khan");
  };



    const styleLink ={
        fontFamily:'sans-serif',
        borderRadius: '4px',
        textAlign: 'center',
        padding: '2% 7% 2% 7%',
        fontSize: '17px',
        textDecoration: 'none',
        color: 'white',
        marginRight: '6%'
    }
    const styleAddTest ={
        fontFamily:'sans-serif',
        borderRadius: '4px',
        border: 'none',
        textAlign: 'center',
        padding: '1% 3% 1% 3%',
        fontSize: '17px',
        textDecoration: 'none',
        color: 'white',
        backgroundColor: '#91B7E1',
        float: 'right',
        margin: '-4% 0% 3% 0%'
    }
  return (
    <>
        <NavSidebar/>
        <div className='container recruiter-test-container'>
            <h1 style={{margin: '3% 2% 0% 0%'}}>Test</h1>
            <Link style={styleAddTest} to="/addtest">Add Test</Link>

            <table id="recruiter-test-table">
                <tr>
                    <th>Sr.</th>
                    <th>Test Name</th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <td><ol><li style={{position: 'center'}}></li></ol></td>
                    <td>{recruiterTests.testName}</td>
                    <td>
                        <Link style={styleLink} className="btn btn-success" to="/viewtest">View</Link>
                        <Link style={styleLink} className="btn btn-info" to="">Update</Link>
                        <Link style={styleLink} className="btn btn-danger" to="">Delete</Link>
                    </td>
                </tr>
            </table>
        </div>
    </>
  )
}
