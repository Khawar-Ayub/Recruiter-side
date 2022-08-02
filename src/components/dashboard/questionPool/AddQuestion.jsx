import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import axios from 'axios';
import Cookies from 'js-cookie';
import './addquestion.css';

export default function AddQuestion() {
  const [answers, setAnswers] = useState([]);
  var [error, seterror] = useState();
  var [message, setmessage] = useState(); 
  const [refresh,setRefresh] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // CREATE QUESTION
  const onSubmit = async (data) => {
    await axios
        .post(`http://13.232.134.204:5000/questions/createQuestion`, data,{
          headers: {
            "x-access-token": Cookies.get("accessTokenRecruiter")
          }}, data)
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
  const [optionList, setOptionList] = useState([{option: ''}]);
  const handleOptionAdd = () =>
  {
    setOptionList([...optionList,{option: ''}])
  }
  const handleOptionRemove = (index) =>
  {
    const list= [...optionList]
    list.splice(index, 1);
    setOptionList(list);
  }
  const handleOptionChange = (e, index) =>
  {
    // console.log(e.target.value);
    const {name, value} = e.target
    const list= [...optionList]
    list[index][name] = value
    setOptionList(list);
    console.log(list);
  }
  const style = 
  {
    borderRadius: '4px',
    backgroundColor: '#04AA6D',
    color: 'white',
    paddingTop: '.5%',
    paddingRight: '83%',
    paddingLeft: '1%'
  }
  const style2 = {
    borderRadius: '4px',
    backgroundColor: '#04AA6D',
    color: 'white',
    paddingTop: '.5%',
    paddingRight: '80%',
    paddingLeft: '1%'
  }
  const style3 = {
    borderRadius: '4px',
    backgroundColor: '#04AA6D',
    color: 'white',
    paddingTop: '.5%',
    paddingLeft: '1%',
    paddingBottom: '.5%'
  }
  const inputStyle = {
    backgroundColor: '#F9F9F9'
  }
  const optionButtonStyle = {
    marginTop: '3%',
    padding: '1% 45% 1% 40%',
    float: 'center',
    backgroundColor: '#4285F4',
    color: 'white'
  }
  return (
    <>
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
    <h1 style={{margin: '0% 0% 0% 14%', color:'#2c6f8b',fontWeight: 'bold' }}>Add Question*</h1>
    <div className='container' style={{width: '75%', marginTop: '8%'}}>
        <form onSubmit={handleSubmit(onSubmit)} style={{border: '1px solid lightgray',padding: '1%'}}>
            <div className="mb-3">
                <label style={style2} htmlFor="question" className="form-label"><h4>Question*</h4></label>
                <input style={inputStyle} type="text" className="form-control" placeholder='Enter the Ouestion' id="question" required/>
            </div>
            
            <label style={style} htmlFor="options" className="form-label"><h4 >Options*</h4></label>
              {optionList.map((singleOption, index) =>(
                <div  key={index} className="mb-3 answers">
                    <input 
                      style={{backgroundColor: '#F9F9F9',float: 'left', width: '59%',marginTop: '1%'}}
                      type="text" 
                      className="form-control" 
                      name='options' 
                      placeholder='Enter the Options' 
                      id="options"
                      // value={singleOption.option}
                      onBlur = {(e) => handleOptionChange(e, index)}
                      required
                    />
                    <input 
                      style={{marginLeft: '10px'}} 
                      type="radio" 
                      id="radio-options" 
                      name="radio-options"
                    />
                    <label 
                      style={{marginTop: '2%', color: 'grey'}}
                      className="form-label" 
                      htmlFor="radio-options"
                      >
                        True Answer
                    </label>
                    {optionList.length >1 && (
                      <button 
                        onClick={() => handleOptionRemove(index)}
                        style={{float: 'right',marginTop: '1%'}}  
                        className="mx-3 btn btn-danger"
                        >
                          Remove
                        </button>
                    )}
                    {/* ADD BUTTON */}
                    {optionList.length -1 === index && 
                      optionList.length < 10 &&
                      <button 
                        onClick={handleOptionAdd} 
                        style={optionButtonStyle} 
                        className="btn"
                        >
                          Add Option
                        </button>
                    }  
                </div>
              ))}
              
                
                
            <div className="mb-3">
                <label style={style2} htmlFor="category" className="form-label"><h4>Category*</h4></label>
                <input type="text" className="form-control" placeholder='Enter the Category' id="category" />
            </div>
            <div className="mb-3">
            <h4 style={style3}>Difficulty Level*</h4>
                <input type="radio" id="hard" name="difficultyLevel" value="hard"/>
                <label className="form-label" htmlFor="hard">Hard</label>
                <input type="radio" id="medium" name="difficultyLevel" value="medium"/>
                <label className="form-label" htmlFor="medium">Medium</label>
                <input type="radio" id="easy" name="difficultyLevel" value="easy"/>
                 <label className="form-label" htmlFor="easy">Easy</label>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    </div>
    </>
  )
}
