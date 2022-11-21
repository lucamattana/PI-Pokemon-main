import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandPag = (props) => {

    return (
        <div>
            <h1 className="Title">This is the Landing Page</h1>
            
            <Link to='/home'>
                <button className="Button">Home</button>
            </Link>
            
        </div>
    )
}

export default LandPag;