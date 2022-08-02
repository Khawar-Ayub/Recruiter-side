import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoginImage from "../../images/loginImage.svg";
import "./recruiter-sign-in-up.css";
import Header from "../header/Header";
import { useDispatch } from "react-redux";
import { login } from "../../action";
import Cookies from "js-cookie";

export default function RecruiterSignIn() {
  const [error, seterror] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post(`http://13.232.134.204:5000/recruiter/login`, data, {
        headers: {
          "x-access-token": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            login({
              email: res.data.data.email,
              id: res.data.data.id,
              isLoggedIn: true,
            })
          );
          Cookies.set("accessTokenRecruiter", res.data.data.token);
          navigate("/dashboardrecruiter");
        } else {
          seterror(res.data.message);
        }
      })
      .catch((err) => {
        // seterror(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="recruiter-sign-in">
      <Header />
      <div className="recruiter-sign-in-left-container">
        <div className="recruiter-sign-in-left-wrapper">
          <h1>Login</h1>
          <p>We Handpick The Best Among The Rest</p>
          <div className="recruiter-google-sign-in">
            <Link to="">
              <FcGoogle className="recruiter-FcGoogle" /> Sign in with Google
            </Link>
          </div>
          <h3>
            <span>or Sign in with Email</span>
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
            </span>
            <input
              id="password"
              type={"password"}
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            {/*errors.password && <span>This field is required</span>*/}
            <div className="recruiter-remember-forgot">
              <label className="recruiter-remember-me-checkbox">
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="">Forgot password?</Link>
            </div>
            <input id="login-submit" type="submit" value="Login" />
          </form>
          <p className="recruiter-not-registered">
            Not registered yet?
            <Link to="/recruitersignup"> Create an Account</Link>
          </p>
        </div>
      </div>
      <div className="recruiter-sign-in-right-container">
        <div className="recruiter-sign-in-right-wrapper">
          <img src={LoginImage} alt="login-image" />
        </div>
      </div>
    </div>
  );
}
