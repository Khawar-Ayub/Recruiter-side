import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../header/Header";
import axios from "axios";
import "./updateProfile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../action";

export default function UpdateProfile() {
  const [error, seterror] = useState();
  const [message, setmessage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        .patch(`http://localhost:5000/user/edituser`, data, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 201) {
            setmessage(res.data.message);
            dispatch(logout());
            navigate("/signin");
          } else {
            seterror(res.data.message);
          }
        })
        .catch((err) => {
          seterror(err.response.data.message);
        });
    }
  };
  return (
    <div className="user-update-profile">
      <Header />
      <div className="user-update-profile-container">
        <div className="user-update-profile-form">
          <h1>Update Profile</h1>
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
            <input id="update-submit" type="submit" value="Update" />
          </form>
        </div>
      </div>
    </div>
  );
}
