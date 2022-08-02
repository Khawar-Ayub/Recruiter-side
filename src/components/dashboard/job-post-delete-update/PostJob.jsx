import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";
import PostJobImage from "../../../images/postjob.jpg";
import "./job-post-delete-update.css";
import Cookies from "js-cookie";
import NavSidebar from "../nav-sidebar/NavSidebar";

export default function PostJob() {
  var [error, seterror] = useState();
  var [message, setmessage] = useState();
  const [tests, setTests] = useState();
  const navigate = useNavigate();
  const [refresh,setRefresh] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // GET ALL TESTS
  const getAllTests = async () => {
    
      await axios
        .get(`http://13.232.134.204:5000/test/allTests`, {
          headers: {
            "x-access-token": Cookies.get("accessTokenRecruiter")
          }})
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.data)
            setTests(res.data.data);
          } else {
            seterror(res.data.message);
          }
        })
        .catch((err) => {
          seterror(err.response.data.message);
        });
      toggleButtonIsChecked();
  };
  // CREATE JOB
  const onSubmit = async (data) => {
    await axios
        .post(`http://13.232.134.204:5000/job/createJob`, data,{
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

  
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        navigate("/jobsnew");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpenPostJob, setIsOpenPostJob] = useState(true);

  const togglePopupPostJob = () => {
    setIsOpenPostJob(!isOpenPostJob);
  }

  const toggleButtonIsChecked = () => {
    setIsChecked(!isChecked);
  }

  return (
    <>
    <NavSidebar/>
    <div className="post-job-page">
    {isOpenPostJob && 
        
    <div className="post-job">
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
      <div className="post-job-left-container">
        <div className="post-job-left-wrapper">
          <h1>Post Job</h1>
          <p>Best, brilliant and deserving employees are just one step ahead!</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="error-messages">{error}</div>
            {/*                              WORK FOR QUIZ                */}
            {/*                              WORK FOR QUIZ                */}
            {/*                              WORK FOR QUIZ                */}
            {/*                              WORK FOR QUIZ                */}
          <label className="form-label">
              Take Test<span>? </span>
            </label>
            <input
            style={{marginLeft: '3%'}}
              id="postJobTakeTest"
              type="checkbox"
              onClick={getAllTests}
              {...register("postJobTakeTest")}
            />  

          {isChecked &&
            <>
            <hr/>
              <label className="form-label" style={{width: '100%'}}>
                Select From Existing Tests<span>*</span>
              </label>
              
              <select id="postJobExistingTests">
                {tests?.map((test,index)=>(
                  <option id="postJobExistingTests-options" key={index} value={test.testName}>{test.testName}</option>
                  ))}
              </select>
              <h3>
                <span>or</span>
              </h3>
                
              <Link
                id="jobpost-createtest"
                type="button"
                // value="Create Test"
                to={'/addtest'}
                {...register("createTest")}
              >  Create Test</Link>
            </>
          }
          {/*                                          QUIZ WORK END                               */}
            <hr/>
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
              {...register("jobTitle", { required: true})}
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
            <textarea
              id="jobDescription"
              placeholder="Enter Job Description"
              {...register("jobDescription", { required: true, minLength: 60 })}
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
              {...register("jobLocation", { required: true})}
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
              {...register("experienceRequired", { required: true})}
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
              {...register("workLevel", { required: true})}
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
              {...register("employmentType", { required: true})}
            />  
            <input id="postjob-submit" className="recruiter-postjob-close-icon"  type="submit" value="Post Job" />
          </form>

        </div>
      </div>
      <div className="post-job-right-container">
        <div className="post-job-right-wrapper">
          <img src={PostJobImage} alt="postjob" />
        </div>
      </div>
    </div>
}
</div>
</>
  );
}
