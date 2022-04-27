import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";
import JobItem from "./common/jobItem/JobItem";
import JobItemDetails from "./common/jobItemDetails/JobItemDetails";
import "./jobs.css";
import Autocomplete from "react-google-autocomplete";

export default function Jobs() {
  const apiKey = "AIzaSyCOyRCqXd6qcPVub0azaVmaHs4WcIhiTHA";
  const [error, seterror] = useState();
  const [jobs, setJobs] = useState([]);
  const [Searchjob, setSearchJob] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const getAllJobs = async () => {
    const response = await axios
      .get(`http://localhost:5000/recruiter/jobs/alljobs`)
      .then((res) => {
        if (res.status === 200) {
          setJobs(res.data);
          setSearchJob(res.data);
          handleJobClick(res.data[0]);
          console.log(res.data);
        } else {
          seterror(res.data.message);
        }
      })
      .catch((err) => {
        //seterror(err.response.data.message);
      });
  };
  const handleJobClick = (job) => {
    setJobDetails(job);
  };
  const jobDate = (postDate) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    //extracting date from postDate
    if (postDate) {
      let postDateSplit = postDate.split("T");
      let postDateArray = postDateSplit[0];
      let postDateArraySplit = postDateArray.split("-");
      let postDateYear = postDateArraySplit[0];
      let postDateMonth = postDateArraySplit[1];
      let postDateDay = postDateArraySplit[2];
      //subtrackng today's date from postDate
      let postDateYearSubtract = yyyy - postDateYear;
      let postDateMonthSubtract = mm - postDateMonth;
      let postDateDaySubtract = dd - postDateDay;
      return postDateDaySubtract;
    }
  };
  const handleSearchTitle = (e) => {
    const searchWord = e.target.value;
    const newData = jobs.filter((item) => {
      return item.jobTitle.toLowerCase().includes(searchWord.toLowerCase());
    });
    setSearchJob(newData);
  };
  const handleSearchLocation = (e) => {
    const searchWord = e.target.value;
    const newData = jobs.filter((item) => {
      return item.location.toLowerCase().includes(searchWord.toLowerCase());
    });
    setSearchJob(newData);
  };
  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <>
      <Header whiteColor={true} />
      <div className="jobs">
        <div className="jobs-container">
          <div className="jobs-search-bar">
            <div className="jobs-search-bar-container">
              <div className="search-by-job">
                <input
                  type="text"
                  id="job-search"
                  placeholder="Job Title, Skills or Company"
                  onChange={handleSearchTitle}
                />
              </div>
              <div className="search-by-location">
                {/* <Autocomplete
                  id="location-search"
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "2px",
                    margin: "0px",
                  }}
                  onPlaceSelected={(place) => {
                    console.log(place);
                  }}
                  types={["(regions)"]}
                  componentRestrictions={{ country: "us" }}
                  onChange={handleSearchLocation}
                /> */}
                <Autocomplete
                  apiKey={apiKey}
                  id="location-search"
                  placeholder="City, State or Zip Code"
                  onPlaceSelected={(place) => {
                    console.log(place);
                  }}
                />
                {/* <input
                  type="text"
                  id="location-search"
                  placeholder="City, State or Zip Code"
                  onChange={handleSearchLocation}
                /> */}
              </div>
              <button>Search</button>
            </div>
          </div>

          <div className="jobs-list">
            <div className="jobs-list-container">
              <div className="jobs-list-left">
                {Searchjob.map((job, index) => (
                  <div key={index} onClick={() => handleJobClick(job)}>
                    <JobItem
                      jobTitle={job.jobTitle}
                      companyName={job.companyName}
                      location={job.location}
                      workLevel={job.workLevel}
                      employeeType={job.employeeType}
                      postDate={jobDate(job.postDate)}
                    />
                  </div>
                ))}
              </div>
              <div className="jobs-list-right">
                <JobItemDetails
                  jobTitle={jobDetails.jobTitle}
                  jobDescription={jobDetails.jobDescription}
                  location={jobDetails.location}
                  companyName={jobDetails.companyName}
                  experience={jobDetails.experience}
                  workLevel={jobDetails.workLevel}
                  employeeType={jobDetails.employeeType}
                  totalEmployees={jobDetails.totalEmployees}
                  CCDate={jobDetails.CCDate}
                  aboutCompany={jobDetails.aboutCompany}
                  postDate={jobDate(jobDetails.postDate)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
