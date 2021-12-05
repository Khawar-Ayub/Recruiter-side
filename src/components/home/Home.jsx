import React from 'react'
import Header from '../header/Header'
import Section1 from './section1/Section1'
import "./home.css"
import Section2 from './section2/Section2'

export default function Home() {
    return (
        <div className="home">
            <Header/>
            <Section1/>
            <Section2/>
        </div>
    )
}
