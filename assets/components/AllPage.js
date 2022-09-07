import React from "react";
import { useLocation } from "react-router-dom";

import Homepage from './Homepage.js';
import ClientText from './ClientText.js';
import Questionnaire from './Questionnaire.js';
import Questions from "./Questions.js";
import Big5profile from "./Big5Profile.js";
import Neoprofile from "./NeoProfile.js";

// The main entry point to the application
const AllPage = () => {
    let location = useLocation();
    const switchTabs = () => {
        const target = location.state;

        if (target === null) {
            return <Homepage />;
        }
        else {
            switch(location.state.getby) {
                case "clientText":
                    return <ClientText />;
                case "questionnaire":
                    return <Questionnaire />;
                case "begin":
                    return <Questions questions={location.state.quiz} />;
                case "homepage":
                    return <Homepage />;
                case "text_results":
                    return <Big5profile scores={location.state.text_scores} psych_value={location.state.psych_value} psych_present={location.state.psych_present} />;
                case "fact_results":
                    return <Neoprofile agreeableness_list={location.state.agreeableness}  openness_list={location.state.openness} neuroticism_list={location.state.neuroticism} extraversion_list={location.state.extraversion} conscientiousness_list={location.state.conscientiousness} />;
                default:
                    return <Homepage />;
             }  
        }
    };
    return <>{switchTabs()}</>;
};
export default AllPage;