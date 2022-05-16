import React from "react";
import { Link } from "react-router-dom";
import "./jobItemDetails.css";

export default function JobItemDetails(props) {
  const founded = (date) => {
    const dateSplit = date.split("T");
    const res = dateSplit[0];
    return res;
  };
  return (
    <div className="job-item-details">
      <div className="job-item-details-container">
        <h1 className="job-title">{props.jobTitle}</h1>
        <div className="job-item-details-section1">
          <span>
            <h2>{props.location}</h2>
          </span>
          <span>
            <h2 className="applicants">10 Applicants</h2>
            <h2>&#183;</h2>
            <h2>Posted {props.postDate} days ago</h2>
          </span>
        </div>

        <div className="job-item-details-section2">
          <div>
            <span>
              <h2>Experience</h2>
              <h3>{props.experience}</h3>
            </span>
          </div>
          <div>
            <span>
              <h2>Work Level</h2>
              <h3>{props.workLevel}</h3>
            </span>
          </div>
          <div>
            <span>
              <h2>Employee Type</h2>
              <h3>{props.employeeType}</h3>
            </span>
          </div>
        </div>

        <div className="job-item-details-section3">
          <Link to="" className="apply-button">
            Apply Now
          </Link>
        </div>

        <div className="job-item-details-section4">
          <h1>Job Description</h1>
          <p>{props.jobDescription}</p>
        </div>

        <div className="job-item-details-section5">
          <h1>About the Company</h1>
          <p>
            {props.companyName}
            <br />
            {props.aboutCompany}
            <br />
            <br />
            <b>Total Employees: </b>
            {props.totalEmployees}
            <br />
            <b>Founded: </b>
            {founded(props.CCDate)}
          </p>
        </div>
      </div>
    </div>
  );
}
