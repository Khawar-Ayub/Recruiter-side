import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import NavSidebar from '../dashboard/nav-sidebar/NavSidebar';
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './applicants.css';

export default function () {

    const [refresh,setRefresh] = useState(false);
    //  GET AL APPLICANTS BY JOB ID
    const [applicants, setApplicants] = useState([]);
    const [error, seterror] = useState();
    
  const getAllApplicantsById = async (id) => {
    
    // console.log("Moiz Khan");
        await axios
      .get(`http://13.232.134.204:5000/jobApply/getApplicants/${id}`,{
        headers: {
          "x-access-token": Cookies.get("accessTokenRecruiter")
        }})
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setApplicants(res.data.jobApplies);
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
  const {id}=useParams();
  useEffect(() => {
    getAllApplicantsById(id);
  }, [refresh]);
      const styleLink ={
        fontFamily:'sans-serif',
        borderRadius: '4px',
        textAlign: 'center',
        padding: '3% 20% 3% 20%',
        fontSize: '18px',
        textDecoration: 'none',
        color: 'white',
        backgroundColor: '#04AA6D'
      }
  return (
    <>
        <NavSidebar/>
        <div className='container applicants-container'>
            <h1>Applicants</h1>
            <table id="applicants-table">
                <thead>
                    <tr>
                        <th>Email ID</th>
                        <th>CV</th>
                        <th>Ranking Score</th>
                    </tr>
                </thead>
                <tbody>
                {applicants?.map((element,index)=>(
                    <tr key={index}>
                        <td>{element.user.email}</td>
                        <td><a target='_blank' href={`http://13.232.134.204:5000/public/uploads/${element.cv.CV}`}>View</a></td>
                        <td>{element.score}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}
