import React, { useState } from 'react'
import { useEffect } from 'react';

export default function DeleteQuestion() {
    const [job, setJob] = useState([]);
    useEffect(()=>{
        getJobs();
    },[])
    function getJobs ()
    {
        // fetch(`http://localhost:5000/questionpool/viewRecruiterQuestions`),{
        //     method: 'GET'
        // }.then((result)=>{
        //     result.json.then((resp)=>{
        //         console.log(resp)
        //     })
        // })
    }
    function deleteQuestion(id)
    {
        // fetch(`http://localhost:5000/questionpool/deleteQuestion/${id}`),{
        //     method: 'DELETE'
        // }.then((result)=>{
        //     result.json.then((resp)=>{
        //         console.warn(resp)
        //     })
        // })
        alert(id);
        getJobs();
    }
  return (
    <>
        {job.map((item,index)=>
            <button key={index} onClick={()=>deleteQuestion(item.questionId)}>Delete</button>
            )
        }
    </>
  )
}
