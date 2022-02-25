import React from "react";
import "./jobItem.css";

export default function JobItem(props) {
  return (
    <div className="job-item">
      <div className="job-item-container">
        <div className="job-item-details-top">
          <div className="job-thumbnail">
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Company Logo"
            />
          </div>
          <div className="job-info">
            <h1>{props.jobTitle}</h1>
            <h2>TechFlickers</h2>
            <h2>Islamabad, Pakistan</h2>
          </div>
        </div>

        <div className="job-item-details-bottom">
          <div className="job-item-details-bottom-container">
            <div className="job-types">
              <h2>On-site</h2>
              <h2>Entry Level</h2>
            </div>
            <div className="job-time-applicants">
              <h2 id="applicants">10 Applicants</h2>
              <h2>&#183;</h2>
              <h2 className="job-days">2d</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
