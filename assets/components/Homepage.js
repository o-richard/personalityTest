import React from 'react';
import { Link } from 'react-router-dom';

import HomeLayout from './BasicLayout.js';
import links from './Constants.js';
import logo from '../images/logo.png';

// Displays the Homepage
function Homepage() {

    // Defines the data covering the body of the Homepage
    const the_main_body = (
        <div className="header">
            <img src = {logo} alt = "Personality Test"/>

            <p className="desc">This application can help you determine your personality!</p>
            <p className='test-muted'>Your personal data is not saved at all.</p>
            <div className="button_group">
                <button>
                <Link to="/" state={links.client_text}>
                Write something about Yourself
                </Link>
                </button>
                <button>
                <Link to="/" state={links.start_questionnaire}>
                Take a Questionnaire
                </Link>
                </button>
            </div>
        </div>
    );

    // Pass the homepage content
    return (
        <HomeLayout main_body={the_main_body} />
    );
}

export default Homepage;