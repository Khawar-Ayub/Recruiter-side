import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../header/Header";
import JobItem from "../jobsNew/JobItem";
import "./jobs.css";

export default function Jobs() {
  const [error, seterror] = useState();
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const getAllJobs = async () => {
    const response = await axios
      .get(`http://localhost:5000/job/viewRecruiterJobs`)
      .then((res) => {
        if (res.status === 200) {
          setJobs(res.data);
          handleJobClick(res.data[0]);
          console.log(res.data);
        } else {
          seterror(res.data.message);
        }
      })
      .catch((err) => {
        seterror(err.response.data.message);
      });
  };
  const handleJobClick = (job) => {
    setJobDetails(job);
  };
  useEffect(() => {
    getAllJobs();
  }, []);
  
  return (
    <>
      {/* <Header whiteColor={true}/> */}
      <div className="jobs">
        <div className="jobs-container">
          <div className="jobs-search-bar">
            <div className="jobs-search-bar-container">
              <div className="search-by-job">
                <input
                  type="text"
                  id="job-search"
                  placeholder="Job Title, Skills or Company"
                />
              </div>
              <div className="search-by-location">
                <input
                  type="text"
                  id="location-search"
                  placeholder="City, State or Zip Code"
                />
              </div>
              <button>Search</button>
            </div>
          </div>

          <div className="jobs-list">
            <div className="jobs-list-container">
              <div className="jobs-list-left">
                {jobs.map((job,index) => (
                  <div key={index} onClick={()=>handleJobClick(job)}>
                    <JobItem 
                      jobTitle={job.jobTitle}
                      jobDescription={job.jobDescription} 
                      jobLocation={job.jobLocation} 
                      experienceRequired={job.experienceRequired} 
                      workLevel={job.workLevel} 
                      employmentType={job.employmentType}
                    />
                  </div>
                ))}
              </div>
              <div className="jobs-list-right">
                  <JobItem/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
