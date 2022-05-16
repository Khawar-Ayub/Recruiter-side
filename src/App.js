import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatInput from "./components/chat/ChatInput";
import Home from "./components/home/Home";
import Jobs from "./components/jobs/Jobs";
import SignIn from "./components/sign-in-up/SignIn";
import SignUp from "./components/sign-in-up/SignUp";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authUser();
  }, []);

  const authUserAPICall = async () => {
    const response = await axios.get(
      "http://localhost:5000/common/authenticate",
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  };
  const authUser = async () => {
    await authUserAPICall()
      .then((res) => {
        if (res.status === 200) {
          dispatch(login({ email: res.data.decoded.email, isLoggedIn: true }));
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chat" element={<ChatInput />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="*" element={<h1>404: No page found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
