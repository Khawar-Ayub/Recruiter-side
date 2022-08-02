import React, { useState } from 'react'
import { useEffect } from 'react';

export default function DeleteJob() {
    const [job, setJob] = useState([]);
    useEffect(()=>{
        getJobs();
    },[])
    function getJobs ()
    {
        // fetch(`http://localhost:5000/job/viewRecruiterJobs`),{
        //     method: 'GET'
        // }.then((result)=>{
        //     result.json.then((resp)=>{
        //         console.log(resp)
        //     })
        // })
    }
    function deleteJob(id)
    {
        // fetch(`http://localhost:5000/job/deleteJob/${id}`),{
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
            <button key={index} onClick={()=>deleteJob(item.jobId)}>Delete</button>
            )
        }
    </>
  )
}
