import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavSidebar from '../nav-sidebar/NavSidebar'
import AddQuestion from "../questionPool/AddQuestion";
import axios from "axios";
import Cookies from "js-cookie";

import './addtest.css';

export default function AddTest(props) {
    // QUESTIONPOOL AREA
  // POPUP
  const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false);

  const togglePopupAddQuestion = () => {
    setIsOpenAddQuestion(!isOpenAddQuestion);
  }
  const styleAddQuestion ={
    float: 'right'
  }

//   QUESTIONITEM AREA

     // VIEW QUESTION
     const [selectedQuestion, setSelectedQuestion] = useState();
    const viewQuestion =(element)=>{
    setSelectedQuestion(element);
  }
     //  GET ALL QUESTIONS
    const [questions, setQuestions] = useState([]);
    const getAllQuestions = async () => {
    
    // console.log("Moiz Khan");
        await axios
      .get(`http://13.232.134.204:5000/questions/viewMyQuestions`,{
        headers: {
          "x-access-token": Cookies.get("accessTokenRecruiter")
        }})
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setQuestions(res.data.data);
          console.log(res.data);
        } else {
          seterror(res.data.message);
        }
      })
      .catch((err) => {
        // seterror(err.response.data.message);
        console.log(err);
      });
      console.log("Khawar Khan");
  };
  // useEffect(() => {
  //   getAllQuestions();
  // }, [refresh]);
  useEffect(() => {
    getAllQuestions();
  });

//   PAGE AREA
  const h1Style ={
    color: '#2c6f8b',
    fontWeight: 'bold',
    float: 'left'
  }
//   ADDTEST AREA
const [error, seterror] = useState();
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {}

  const [optionList, setOptionList] = useState([]);
  return (
    <>
        <NavSidebar/>
        {/* QUESTIONPOOL AREA */}
        <div className='addtest-float-container'>
            <div className='addtest-float-child'>
                    <h1 style={h1Style}>Question</h1>
                    <div>
                        <button style={styleAddQuestion} onClick={togglePopupAddQuestion} className="btn-addquestion">Add Question</button>
                        {isOpenAddQuestion && 
                            <div className="addtest-question-popup-box">
                                <div className="addtest-question-box">
                                    <span onClick={togglePopupAddQuestion} className="addtest-question-close-icon" >x</span>
                                    <AddQuestion/>
                                </div>
                            </div>
                        }
                    </div>
                    {/* QUESTIONITEM AREA */}
                    {questions.map((singleOption, index) =>(
                    <div className="questionitem-area" style={{marginTop: '10%', border: '1px solid grey', padding: '20px'}}>
                        <h3 className="" style={{color: "#2c6f8b"}}>
                            {singleOption.question}
                        </h3>
                        <ol>
                         {singleOption.questionOptions.map((item, index)=>(
                           <li key={index} className="card-text text-muted">  {item.option}</li>
                          ))}
                        </ol>
                        <p style={{fontStyle: 'italic'}}>Category: {singleOption.category}</p>
                        <p style={{color: 'chocolate'}}>Difficulty Level: {singleOption.difficultyLevel}</p>
                    </div>
                    ))}
            </div>
            <div className='addtest-float-child'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 style={h1Style}>Create Test</h1>
                    <div className="addtest-error-messages">{error}</div>
                        <label className="addtest-form-label">
                        Test Name<span>* </span>
                        </label>
                        <span className="addtest-error-messages">
                            {errors.testName && errors.testName.type === "required" && (
                                <span>This field is required</span>
                            )}
                        </span>
                        <input
                        id="testName"
                        placeholder="Enter Test Name"
                        {...register("testName", { required: true})}
                        />
                        <input id="create-test-submit" type="submit" value="Create Test" />
                </form>
            </div>
                    
                </div>
    </>
  )
}
