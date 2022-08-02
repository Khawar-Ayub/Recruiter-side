import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './jobsnew.css';
import { useState } from 'react';
import { useEffect } from 'react';
import '../viewJobs/Jobs';
import JobItem from './JobItem';
import UpdateJob from '../job-post-delete-update/UpdateJob';
import axios from "axios";
import NavSidebar from '../nav-sidebar/NavSidebar';
import PostJob from '../job-post-delete-update/PostJob';
import Cookies from 'js-cookie';

export default function JobsNew() {
  const [selectedJob, setSelectedJob] = useState();
  const [error, seterror] = useState();
  const [jobs, setJobs] = useState([]);
  const [refresh,setRefresh] = useState(false);

  // VIEW JOB
  const viewJob =(element)=>{
    setSelectedJob(element);
    togglePopupView();
  }
  //  UPDATE JOB
  const updateJob =(element)=>{
    setSelectedJob(element);
    togglePopupUpdate();
  }
//  GET AL JOBS
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
  useEffect(() => {
    getAllJobs();
  }, [refresh]);

  // POPUP
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const togglePopupView = () => {
    setIsOpenView(!isOpenView);
  }
  const togglePopupUpdate = () => {
    setIsOpenUpdate(!isOpenUpdate);
  }
  
  // DELETE JOB
  
    const deleteJob = async (id) =>
    {
      const response = await axios
      .delete(`http://13.232.134.204:5000/job/deleteJob/${id}`)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setRefresh(!refresh);
        } else {
          seterror(res.data.message);
        }
      })
      .catch((err) => {
        seterror(err.response.data.message);
      });
        // getAllJobs();
    }
    const styleLink ={
      fontFamily:'sans-serif',
      borderRadius: '4px',
      textAlign: 'center',
      padding: '5% 15% 6% 15%',
      fontSize: '17px',
      textDecoration: 'none',
      color: 'white',
      backgroundColor: '#218838'
    }
    const styleAddJob ={
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
    <div className='container recruiter-job-container'>
    <h1 style={{margin: '3% 2% 0% 0%'}}>Jobs</h1>
    <Link style={styleAddJob} to="/postjob">Add Job </Link>
 
<table id="recruiter-job-table">
  <thead>
    <tr>
      <th>Job Title</th>
      <th>Job Description</th>
      <th>Job Location</th>
      <th>Required Experience</th>
      <th>Work Level</th>
      <th>Employment Type</th>
      <th>Applicants</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {jobs?.map((element,index)=>(
    <tr key={index}>
      <td>{element.jobTitle}</td>
      <td>{element.jobDescription.slice(0, 30)}....</td>
      <td>{element.jobLocation}</td>
      <td>{element.experienceRequired}</td>
      <td>{element.workLevel}</td>
      <td>{element.employmentType}</td>
      <td>
        <button><Link style={styleLink} to={`/applicants/${element.id}`}>View</Link></button>
      </td>
      <td>
        <button onClick={()=>viewJob(element)} style={{marginRight: '1%',marginLeft: '-2%'}} className="btn-success">View</button>
        <button onClick={()=>updateJob(element)} style={{marginRight: '1%'}} className="btn-primary">Update</button>
        <button onClick={()=>deleteJob(element.id)} className="btn-danger">Delete</button>
      </td> 
    </tr>
   ))}
   </tbody>
  {/* VIEW */}
  <div>
    {isOpenView && 
      <div className="recruiter-job-popup-box">
        <div className="recruiter-job-box">
          <span className="recruiter-job-close-icon" onClick={togglePopupView}>x</span>
          <JobItem
            jobTitle ={selectedJob.jobTitle}
            jobDescription ={selectedJob.jobDescription}
            jobLocation ={selectedJob.jobLocation}
            experienceRequired ={selectedJob.experienceRequired}
            workLevel ={selectedJob.workLevel}
            employmentType ={selectedJob.employmentType}
            createdAt = {selectedJob.createdAt}
          />
        </div>
      </div>
    }
  </div>
  {/* UPDATE */}
  <div>
    {isOpenUpdate && 
      <div className="recruiter-job-popup-box">
        <div className="recruiter-job-box">
          <span className="recruiter-job-close-icon" onClick={togglePopupUpdate}>x</span>
          <UpdateJob 
            jobTitle ={selectedJob.jobTitle}
            jobDescription ={selectedJob.jobDescription}
            jobLocation ={selectedJob.jobLocation}
            experienceRequired ={selectedJob.experienceRequired}
            workLevel ={selectedJob.workLevel}
            employmentType ={selectedJob.employmentType}
            createdAt = {selectedJob.createdAt}
            id={selectedJob.id}
          />
        </div>
    </div>
    }
  </div>
</table>
</div>
</>
  )
}
