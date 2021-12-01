import React from 'react'
import Header from '../header/Header'
import Main from './main/Main'
import "./home.css"

export default function Home() {
    return (
        <div className="home">
            <Header/>
            <Main/>
        </div>
    )
}
