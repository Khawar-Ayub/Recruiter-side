import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import QuestionItem from "./QuestionItem";
import  './questionpool.css';
import NavSidebar from "../nav-sidebar/NavSidebar";
import UpdateQuestion from "./UpdateQuestion";
import AddQuestion from "./AddQuestion";
import axios from "axios";
import Cookies from "js-cookie";

export default function QuestionPool() {
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [error, seterror] = useState();
  const [refresh,setRefresh] = useState(false);
  const [questions, setQuestions] = useState([]);
  // POPUP
  const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const togglePopupAddQuestion = () => {
    setIsOpenAddQuestion(!isOpenAddQuestion);
  }
  const togglePopupView = () => {
    setIsOpenView(!isOpenView);
  }
  const togglePopupUpdate = () => {
    setIsOpenUpdate(!isOpenUpdate);
  }

   // VIEW QUESTION
   const viewQuestion =(element)=>{
    setSelectedQuestion(element);
    togglePopupView();
  }
  //  UPDATE QUESTION
  const updateQuestion =(element)=>{
    setSelectedQuestion(element);
    togglePopupUpdate();
  }
    //  GET AL QUESTIONS
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
 
    /// DELETE QUESTION
  
    const deleteQuestion = async (id) =>
    {
      const response = await axios
      .delete(`http://13.232.134.204:5000/questions/deleteQuestion/${id}`,{
        headers: {
          "x-access-token": Cookies.get("accessTokenRecruiter")
        }})
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setRefresh(!refresh);
        } else {
          seterror(res.data.message);
        }
      })
      .catch((err) => {
        seterror(err.response.data.message);
      });
    }
    useEffect(() => {
      getAllQuestions();
    }, [refresh]);
     
  // POPUP
 
  const styleAddQuestion ={
    fontFamily:'sans-serif',
    borderRadius: '4px',
    border: 'none',
    textAlign: 'center',
    padding: '1% 3% 1% 3%',
    fontSize: '17px',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#91B7E1',
    float: 'right',
    marginTop: '3%'
  }
    
    return (
      <>
        <NavSidebar/>
        <div className='container questionpool-container'>
          <h1>Question</h1>
          <button style={styleAddQuestion} onClick={togglePopupAddQuestion} className="btn">Add Question</button>
          <div>
            {isOpenAddQuestion && 
              <div className="questionpool-popup-box">
                <div className="questionpool-box">
                  <span onClick={togglePopupAddQuestion} className="questionpool-close-icon" >x</span>
                  <AddQuestion/>
                </div>
              </div>
            }
          </div>
          <table id="questionpool-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Options</th>
                <th>Category</th>
                <th>Difficulty Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {questions?.map((element,index)=>{
              
              const trueAnswer = element.questionOptions.filter((e)=>e.isCorrect===true)
              return(
              <tr key={index}>
                <td>{element.question.slice(0, 30)}....</td>
                <td>{trueAnswer.length>0?trueAnswer[0].option:"No Correct Option"}</td>
                <td>{element.category}</td>
                <td>{element.difficultyLevel}</td>
                <td>
                  <button onClick={()=>viewQuestion(element)} id="one" className="btn-success">View</button>
                  <button onClick={()=>updateQuestion(element)} style={{margin: '0% 14% 0% 14%'}} className="btn-primary">Update</button>
                  <button onClick={()=>deleteQuestion(element.id)}  className="btn-danger">Delete</button>
                  
                </td>
              </tr>
              )
            })}
            </tbody>
            {/* VIEW */}
            <div>
              {isOpenView && 
                <div className="questionpool-popup-box">
                  <div className="questionpool-box">
                    <span className="questionpool-close-icon" onClick={togglePopupView}>x</span>
                    <QuestionItem 
                    question = {selectedQuestion.question}
                    options = {selectedQuestion.questionOptions}
                    category = {selectedQuestion.category}
                    difficultyLevel = {selectedQuestion.difficultyLevel}
                    />
                  </div>
                </div>
              }
            </div>
            {/* UPDATE */}
            <div>
              {isOpenUpdate && 
                <div className="questionpool-popup-box">
                  <div className="questionpool-box">
                    <span className="questionpool-close-icon" onClick={togglePopupUpdate}>x</span>
                    <UpdateQuestion 
                    question = {selectedQuestion.question}
                    options = {selectedQuestion.answer}
                    category = {selectedQuestion.category}
                    difficultyLevel = {selectedQuestion.difficultyLevel}
                    />
                  </div>
              </div>
              }
            </div>
          </table>
        </div>
      </>
    );
  }
