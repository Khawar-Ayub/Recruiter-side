import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";
import UpdateJobImage from "../../../images/postjob.jpg";
import "./job-post-delete-update.css";
import Cookies from "js-cookie";

export default function UpdateJob({jobTitle,jobDescription,jobLocation,experienceRequired,workLevel,employmentType,id}) {
  
  var [error, seterror] = useState();
  var [message, setmessage] = useState();
  const navigate = useNavigate();
  const [refresh,setRefresh] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = async (data) => {
      await axios
        .put(`http://13.232.134.204:5000/job/updateJob/${id}`, data, {
          headers: {
            "x-access-token": Cookies.get("accessTokenRecruiter")
          }})
        .then((res) => {
          if (res.status >= 200 && res.status <= 299) {
            setRefresh(!refresh);
            setmessage(res.data.message);
          } else {
            seterror(res.data.message);
          }
        })
        .catch((err) => {
          seterror(err.response.data.message);
        });
  };

  return (
    <div className="update-job">
      {/* <Header/> */}
      {message && (
        <div className="success-message">
          <div className="success-message-container">
            <div className="success-message-top-wrapper">
            <BsCheckCircle size={80} />
              <div>SUCCESS</div>
            </div>
            <div className="success-message-bottom-wrapper">
            {message}
            </div>
          </div>
        </div>
      )}
      <div className="update-job-left-container">
        <div className="update-job-left-wrapper">
          <h1>Update A Job</h1>
          <p>Best, brilliant and deserving employees are just one step ahead!</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="error-messages">{error}</div>
            <label className="form-label">
              Job Title<span>* </span>
            </label>
            <span className="error-messages">
              {errors.jobTitle && errors.jobTitle.type === "required" && (
                <span>This field is required</span>
              )}
              {errors.jobTitle && errors.jobTitle.type === "pattern" && (
                <span>Enter a valid jobTitle</span>
              )}
            </span>
            <input
              id="jobTitle"
              placeholder="Enter Job Title"
              // value={jobTitle}
              {...register("jobTitle")}
            />
            <label className="form-label">
              Job Description<span>* </span>
            </label>
            <span className="error-messages">
              {errors.jobDescription && errors.jobDescription.type === "required" && (
                <span>This field is required</span>
              )}
              {errors.jobDescription && errors.jobDescription.type === "minLength" && (
                <span>
                  jobDescription is too short, minimum 10 words required{" "}
                </span>
              )}
            </span>
            <input
              id="jobDescription"
              placeholder="Enter Job Description"
              // value={jobDescription}
              {...register("jobDescription", { minLength: 60 })}
            />
            <label className="form-label">
              Job Location<span>* </span>
            </label>
            <span className="error-messages">
              {errors.jobLocation &&
                errors.jobLocation.type === "required" && (
                  <span>This field is required</span>
                )}
            </span>
            <input
              id="jobLocation"
              placeholder="Enter Job Location"
              // value={jobLocation}
              {...register("jobLocation")}
            />
            
            <label className="form-label">
              Experience Required<span>* </span>
            </label>
            <span className="error-messages">
              {errors.experienceRequired && errors.experienceRequired.type === "required" && (
                <span>This field is required</span>
              )}
            </span>
            <input
              id="experienceRequired"
              placeholder="Enter the Required Experience"
              // value={experienceRequired}
              {...register("experienceRequired")}
            />

            <label className="form-label">
              Work Level<span>* </span>
            </label>
            <span className="error-messages">
              {errors.workLevel && errors.workLevel.type === "required" && (
                <span>This field is required</span>
              )}
            </span>
            <input
              id="workLevel"
              placeholder="Enter Work Level"
              // value={workLevel}
              {...register("workLevel")}
            />

            <label className="form-label">
              Employment Type<span>* </span>
            </label>
            <span className="error-messages">
              {errors.employmentType && errors.employmentType.type === "required" && (
                <span>This field is required</span>
              )}
            </span>
            <input
              id="employmentType"
              placeholder="Enter the Employment Type"
              // value={employmentType}
              {...register("employmentType")}
            />  

            <input id="updatejob-submit" type="submit" value="Update Job" />
          </form>

        </div>
      </div>
      <div className="update-job-right-container">
        <div className="update-job-right-wrapper">
          <img src={UpdateJobImage} alt="Update Job" />
        </div>
      </div>
    </div>
  );
}
