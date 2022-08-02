import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavSidebar from '../nav-sidebar/NavSidebar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AddQuestion from "../questionPool/AddQuestion";
import UpdateQuestion from "../questionPool/UpdateQuestion";

export default function ViewTest(props) {
    let testName= "Amazon Web Services";
    let question = "What is the Capital of Pakistan?";
    let options1 = "Islamabad is the Capital of Pakistan.";
    let options2 = "Karachi is the Capital of Pakistan.";
    let options3 = "Lahore is the Capital of Pakistan.";
    let subject = "Computer Science.";
    let difficultyLevel = "hard";

    const styling ={
        border: '1px solid grey', 
        padding: '20px',
        float: 'right',
        width: '80%',
        margin: '0% 2% 0% 0%'
    }

    const h1viewtest ={
        margin: '7.5% 0% 2% 19%',
        fontWeight: 'bold',
        color: '#2c6f8b',
        float: 'left'
    }

    const [optionList, setOptionList] = useState([{option: ''},{option: ''}]);
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
        marginTop: '7%',
        marginRight: '2%'
      }
      const styleUpdateDeleteButton ={
        float: 'right',
        marginRight: '20px',
        fontSize: '20px'
      }
    const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenUpdateTestName, setIsOpenUpdateTestName] = useState(false);

    const togglePopupUpdateTestName = () => {
        setIsOpenUpdateTestName(!isOpenUpdateTestName);
      }
  const togglePopupAddQuestion = () => {
    setIsOpenAddQuestion(!isOpenAddQuestion);
  }
  const togglePopupUpdate = () => {
    setIsOpenUpdate(!isOpenUpdate);
  }
  const togglePopupDelete = () => {
    setIsOpenDelete(!isOpenDelete);
  }

//   EDIT TEST NAME
const [error, seterror] = useState();
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const h1Style ={
    color: '#2c6f8b',
    fontWeight: 'bold',
    float: 'left'
  }
  const editTestNameStyle={
        marginLeft: '10px',
        // marginTop: '5px',
        fontSize: '20px'
  }
  
//   const [isTestName, setIsTestName] = useState();
//   const handleEditTestName =()=>{
//     setIsTestName(testName);
//   }
  return (
    <>
        <NavSidebar/>
        <h1 style={h1viewtest}>
            {testName}
            <span onClick={togglePopupUpdateTestName} style={editTestNameStyle} className="glyphicon glyphicon-pencil"></span>
            {/* UPDATE */}
            <div>
              {isOpenUpdateTestName && 
                <div className="questionpool-popup-box">
                  <div className="questionpool-box">
                    <span className="questionpool-close-icon" onClick={togglePopupUpdateTestName}>x</span>
                    <form onSubmit={handleSubmit()}>
                    <h1 style={h1Style}>Edit</h1>
                    <div className="addtest-error-messages">{error}</div>
                        <label style={{fontSize:'16px',fontWeight:'500', marginTop: '80px',marginLeft: '-65px'}} >
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
              }
            </div>
        </h1>
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
        <div className="container" style={styling}>
            {optionList.map((optionList, index) =>(
                <>
                    <span  onClick={togglePopupDelete} style={styleUpdateDeleteButton} className="glyphicon glyphicon-trash"></span>
                    <span onClick={togglePopupUpdate} style={styleUpdateDeleteButton} className="glyphicon glyphicon-pencil"></span>
                   <h3 className="" style={{color: "#2c6f8b"}}>
                        <ol>
                            <li>{question}{props.question}</li>
                        </ol>
                    </h3>
            <ol>
            <li className=" text" style={{color: 'green'}}> <h6 >{options1}{props.options}</h6></li>
            <li className=" text-muted"><h6>{options2}{props.options}</h6></li>
            <li className=" text-muted"><h6>{options3}{props.options}</h6></li>
            </ol>
            <p style={{fontStyle: 'italic',marginLeft: '1.5%'}}>{subject}{props.subject}</p>
            <p style={{color: 'chocolate',marginLeft: '1.5%'}}>Difficulty Level: {difficultyLevel}{props.difficultyLevel}</p>
            <hr/>
            </>
            ))}
            {/* UPDATE */}
            <div>
              {isOpenUpdate && 
                <div className="questionpool-popup-box">
                  <div className="questionpool-box">
                    <span className="questionpool-close-icon" onClick={togglePopupUpdate}>x</span>
                    <UpdateQuestion/>
                  </div>
              </div>
              }
            </div>
            {/* DELETE JOB */}
            <div>
            {/* {job.map((item,index)=>
                      <button key={index} onClick={()=>deleteJob(item.jobId)}>Delete</button>
                      )
                  } */}
            </div>
        </div>

    </>
  )
}
