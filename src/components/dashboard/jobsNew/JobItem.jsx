import React,{useState} from 'react'

export default function JobItem(props) {
 
    return (
        <div className="container-sm" style={{width: "75%"}}>
          <div className="my-3">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title" style={{color: "#2c6f8b"}}>
                    {props.jobTitle}
                </h3>
                <h3>
                  <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left: '90%', zIndex: '1'}}>
                    {props.jobLocation}
                  </span>
                </h3>
                <p className="card-text">{props.jobDescription}...</p>
                <p className="card-text">
                  <small className="text-muted" >
                    <h6>Experience Required:</h6><p className='my-sm'>{props.experienceRequired}</p>
                    <h6>Work Level:</h6><p className='my-sm'>{props.workLevel}</p>
                    <h6>Employment Type:</h6><p className='my-sm'>{props.employeementType}</p>
                  </small>
                  <small className="text-muted " style={{display: "flex", fontStyle: 'italic', fontWeight: "bold"}}>
                    Created At{" "}{props.createdAt}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
