import React from 'react'
import { useState } from 'react'

export default function QuestionItem(props) {
    return (
        <div className="container-sm" style={{width: "75%"}}>
      <div className="my-3">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title" style={{color: "#2c6f8b"}}>
              {props.question}
            </h3>
            <ol>
            {props.options.map((item, index)=>(
            <li key={index} className="card-text text-muted">  {item.option}</li>
            ))}
            </ol>
           
            <p style={{fontStyle: 'italic'}}>Category: {props.category}</p>
            <p style={{color: 'chocolate'}}>Difficulty Level: {props.difficultyLevel}</p>
           
          </div>
        </div>
      </div>
      </div>
  )
}
