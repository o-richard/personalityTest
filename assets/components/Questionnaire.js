import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeLayout from './BasicLayout';
import links from './Constants';
import logo from '../images/logo.png';

// Pass the CSRF token
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Questionnaire() {
    const navigate = useNavigate();

    // Store the selected radio
    const [selectedradio, setSelectedradio] = useState("");

    // Change the value based on the change.
    const handleRadioChange = (event) => {
        setSelectedradio(event.target.value);
    };
    // When to show the loader animation
    const [loading, setLoading] = useState(false);

    const HandleClick = (event) => {
        // Show the loader
        setLoading(true);
        axios.post('/get_questionnaire', {
            selected_number: selectedradio,
        })
          .then(function (response) {
            const response_data = response.data;
            const results = JSON.parse(response_data.items);
            const questions = results.items;
            const the_number = results.n;
            // Remove the loader
            setLoading(false);
            navigate('/', {state:{getby:"begin", quiz: questions, no_of_quiz:the_number}});
          })
          .catch(function (error) {
            // Remove the loader
            setLoading(false);
            console.log("An error occured.");
            });
    };

    const the_main_body = (
        <div className="header client_header">
            <img src = {logo} alt = "Personality Test" className="header_logo"/>

            <p className="desc">Fill in the questions as accurately as possible.</p>
            <p className="instructions">
                Your personal profile will be shown at the end of the questionnaire.<br/>
                To begin, select the number of questions and click on "Begin" <br/>
                To exit, click on "Go back to the Homepage" <br/>
            </p>
            <form method="post">
                <label className="form-control">
                <input type="radio" name="answer" value="20" checked={selectedradio === '20'} onChange={handleRadioChange} required />20 Questions
                </label>
                <label className="form-control">
                <input type="radio" name="answer" value="50" checked={selectedradio === '50'} onChange={handleRadioChange} required />50 Questions
                </label>
                <label className="form-control">
                <input type="radio" name="answer" value="100" checked={selectedradio === '100'} onChange={handleRadioChange} required />100 Questions
                </label>
            </form>
            <div className="control_buttons">
                <button id="exit">
                <Link to="/" state={links.homepage}>
                Go back to the Homepage
                </Link>
                </button>
                <button id="submit" onClick={HandleClick}>
                Begin
                </button>
            </div>
        </div>
    );

    return (
        <>
        { loading ? 
            (
            <div className="loader-container">
                <div className="spinner"></div>
            </div> 
            )
            :
            <HomeLayout main_body={the_main_body}/>
        }
        </>
    );
}

export default Questionnaire;