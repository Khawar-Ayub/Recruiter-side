import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatInput from "./components/chat/ChatInput";
import Home from "./components/home/Home";
// import Jobs from "./components/jobs/Jobs";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import PostJob from "./components/dashboard/job-post-delete-update/PostJob";
import UpdateJob from "./components/dashboard/job-post-delete-update/UpdateJob";
import JobItem from "./components/dashboard/jobsNew/JobItem";
import Jobs from "./components/dashboard/viewJobs/Jobs";
import DeleteJob from "./components/dashboard/job-post-delete-update/DeleteJob"
import Wait from "./components/sign-in-up/Wait";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./action";
// import RecruiterDashboard from "./components/recruiterDashboard/RecruiterDashboard";
import QuestionItem from "./components/dashboard/questionPool/QuestionItem";
import AddQuestion from "./components/dashboard/questionPool/AddQuestion";
import UpdateQuestion from "./components/dashboard/questionPool/UpdateQuestion";
import DeleteQuestion from "./components/dashboard/questionPool/DeleteQuestion";
import QuestionPool from "./components/dashboard/questionPool/QuestionPool";
import Quiz from "./components/dashboard/quiz/Quiz";
import DashboardRecruiter from "./components/dashboard/dashboardRecruiter/DashboardRecruiter";
import JobsNew from "./components/dashboard/jobsNew/JobsNew";
import NavSidebar from "./components/dashboard/nav-sidebar/NavSidebar";
import Applicants from "./components/applicants/Applicants";
import Test from "./components/dashboard/test/Test";
import AddTest from "./components/dashboard/test/AddTest";
import ViewTest from "./components/dashboard/test/ViewTest";
import RecruiterSignUp from "./components/sign-in-up/RecruiterSignUp";
import RecruiterSignIn from "./components/sign-in-up/RecruiterSignIn";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authRecruiter();
  }, []);

  const authRecruiterAPICall = async () => {
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
  const authRecruiter = async () => {
    await authRecruiterAPICall()
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
        {/* <Route path="/jobs" element={<Jobs />} /> */}

        <Route path="/recruitersignup" element={<RecruiterSignUp />} />
        <Route path="/recruitersignin" element={<RecruiterSignIn />} />
        <Route path="/chat" element={<ChatInput />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="*" element={<h1>404: No page found</h1>} />
        <Route path="/wait" element={<Wait />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/updatejob" element={<UpdateJob />} />
        <Route path="/jobitem" element={<JobItem />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/deletejob" element={<DeleteJob />} />
        <Route path="/questionitem" element={<QuestionItem />} />
        <Route path="/addquestion" element={<AddQuestion />} />
        <Route path="/updatequestion" element={<UpdateQuestion />} />
        <Route path="/deletequestion" element={<DeleteQuestion />} />
        <Route path="/questionpool" element={<QuestionPool />} />
        {/* DASHBOARD RECRUITER */}
        <Route path="/dashboardrecruiter" element={<DashboardRecruiter />} />
        <Route path="/navsidebar" element={<NavSidebar />} />
        <Route path="/jobsnew" element={<JobsNew />} />
        <Route path="/applicants/:id" element={<Applicants />} />
        <Route path="/test" element={<Test />} />
        <Route path="/addtest" element={<AddTest />} />
        <Route path="/viewtest" element={<ViewTest />} />
        <Route path="/quiz" element={<Quiz />} />
        {/* <Route path="/applicants/:id" element={<JobsNew/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
