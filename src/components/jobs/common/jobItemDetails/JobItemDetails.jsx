import React from "react";
import { Link } from "react-router-dom";
import "./jobItemDetails.css";

export default function JobItemDetails(props) {
  return (
    <div className="job-item-details">
      <div className="job-item-details-container">
        <h1 className="job-title">{props.jobTitle}</h1>
        <div className="job-item-details-section1">
          <span>
            <h2>Islamabad, Pakistan</h2>
          </span>
          <span>
            <h2 className="applicants">10 Applicants</h2>
            <h2>&#183;</h2>
            <h2>Posted 2 days ago</h2>
          </span>
        </div>

        <div className="job-item-details-section2">
          <div>
            <span>
              <h2>Experience</h2>
              <h3>Minimum 1 year</h3>
            </span>
          </div>
          <div>
            <span>
              <h2>Work Level</h2>
              <h3>Entry Level</h3>
            </span>
          </div>
          <div>
            <span>
              <h2>Employee Type</h2>
              <h3>Full-Time Job</h3>
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
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            iste quam consequuntur ad molestiae. Saepe impedit earum facilis
            nulla atque libero autem consequuntur pariatur porro omnis! Incidunt
            accusantium beatae nostrum! Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Est, deleniti tempora rem iusto corrupti mollitia
            debitis. Temporibus odio saepe iste perferendis sapiente, nostrum
            quasi voluptatem! Quasi laboriosam ea debitis unde? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Cumque rem harum facere
            ipsum necessitatibus recusandae, dolorum corporis eum quisquam
            temporibus ab iure consequatur non pariatur ad alias quae
            perferendis facilis.
          </p>
        </div>
      </div>
    </div>
  );
}
