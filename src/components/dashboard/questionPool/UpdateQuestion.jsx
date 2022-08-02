import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";

export default function UpdateQuestion({question,answer,category,difficultyLevel,id}) {
  var [error, seterror] = useState();
  var [message, setmessage] = useState();
  const navigate = useNavigate();
  const [refresh,setRefresh] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
      await axios
        .put(`http://13.232.134.204:5000/questions/updateQuestion/${id}`, {
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
    onSubmit();
  }, [refresh]);

  // OPTION ADD
  const [answerList, setanserList] = useState([{answer: ''}]);
  const [diffLevel, setDiffLevel] = useState(false);

  const setDifficultyLevel = ()=>{
    setDiffLevel(diffLevel);
  }
  const handleAnswerAdd = () =>
  {
    setanserList([...answerList,{answer: ''}])
  }
  const handleAnswerRemove = (index) =>
  {
    const list= [...answerList]
    list.splice(index, 1);
    setanserList(list);
  }
  const handleAnswerChange = (e, index) =>
  {
    const {name, value} = e.target
    const list= [...answerList]
    list[index][name] = value
    setanserList(list);
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
      <h1 style={{margin: '0% 0% 5% 14%', color:'#2c6f8b',fontWeight: 'bold' }}>Update Question*</h1>
      <div className='container' style={{width: '75%', marginTop: '8%'}}>
      <form style={{border: '1px solid lightgray',padding: '1%'}} onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
              <label style={{marginRight: '24%'}} htmlFor="question" className="form-label"><h4>Question*</h4></label>
              <input style={{backgroundColor: '#F9F9F9'}} type="text" className="form-control" placeholder='Enter the Ouestion' value={question} id="question" />
          </div>
          
          <label htmlFor="answer" className="form-label"><h4 >Options*</h4></label>
            {answerList.map((singleAnswer, index) =>(
              <div  key={index} className="mb-3 answers">
                  <input 
                    style={{backgroundColor: '#F9F9F9',float: 'left', width: '59%',marginTop: '1%'}} 
                    type="text" 
                    className="form-control" 
                    name='answer' 
                    placeholder='Enter the Options' 
                    // value={answer}
                    id="answer"
                    value={singleAnswer.answer}
                    onChange = {(e) => handleAnswerChange(e, index)}
                  />
                  <input 
                    style={{marginLeft: '10px'}} 
                    type="radio" 
                    value={true}
                    id="options" 
                    name="options"
                  />
                  <label 
                    style={{marginTop: '2%', color: 'grey'}} 
                    className="form-label" 
                    htmlFor="options"
                    >
                      True Answer
                  </label>
                  {answerList.length >1 && (
                    <button 
                      onClick={() => handleAnswerRemove(index)}
                      style={{float: 'right',marginTop: '1%'}} 
                      className="mx-3 btn btn-danger"
                      >
                        Remove
                      </button>
                  )}
                  {/* ADD BUTTON */}
                  {answerList.length -1 === index && 
                    answerList.length < 10 &&
                    <button 
                      onClick={handleAnswerAdd} 
                      style={optionButtonStyle} 
                      className="btn"
                      >
                        Add Option
                      </button>
                  }  
              </div>
            ))}
            
              
              
          <div className="mb-3">
              <label htmlFor="category" className="form-label"><h4>Category*</h4></label>
              <input style={{backgroundColor: '#F9F9F9'}} type="text" className="form-control" value={category} placeholder='Enter the Category' id="category" />
          </div>
          <div className="mb-3">
          <h4>Difficulty Level*</h4>
          {diffLevel.map((oneDifficulty, index) =>(
            <div key={index}>
              <input type="radio" id="hard" onClick={()=>setDifficultyLevel(oneDifficulty)} name="difficultyLevel" value="hard"/>
              <label style={{color: 'grey'}} className="form-label" htmlFor="hard">Hard</label>
              <input type="radio" id="medium" onClick={()=>setDifficultyLevel(oneDifficulty)} name="difficultyLevel" value="medium"/>
              <label style={{color: 'grey'}} className="form-label" htmlFor="medium">Medium</label>
              <input type="radio" id="easy" onClick={()=>setDifficultyLevel(oneDifficulty)} name="difficultyLevel" value="easy"/>
               <label style={{color: 'grey'}} className="form-label" htmlFor="easy">Easy</label>
            </div>
          ))}
        </div>
          <button type="submit" className="btn btn-dark" >Add</button>
      </form>
  </div>
</>
  )
}
