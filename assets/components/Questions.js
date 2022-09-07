import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios";
import links from "./Constants";
import logo from '../images/logo.png';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Questions(props) {
    const navigate = useNavigate();

    const TOTAL_NUMBER = props.no_of_quiz;
    
    // Store the selected radio
    const [selectedradio, setSelectedradio] = useState("");

    // Change the value based on the change.
    const handleRadioChange = (event) => {
        setSelectedradio(event.target.value);
    };

    // The maximum number of questions. Ensures the number when used to access a list it won't make it go out of range
    const MAX_NUMBER = TOTAL_NUMBER - 1;

    // Keep track of the questions
    const [counter, setCounter] = useState(0);

    // Keep track of the questions and the answers
    const [answers, setAnswers] = useState([]);

    // When to show the loader animation
    const [loading, setLoading] = useState(false);

    // Store the number of questions remaining
    const [remainder, setRemainder] = useState(TOTAL_NUMBER);

    // What happens during submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Record Question & Answer
        const response = {
            "question" : props.questions[counter],
            "answer": selectedradio,
        }
        // clear the selected answer
        setSelectedradio("");
        // Get the new value
        const new_value = counter + 1;
        setCounter(new_value);
        // Record the answers
        setAnswers(previousState => {
            return [ ...previousState, response]
        });
        // Record the remaining questions
        const new_remainder = MAX_NUMBER - counter;
        setRemainder(new_remainder);
        // Perform the changes if the counter equals the constant max number defined
        if(counter == MAX_NUMBER) {
            // Show the loader
            setLoading(true);
            // Submit to the backend
            axios.post('/client_questionnaire', {
                the_answers: answers,
              })
              .then(function (response) {
                const response_data = response.data;
                const extraversion = response_data.extraversion_list;
                const conscientiousness = response_data.conscientiousness_list;
                const openness = response_data.openness_list;
                const agreeableness = response_data.agreeableness_list;
                const neuroticism = response_data.neuroticism_list;
                // Remove the loader
                setLoading(false);
                navigate('/', {state:{getby:"fact_results", extraversion:extraversion, conscientiousness:conscientiousness, openness:openness, agreeableness:agreeableness, neuroticism:neuroticism}});
              })
              .catch(function (error) {
                // Remove the loader
                setLoading(false);
                console.log("An error occured.");
                });
        }
    };

    return (
        <>
        { loading ? 
            (
            <div className="loader-container">
                <div className="spinner"></div>
            </div> 
            )
            :
            <div className="header client_header">
            <img src = {logo} alt = "Personality Test" className="header_logo"/>

            <div className="control_buttons question_buttons">
                <button id="go_to_home">
                <Link to="/" state={links.homepage}>
                Go back to the Homepage
                </Link>
                </button>
            </div>
            <p className="text-center mt-1 mb-1">{remainder} questions remaining.</p>
            <p className="quiz_title mt-1">{props.questions[counter]}</p>
            <form method="post" onSubmit={handleSubmit}>
                <label className="form-control">
                <input type="radio" name="answer" value="strongly agree" checked={selectedradio === 'strongly agree'} onChange={handleRadioChange} required />Strongly agree
                </label>
                <label className="form-control">
                <input type="radio" name="answer" value="agree" checked={selectedradio === 'agree'} onChange={handleRadioChange} required />Agree
                </label>
                <label className="form-control">
                <input type="radio" name="answer" value="slightly agree" checked={selectedradio === 'slightly agree'} onChange={handleRadioChange} required />Slightly agree
                </label>
                <label className="form-control">
                <input type="radio" name="answer" value="neutral" checked={selectedradio === 'neutral'} onChange={handleRadioChange} required />Neutral
                </label>
                <label className="form-control">
                <input type="radio" name="answer" value="slightly disagree" checked={selectedradio === 'slightly disagree'} onChange={handleRadioChange} required />Slightly disagree
                </label>
                <label className="form-control">
                <input type="radio" name="answer" value="disagree" checked={selectedradio === 'disagree'} onChange={handleRadioChange} required />Disagree
                </label>
                <label className="form-control">
                <input type="radio" name="answer" value="strongly disagree" checked={selectedradio === 'strongly disagree'} onChange={handleRadioChange} required />Strongly disagree
                </label>
                <div className="control_buttons question_buttons mb-2">
                    <button>
                    Submit
                    </button>
                </div>
            </form>
        </div>
        }
        </>
    );
}

export default Questions;