import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';

function LandingPage() {
    return (
        
            <div className='landing-container'>
                <div className='link-conatiner'>
                    <Link to="/user">
                        <button className='btn-landingPage'>User</button>
                    </Link>
                    <Link to="/admin-register">
                        <button className='btn-landingPage'>Admin</button>
                    </Link>
                </div>
            </div>

    );
}
export default LandingPage;