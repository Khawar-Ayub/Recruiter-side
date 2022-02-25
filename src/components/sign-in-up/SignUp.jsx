import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";
import SignupImage from "../../images/signupImage.svg";
import "./sign-in-up.css";
import Header from "../header/Header";

export default function SignUp() {
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
        .post(`http://localhost:5000/user/register`, data)
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
        navigate("/signin");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="sign-up">
      <Header/>
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
      <div className="sign-up-left-container">
        <div className="sign-up-left-wrapper">
          <h2>Sign Up</h2>
          <p>Find the right fit for your passion</p>
          <div className="google-sign-in">
            <Link to="">
              <FcGoogle className="FcGoogle" /> Sign in with Google
            </Link>
          </div>
          <h3>
            <span>or Sign up with Email</span>
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="error-messages">{error}</div>
            <label className="form-label">
              Email<span>* </span>
            </label>
            <span className="error-messages">
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
            <label className="form-label">
              Password<span>* </span>
            </label>
            <span className="error-messages">
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
            <label className="form-label">
              Confirm Password<span>* </span>
            </label>
            <span className="error-messages">
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
              id="confirm-password"
              type={"password"}
              placeholder="Re-enter password"
              {...register("confirmPassword", { required: true, minLength: 8 })}
            />
            <div className="terms">
              <label className="terms-checkbox">
                <input type="checkbox" />I agree to the Terms & Conditions
              </label>
            </div>
            <input id="signup-submit" type="submit" value="Sign Up" />
          </form>

          <p className="already-registered">
            Already have an Account?
            <Link to="/signin"> Sign in</Link>
          </p>
        </div>
      </div>
      <div className="sign-up-right-container">
        <div className="sign-up-right-wrapper">
          <img src={SignupImage} alt="signup" />
        </div>
      </div>
    </div>
  );
}
