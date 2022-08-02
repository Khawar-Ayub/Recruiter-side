import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";
import SignupImage from "../../images/signupImage.svg";
import "./recruiter-sign-in-up.css";
import Header from "../header/Header";

export default function RecruiterSignUp() {
  var [error, seterror] = useState();
  var [message, setmessage] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = async (data) => {
    seterror(null);
    if (data.password !== data.confirmPassword) {
      seterror("Password and Confirm Password does not match");
    } else {
      await axios
        .post(`http://13.232.134.204:5000/recruiter/register`, data)
        .then((res) => {
          if (res.status === 201) {
            setmessage(res.data.message);
          } else {
            seterror(res.data.message);
          }
        })
        .catch((err) => {
          seterror(err.response.data.message);
        });
    }
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        navigate("/recruitersignin");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="recruiter-sign-up">
      <Header/>
      {message && (
        <div className="recruiter-success-message">
          <div className="recruiter-success-message-container">
            <div className="recruiter-success-message-top-wrapper">
            <BsCheckCircle size={80} />
              <div>SUCCESS</div>
            </div>
            <div className="recruiter-success-message-bottom-wrapper">
            {message}
            </div>
          </div>
        </div>
      )}
      <div className="recruiter-sign-up-left-container">
        <div className="recruiter-sign-up-left-wrapper">
          <h1>Sign Up</h1>
          <p>Join And Grow Old With Us</p>
          <div className="recruiter-google-sign-in">
            <Link to="">
              <FcGoogle className="recruiter-FcGoogle" /> Sign in with Google
            </Link>
          </div>
          <h3>
            <span>or Sign up with Email</span>
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="recruiter-error-messages">{error}</div>
            <label className="recruiter-form-label">
              Email<span>* </span>
            </label>
            <span className="recruiter-error-messages">
              {errors.email && errors.email.type === "required" && (
                <span>This field is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span>Enter a valid email</span>
              )}
            </span>
            <input
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            <label className="recruiter-form-label">
              Password<span>* </span>
            </label>
            <span className="recruiter-error-messages">
              {errors.password && errors.password.type === "required" && (
                <span>This field is required</span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span>
                  Password is too short, minimum 8 characters required{" "}
                </span>
              )}
            </span>
            <input
              id="password"
              type={"password"}
              placeholder="Enter new password"
              {...register("password", { required: true, minLength: 8 })}
            />
            <label className="recruiter-form-label">
              Confirm Password<span>* </span>
            </label>
            <span className="recruiter-error-messages">
              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <span>This field is required</span>
                )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "minLength" && (
                  <span>
                    Password is too short, minimum 8 characters required{" "}
                  </span>
                )}
            </span>
            <input
              id="confirmPassword"
              type={"password"}
              placeholder="Re-enter password"
              {...register("confirmPassword", { required: true, minLength: 8 })}
            />
            {/*  */}
            
            <label className="recruiter-form-label">
              Company Name<span>* </span>
            </label>
            <span className="recruiter-error-messages">
              {errors.companyName && errors.companyName.type === "required" && (
                <span>This field is required</span>
              )}
            </span>
            <input
              id="companyName"
              placeholder="Enter your company name"
              {...register("companyName", { required: true})}
            />

            <label className="recruiter-form-label">
              Company Description<span>* </span>
            </label>
            <span className="recruiter-error-messages">
              {errors.companyDescription && errors.companyDescription.type === "required" && (
                <span>This field is required</span>
              )}
            </span>
            <input
              id="companyDescription"
              placeholder="Enter your company Description"
              {...register("companyDescription", { required: true})}
            />

            <label className="recruiter-form-label">
              Total Employees<span>* </span>
            </label>
            <span className="recruiter-error-messages">
              {errors.totalEmployees && errors.totalEmployees.type === "required" && (
                <span>This field is required</span>
              )}
            </span>
            <input
              id="totalEmployees"
              type="number"
              placeholder="Enter total number of employees"
              {...register("totalEmployees", { required: true})}
            />  

            <label className="recruiter-form-label">
              Company Creation Date<span>* </span>
            </label>
            <span className="recruiter-error-messages">
              {errors.founded && errors.founded.type === "required" && (
                <span>This field is required</span>
              )}
            </span>
            <input
              id="founded"
              type="date"
              placeholder="Enter company's creation date"
              {...register("founded", { required: true})}
            />  

            <div className="recruiter-terms">
              <label className="recruiter-terms-checkbox">
                <input type="checkbox" />I agree to the Terms & Conditions
              </label>
            </div>
            <input id="signup-submit" type="submit" value="Sign Up" />
          </form>

          <p className="recruiter-already-registered">
            Already have an Account?
            <Link to="/signin"> Sign in</Link>
          </p>
        </div>
      </div>
      <div className="recruiter-sign-up-right-container">
        <div className="recruiter-sign-up-right-wrapper">
          <img src={SignupImage} alt="signup" />
        </div>
      </div>
    </div>
  );
}
