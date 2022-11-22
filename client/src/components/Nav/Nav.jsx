import React from "react";
import { Link } from "react-router-dom";
import './Nav.css';

const Nav = () => {

    return (
        <div className="nav-container">
             <Link to='/'>
              <button className='button-nav'>To Landing Page</button>
            </Link>
            <Link to='/home'>
                <button className='button-nav'>Home</button>
            </Link>
            <Link to='/create-pokemon'>
                <button className='button-nav'>Create Pokemon</button>
            </Link>
        </div>
    )
};

export default Nav;