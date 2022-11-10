import React from "react";
import { Link } from "react-router-dom";

const LandPag = (props) => {

    return (
        <div>
            <h1>This is the Landing Page</h1>
            
            <Link to='/home'>
                <button>Home</button>
            </Link>
            
        </div>
    )
}

export default LandPag;