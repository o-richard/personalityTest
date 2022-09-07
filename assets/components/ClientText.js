import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import HomeLayout from './BasicLayout.js';
import links from './Constants.js';
import logo from '../images/logo.png';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Displays the page where client enters text about themselves
function ClientText() {
    const navigate = useNavigate();

    // Actions on the form
    const [clienttext, setClienttext] = useState("");

    // Record errors on the form
    const [errors, setErrors] = useState({
        presence: false,
        length_error : "",
        entry_error: "",
    });

    // Specify when the content changes
    const handleChange = (event) => {
       setClienttext(event.target.value);
        // Validate the text. The text should start with I or My.
        const clienttext_lower = clienttext.toLowerCase();
        { 
            clienttext_lower.startsWith("i ") === false &&  clienttext_lower.startsWith("my ") === false ? 
                setErrors(previousState => { 
                    return { ...previousState, presence: true, entry_error: "The text should start with the pronouns I or My."}
                }) :
                setErrors(previousState => {
                    return { ...previousState, entry_error: ""}
                })
        }
        // The text should have at least 5 characters
        {clienttext.length < 5 ? 
            setErrors(previousState => {
                return { ...previousState, presence: true, length_error: "The text should contain at least 5 characters."}
            }) : 
            setErrors(previousState => {
                return { ...previousState, length_error: ""}
            })
        }
        // Ensure the correct recording of any errors
        { errors.entry_error.length == 0 && errors.length_error == 0 ? 
            setErrors(previousState => {
                return { ...previousState, presence: false}
            }) : 
            setErrors(previousState => {
                return { ...previousState, presence: true}
            })
        }
    }

    // Specify when submitting the form
    const handleSubmit = (event) => {
        // Only submit when there are no client errors
        event.preventDefault();
        { errors.presence ? 
            null
        :
        axios.post('/client_text', {
            clienttext: clienttext,
          })
          .then(function (response) {
            const response_data = response.data;
            const results = JSON.parse(response_data.score_response);
            const assessment_results = results.scoring.big5;
            const psych_eval = response_data.psych_value;
            navigate('/', {state:{getby:"text_results", text_scores: assessment_results, psych_value: psych_eval, psych_present: true}});
          })
          .catch(function (error) {
            console.log("An error occured.");
            });
        }
    }

    // Defines the content covering the page
    const the_main_body = (
        <div className="header client_header">
            <img src = {logo} alt = "Personality Test" className="header_logo"/>

            <div className="control_buttons question_buttons">
                <button id="go_to_home">
                <Link to="/" state={links.homepage}>
                Go back to the Homepage
                </Link>
                </button>
            </div>

            <p className="desc title">Write something about yourself.</p>
            <p className="text_muted">
                A minimum of 5 characters.<br/>
                Your sentences to begin with the pronouns I/My.<br/>For example "I like playing football with other people."
            </p>
            {
            errors.presence ? 
                <><p className='errors'>{errors.entry_error}</p><p className='errors'>{errors.length_error}</p></>: null
            }
            <form method='post' onSubmit={handleSubmit}>
                <textarea className='textBox' name='clienttext' value={clienttext}  onChange={handleChange} required></textarea>
                <div className="control_buttons question_buttons">
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );

    // Pass the content
    return (
        <HomeLayout main_body={the_main_body} />
    );
}

export default ClientText;