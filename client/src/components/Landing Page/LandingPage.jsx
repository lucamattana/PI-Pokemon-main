import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandPag = () => {

    return (
        <div className='landing-page'>
        <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a2e856d1-b7d1-4b70-ad6f-724be1ffc7b7/dek83dm-4449891e-34f4-4fb9-8cd7-c3f8f01ee6e9.png/v1/fill/w_1280,h_960,strp/pokemon_black_and_and_white_logo_png_transparentp_by_hunternation_dek83dm-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTYwIiwicGF0aCI6IlwvZlwvYTJlODU2ZDEtYjdkMS00YjcwLWFkNmYtNzI0YmUxZmZjN2I3XC9kZWs4M2RtLTQ0NDk4OTFlLTM0ZjQtNGZiOS04Y2Q3LWMzZjhmMDFlZTZlOS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.N7HdgbWVGLri-B9VmwqXqMjGQ1ozde6XdKsg9DnwjPk' alt='Pokemon' width="500px" height="400px"/>
            
            <Link to='/home'>
                <button className="button-land">START!</button>
            </Link>
            
        </div>
    )
}

export default LandPag;